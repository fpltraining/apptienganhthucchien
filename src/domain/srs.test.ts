import { describe, expect, it } from "vitest";
import { Rating, State } from "ts-fsrs";
import {
  buildDailyQueue,
  createCard,
  gradeAttempt,
  masteryOf,
  reviewCard,
  DAILY_CARD_CAP,
  NEW_CARDS_PER_DAY,
  RECOVERY_EXTRA_PER_DAY,
  REVIEW_CARDS_PER_DAY,
} from "./srs";
import type { Attempt, CardDirection, ReviewCard } from "./srs";
import { daysBetween, toDayKey } from "./dates";

const MON = new Date(2026, 2, 2, 20, 0, 0); // 2 March 2026, 8pm local

function attempt(overrides: Partial<Attempt> = {}): Attempt {
  return { spoken: true, latencyMs: 2000, pronunciationScore: 80, ...overrides };
}

function card(direction: CardDirection = "recognition"): ReviewCard {
  return createCard("acc1", "item-1", direction, MON);
}

/** Drives a card through several successful reviews to get it out of learning. */
function mature(start: ReviewCard, reviews: number): ReviewCard {
  let current = start;
  let when = MON;
  for (let i = 0; i < reviews; i++) {
    current = reviewCard(current, attempt({ latencyMs: 1200, pronunciationScore: 90 }), when).card;
    when = new Date(current.fsrs.due.getTime() + 60_000);
  }
  return current;
}

describe("gradeAttempt", () => {
  // Thresholds are the table in curriculum §8.3.
  it("fails when nothing was said", () => {
    expect(gradeAttempt(attempt({ spoken: false }))).toBe(Rating.Again);
  });

  it("fails past eight seconds", () => {
    expect(gradeAttempt(attempt({ latencyMs: 9000, pronunciationScore: 95 }))).toBe(Rating.Again);
  });

  it("fails on poor pronunciation even when the answer was fast", () => {
    // Saying it quickly in a way nobody understands is not knowing it.
    expect(gradeAttempt(attempt({ latencyMs: 700, pronunciationScore: 45 }))).toBe(Rating.Again);
  });

  it("awards Easy only when fast and well pronounced", () => {
    expect(gradeAttempt(attempt({ latencyMs: 1200, pronunciationScore: 92 }))).toBe(Rating.Easy);
  });

  it("never awards Easy for an attempt that was not scored", () => {
    // Offline attempts are queued for scoring later (§12.7); we cannot award
    // full marks for speech we have not heard.
    expect(gradeAttempt(attempt({ latencyMs: 900, pronunciationScore: null }))).toBe(Rating.Good);
  });

  it("drops to Hard when slow but understandable", () => {
    expect(gradeAttempt(attempt({ latencyMs: 5000, pronunciationScore: 80 }))).toBe(Rating.Hard);
  });
});

describe("reviewCard", () => {
  it("schedules a first review ahead of today", () => {
    const { card: next } = reviewCard(card(), attempt(), MON);
    expect(next.fsrs.state).not.toBe(State.New);
    expect(next.fsrs.due.getTime()).toBeGreaterThan(MON.getTime());
  });

  it("brings production cards back sooner than recognition cards", () => {
    const recognition = mature(card("recognition"), 4);
    const production = mature(card("production"), 4);

    const recognitionGap = daysBetween(toDayKey(recognition.fsrs.last_review!), recognition.dueOn);
    const productionGap = daysBetween(toDayKey(production.fsrs.last_review!), production.dueOn);

    expect(productionGap).toBeLessThan(recognitionGap);
  });

  it("counts consecutive failures and clears them on a pass", () => {
    let current = reviewCard(card(), attempt({ spoken: false }), MON).card;
    expect(current.consecutiveFailures).toBe(1);

    current = reviewCard(current, attempt({ spoken: false }), MON).card;
    expect(current.consecutiveFailures).toBe(2);

    current = reviewCard(current, attempt(), MON).card;
    expect(current.consecutiveFailures).toBe(0);
  });

  it("pins a repeatedly failed word to the next day", () => {
    // "A word you always get wrong comes back more often" outranks whatever
    // interval the scheduler computes.
    const matured = mature(card(), 5);
    const when = new Date(matured.fsrs.due.getTime() + 60_000);

    let current = reviewCard(matured, attempt({ spoken: false }), when).card;
    current = reviewCard(current, attempt({ spoken: false }), when).card;

    expect(current.consecutiveFailures).toBeGreaterThanOrEqual(2);
    expect(daysBetween(toDayKey(when), current.dueOn)).toBe(1);
  });

  it("retires a card that stays fast at a long interval", () => {
    const current = mature(card(), 12);
    expect(current.retiredOn).not.toBeNull();
  });

  it("does not retire a card that is still slow", () => {
    let current = card();
    let when = MON;
    for (let i = 0; i < 12; i++) {
      current = reviewCard(current, attempt({ latencyMs: 3000 }), when).card;
      when = new Date(current.fsrs.due.getTime() + 60_000);
    }
    expect(current.retiredOn).toBeNull();
  });
});

