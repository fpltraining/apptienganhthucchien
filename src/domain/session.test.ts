import { describe, expect, it } from "vitest";
import {
  BLOCK_ORDER,
  accuracyOf,
  activeMinutes,
  currentBlock,
  finishBlock,
  isComplete,
  isRecordable,
  MAINTENANCE_ORDER,
  startSession,
  strugglingBlocks,
  tierFor,
} from "./session";
import type { BlockKind, BlockResult, SessionState } from "./session";

function result(kind: BlockKind, overrides: Partial<BlockResult> = {}): BlockResult {
  return {
    kind,
    completed: true,
    seconds: 600,
    itemsAttempted: 10,
    itemsCorrect: 8,
    avgLatencyMs: 2000,
    ...overrides,
  };
}

function runBlocks(kinds: BlockKind[], overrides: Partial<BlockResult> = {}): SessionState {
  let state = startSession(0);
  for (const kind of kinds) state = finishBlock(state, result(kind, overrides));
  return state;
}

describe("block order", () => {
  it("runs vocabulary, listening, speaking, then review", () => {
    // The order is load-bearing (§5.1): vocabulary feeds listening, listening
    // shapes the ear before speaking copies it, review closes the session.
    expect([...BLOCK_ORDER]).toEqual(["vocabulary", "listening", "speaking", "review"]);
  });

  it("walks the blocks in order and then reports completion", () => {
    let state = startSession(0);
    expect(currentBlock(state)).toBe("vocabulary");

    state = finishBlock(state, result("vocabulary"));
    expect(currentBlock(state)).toBe("listening");

    state = finishBlock(state, result("listening"));
    state = finishBlock(state, result("speaking"));
    expect(isComplete(state)).toBe(false);

    state = finishBlock(state, result("review"));
    expect(isComplete(state)).toBe(true);
    expect(currentBlock(state)).toBeNull();
  });
});

describe("tierFor", () => {
  it("is full only when every block is finished", () => {
    expect(tierFor(runBlocks(["vocabulary", "listening", "speaking", "review"]))).toBe("full");
  });

  it("is short at two finished blocks", () => {
    expect(tierFor(runBlocks(["vocabulary", "listening"]))).toBe("short");
  });

  it("is minimal at one finished block", () => {
    expect(tierFor(runBlocks(["vocabulary"]))).toBe("minimal");
  });

  it("does not count blocks that were abandoned", () => {
    // A phone left unlocked on the table is not a finished block.
    let state = startSession(0);
    state = finishBlock(state, result("vocabulary", { completed: false }));
    state = finishBlock(state, result("listening", { completed: false }));
    state = finishBlock(state, result("speaking"));
    expect(tierFor(state)).toBe("minimal");
  });
});

describe("isRecordable", () => {
  it("needs at least one finished block", () => {
    expect(isRecordable(startSession(0))).toBe(false);
    expect(isRecordable(runBlocks(["vocabulary"], { completed: false }))).toBe(false);
    expect(isRecordable(runBlocks(["vocabulary"]))).toBe(true);
  });
});

describe("activeMinutes", () => {
  it("sums block time rather than wall clock", () => {
    const state = runBlocks(["vocabulary", "listening"], { seconds: 300 });
    expect(activeMinutes(state)).toBe(10);
  });
});

describe("accuracyOf", () => {
  it("returns null when nothing was attempted", () => {
    expect(accuracyOf(result("listening", { itemsAttempted: 0, itemsCorrect: 0 }))).toBeNull();
  });

  it("reports a percentage", () => {
    expect(accuracyOf(result("listening", { itemsAttempted: 8, itemsCorrect: 2 }))).toBe(25);
  });
});

describe("strugglingBlocks", () => {
  const weak = result("listening", { itemsAttempted: 10, itemsCorrect: 4 });
  const fine = result("listening", { itemsAttempted: 10, itemsCorrect: 9 });

  it("flags a block below the threshold three sessions running", () => {
    // §11 — three sessions under 60% means the material is too hard, and the
    // app should ease off rather than let the learner grind against it.
    expect(strugglingBlocks([[weak], [weak], [weak]])).toEqual(["listening"]);
  });

  it("does not flag on a single bad session", () => {
    expect(strugglingBlocks([[fine], [weak], [fine]])).toEqual([]);
  });

  it("waits until there are enough sessions to judge", () => {
    expect(strugglingBlocks([[weak], [weak]])).toEqual([]);
  });

  it("ignores a block that was skipped in some sessions", () => {
    expect(strugglingBlocks([[weak], [], [weak]])).toEqual([]);
  });

  it("only considers the most recent sessions", () => {
    expect(strugglingBlocks([[weak], [weak], [weak], [fine], [fine], [fine]])).toEqual([]);
  });
});

describe("maintenance sessions", () => {
  it("skips the vocabulary block — there is no week 27 to teach", () => {
    const state = startSession(0, MAINTENANCE_ORDER);
    expect(currentBlock(state)).toBe("review");
    expect(MAINTENANCE_ORDER).not.toContain("vocabulary");
  });

  it("is complete after its own blocks, not the course's four", () => {
    let state = startSession(0, MAINTENANCE_ORDER);
    for (const kind of MAINTENANCE_ORDER) {
      state = finishBlock(state, {
        kind,
        completed: true,
        seconds: 400,
        itemsAttempted: 5,
        itemsCorrect: 5,
        avgLatencyMs: null,
      });
    }
    expect(isComplete(state)).toBe(true);
    // Graded against its own length, or every maintenance day would read as a
    // partial one and the six-month streak would look like a decline.
    expect(tierFor(state)).toBe("full");
  });
});
