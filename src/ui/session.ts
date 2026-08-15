/**
 * Session runner — walks the four blocks and records the result.
 *
 * The shell owns two things the blocks deliberately do not: what happens when
 * the learner stops early, and what gets written down at the end. §10.2 makes
 * an unfinished session still worth recording, so quitting is a normal exit
 * path here rather than an error.
 */

import type { AccountId } from "../data/schema";
import { completeSession, loadDeck, saveCards } from "../data/repository";
import type { ReviewCard } from "../domain/srs";
import type { StreakEvent } from "../domain/streak";
import {
  BLOCK_LABELS_VI,
  BLOCK_ORDER,
  activeMinutes,
  currentBlock,
  finishBlock,
  isRecordable,
  startSession,
  tierFor,
} from "../domain/session";
import type { BlockResult } from "../domain/session";
import { getWeek } from "../content";
import {
  RESPONSE_DEADLINE_MS,
  closeMic,
  primeMicrophone,
  stopSpeaking,
} from "../platform/speech";
import { el, mount } from "./dom";
import {
  runFreeTalkBlock,
  runListeningBlock,
  runReviewBlock,
  runSpeakingBlock,
  runVocabularyBlock,
} from "./blocks";
import type { BlockContext } from "./blocks";
import { troubleWords } from "../domain/pronunciation";
import type { PronunciationScore } from "../domain/pronunciation";

export type SessionOutcome = {
  /** False when the learner left before finishing a single block. */
  recorded: boolean;
  events: StreakEvent[];
};

/**
 * Shown before the microphone is requested.
 *
 * The permission sheet appears once, here, rather than interrupting the first
 * card — and the learner is told what it is for first, which is the difference
 * between granting it and denying it out of confusion.
 */
function renderIntro(
  root: HTMLElement,
  weekTitle: string,
  onStart: () => void,
  onCancel: () => void,
): void {
  mount(
    root,
    el("main", { class: "block" }, [
      el("p", { class: "block__step" }, ["Buổi học hôm nay"]),
      el("h1", { class: "block__title" }, [weekTitle]),
      el("ol", { class: "plan" }, [
        ...BLOCK_ORDER.map((kind) =>
          el("li", { class: "plan__item" }, [BLOCK_LABELS_VI[kind]]),
        ),
      ]),
      el("p", { class: "block__hint" }, [
        "App cần dùng micro để nghe bác nói. Nếu không cho phép thì vẫn học được, chỉ là bác tự bấm nút thay vì app tự nghe.",
      ]),
      el("div", { class: "stack" }, [
        el("button", { class: "btn", type: "button", onclick: onStart }, ["Bắt đầu"]),
        el("button", { class: "btn btn--ghost", type: "button", onclick: onCancel }, [
          "Để lúc khác",
        ]),
      ]),
    ]),
  );
}

function renderSummary(
  root: HTMLElement,
  results: readonly BlockResult[],
  minutes: number,
  onDone: () => void,
  trouble: readonly string[] = [],
  advancedToWeek: number | null = null,
): void {
  const spoken = results.reduce((total, result) => total + result.itemsAttempted, 0);
  const latencies = results
    .map((result) => result.avgLatencyMs)
    .filter((value): value is number => value !== null);
  const avgLatency =
    latencies.length > 0
      ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
      : null;

  mount(
    root,
    el("main", { class: "block" }, [
      el("h1", { class: "block__title" }, ["Xong rồi!"]),
      el("section", { class: "panel" }, [
        el("p", { class: "panel__label" }, ["Bác đã nói"]),
        el("p", { class: "panel__stat" }, [`${spoken} câu`]),
        el("p", { class: "panel__note" }, [`${minutes} phút học thật`]),
      ]),
      avgLatency === null
        ? null
        : el("section", { class: "panel" }, [
            el("p", { class: "panel__label" }, ["Tốc độ phản xạ"]),
            el("p", { class: "panel__stat" }, [`${(avgLatency / 1000).toFixed(1)}s`]),
            el("p", { class: "panel__note" }, [
              "Đây là thứ tiến bộ rõ nhất trong 6 tháng tới.",
            ]),
          ]),
      // Only shown when a word went missing repeatedly today. A list after
      // every session would read as a daily report card, which §9.3 rules out.
      trouble.length === 0
        ? null
        : el("section", { class: "panel" }, [
            el("p", { class: "panel__label" }, ["Mai để ý mấy từ này"]),
            el("p", { class: "panel__stat" }, [trouble.slice(0, 3).join(" · ")]),
            el("p", { class: "panel__note" }, [
              "Nghe lại giọng mẫu rồi nói theo vài lần là được.",
            ]),
          ]),
      // The moment a week's five sessions are done. Worth its own panel: this
      // is the only place the learner sees the course actually moving.
      advancedToWeek === null
        ? null
        : el("section", { class: "panel panel--good" }, [
            el("p", { class: "panel__label" }, ["Xong một tuần!"]),
            el("p", { class: "panel__stat" }, [`Mai bắt đầu tuần ${advancedToWeek}`]),
            el("p", { class: "panel__note" }, [getWeek(advancedToWeek).titleVi]),
          ]),
      el("button", { class: "btn", type: "button", onclick: onDone }, ["Về trang chính"]),
    ]),
  );
}

