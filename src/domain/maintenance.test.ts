import { describe, expect, it } from "vitest";
import { MAINTENANCE_ORDER } from "./session";
import {
  MAINTENANCE_BLOCK_MINUTES,
  MAINTENANCE_MINUTES,
  buildReport,
  maintenanceTier,
  reportLinesVi,
} from "./maintenance";

const input = {
  daysStudied: 140,
  longestStreak: 31,
  cardsInReview: 620,
  soundsEverTroubled: 9,
  soundsStillTroubled: ["three"],
};

describe("buildReport", () => {
  it("counts what was done", () => {
    const report = buildReport(input);
    expect(report.daysStudied).toBe(140);
    expect(report.phrasesLearned).toBe(620);
  });

  it("works out which sounds stopped being a problem", () => {
    expect(buildReport(input).soundsFixed).toBe(8);
  });

  it("never reports a negative count when more sounds are troubled than were", () => {
    // Can happen if new words started failing late in the course.
    const report = buildReport({ ...input, soundsEverTroubled: 1, soundsStillTroubled: ["a", "b"] });
    expect(report.soundsFixed).toBe(0);
  });

  it("still names what is left, so the report is a starting point", () => {
    expect(buildReport(input).soundsRemaining).toEqual(["three"]);
  });
});

describe("reportLinesVi", () => {
  it("reports days done, never days missed", () => {
    // 140 of 182 days is 140 days of English. Showing it as 77% turns an
    // achievement into a shortfall, which is what ends the habit (§15).
    const lines = reportLinesVi(buildReport(input)).join(" ");
    expect(lines).toContain("140 ngày");
    expect(lines).not.toContain("%");
    for (const word of ["bỏ lỡ", "thiếu", "chưa đạt"]) {
      expect(lines).not.toContain(word);
    }
  });

  it("leaves out the fixed-sounds line when there is nothing to say", () => {
    const lines = reportLinesVi(buildReport({ ...input, soundsEverTroubled: 0 }));
    expect(lines.some((line) => line.includes("âm"))).toBe(false);
  });
});

describe("maintenanceTier", () => {
  it("counts a full maintenance session as full", () => {
    // Otherwise every day after week 26 reads as a partial one, and the streak
    // built over six months starts looking like a decline.
    expect(maintenanceTier(MAINTENANCE_MINUTES)).toBe("full");
    expect(maintenanceTier(45)).toBe("full");
  });

  it("still distinguishes a token appearance", () => {
    expect(maintenanceTier(12)).toBe("short");
    expect(maintenanceTier(3)).toBe("minimal");
  });
});

describe("maintenance block minutes", () => {
  it("adds up to the session target, so the plan does not overpromise", () => {
    const total = Object.values(MAINTENANCE_BLOCK_MINUTES).reduce((a, b) => a + b, 0);
    expect(total).toBe(MAINTENANCE_MINUTES);
  });

  it("covers every block a maintenance session runs", () => {
    for (const kind of [...MAINTENANCE_ORDER, "freeTalk"] as const) {
      expect(MAINTENANCE_BLOCK_MINUTES[kind]).toBeGreaterThan(0);
    }
  });
});
