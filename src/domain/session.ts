/**
 * The 45-minute session (curriculum §5).
 *
 * Four blocks in a fixed order, and the order is the point: vocabulary first so
 * the listening has material to work with, listening before speaking so the ear
 * shapes the sound before the mouth copies it, review last to fix it before
 * sleep.
 *
 * The engine is deliberately pure — it decides what comes next and what the
 * session was worth, and knows nothing about audio, storage or the DOM. That is
 * what lets the awkward parts (a learner quitting halfway, a phone locking
 * mid-block) be tested without a browser.
 */

import type { SessionTier } from "../data/schema";

export type BlockKind = "vocabulary" | "listening" | "speaking" | "review" | "freeTalk";

/** §5.1 — the baseline split of a full session. */
export const BLOCK_MINUTES: Record<BlockKind, number> = {
  vocabulary: 10,
  listening: 12,
  speaking: 18,
  review: 5,
  // Sits outside the 45 minutes: §12.1 keeps free talk optional, because it is
  // the one block that can fail for reasons the learner cannot fix.
  freeTalk: 5,
};

export const BLOCK_ORDER: readonly BlockKind[] = [
  "vocabulary",
  "listening",
  "speaking",
  "review",
];

/** The optional closing block, run after the four required ones. */
export const OPTIONAL_BLOCKS: readonly BlockKind[] = ["freeTalk"];

export const BLOCK_LABELS_VI: Record<BlockKind, string> = {
  vocabulary: "Từ hôm nay",
  listening: "Nghe thật",
  speaking: "Mở miệng",
  review: "Chốt lại",
  freeTalk: "Nói tự do",
};

export type BlockResult = {
  kind: BlockKind;
  completed: boolean;
  seconds: number;
  itemsAttempted: number;
  itemsCorrect: number;
  /** Null when nothing in the block measured latency. */
  avgLatencyMs: number | null;
};

export type SessionState = {
  startedAt: number;
  /** Index into BLOCK_ORDER; equal to the length when the session is done. */
  currentIndex: number;
  results: BlockResult[];
};

export function startSession(now = Date.now()): SessionState {
  return { startedAt: now, currentIndex: 0, results: [] };
}

export function currentBlock(state: SessionState): BlockKind | null {
  return BLOCK_ORDER[state.currentIndex] ?? null;
}

export function finishBlock(state: SessionState, result: BlockResult): SessionState {
  return {
    ...state,
    currentIndex: state.currentIndex + 1,
    results: [...state.results, result],
  };
}

export function isComplete(state: SessionState): boolean {
  return state.currentIndex >= BLOCK_ORDER.length;
}

/** Minutes of real work, from the blocks themselves rather than wall clock. */
export function activeMinutes(state: SessionState): number {
  const seconds = state.results.reduce((total, result) => total + result.seconds, 0);
  return Math.round(seconds / 60);
}

/**
 * What the session was worth.
 *
 * All three tiers keep the streak (§10.2), so this is about honesty in the
 * record rather than reward: a learner who managed five minutes on a bad day
 * has still shown up, and the app says so without pretending it was a full
 * session.
 *
 * Judged on blocks finished rather than minutes elapsed, because a phone left
 * unlocked on the table is not studying.
 */
export function tierFor(state: SessionState): SessionTier {
  const completed = state.results.filter((result) => result.completed);
  if (completed.length >= BLOCK_ORDER.length) return "full";
  if (completed.length >= 2) return "short";
  return "minimal";
}

/**
 * Whether the session has done enough to be recorded at all.
 *
 * One finished block is the floor — it matches the 5-minute minimum tier of
 * §10.2, which exists so a tired evening still counts for something.
 */
export function isRecordable(state: SessionState): boolean {
  return state.results.some((result) => result.completed);
}

export function accuracyOf(result: BlockResult): number | null {
  if (result.itemsAttempted === 0) return null;
  return Math.round((100 * result.itemsCorrect) / result.itemsAttempted);
}

/**
 * Per-block accuracy over recent sessions, keyed by block.
 *
 * This is the input to the personalisation rule in §11: three sessions below
 * 60% on the same block means the material is too hard and the app should ease
 * off, rather than letting the learner grind against it.
 */
export function strugglingBlocks(
  recent: readonly BlockResult[][],
  options: { threshold?: number; sessions?: number } = {},
): BlockKind[] {
  const threshold = options.threshold ?? 60;
  const needed = options.sessions ?? 3;
  if (recent.length < needed) return [];

  const window = recent.slice(-needed);
  const struggling: BlockKind[] = [];

  for (const kind of BLOCK_ORDER) {
    const accuracies = window
      .map((session) => session.find((result) => result.kind === kind))
      .filter((result): result is BlockResult => result !== undefined)
      .map(accuracyOf)
      .filter((value): value is number => value !== null);

    // Only judge a block the learner has actually attempted in every session of
    // the window; a block skipped twice is not evidence of difficulty.
    if (accuracies.length < needed) continue;
    if (accuracies.every((accuracy) => accuracy < threshold)) struggling.push(kind);
  }

  return struggling;
}
