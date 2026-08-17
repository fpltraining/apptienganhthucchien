import { describe, expect, it } from "vitest";
import {
  createStreakState,
  recordSession,
  settle,
  weeklyProgress,
  FREEZES_PER_MONTH,
} from "./streak";
import type { StreakState } from "../data/schema";

function study(state: StreakState, day: string, tier: "full" | "short" | "minimal" = "full") {
  return recordSession(state, day, tier).state;
}

describe("recordSession", () => {
  it("starts a streak on the first session", () => {
    const { state, events } = recordSession(createStreakState("acc1"), "2026-03-02", "full");
    expect(state.current).toBe(1);
    expect(state.best).toBe(1);
    expect(events).toContainEqual({ type: "started", streak: 1 });
  });

  it("extends across consecutive days", () => {
    let state = createStreakState("acc1");
    for (const day of ["2026-03-02", "2026-03-03", "2026-03-04"]) {
      state = study(state, day);
    }
    expect(state.current).toBe(3);
  });

  it("counts every completion tier, including the 5-minute one", () => {
    let state = study(createStreakState("acc1"), "2026-03-02", "full");
    state = study(state, "2026-03-03", "minimal");
    state = study(state, "2026-03-04", "short");
    expect(state.current).toBe(3);
  });

  it("does not double-count two sessions on the same day", () => {
    let state = study(createStreakState("acc1"), "2026-03-02", "short");
    state = study(state, "2026-03-02", "full");
    expect(state.current).toBe(1);
  });

  it("keeps the personal record after a streak is lost", () => {
    let state = createStreakState("acc1");
    for (let i = 0; i < 5; i++) state = study(state, `2026-03-0${i + 1}`);
    expect(state.best).toBe(5);

    // Long enough to exhaust both freezes and break the chain.
    state = settle(state, "2026-03-20").state;
    expect(state.current).toBe(0);
    expect(state.best).toBe(5);
  });
});

describe("freezes", () => {
  it("absorbs a single missed day without breaking the streak", () => {
    let state = study(createStreakState("acc1"), "2026-03-02");
    state = study(state, "2026-03-03");

    // Missed the 4th, back on the 5th.
    const settled = settle(state, "2026-03-05");
    expect(settled.state.current).toBe(2);
    expect(settled.state.freezesLeft).toBe(FREEZES_PER_MONTH - 1);
    expect(settled.events).toContainEqual({
      type: "frozen",
      days: ["2026-03-04"],
      freezesLeft: 1,
    });

    const resumed = study(settled.state, "2026-03-05");
    expect(resumed.current).toBe(3);
  });

  it("breaks the streak once the monthly freezes are spent", () => {
    let state = study(createStreakState("acc1"), "2026-03-02");

    // Missing the 3rd, 4th and 5th costs two freezes and then breaks.
    const { state: after, events } = settle(state, "2026-03-06");
    expect(after.current).toBe(0);
    expect(events).toContainEqual({ type: "broken", lostStreak: 1 });
    expect(after.brokenAt?.streak).toBe(1);
  });

  it("does not spend a freeze twice for the same missed day", () => {
    let state = study(createStreakState("acc1"), "2026-03-02");
    const first = settle(state, "2026-03-04").state;
    expect(first.freezesLeft).toBe(1);

    // Re-settling the same gap must be a no-op.
    const second = settle(first, "2026-03-04").state;
    expect(second.freezesLeft).toBe(1);
    expect(second.current).toBe(1);
  });

  it("refills the allowance in a new month and does not carry it over", () => {
    let state = study(createStreakState("acc1"), "2026-03-30");
    state = settle(state, "2026-04-01").state; // burns one freeze on 03-31
    expect(state.freezesLeft).toBe(FREEZES_PER_MONTH);
    expect(state.freezeMonth).toBe("2026-04");
  });
});

describe("streak repair", () => {
  it("restores the streak after two full sessions inside the window", () => {
    let state = createStreakState("acc1");
    for (let i = 1; i <= 9; i++) state = study(state, `2026-03-0${i}`);
    expect(state.current).toBe(9);

    state = settle(state, "2026-03-20").state;
    expect(state.current).toBe(0);

    const first = recordSession(state, "2026-03-20", "full");
    expect(first.state.current).toBe(1);

    const second = recordSession(first.state, "2026-03-21", "full");
    expect(second.events).toContainEqual({ type: "repaired", streak: 11 });
    expect(second.state.current).toBe(11);
    expect(second.state.brokenAt).toBeNull();
  });

  it("refuses a second repair in the same month", () => {
    let state = createStreakState("acc1");
    state = { ...state, repairUsedMonth: "2026-03" };
    state = study(state, "2026-03-02");
    state = settle(state, "2026-03-10").state;
    expect(state.current).toBe(0);

    let repaired = recordSession(state, "2026-03-10", "full").state;
    repaired = recordSession(repaired, "2026-03-11", "full").state;
    // Two ordinary days, not a restored streak.
    expect(repaired.current).toBe(2);
  });

  it("does not repair from short or minimal sessions", () => {
    let state = study(createStreakState("acc1"), "2026-03-02");
    state = settle(state, "2026-03-10").state;

    let after = recordSession(state, "2026-03-10", "minimal").state;
    after = recordSession(after, "2026-03-11", "short").state;
    expect(after.current).toBe(2);
  });
});

describe("weeklyProgress", () => {
  it("is met at five days out of seven", () => {
    const days = ["2026-03-02", "2026-03-03", "2026-03-05", "2026-03-06", "2026-03-07"];
    expect(weeklyProgress(days, "2026-03-02")).toEqual({ done: 5, goal: 5, met: true });
  });

  it("ignores days outside the week", () => {
    const days = ["2026-03-01", "2026-03-02", "2026-03-09"];
    expect(weeklyProgress(days, "2026-03-02").done).toBe(1);
  });
});
