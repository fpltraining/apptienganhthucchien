/**
 * The only module the UI talks to for stored state.
 *
 * Keeping persistence and streak arithmetic behind one door means the isolation
 * rule from §13.1 has a single place to hold: every function here takes an
 * `accountId` and passes it to every store it touches.
 */

import type { AccountId, AccountProfile, SessionTier, StreakState } from "./schema";
import {
  getCards,
  getDay,
  getDaysBetween,
  getProfile,
  getStreak,
  putCards,
  putDay,
  putProfile,
  putStreak,
  getTroubleWords,
  putTroubleWords,
} from "./db";
import { createCard } from "../domain/srs";
import type { ReviewCard } from "../domain/srs";
import { getWeek } from "../content";
import { addDays, toDayKey } from "../domain/dates";
import { createStreakState, recordSession, settle, weeklyProgress } from "../domain/streak";
import { recordSessionForWeek } from "../domain/progression";
import { mergeTroubleWords, soundsToPractise } from "../domain/pronunciation";
import type { StreakEvent } from "../domain/streak";

export type AccountSummary = {
  streak: StreakState;
  profile: AccountProfile;
  /** Whether a session has already been completed today. */
  studiedToday: boolean;
  /** Days studied in the trailing week, for the weekly goal. */
  week: {
    done: number;
    goal: number;
    met: boolean;
    /**
     * The trailing seven days, oldest first, so the home screen can draw a real
     * week rather than a count. A rest day is neither studied nor missed and is
     * drawn as neither (§10.3).
     */
    pattern: ("done" | "rest" | "none")[];
  };
};

function createProfile(accountId: AccountId): AccountProfile {
  return {
    accountId,
    track: null,
    listeningTrack: null,
    placementScore: null,
    currentWeek: 1,
    sessionsThisWeek: 0,
    startedOn: null,
    // 0.85x is the listening speed phase 1 starts at (curriculum §5.2).
    audioRate: 0.85,
    // Account 1 is the older learner; larger type is the better default there.
    textScale: accountId === "acc1" ? "large" : "normal",
  };
}

/**
 * Loads an account and brings its streak up to date.
 *
 * Settling on read is what lets freezes work while the app is closed: time
 * passes whether or not anything is running, so the reconciliation happens at
 * the first moment we can observe it.
 */
export async function loadAccount(
  accountId: AccountId,
  now = new Date(),
): Promise<{ summary: AccountSummary; events: StreakEvent[] }> {
  const today = toDayKey(now);

  const [storedStreak, storedProfile, todayRecord] = await Promise.all([
    getStreak(accountId),
    getProfile(accountId),
    getDay(accountId, today),
  ]);

  const settled = settle(storedStreak ?? createStreakState(accountId), today);
  if (!storedStreak || settled.state !== storedStreak) {
    await putStreak(settled.state);
  }

  const profile = storedProfile ?? createProfile(accountId);
  if (!storedProfile) await putProfile(profile);

  const weekStart = addDays(today, -6);
  const recentDays = await getDaysBetween(accountId, weekStart, today);

  return {
    summary: {
      streak: settled.state,
      profile,
      studiedToday: todayRecord !== undefined,
      week: {
        ...weeklyProgress(
          recentDays.map((record) => record.day),
          weekStart,
        ),
        pattern: weekPattern(
          new Set(recentDays.map((record) => record.day)),
          new Set(settled.state.frozenDays),
          weekStart,
        ),
      },
    },
    events: settled.events,
  };
}

/**
 * Marks today's session complete.
 *
 * Idempotent by day: finishing a short session and later returning for a full
 * one upgrades the record and adds the minutes, but never counts twice toward
 * the streak.
 */
