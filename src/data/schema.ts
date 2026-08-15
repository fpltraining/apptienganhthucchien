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
  /**
   * Listening judged on its own. When it lags `track` it governs the listening
   * ladder instead, which is the whole point of §4.4.
   */
  listeningTrack: "A" | "B" | "C" | "D" | null;
  placementScore: number | null;
  /** Where in the 26 weeks this learner is: from placement, then progress. */
  currentWeek: number;
  /**
   * Set once the course is finished (§7). From here the app stops handing out
   * new weeks and switches to keeping what was learned.
   *
   * Optional: nobody who started before this existed has graduated yet.
   */
  graduatedOn?: string | null;
  /**
   * A checkpoint owed but not yet taken (§6).
   *
   * Stored rather than derived from the week number because the learner must
   * be able to close the app mid-test and be offered it again, and because
   * after a fail the same week comes round twice.
   *
   * Optional: profiles written before checkpoints existed simply owe none.
   */
  pendingCheckpoint?: "A" | "B" | "C" | null;
  /**
   * Sessions completed toward the current week; five opens the next one
   * (§10.4). Optional because profiles stored before week progression existed
   * do not have it — those learners start the count from zero rather than
   * needing a migration.
   */
  sessionsThisWeek?: number;
  /** Set once the learner finishes onboarding. */
  startedOn: string | null;
  /** Playback rate for listening drills; raised as the ear improves. */
  audioRate: number;
  /** Larger default for the older learner. */
  textScale: "normal" | "large";
};

/**
 * A word this learner keeps failing to get across (§9.2), kept between
 * sessions so the app can tell a bad take from a habit.
 */
export type StoredTroubleWord = {
  accountId: AccountId;
  word: string;
  misses: number;
  lastMissedDay: string;
};

export type StoreName = "days" | "streaks" | "profiles";
