/**
 * Moving through the 26 weeks (curriculum §7, §10.4).
 *
 * The rule is five completed sessions per curriculum week, then move on. Two
 * things about that are deliberate:
 *
 *  - It counts **sessions, not calendar weeks**. Someone who studies five times
 *    over ten days advances exactly like someone who does it in five. Tying
 *    progress to the calendar would punish the learner §10 spends its whole
 *    length trying not to punish — and it would silently skip a week's content
 *    for anyone who missed a few days, which is the opposite of what they need.
 *
 *  - Every tier counts, the same way the streak counts them (§10.2). A minimal
 *    session is a smaller amount of work, not a failed attempt, and a learner
 *    who only ever manages the short version still gets to see week 12.
 *
 * At week 26 progression stops and the learner stays there. §giai đoạn 3 ends
 * with "kế hoạch duy trì sau khoá" — maintenance — and repeating the hardest
 * material is a truer maintenance than looping back to greetings.
 */

import { checkpointAfter } from "./checkpoint";
import type { CheckpointKind } from "./checkpoint";

/** Sessions to complete before the next week's content opens (§10.4). */
export const SESSIONS_PER_WEEK = 5;

/** The last week the curriculum defines. */
export const FINAL_WEEK = 26;

export type Progress = {
  /** Which of the 26 weeks the learner is on. */
  currentWeek: number;
  /** Sessions completed toward the current week. */
  sessionsThisWeek: number;
};

export type Advance = Progress & {
  /** True on the session that moved them up a week, for the summary screen. */
  advanced: boolean;
  /**
   * Set when finishing this week closes a phase, so the checkpoint is offered
   * before the next week's content opens (§6).
   */
  checkpointDue: CheckpointKind | null;
};

/**
 * Records one completed session and moves the learner on when it is time.
 *
 * `alreadyStudiedToday` exists because §10.2 lets a learner come back later the
 * same day and upgrade a short session to a full one. That is one session's
 * worth of progress, not two, so the second visit must not count again — the
 * same idempotency the streak already has.
 */
export function recordSessionForWeek(
  progress: Progress,
  options: { alreadyStudiedToday: boolean } = { alreadyStudiedToday: false },
): Advance {
  const week = clampWeek(progress.currentWeek);

  if (options.alreadyStudiedToday) {
    return {
      currentWeek: week,
      sessionsThisWeek: progress.sessionsThisWeek,
      advanced: false,
      checkpointDue: null,
    };
  }

  const sessions = progress.sessionsThisWeek + 1;

  if (sessions < SESSIONS_PER_WEEK) {
    return { currentWeek: week, sessionsThisWeek: sessions, advanced: false, checkpointDue: null };
  }

  if (week >= FINAL_WEEK) {
    // Finished the course. Hold at the final week and let the counter sit at
    // the target rather than rolling over to zero, so the screen does not
    // suggest there is a week 27 to work toward.
    return {
      currentWeek: FINAL_WEEK,
      sessionsThisWeek: SESSIONS_PER_WEEK,
      advanced: false,
      // Finishing week 26 still owes Test C, which is the point of week 26.
      checkpointDue: checkpointAfter(FINAL_WEEK)?.kind ?? null,
    };
  }

  return {
    currentWeek: week + 1,
    sessionsThisWeek: 0,
    advanced: true,
    checkpointDue: checkpointAfter(week)?.kind ?? null,
  };
}

function clampWeek(week: number): number {
  if (!Number.isFinite(week) || week < 1) return 1;
  return Math.min(Math.floor(week), FINAL_WEEK);
}

/** Whether the learner has reached the end of the written curriculum. */
export function hasFinishedCourse(progress: Progress): boolean {
  return (
    progress.currentWeek >= FINAL_WEEK && progress.sessionsThisWeek >= SESSIONS_PER_WEEK
  );
}