export async function completeSession(
  accountId: AccountId,
  tier: SessionTier,
  minutes: number,
  now = new Date(),
): Promise<{ streak: StreakState; events: StreakEvent[]; advancedToWeek: number | null }> {
  const today = toDayKey(now);
  const existing = await getDay(accountId, today);

  const rank: Record<SessionTier, number> = { minimal: 0, short: 1, full: 2 };
  const bestTier =
    existing && rank[existing.tier] > rank[tier] ? existing.tier : tier;

  await putDay({
    accountId,
    day: today,
    tier: bestTier,
    minutes: (existing?.minutes ?? 0) + minutes,
    completedAt: now.getTime(),
  });

  const current = (await getStreak(accountId)) ?? createStreakState(accountId);
  const { state, events } = recordSession(current, today, tier);
  await putStreak(state);

  // Week progression rides on the same idempotency as the streak: coming back
  // later the same day to upgrade a short session is one session's progress.
  const profile = (await getProfile(accountId)) ?? createProfile(accountId);
  const advance = recordSessionForWeek(
    {
      currentWeek: profile.currentWeek,
      sessionsThisWeek: profile.sessionsThisWeek ?? 0,
    },
    { alreadyStudiedToday: existing !== undefined },
  );
  await putProfile({
    ...profile,
    currentWeek: advance.currentWeek,
    sessionsThisWeek: advance.sessionsThisWeek,
  });

  return {
    streak: state,
    events,
    advancedToWeek: advance.advanced ? advance.currentWeek : null,
  };
}

/**
 * The trailing seven days as states, oldest first.
 *
 * Studied wins over frozen: a day can be both if a freeze was applied and the
 * learner then came back to it, and having actually studied is the truer thing
 * to show them.
 */
function weekPattern(
  studied: ReadonlySet<string>,
  frozen: ReadonlySet<string>,
  weekStart: string,
): ("done" | "rest" | "none")[] {
  const days: ("done" | "rest" | "none")[] = [];
  for (let offset = 0; offset < 7; offset++) {
    const day = addDays(weekStart, offset);
    if (studied.has(day)) days.push("done");
    else if (frozen.has(day)) days.push("rest");
    else days.push("none");
  }
  return days;
}

export async function saveProfile(profile: AccountProfile): Promise<void> {
  await putProfile(profile);
}


// --- vocabulary deck --------------------------------------------------------

/**
 * The account's deck, with cards created for any week-`week` phrase it does not
 * have yet.
 *
 * Creating on read rather than up front means adding content to a week never
 * requires a migration: the next session simply finds the new phrases and makes
 * cards for them.
 */
export async function loadDeck(
  accountId: AccountId,
  week: number,
  now = new Date(),
): Promise<ReviewCard[]> {
  const existing = await getCards(accountId);
  const seen = new Set(existing.map((card) => `${card.itemId}:${card.direction}`));

  const created: ReviewCard[] = [];
  for (const item of getWeek(week).vocabulary) {
    for (const direction of ["recognition", "production"] as const) {
      if (seen.has(`${item.id}:${direction}`)) continue;
      created.push(createCard(accountId, item.id, direction, now));
    }
  }

  if (created.length > 0) await putCards(created);
  return [...existing, ...created];
}

/**
 * Folds a session's missed words into what this account already knew, and
 * returns the sounds worth naming (§9.2).
 *
 * Done here rather than in the session runner so the merge, the ageing-out and
 * the write are one step: a session that ended halfway through that would
 * leave the list in a state no rule produced.
 */
export async function recordTroubleWords(
  accountId: AccountId,
  missed: readonly string[],
  now = new Date(),
): Promise<string[]> {
  const today = toDayKey(now);
  const known = await getTroubleWords(accountId);

  const merged = mergeTroubleWords(
    known.map(({ word, misses, lastMissedDay }) => ({ word, misses, lastMissedDay })),
    missed,
    today,
  );

  await putTroubleWords(
    accountId,
    merged.map((record) => ({ accountId, ...record })),
  );

  return soundsToPractise(merged);
}

export async function saveCards(cards: readonly ReviewCard[]): Promise<void> {
  await putCards(cards);
}
