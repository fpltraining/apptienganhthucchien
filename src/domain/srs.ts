/**
 * Spaced repetition (curriculum §8.3).
 *
 * FSRS rather than SM-2: at the same retention it asks for fewer reviews, and
 * when the whole vocabulary budget is ten minutes a day that difference decides
 * whether the block fits.
 *
 * Five things sit on top of the stock scheduler, each from §8.3:
 *
 *  1. Retention target 0.88 rather than 0.90 — slightly fewer cards per day, so
 *     the queue stays inside its ten minutes.
 *  2. A hard daily cap of 28 cards (8 new + 20 review). Ten minutes is ten
 *     minutes; anything over the cap waits for tomorrow.
 *  3. Recognition and production are separate cards with separate schedules,
 *     because producing a phrase is much harder than recognising it.
 *  4. Grades are derived from pronunciation score and response latency, never
 *     asked. Self-rating is inaccurate, and reaching for a button breaks the
 *     speaking rhythm the block exists to build.
 *  5. A recovery mode after a break: the backlog is released a few cards a day
 *     instead of all at once. Reopening the app to three hundred due cards is
 *     the single most common reason people abandon an SRS.
 */

import { createEmptyCard, fsrs, generatorParameters, Rating, State } from "ts-fsrs";
import type { Card as FsrsCard, Grade } from "ts-fsrs";
import { addDays, daysBetween, toDayKey } from "./dates";
import type { AccountId } from "../data/schema";

/** §8.3 — lowered from the 0.9 default to trim the daily queue. */
export const TARGET_RETENTION = 0.88;
export const DAILY_CARD_CAP = 28;
export const NEW_CARDS_PER_DAY = 8;
export const REVIEW_CARDS_PER_DAY = 20;

/** A gap longer than this puts the account into recovery mode. */
export const RECOVERY_GAP_DAYS = 3;
/** How many backlog cards recovery releases per day, on top of the day's own. */
export const RECOVERY_EXTRA_PER_DAY = 6;

/** Two failures in a row pin a card to the front of the queue. */
export const STRUGGLE_THRESHOLD = 2;

/**
 * Production cards come back sooner than recognition cards.
 *
 * FSRS models one memory per card, and these are two different memories of the
 * same phrase; the harder one needs the denser schedule (§8.3).
 */
const PRODUCTION_INTERVAL_FACTOR = 0.8;

/** §8.4 — a card retires once it is fast and stable over a long spacing. */
const RETIRE_STABILITY_DAYS = 21;
const RETIRE_FAST_ANSWERS = 3;

export type CardDirection = "recognition" | "production";

/** What the learner did on one attempt, before it becomes a grade. */
export type Attempt = {
  /** False when nothing was said at all. */
  spoken: boolean;
  /** Milliseconds from the prompt ending to speech starting. */
  latencyMs: number;
  /** 0–100, or null when scoring was queued for later (§12.7). */
  pronunciationScore: number | null;
};

export type ReviewCard = {
  accountId: AccountId;
  itemId: string;
  direction: CardDirection;
  /** FSRS scheduling state. */
  fsrs: FsrsCard;
  /** Local day the card is next due, `YYYY-MM-DD`. */
  dueOn: string;
  consecutiveFailures: number;
  /** Consecutive sub-1.5s answers at a long interval, toward retirement. */
  fastAnswers: number;
  retiredOn: string | null;
};

/**
 * Fuzz is on so cards reviewed together on day one do not stay clumped
 * together forever. It is seeded from the card's own state rather than a random
 * source, so the same card and grade always produce the same interval — the
 * spread is across cards, not across runs.
 */
const scheduler = fsrs(
  generatorParameters({ request_retention: TARGET_RETENTION, enable_fuzz: true }),
);

export function createCard(
  accountId: AccountId,
  itemId: string,
  direction: CardDirection,
  now = new Date(),
): ReviewCard {
  return {
    accountId,
    itemId,
    direction,
    fsrs: createEmptyCard(now),
    dueOn: toDayKey(now),
    consecutiveFailures: 0,
    fastAnswers: 0,
    retiredOn: null,
  };
}

/**
 * Turns an attempt into an FSRS grade.
 *
 * Thresholds are §8.3's table. Note that a fast answer with poor pronunciation
 * still fails: saying it quickly in a way no one understands is not knowing it.
 */
export function gradeAttempt(attempt: Attempt): Grade {
  if (!attempt.spoken) return Rating.Again;
  if (attempt.latencyMs > 8000) return Rating.Again;

  const score = attempt.pronunciationScore;

  // Unscored attempts (offline queue) are graded on latency alone, and never
  // above Good — we cannot award Easy for something we have not heard.
  if (score === null) {
    if (attempt.latencyMs > 4000) return Rating.Hard;
    return Rating.Good;
  }

  if (score < 60) return Rating.Again;
  if (attempt.latencyMs > 4000 || score <= 70) return Rating.Hard;
  if (attempt.latencyMs < 1500 && score > 85) return Rating.Easy;
  return Rating.Good;
}

