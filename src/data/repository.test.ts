import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";
import { completeSession, loadAccount, recordTroubleWords } from "./repository";
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
    expect(summary.week).toMatchObject({ done: 2, goal: 5, met: false });
  });

  it("reports which days of the trailing week were studied", async () => {
    // The home screen draws a real week of pips from this, so the shape has to
    // be the actual days rather than a count spread evenly.
    await completeSession("acc1", "full", 45, MON);
    await completeSession("acc1", "full", 45, TUE);

    const { summary } = await loadAccount("acc1", TUE);
    expect(summary.week.pattern).toHaveLength(7);
    // The window is the trailing seven days ending today, so the two studied
    // days are the last two.
    expect(summary.week.pattern.slice(-2)).toEqual(["done", "done"]);
    expect(summary.week.pattern.slice(0, 5)).toEqual([
      "none",
      "none",
      "none",
      "none",
      "none",
    ]);
  });
});

describe("week progression", () => {
  const day = (offset: number) => new Date(2026, 2, 2 + offset);

  it("opens the next week after five sessions", async () => {
    for (let session = 0; session < 4; session++) {
      const result = await completeSession("acc1", "full", 45, day(session));
      expect(result.advancedToWeek).toBeNull();
    }

    const fifth = await completeSession("acc1", "full", 45, day(4));
    expect(fifth.advancedToWeek).toBe(2);

    const { summary } = await loadAccount("acc1", day(4));
    expect(summary.profile.currentWeek).toBe(2);
    expect(summary.profile.sessionsThisWeek).toBe(0);
  });

  it("counts a second session on the same day only once", async () => {
    // §10.2 lets a short session be upgraded to a full one later the same day.
    await completeSession("acc1", "short", 20, day(0));
    await completeSession("acc1", "full", 45, day(0));

    const { summary } = await loadAccount("acc1", day(0));
    expect(summary.profile.sessionsThisWeek).toBe(1);
  });

  it("moves the two accounts independently", async () => {
    // §13.1 again: finishing a week on one account must not move the other.
    for (let session = 0; session < 5; session++) {
      await completeSession("acc2", "full", 45, day(session));
    }

    const mine = await loadAccount("acc2", day(4));
    const theirs = await loadAccount("acc1", day(4));
    expect(mine.summary.profile.currentWeek).toBe(2);
    expect(theirs.summary.profile.currentWeek).toBe(1);
  });
});

describe("trouble words", () => {
  const day = (offset: number) => new Date(2026, 2, 2 + offset);

  it("only names a word once it is a pattern, not on the first slip", async () => {
    expect(await recordTroubleWords("acc1", ["three"], day(0))).toEqual([]);
    expect(await recordTroubleWords("acc1", ["three"], day(1))).toEqual([]);
    expect(await recordTroubleWords("acc1", ["three"], day(2))).toEqual(["three"]);
  });

  it("remembers across sessions rather than starting over each time", async () => {
    await recordTroubleWords("acc1", ["street"], day(0));
    await recordTroubleWords("acc1", ["street"], day(3));
    // A whole week later it is still counted — this is the point of storing it.
    expect(await recordTroubleWords("acc1", ["street"], day(7))).toEqual(["street"]);
  });

  it("forgets a word that stopped being a problem", async () => {
    await recordTroubleWords("acc1", ["three", "three", "three"], day(0));
    expect(await recordTroubleWords("acc1", [], day(1))).toEqual(["three"]);
    // Past the window with no further misses, it drops off rather than sending
    // the learner back to practise something they can already say.
    expect(await recordTroubleWords("acc1", [], day(40))).toEqual([]);
  });

  it("keeps the two accounts' sounds apart", async () => {
    await recordTroubleWords("acc1", ["three", "three", "three"], day(0));
    expect(await recordTroubleWords("acc2", [], day(0))).toEqual([]);
  });
});
