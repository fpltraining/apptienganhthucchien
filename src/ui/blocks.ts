/**
 * The four learning blocks (curriculum §5.2).
 *
 * Each block renders itself, runs to completion, and resolves with a
 * `BlockResult`. Keeping them behind one shape means the session shell does not
 * care what happens inside a block, and a block can be reordered or replaced
 * without touching the runner.
 *
 * Two rules hold across all four:
 *
 *  - Nothing ever blocks progress. A missing microphone, a silent device, a
 *    denied permission — the block degrades and carries on. §9.3 is explicit
 *    that pronunciation must never gate the lesson, and the same reasoning
 *    covers every other capability.
 *  - No score is shown as a bare number in phase 1 (§9.3). The learner sees
 *    "Chuẩn rồi" or "Nghe lại nhé", because a number attached to a beginner's
 *    speech is discouraging before it is informative.
 */

import type { BlockResult } from "../domain/session";
import type { ReviewCard } from "../domain/srs";
import { buildDailyQueue, reviewCard } from "../domain/srs";
import type { WeekContent } from "../content/types";
import { findVocabItem, getTurn, matchBranch } from "../content";
import { el } from "./dom";
import {
  RESPONSE_DEADLINE_MS,
  listenForSpeechOnset,
  recognitionSupported,
  recognizeSpeech,
  speak,
  stopSpeaking,
} from "../platform/speech";

export type BlockContext = {
  root: HTMLElement;
  week: WeekContent;
  /** Playback speed for listening material; rises as the ear improves (§5.2). */
  audioRate: number;
  /** False when the microphone was refused; blocks fall back to tapping. */
  micReady: boolean;
};

/** Latency good enough to read as "it came out without translating first". */
const FAST_MS = 1500;

function header(title: string, subtitle: string, progress: string): HTMLElement {
  return el("div", { class: "block__head" }, [
    el("p", { class: "block__step" }, [progress]),
    el("h1", { class: "block__title" }, [title]),
    el("p", { class: "block__sub" }, [subtitle]),
  ]);
}