/**
 * Applies a grade and returns the updated card.
 *
 * A card that keeps failing is held at a one-day interval regardless of what
 * FSRS computes — this is the "a word you always get wrong comes back more
 * often" rule, and it outranks the scheduler.
 */
export function reviewCard(
  card: ReviewCard,
  attempt: Attempt,
  now = new Date(),
): { card: ReviewCard; grade: Grade } {
  const grade = gradeAttempt(attempt);
  const { card: scheduled } = scheduler.next(card.fsrs, now, grade);

  const failed = grade === Rating.Again;
  const consecutiveFailures = failed ? card.consecutiveFailures + 1 : 0;

  const today = toDayKey(now);
  let dueOn = toDayKey(scheduled.due);

  // Production is the harder direction, so pull its next review forward.
  if (!failed && card.direction === "production") {
    const interval = daysBetween(today, dueOn);
    if (interval > 1) {
      dueOn = addDays(today, Math.max(1, Math.round(interval * PRODUCTION_INTERVAL_FACTOR)));
    }
  }

  // A struggling word never gets spaced out, whatever the interval says.
  if (consecutiveFailures >= STRUGGLE_THRESHOLD) {
    dueOn = addDays(today, 1);
  }

  const answeredFast = !failed && attempt.latencyMs < 1500;
  const atLongInterval = scheduled.stability >= RETIRE_STABILITY_DAYS;
  const fastAnswers = answeredFast && atLongInterval ? card.fastAnswers + 1 : 0;

  return {
    card: {
      ...card,
      fsrs: scheduled,
      dueOn,
      consecutiveFailures,
      fastAnswers,
      retiredOn: fastAnswers >= RETIRE_FAST_ANSWERS ? today : card.retiredOn,
    },
    grade,
  };
}

export type DailyQueue = {
  reviews: ReviewCard[];
  newCards: ReviewCard[];
  /** Due cards that did not fit today and roll over. */
  deferred: number;
  recovering: boolean;
};

/**
 * Picks the cards for today, inside the ten-minute budget.
 *
 * Ordering matters as much as the cap: when cards have to be cut, the ones that
 * survive are the ones closest to being forgotten, and struggling words go
 * first of all.
 */
export function buildDailyQueue(
  cards: readonly ReviewCard[],
  options: { today?: string; lastStudyDay?: string | null } = {},
): DailyQueue {
  const today = options.today ?? toDayKey(new Date());
  const gap = options.lastStudyDay ? daysBetween(options.lastStudyDay, today) : 0;
  const recovering = gap > RECOVERY_GAP_DAYS;

  const dueToday: ReviewCard[] = [];
  const backlog: ReviewCard[] = [];
  const fresh: ReviewCard[] = [];

  for (const card of cards) {
    if (card.retiredOn) continue;

    if (card.fsrs.state === State.New) {
      fresh.push(card);
      continue;
    }

    const overdue = daysBetween(card.dueOn, today);
    if (overdue < 0) continue;
    if (overdue === 0) dueToday.push(card);
    else backlog.push(card);
  }

  const urgency = byUrgency(today);
  dueToday.sort(urgency);
  backlog.sort(urgency);

  const reviews = dueToday.slice(0, REVIEW_CARDS_PER_DAY);
  const room = REVIEW_CARDS_PER_DAY - reviews.length;
  const backlogAllowance = recovering ? Math.min(room, RECOVERY_EXTRA_PER_DAY) : room;
  const fromBacklog = backlog.slice(0, Math.max(0, backlogAllowance));
  reviews.push(...fromBacklog);

  // New cards yield to reviews, and stop entirely while a backlog is draining:
  // learning new phrases before holding on to the old ones only grows the pile.
  let newRoom = Math.min(NEW_CARDS_PER_DAY, DAILY_CARD_CAP - reviews.length);
  if (recovering && backlog.length > fromBacklog.length) newRoom = 0;

  return {
    reviews,
    newCards: fresh.slice(0, Math.max(0, newRoom)),
    deferred: dueToday.length + backlog.length - reviews.length,
    recovering,
  };
}

function byUrgency(today: string) {
  return (a: ReviewCard, b: ReviewCard): number => {
    const failures = b.consecutiveFailures - a.consecutiveFailures;
    if (failures !== 0) return failures;
    return daysBetween(b.dueOn, today) - daysBetween(a.dueOn, today);
  };
}

/** 0–5, for display only; it never feeds back into scheduling. */
export function masteryOf(card: ReviewCard): number {
  if (card.retiredOn) return 5;
  if (card.consecutiveFailures > 0) return 0;
  if (card.fsrs.lapses >= 6) return 1;

  const stability = card.fsrs.stability;
  if (stability >= 21) return 4;
  if (stability >= 7) return 3;
  if (stability >= 2) return 2;
  return card.fsrs.reps > 0 ? 1 : 0;
}
