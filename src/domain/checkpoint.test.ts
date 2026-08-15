import { describe, expect, it } from "vitest";
import {
  CHECKPOINTS,
  EXTRA_WEEKS_ON_FAIL,
  checkpointAfter,
  judgeCheckpoint,
  outcomeMessageVi,
} from "./checkpoint";

const testA = CHECKPOINTS[0]!;
const testB = CHECKPOINTS[1]!;

const passingA = {
  shadowingScores: Array.from({ length: 20 }, () => 80),
  listeningCorrect: 13,
  roleplaysCompleted: 0,
};

describe("checkpointAfter", () => {
  it("falls at the end of each phase (§6)", () => {
    expect(checkpointAfter(8)?.kind).toBe("A");
    expect(checkpointAfter(17)?.kind).toBe("B");
    expect(checkpointAfter(26)?.kind).toBe("C");
  });

  it("is not owed in an ordinary week", () => {
    for (const week of [1, 7, 9, 16, 18, 25]) {
      expect(checkpointAfter(week)).toBeNull();
    }
  });
});

describe("judgeCheckpoint", () => {
  it("passes when every part is met", () => {
    const verdict = judgeCheckpoint(testA, passingA);
    expect(verdict.passed).toBe(true);
    expect(verdict.extraWeeks).toBe(0);
  });

  it("fails the whole test when only the speaking falls short", () => {
    // The course exists to make someone speak; passing the listening while
    // failing the sounds is not a pass at it.
    const verdict = judgeCheckpoint(testA, {
      ...passingA,
      shadowingScores: Array.from({ length: 20 }, () => 50),
    });
    expect(verdict.passed).toBe(false);
  });

  it("fails when the listening falls short", () => {
    expect(judgeCheckpoint(testA, { ...passingA, listeningCorrect: 11 }).passed).toBe(false);
  });

  it("does not demand every phrase, only most of them", () => {
    // 14 of 20 clears the 70% bar; a checkpoint that required all twenty would
    // be measuring luck as much as speech.
    const scores = [...Array.from({ length: 14 }, () => 80), ...Array.from({ length: 6 }, () => 40)];
    expect(judgeCheckpoint(testA, { ...passingA, shadowingScores: scores }).passed).toBe(true);
  });

  it("reports each part separately, pass or fail", () => {
    const verdict = judgeCheckpoint(testA, { ...passingA, listeningCorrect: 4 });
    expect(verdict.linesVi).toHaveLength(2);
    // "You failed" teaches nothing; naming which half needs work does.
    expect(verdict.linesVi.some((line) => line.startsWith("Phát âm"))).toBe(true);
    expect(verdict.linesVi.some((line) => line.startsWith("Nghe"))).toBe(true);
  });

  it("only judges the parts a test actually has", () => {
    const verdict = judgeCheckpoint(testB, {
      shadowingScores: [],
      listeningCorrect: 0,
      roleplaysCompleted: 3,
    });
    expect(verdict.passed).toBe(true);
    expect(verdict.linesVi).toHaveLength(1);
  });

  it("buys more practice on a fail rather than blocking the learner", () => {
    const verdict = judgeCheckpoint(testA, {
      ...passingA,
      shadowingScores: Array.from({ length: 20 }, () => 30),
    });
    expect(verdict.extraWeeks).toBe(EXTRA_WEEKS_ON_FAIL);
  });
});

describe("outcomeMessageVi", () => {
  it("frames a fail as more practice, never as a verdict on the learner", () => {
    const message = outcomeMessageVi(testA, {
      passed: false,
      linesVi: [],
      extraWeeks: EXTRA_WEEKS_ON_FAIL,
    });
    expect(message).toContain("học thêm");
    for (const word of ["trượt", "không đạt", "kém", "thất bại"]) {
      expect(message).not.toContain(word);
    }
  });

  it("closes the course rather than promising a next phase at test C", () => {
    const message = outcomeMessageVi(CHECKPOINTS[2]!, {
      passed: true,
      linesVi: [],
      extraWeeks: 0,
    });
    expect(message).toContain("26 tuần");
  });
});