/** Feedback in words, not numbers (§9.3). */
function speedFeedback(spoken: boolean, latencyMs: number): string {
  if (!spoken) return "Chưa nghe thấy — không sao, mai nói lại nhé.";
  if (latencyMs < FAST_MS) return "Chuẩn rồi — bật ra rất nhanh.";
  if (latencyMs < 4000) return "Được rồi. Lần sau thử nói nhanh hơn một chút.";
  return "Hơi chậm. Nghe lại rồi nói theo nhé.";
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- block 1: vocabulary -----------------------------------------------------

/**
 * Ten minutes of spaced repetition (§5.1).
 *
 * Every card is spoken aloud. A card is never marked known just because the
 * learner recognised the text — §5.2 requires it to come out of their mouth.
 */
export async function runVocabularyBlock(
  context: BlockContext,
  deck: readonly ReviewCard[],
  options: { lastStudyDay: string | null; onCardReviewed: (card: ReviewCard) => void },
): Promise<BlockResult> {
  const startedAt = Date.now();
  const queue = buildDailyQueue(deck, { lastStudyDay: options.lastStudyDay });
  const cards = [...queue.reviews, ...queue.newCards];

  let attempted = 0;
  let correct = 0;
  const latencies: number[] = [];

  for (let index = 0; index < cards.length; index++) {
    const card = cards[index]!;
    const item = findVocabItem(card.itemId);
    if (!item) continue;

    const isProduction = card.direction === "production";
    const prompt = isProduction ? item.meaningVi : item.phrase;
    const instruction = isProduction
      ? "Nói câu này bằng tiếng Anh"
      : "Nghe rồi nói theo";

    const feedback = el("p", { class: "feedback" }, [""]);
    const answer = el("p", { class: "card__answer" }, [isProduction ? "" : item.meaningVi]);

    context.root.replaceChildren(
      el("main", { class: "block" }, [
        header(
          context.week.titleVi,
          instruction,
          `Từ vựng · ${index + 1}/${cards.length}`,
        ),
        el("section", { class: "card" }, [
          el("p", { class: "card__prompt" }, [prompt]),
          answer,
          el("p", { class: "card__situation" }, [item.situation]),
        ]),
        feedback,
        el("p", { class: "block__hint" }, [
          context.micReady ? "Nói to lên, app đang nghe…" : "Nói to lên rồi bấm nút bên dưới",
        ]),
      ]),
    );

    // Recognition cards hear the phrase first; production cards must not, or
    // there is nothing left to produce.
    if (!isProduction) await speak(item.phrase, { rate: context.audioRate });

    const attempt = await captureAttempt(context, feedback);
    attempted++;
    latencies.push(attempt.latencyMs);

    const graded = reviewCard(card, {
      spoken: attempt.spoken,
      latencyMs: attempt.latencyMs,
      // No pronunciation scorer yet: server-side scoring is decision #4 and the
      // backend does not exist, so grading runs on latency alone (§12.7).
      pronunciationScore: null,
    });
    if (attempt.spoken) correct++;
    options.onCardReviewed(graded.card);

    answer.textContent = item.meaningVi;
    feedback.textContent = speedFeedback(attempt.spoken, attempt.latencyMs);
    // Always let them hear the model pronunciation after trying, which is the
    // "nghe lại giọng mẫu" habit §9.3 relies on.
    await speak(item.phrase, { rate: context.audioRate });
    await wait(400);
  }

  return {
    kind: "vocabulary",
    completed: cards.length > 0,
    seconds: Math.round((Date.now() - startedAt) / 1000),
    itemsAttempted: attempted,
    itemsCorrect: correct,
    avgLatencyMs: average(latencies),
  };
}

/**
 * Waits for the learner to speak, or for them to say they did.
 *
 * The tap fallback is a worse measurement and is treated as one: it records a
 * neutral latency rather than timing the tap, because timing how fast someone
 * finds a button after speaking would poison the headline metric of §3.
 */
async function captureAttempt(
  context: BlockContext,
  feedback: HTMLElement,
): Promise<{ spoken: boolean; latencyMs: number }> {
  if (context.micReady) {
    const heard = await listenForSpeechOnset();
    if (!heard.degraded) return { spoken: heard.spoken, latencyMs: heard.latencyMs };
  }

  return new Promise((resolve) => {
    const said = el(
      "button",
      {
        class: "btn",
        type: "button",
        onclick: () => resolve({ spoken: true, latencyMs: 2500 }),
      },
      ["Tôi nói được"],
    );
    const missed = el(
      "button",
      {
        class: "btn btn--ghost",
        type: "button",
        onclick: () => resolve({ spoken: false, latencyMs: RESPONSE_DEADLINE_MS }),
      },
      ["Chưa nói được"],
    );
    feedback.replaceChildren(el("div", { class: "choices" }, [said, missed]));
  });
}

// --- block 2: listening ------------------------------------------------------

/**
 * Twelve minutes on one passage, heard three times (§5.2).
 *
 * Three rounds on the same audio rather than three different clips: narrow
 * listening builds the ear faster, and the third round — filling gaps in the
 * transcript — is where the learner discovers which words they were never
 * actually hearing.
 */
export async function runListeningBlock(context: BlockContext): Promise<BlockResult> {
  const startedAt = Date.now();
  const passage = context.week.listening;

  let attempted = 0;
  let correct = 0;

  const playAll = async (rate: number) => {
    for (const line of passage.lines) {
      await speak(line.text, { rate });
      await wait(180);
    }
  };

  // Round 1 — gist, at the learner's current speed.
  await renderListeningStage(context, passage.titleVi, "Vòng 1 · Nghe ý chính", playAll, context.audioRate);
  const gist = await askChoice(context, passage.gist.promptVi, passage.gist.options, passage.gist.answerIndex);
  attempted++;
  if (gist) correct++;

  // Round 2 — detail, at natural speed.
  await renderListeningStage(context, passage.titleVi, "Vòng 2 · Nghe chi tiết", playAll, 1);
  for (const question of passage.detail) {
    const right = await askChoice(context, question.promptVi, question.options, question.answerIndex);
    attempted++;
    if (right) correct++;
  }

  // Round 3 — the exact words, with the transcript visible.
  await renderListeningStage(context, passage.titleVi, "Vòng 3 · Nghe từng chữ", playAll, 1);
  for (const gap of passage.gaps) {
    const options = shuffleWithAnswer(gap.answer, passage.gaps.map((other) => other.answer));
    const right = await askChoice(
      context,
      `${gap.before} ______ ${gap.after}`,
      options.options,
      options.answerIndex,
    );
    attempted++;
    if (right) correct++;
  }

  return {
    kind: "listening",
    completed: true,
    seconds: Math.round((Date.now() - startedAt) / 1000),
    itemsAttempted: attempted,
    itemsCorrect: correct,
    avgLatencyMs: null,
  };
}

async function renderListeningStage(
  context: BlockContext,
  title: string,
  stage: string,
  play: (rate: number) => Promise<void>,
  rate: number,
): Promise<void> {
  return new Promise((resolve) => {
    const replay = el(
      "button",
      { class: "btn btn--ghost", type: "button", onclick: () => void play(rate) },
      ["Nghe lại"],
    );
    const next = el("button", { class: "btn", type: "button", onclick: () => resolve() }, [
      "Trả lời câu hỏi",
    ]);

    context.root.replaceChildren(
      el("main", { class: "block" }, [
        header(title, "Không có phụ đề — cứ nghe lấy ý", stage),
        el("div", { class: "listen__art", "aria-hidden": "true" }, ["🎧"]),
        el("div", { class: "stack" }, [replay, next]),
      ]),
    );

    void play(rate);
  });
}

function askChoice(
  context: BlockContext,
  promptText: string,
  options: readonly string[],
  answerIndex: number,
): Promise<boolean> {
  return new Promise((resolve) => {
    const feedback = el("p", { class: "feedback" }, [""]);

    const buttons = options.map((option, index) =>
      el(
        "button",
        {
          class: "btn btn--choice",
          type: "button",
          onclick: () => {
            const right = index === answerIndex;
            feedback.textContent = right
              ? "Đúng rồi."
              : `Chưa đúng — đáp án là: ${options[answerIndex]}`;
            for (const button of buttons) button.setAttribute("disabled", "");
            setTimeout(() => resolve(right), right ? 600 : 1600);
          },
        },
        [option],
      ),
    );

    context.root.replaceChildren(
      el("main", { class: "block" }, [
        el("h1", { class: "question" }, [promptText]),
        el("div", { class: "stack" }, buttons),
        feedback,
      ]),
    );
  });
}

/** Puts the answer among distractors drawn from the passage's other gaps. */
function shuffleWithAnswer(
  answer: string,
  pool: readonly string[],
): { options: string[]; answerIndex: number } {
  const distractors = pool.filter((candidate) => candidate !== answer).slice(0, 2);
  const options = [answer, ...distractors];

  // Deterministic rotation rather than a random shuffle: the answer still moves
  // between positions, but a test can predict where it lands.
  const shift = answer.length % options.length;
  const rotated = [...options.slice(shift), ...options.slice(0, shift)];
  return { options: rotated, answerIndex: rotated.indexOf(answer) };
}

// --- block 3: speaking -------------------------------------------------------

/**
 * Eighteen minutes, the largest block by design (§5.1).
 *
 * Shadowing first to get the sounds in the mouth, then a scripted role-play so
 * the phrases have to come out under the pressure of someone waiting for them.
 */
export async function runSpeakingBlock(context: BlockContext): Promise<BlockResult> {
  const startedAt = Date.now();
  const latencies: number[] = [];
  let attempted = 0;
  let correct = 0;

  // --- shadowing ---
  for (let index = 0; index < context.week.shadowing.length; index++) {
    const line = context.week.shadowing[index]!;
    const feedback = el("p", { class: "feedback" }, [""]);

    context.root.replaceChildren(
      el("main", { class: "block" }, [
        header(
          "Nói theo",
          line.focusVi,
          `Mở miệng · ${index + 1}/${context.week.shadowing.length}`,
        ),
        el("section", { class: "card" }, [el("p", { class: "card__prompt" }, [line.text])]),
        feedback,
      ]),
    );

    await speak(line.text, { rate: context.audioRate });
    const attempt = await captureAttempt(context, feedback);
    attempted++;
    latencies.push(attempt.latencyMs);
    if (attempt.spoken) correct++;

    feedback.textContent = speedFeedback(attempt.spoken, attempt.latencyMs);
    await wait(500);
  }

  // --- scripted role-play (Zone A — no model call, works offline, §12.1) ---
  const script = context.week.roleplay;
  let turnId: string | null = script.startTurnId;
  let turnsTaken = 0;

  while (turnId) {
    const turn = getTurn(script, turnId);
    if (!turn) break;

    const said = await runRoleplayTurn(context, turn, turnsTaken);
    attempted++;
    if (said.spoken) correct++;
    if (said.latencyMs > 0) latencies.push(said.latencyMs);

    turnId = matchBranch(turn, said.transcript);
    turnsTaken++;
    // A script that loops on itself would trap the learner in the block.
    if (turnsTaken > script.turns.length * 2) break;
  }

  return {
    kind: "speaking",
    completed: true,
    seconds: Math.round((Date.now() - startedAt) / 1000),
    itemsAttempted: attempted,
    itemsCorrect: correct,
    avgLatencyMs: average(latencies),
  };
}

async function runRoleplayTurn(
  context: BlockContext,
  turn: { say: string; sayVi: string; hints: string[] },
  index: number,
): Promise<{ spoken: boolean; latencyMs: number; transcript: string }> {
  const hintBox = el("div", { class: "hints", hidden: true }, [
    ...turn.hints.map((hint) => el("p", { class: "hints__line" }, [hint])),
    el("p", { class: "hints__vi" }, [turn.sayVi]),
  ]);

  const feedback = el("p", { class: "feedback" }, [""]);

  const helpButton = el(
    "button",
    {
      class: "btn btn--ghost",
      type: "button",
      onclick: () => hintBox.removeAttribute("hidden"),
    },
    ["Gợi ý"],
  );

  context.root.replaceChildren(
    el("main", { class: "block" }, [
      header(context.week.roleplay.titleVi, context.week.roleplay.goalVi, `Đóng vai · lượt ${index + 1}`),
      el("section", { class: "dialogue" }, [
        el("p", { class: "dialogue__who" }, ["Anna"]),
        el("p", { class: "dialogue__say" }, [turn.say]),
      ]),
      hintBox,
      feedback,
      helpButton,
    ]),
  );

  await speak(turn.say, { rate: context.audioRate });

  // Recognition gives us the words needed to pick a branch. Where it is not
  // available, the learner taps the reply they said — a worse experience, but
  // the conversation still moves.
  if (context.micReady && recognitionSupported()) {
    const heard = await recognizeSpeech();
    if (heard && heard.transcript.length > 0) {
      feedback.textContent = `Bạn nói: "${heard.transcript}"`;
      await wait(700);
      return { spoken: true, latencyMs: heard.latencyMs, transcript: heard.transcript };
    }
  }

  // The hint box stays closed here on purpose: the choice buttons below are the
  // same sentences, and showing both makes the screen look twice as busy as it
  // is. "Gợi ý" still reveals the Vietnamese gloss for anyone who wants it.
  return new Promise((resolve) => {
    const choices = turn.hints.map((hint) =>
      el(
        "button",
        {
          class: "btn btn--choice",
          type: "button",
          onclick: () => resolve({ spoken: true, latencyMs: 0, transcript: hint }),
        },
        [hint],
      ),
    );
    const skip = el(
      "button",
      {
        class: "btn btn--ghost",
        type: "button",
        onclick: () => resolve({ spoken: false, latencyMs: 0, transcript: "" }),
      },
      ["Bỏ qua lượt này"],
    );
    feedback.replaceChildren(
      el("p", { class: "block__hint" }, ["Nói to câu bạn chọn, rồi bấm vào câu đó"]),
      el("div", { class: "stack" }, [...choices, skip]),
    );
  });
}

// --- block 4: quick review ---------------------------------------------------

/**
 * Five minutes closing the session (§5.2).
 *
 * Vietnamese in, English out — the direction that proves the phrase is actually
 * available, not merely recognisable.
 */
export async function runReviewBlock(
  context: BlockContext,
  deck: readonly ReviewCard[],
): Promise<BlockResult> {
  const startedAt = Date.now();

  // Whatever was seen most recently, hardest first.
  const candidates = deck
    .filter((card) => card.direction === "production" && !card.retiredOn)
    .sort((a, b) => b.consecutiveFailures - a.consecutiveFailures)
    .slice(0, 10);

  let attempted = 0;
  let correct = 0;
  const latencies: number[] = [];

  for (let index = 0; index < candidates.length; index++) {
    const card = candidates[index]!;
    const item = findVocabItem(card.itemId);
    if (!item) continue;

    const feedback = el("p", { class: "feedback" }, [""]);
    context.root.replaceChildren(
      el("main", { class: "block" }, [
        header("Chốt lại", "Nói bằng tiếng Anh", `Ôn nhanh · ${index + 1}/${candidates.length}`),
        el("section", { class: "card" }, [el("p", { class: "card__prompt" }, [item.meaningVi])]),
        feedback,
      ]),
    );

    const attempt = await captureAttempt(context, feedback);
    attempted++;
    latencies.push(attempt.latencyMs);
    if (attempt.spoken) correct++;

    feedback.textContent = item.phrase;
    await speak(item.phrase, { rate: context.audioRate });
    await wait(400);
  }

  stopSpeaking();

  return {
    kind: "review",
    completed: candidates.length > 0,
    seconds: Math.round((Date.now() - startedAt) / 1000),
    itemsAttempted: attempted,
    itemsCorrect: correct,
    avgLatencyMs: average(latencies),
  };
}

function average(values: readonly number[]): number | null {
  if (values.length === 0) return null;
  return Math.round(values.reduce((total, value) => total + value, 0) / values.length);
}