describe("buildDailyQueue", () => {
  function due(id: string, dueOn: string, consecutiveFailures = 0): ReviewCard {
    const base = mature(createCard("acc1", id, "recognition", MON), 3);
    return { ...base, itemId: id, dueOn, consecutiveFailures };
  }

  function fresh(id: string): ReviewCard {
    return createCard("acc1", id, "recognition", MON);
  }

  it("holds the daily caps", () => {
    const cards = [
      ...Array.from({ length: 40 }, (_, i) => due(`due-${i}`, "2026-03-02")),
      ...Array.from({ length: 20 }, (_, i) => fresh(`new-${i}`)),
    ];

    const queue = buildDailyQueue(cards, { today: "2026-03-02", lastStudyDay: "2026-03-01" });

    expect(queue.reviews).toHaveLength(REVIEW_CARDS_PER_DAY);
    expect(queue.newCards).toHaveLength(NEW_CARDS_PER_DAY);
    expect(queue.reviews.length + queue.newCards.length).toBeLessThanOrEqual(DAILY_CARD_CAP);
    expect(queue.deferred).toBe(20);
  });

  it("puts struggling words ahead of long-overdue ones", () => {
    const cards = [
      due("old", "2026-01-01", 0),
      due("struggling", "2026-03-01", 3),
    ];

    const queue = buildDailyQueue(cards, { today: "2026-03-02", lastStudyDay: "2026-03-01" });
    expect(queue.reviews[0]?.itemId).toBe("struggling");
  });

  it("releases a backlog gradually after a long break", () => {
    // Twelve days away with 200 cards waiting: showing all of them is the most
    // common reason people quit an SRS, so recovery caps the release (§8.3).
    const cards = Array.from({ length: 200 }, (_, i) => due(`old-${i}`, "2026-02-18"));

    const queue = buildDailyQueue(cards, { today: "2026-03-02", lastStudyDay: "2026-02-18" });

    expect(queue.recovering).toBe(true);
    expect(queue.reviews).toHaveLength(RECOVERY_EXTRA_PER_DAY);
    expect(queue.deferred).toBe(200 - RECOVERY_EXTRA_PER_DAY);
  });

  it("pauses new cards while a backlog is draining", () => {
    const cards = [
      ...Array.from({ length: 100 }, (_, i) => due(`old-${i}`, "2026-02-18")),
      ...Array.from({ length: 10 }, (_, i) => fresh(`new-${i}`)),
    ];

    const queue = buildDailyQueue(cards, { today: "2026-03-02", lastStudyDay: "2026-02-18" });
    expect(queue.newCards).toHaveLength(0);
  });

  it("does not enter recovery for a short gap", () => {
    const cards = Array.from({ length: 30 }, (_, i) => due(`old-${i}`, "2026-02-28"));

    const queue = buildDailyQueue(cards, { today: "2026-03-02", lastStudyDay: "2026-03-01" });
    expect(queue.recovering).toBe(false);
    expect(queue.reviews).toHaveLength(REVIEW_CARDS_PER_DAY);
  });

  it("skips cards that are not due yet and cards already retired", () => {
    const cards = [
      due("future", "2026-03-10"),
      { ...due("retired", "2026-03-01"), retiredOn: "2026-02-01" },
      due("today", "2026-03-02"),
    ];

    const queue = buildDailyQueue(cards, { today: "2026-03-02", lastStudyDay: "2026-03-01" });
    expect(queue.reviews).toHaveLength(1);
    expect(queue.reviews[0]?.itemId).toBe("today");
  });

  it("treats the two directions of one phrase as separate cards", () => {
    // §8.3 — recognition and production are different memories and are
    // scheduled independently.
    const recognition = { ...due("phrase", "2026-03-02"), direction: "recognition" as const };
    const production = {
      ...due("phrase", "2026-03-20"),
      direction: "production" as const,
    };

    const queue = buildDailyQueue([recognition, production], {
      today: "2026-03-02",
      lastStudyDay: "2026-03-01",
    });

    expect(queue.reviews).toHaveLength(1);
    expect(queue.reviews[0]?.direction).toBe("recognition");
  });
});

describe("masteryOf", () => {
  it("reports zero while a card is failing", () => {
    const failing = { ...card(), consecutiveFailures: 2 };
    expect(masteryOf(failing)).toBe(0);
  });

  it("reports full mastery once retired", () => {
    expect(masteryOf({ ...card(), retiredOn: "2026-03-02" })).toBe(5);
  });

  it("rises as the card stabilises", () => {
    const early = masteryOf(mature(card(), 1));
    const later = masteryOf(mature(card(), 6));
    expect(later).toBeGreaterThan(early);
  });
});
