/**
 * Stored shapes.
 *
 * The rule from curriculum §13.1: every learning record carries an `accountId`.
 * The content library is the only store without one, because it is identical
 * for both learners and read-only at runtime.
 */

/** Fixed at install time — there is no sign-up, so these never change. */
export type AccountId = "acc1" | "acc2";

export type Account = {
  id: AccountId;
  /** Shown on the picker tile. */
  displayName: string;
  /** Single character in the avatar circle. */
  initial: string;
};

/** Which of the three completion tiers a day reached (curriculum §10.2). */
export type SessionTier = "full" | "short" | "minimal";

/** One calendar day of study for one account. */
export type DayRecord = {
  accountId: AccountId;
  /** Local calendar day, `YYYY-MM-DD`. */
  day: string;
  tier: SessionTier;
  /** Wall-clock minutes actually spent, for the weekly report. */
  minutes: number;
  completedAt: number;
};

/** Everything the streak engine needs to answer "what is my streak today?". */
export type StreakState = {
  accountId: AccountId;
  current: number;
  /** Kept forever, even after a streak is lost (curriculum §10.3). */
  best: number;
  /** Last day counted toward the streak, `YYYY-MM-DD`. */
  lastCountedDay: string | null;
  /** Freeze days left this month; refilled to 2 on the 1st. */
  freezesLeft: number;
  /** `YYYY-MM` the freeze allowance was last refilled for. */
  freezeMonth: string | null;
  /** Days silently covered by a freeze, newest last. */
  frozenDays: string[];
  /** `YYYY-MM` in which the once-a-month streak repair was used. */
  repairUsedMonth: string | null;
  /**
   * Set when a streak breaks, so the UI can offer a repair: two full sessions
   * within three days restore it (curriculum §10.4).
   */
  brokenAt: {
    /** The day the break was detected. */
    day: string;
    /** What the streak was worth, so a repair can hand it back. */
    streak: number;
    /** Days with a full session since the break, for repair progress. */
    repairDays: string[];
  } | null;
};

export type AccountProfile = {
  accountId: AccountId;
  /** Null until the placement test is taken (curriculum §4). */
  track: "A" | "B" | "C" | "D" | null;
  placementScore: number | null;
  /** Set once the learner finishes onboarding. */
  startedOn: string | null;
  /** Playback rate for listening drills; raised as the ear improves. */
  audioRate: number;
  /** Larger default for the older learner. */
  textScale: "normal" | "large";
};

export type StoreName = "days" | "streaks" | "profiles";