/**
 * Runs a full session and returns once the learner is back at the home screen.
 */
export async function runSession(
  root: HTMLElement,
  accountId: AccountId,
  options: { week: number; audioRate: number; lastStudyDay: string | null },
): Promise<SessionOutcome> {
  const week = getWeek(options.week);

  const started = await new Promise<boolean>((resolve) => {
    renderIntro(
      root,
      week.titleVi,
      () => resolve(true),
      () => resolve(false),
    );
  });
  if (!started) return { recorded: false, events: [] };

  const micReady = await primeMicrophone();

  // Collected across all four blocks, so a word has to keep going missing in
  // different exercises before it is called out (§9.2).
  const scored: PronunciationScore[] = [];

  const context: BlockContext = {
    root,
    week,
    audioRate: options.audioRate,
    micReady,
    // The clock tightens across phase 3 (8s → 3s); weeks that set no deadline
    // keep the default.
    deadlineMs: week.responseDeadlineMs ?? RESPONSE_DEADLINE_MS,
    voiceLang: week.voiceLang,
    onAttemptScored: (attempt) => {
      if (attempt.pronunciationScore === null) return;
      scored.push({
        score: attempt.pronunciationScore,
        missed: attempt.missed,
        confidence: "normal",
      });
    },
  };

  let deck = await loadDeck(accountId, options.week);
  const touched = new Map<string, ReviewCard>();

  let state = startSession();

  try {
    while (currentBlock(state) !== null) {
      const kind = currentBlock(state)!;
      let result: BlockResult;

      switch (kind) {
        case "vocabulary":
          result = await runVocabularyBlock(context, deck, {
            lastStudyDay: options.lastStudyDay,
            onCardReviewed: (card) => {
              touched.set(`${card.itemId}:${card.direction}`, card);
            },
          });
          break;
        case "listening":
          result = await runListeningBlock(context);
          break;
        case "speaking":
          result = await runSpeakingBlock(context);
          break;
        case "review":
          // Reviews run against the freshly scheduled deck, so a card just
          // failed in block 1 is the one that comes back here.
          deck = deck.map((card) => touched.get(`${card.itemId}:${card.direction}`) ?? card);
          result = await runReviewBlock(context, deck);
          break;
        default:
          // freeTalk is not part of BLOCK_ORDER; it runs after the loop.
          throw new Error(`unexpected block: ${kind}`);
      }

      state = finishBlock(state, result);
    }

    // The optional closing block (§12.1). Its own failures are already handled
    // by the fallback provider, but a crash here must not cost the learner the
    // four blocks they just finished.
    try {
      state = finishBlock(
        state,
        await runFreeTalkBlock(context, {
          accountId,
          phase: options.week <= 8 ? 1 : options.week <= 17 ? 2 : 3,
        }),
      );
    } catch (error) {
      console.warn("free talk did not run", error);
    }
  } finally {
    stopSpeaking();
    closeMic();
    // Scheduling changes are saved even if a block threw halfway: the reviews
    // that did happen should not be lost because a later one failed.
    await saveCards([...touched.values()]);
  }

  if (!isRecordable(state)) return { recorded: false, events: [] };

  const minutes = activeMinutes(state);
  const { events, advancedToWeek } = await completeSession(accountId, tierFor(state), minutes);

  await new Promise<void>((resolve) => {
    renderSummary(root, state.results, minutes, resolve, troubleWords(scored), advancedToWeek);
  });

  return { recorded: true, events };
}
