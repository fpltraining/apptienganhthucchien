import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";
import { completeSession, loadAccount } from "./repository";
import { getDaysBetween, resetDbForTests } from "./db";

beforeEach(async () => {
  resetDbForTests();
  await new Promise<void>((resolve) => {
    const request = indexedDB.deleteDatabase("tiengannh");
    request.onsuccess = () => resolve();
    request.onerror = () => resolve();
    request.onblocked = () => resolve();
  });
});

const MON = new Date(2026, 2, 2); // 2 March 2026, local time
const TUE = new Date(2026, 2, 3);

describe("account isolation", () => {
  // The rule this protects is curriculum §13.1: no learning record is shared
  // between the two accounts, so one learner's activity can never move the
  // other's numbers.
  it("keeps streaks separate", async () => {
    await completeSession("acc1", "full", 45, MON);

    const first = await loadAccount("acc1", MON);
    const second = await loadAccount("acc2", MON);

    expect(first.summary.streak.current).toBe(1);
    expect(second.summary.streak.current).toBe(0);
    expect(second.summary.studiedToday).toBe(false);
  });

  it("keeps day records separate", async () => {
    await completeSession("acc1", "full", 45, MON);
    await completeSession("acc2", "minimal", 5, MON);

    const acc1Days = await getDaysBetween("acc1", "2026-03-01", "2026-03-31");
    const acc2Days = await getDaysBetween("acc2", "2026-03-01", "2026-03-31");

    expect(acc1Days).toHaveLength(1);
    expect(acc2Days).toHaveLength(1);
    expect(acc1Days[0]?.tier).toBe("full");
    expect(acc2Days[0]?.tier).toBe("minimal");
  });

  it("gives each account its own profile defaults", async () => {
    const { summary: older } = await loadAccount("acc1", MON);
    const { summary: owner } = await loadAccount("acc2", MON);

    expect(older.profile.textScale).toBe("large");
    expect(owner.profile.textScale).toBe("normal");
  });
});

describe("completeSession", () => {
  it("counts one streak day however many sessions a day holds", async () => {
    await completeSession("acc1", "short", 15, MON);
    const { streak } = await completeSession("acc1", "full", 45, MON);

    expect(streak.current).toBe(1);
  });

  it("accumulates minutes and keeps the highest tier reached", async () => {
    await completeSession("acc1", "minimal", 5, MON);
    await completeSession("acc1", "full", 45, MON);

    const days = await getDaysBetween("acc1", "2026-03-02", "2026-03-02");
    expect(days[0]?.minutes).toBe(50);
    expect(days[0]?.tier).toBe("full");
  });

  it("extends the streak across consecutive days", async () => {
    await completeSession("acc1", "full", 45, MON);
    const { streak } = await completeSession("acc1", "short", 15, TUE);

    expect(streak.current).toBe(2);
  });

  it("reports the week's progress toward the 5-of-7 goal", async () => {
    await completeSession("acc1", "full", 45, MON);
    await completeSession("acc1", "full", 45, TUE);

    const { summary } = await loadAccount("acc1", TUE);
    expect(summary.week).toEqual({ done: 2, goal: 5, met: false });
  });
});
