import { describe, expect, it } from "vitest";
import {
  FINAL_WEEK,
  SESSIONS_PER_WEEK,
  hasFinishedCourse,
  recordSessionForWeek,
} from "./progression";

const start = { currentWeek: 1, sessionsThisWeek: 0 };

describe("recordSessionForWeek", () => {
  it("counts a session toward the current week", () => {
    expect(recordSessionForWeek(start)).toEqual({
      currentWeek: 1,
      sessionsThisWeek: 1,
      advanced: false,
    });
  });

  it("moves up a week on the fifth session", () => {
    let progress = start;
    for (let session = 0; session < SESSIONS_PER_WEEK - 1; session++) {
      progress = recordSessionForWeek(progress);
      expect(progress.currentWeek).toBe(1);
    }

    const fifth = recordSessionForWeek(progress);
    expect(fifth).toEqual({ currentWeek: 2, sessionsThisWeek: 0, advanced: true });
  });

  it("does not care how long the five sessions took", () => {
    // Five sessions over a month advance exactly like five over five days.
    // Tying this to the calendar would skip content for anyone who missed days
    // — the learners who least need content skipped.
    let progress = start;
    for (let session = 0; session < SESSIONS_PER_WEEK; session++) {
      progress = recordSessionForWeek(progress);
    }
    expect(progress.currentWeek).toBe(2);
  });

  it("does not count a second session on a day already studied", () => {
    // §10.2 lets a short session be upgraded to a full one later the same day.
    // That is one session's progress, not two.
    const first = recordSessionForWeek(start);
    const again = recordSessionForWeek(first, { alreadyStudiedToday: true });
    expect(again.sessionsThisWeek).toBe(first.sessionsThisWeek);
    expect(again.advanced).toBe(false);
  });

  it("holds at the final week instead of running off the end", () => {
    const last = { currentWeek: FINAL_WEEK, sessionsThisWeek: SESSIONS_PER_WEEK - 1 };
    const done = recordSessionForWeek(last);

    expect(done.currentWeek).toBe(FINAL_WEEK);
    expect(done.advanced).toBe(false);
    // The counter stays at the target rather than rolling to zero, so the
    // screen does not imply there is a week 27 to work toward.
    expect(done.sessionsThisWeek).toBe(SESSIONS_PER_WEEK);

    expect(recordSessionForWeek(done).currentWeek).toBe(FINAL_WEEK);
  });

  it("repairs a week number that got out of range", () => {
    // Stored data from an older build, or a placement track pointing past the
    // written content, must not put the learner on a week that does not exist.
    expect(recordSessionForWeek({ currentWeek: 0, sessionsThisWeek: 0 }).currentWeek).toBe(1);
    expect(recordSessionForWeek({ currentWeek: 99, sessionsThisWeek: 0 }).currentWeek).toBe(
      FINAL_WEEK,
    );
  });
});

describe("hasFinishedCourse", () => {
  it("is true only at the end of week 26", () => {
    expect(hasFinishedCourse({ currentWeek: 26, sessionsThisWeek: 5 })).toBe(true);
    expect(hasFinishedCourse({ currentWeek: 26, sessionsThisWeek: 4 })).toBe(false);
    expect(hasFinishedCourse({ currentWeek: 25, sessionsThisWeek: 5 })).toBe(false);
  });
});
