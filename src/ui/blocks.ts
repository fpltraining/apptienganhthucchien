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
import { advanceRoleplay, findVocabItem, getTurn, hintsToShow } from "../content";
import type { RoleplayProgress, RoleplayTurn } from "../content";
import { el } from "./dom";
import {
  listenForSpeechOnset,
  recognitionSupported,
  recognizeSpeech,
  speak,
  stopSpeaking,
} from "../platform/speech";
import { feedbackFor, scoreAttempt } from "../domain/pronunciation";
import { createConversationProvider } from "../platform/conversation";
import type { ConversationTurn } from "../platform/conversation";

export type BlockContext = {
  root: HTMLElement;
  week: WeekContent;
  /** Playback speed for listening material; rises as the ear improves (§5.2). */
  audioRate: number;
  /** False when the microphone was refused; blocks fall back to tapping. */
  micReady: boolean;
  /**
   * How long to wait for the learner to start speaking, from the week's clock
   * setting (§giai đoạn 3). Falls back to the eight-second default.
   */
  deadlineMs: number;
  /** Voice for this week's speaker, when it has an accent to teach. */
  voiceLang: string | undefined;
  /**
   * Called for every scored attempt, in any block, so the session can build the
   * trouble-word list (§9.2). Attempts we could not score are not reported:
   * silence is not evidence about a sound.
   */
  onAttemptScored?: (attempt: CapturedAttempt) => void;
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

/**
 * One line of feedback covering both halves of an attempt (§9.3).
 *
 * Pronunciation leads when we have it, because "which words did not come out"
 * is more useful to act on than "that took four seconds". Speed is the fallback
 * for attempts we could only time. Still no numbers in phase 1.
 */
function attemptFeedback(attempt: CapturedAttempt): string {
  if (!attempt.spoken) return "Chưa nghe thấy — không sao, mai nói lại nhé.";
  if (attempt.pronunciationScore === null) {
    return speedFeedback(attempt.spoken, attempt.latencyMs);
  }

  const words = feedbackFor(attempt.pronunciationScore);
  if (attempt.missed.length > 0 && attempt.pronunciationScore < 85) {
    // Only the first two: a list of every word that slipped reads as a telling
    // off, and two is enough to practise.
    return `${words} Chú ý: ${attempt.missed.slice(0, 2).join(", ")}`;
  }
  return words;
}

/**
 * Playback settings for this week: speed from placement, voice from the week.
 *
 * Gathered in one place so every `speak` call in the file carries the accent —
 * a week that teaches an Indian-English ear does not do it if half the audio
 * comes out in the device default.
 */
function speakOptions(context: BlockContext): { rate: number; lang?: string } {
  return context.voiceLang === undefined
    ? { rate: context.audioRate }
    : { rate: context.audioRate, lang: context.voiceLang };
}

/**
 * The microphone, drawn as a state rather than an icon.
 *
 * The learner has to be able to tell, without reading, whether the app is
 * listening right now — that is the single most confusing moment in a speaking
 * app. The ring fills and the level bars move while it listens, and both stop
 * when it is not.
 */
function micPanel(listening: boolean, label: string): HTMLElement {
  return el("div", { class: "mic", "data-listening": listening ? "true" : "false" }, [
    el("span", { class: "mic__ring" }, [
      el(
        "span",
        { class: "mic__bars", "aria-hidden": "true" },
        [0, 1, 2, 3, 4, 5].map(() => el("i", {}, [])),
      ),
    ]),
    el("p", { class: "mic__state" }, [label]),
  ]);
}

/**
 * The response clock: a bar that empties over the week's deadline.
 *
 * Not a number counting down. Phase 3 tightens this to three seconds, and
 * three digits ticking down at someone mid-sentence is the surest way to make
 * them lose the sentence. It runs out to grey — there is no red here, the same
 * as everywhere else.
 */
function responseClock(deadlineMs: number): HTMLElement {
  const fill = el("span", { class: "clock__fill" }, []);
  const clock = el("div", { class: "clock" }, [
    el("div", { class: "clock__track" }, [fill]),
    el("p", { class: "clock__label" }, [`${Math.round(deadlineMs / 1000)} giây để bắt đầu nói`]),
  ]);

  // Started on the next frame so the transition has a "from" value to animate
  // out of; set in the same frame and the bar would simply appear empty.
  requestAnimationFrame(() => {
    fill.style.transition = `transform ${deadlineMs}ms linear`;
    fill.style.transform = "scaleX(0)";
  });

  return clock;
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
          el(
            "p",
            { class: isProduction ? "card__prompt" : "card__prompt card__prompt--en" },
            [prompt],
          ),
          answer,
          el("p", { class: "card__situation" }, [item.situation]),
        ]),
        feedback,
        el("p", { class: "block__hint" }, [
          context.micReady ? "" : "Nói to lên rồi bấm nút bên dưới",
        ]),
      ]),
    );

    // Recognition cards hear the phrase first; production cards must not, or
    // there is nothing left to produce.
    if (!isProduction) await speak(item.phrase, speakOptions(context));

    const attempt = await captureAttempt(context, feedback, item.phrase);
    attempted++;
    latencies.push(attempt.latencyMs);

    const graded = reviewCard(card, {
      spoken: attempt.spoken,
      latencyMs: attempt.latencyMs,
      pronunciationScore: attempt.pronunciationScore,
    });
    if (attempt.spoken) correct++;
    options.onCardReviewed(graded.card);

    answer.textContent = item.meaningVi;
    feedback.textContent = attemptFeedback(attempt);
    // Always let them hear the model pronunciation after trying, which is the
    // "nghe lại giọng mẫu" habit §9.3 relies on.
    await speak(item.phrase, speakOptions(context));
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

export type CapturedAttempt = {
  spoken: boolean;
  latencyMs: number;
  /** 0–100, or null when nothing was heard well enough to score (§9). */
  pronunciationScore: number | null;
  /** Target words that did not come through, for the trouble-word list. */
  missed: string[];
};

/**
 * Waits for the learner to speak, or for them to say they did.
 *
 * Given a `target` phrase and a working recogniser, this listens for the words
 * and scores them; otherwise it falls back to timing the onset of speech alone.
 * Both paths are real attempts — an unscored one grades on latency and is
 * capped at Good by `gradeAttempt`, which is the honest ceiling for speech we
 * did not hear.
 *
 * The tap fallback is a worse measurement again and is treated as one: it
 * records a neutral latency rather than timing the tap, because timing how fast
 * someone finds a button after speaking would poison the headline metric of §3.
 */
async function captureAttempt(
  context: BlockContext,
  feedback: HTMLElement,
  target?: string,
): Promise<CapturedAttempt> {
  if (context.micReady) {
    feedback.replaceChildren(
      micPanel(true, "Đang nghe bác nói…"),
      responseClock(context.deadlineMs),
    );
  }

  if (context.micReady && target && recognitionSupported()) {
    const heard = await recognizeSpeech({ deadlineMs: context.deadlineMs });
    // A null answer means the recogniser is unavailable, so onset timing below
    // is still worth a try. A result with no words means the learner was
    // silent — asking them to wait through a second eight-second listen would
    // only make a missed card take twice as long.
    if (heard) {
      const scored = heard.transcript ? scoreAttempt(target, heard.transcript) : null;
      const usable = scored !== null && scored.confidence === "normal";
      const attempt: CapturedAttempt = {
        spoken: heard.transcript.length > 0,
        latencyMs: heard.latencyMs,
        // A low-confidence reading is left unscored rather than counted: one or
        // two words back from the recogniser is not evidence about a phrase.
        pronunciationScore: usable ? scored.score : null,
        missed: usable ? scored.missed : [],
      };
      if (usable) context.onAttemptScored?.(attempt);
      return attempt;
    }
  }

  if (context.micReady) {
    const heard = await listenForSpeechOnset({ deadlineMs: context.deadlineMs });
    if (!heard.degraded) {
      return {
        spoken: heard.spoken,
        latencyMs: heard.latencyMs,
        pronunciationScore: null,
        missed: [],
      };
    }
  }

  return new Promise((resolve) => {
    const said = el(
      "button",
      {
        class: "btn",
        type: "button",
        onclick: () =>
          resolve({ spoken: true, latencyMs: 2500, pronunciationScore: null, missed: [] }),
      },
      ["Bác nói được rồi"],
    );
    const missed = el(
      "button",
      {
        class: "btn btn--ghost",
        type: "button",
        onclick: () =>
          resolve({
            spoken: false,
            latencyMs: context.deadlineMs,
            pronunciationScore: null,
            missed: [],
          }),
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
      // A line may carry its own accent, overriding the week's. That is the
      // whole exercise in the accent gauntlet, where each speaker sounds
      // different and the content is deliberately familiar.
      const lang = line.lang ?? context.voiceLang;
      await speak(line.text, lang === undefined ? { rate } : { rate, lang });
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
          class: "btn btn--choice btn--choice--en",
          type: "button",
          onclick: () => {
            const right = index === answerIndex;
            feedback.textContent = right ? "Đúng rồi." : "Chưa đúng.";

            // Mark both the chosen answer and the correct one. Disabling the
            // buttons alone leaves the learner unable to see which one they
            // picked, which makes a wrong answer impossible to learn from.
            for (const [position, button] of buttons.entries()) {
              button.setAttribute("disabled", "");
              if (position === answerIndex) button.classList.add("is-correct");
              if (position === index && !right) button.classList.add("is-wrong");
            }

            setTimeout(() => resolve(right), right ? 700 : 1900);
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
        el("section", { class: "card" }, [
          el("p", { class: "card__prompt card__prompt--en" }, [line.text]),
        ]),
        feedback,
      ]),
    );

    await speak(line.text, speakOptions(context));
    const attempt = await captureAttempt(context, feedback, line.text);
    attempted++;
    latencies.push(attempt.latencyMs);
    if (attempt.spoken) correct++;

    feedback.textContent = attemptFeedback(attempt);
    await wait(500);
  }

  // --- scripted role-play (Zone A — no model call, works offline, §12.1) ---
  const script = context.week.roleplay;
  let turnId: string | null = script.startTurnId;
  let turnsTaken = 0;
  const progress: RoleplayProgress = { surpriseUsed: false };

  while (turnId) {
    const turn = getTurn(script, turnId);
    if (!turn) break;

    const said = await runRoleplayTurn(context, turn, turnsTaken);
    attempted++;
    if (said.spoken) correct++;
    if (said.latencyMs > 0) latencies.push(said.latencyMs);

    turnId = advanceRoleplay(script, turn, said.transcript, progress);
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
  turn: RoleplayTurn,
  index: number,
): Promise<{ spoken: boolean; latencyMs: number; transcript: string }> {
  // From week 12 this is a couple of keywords rather than the whole sentence,
  // and later still it is nothing at all. The Vietnamese gloss of what the
  // other person just said stays at every level — that is comprehension help,
  // not a crutch for producing the reply.
  const shown = hintsToShow(context.week.roleplay, turn);
  const hintBox = el("div", { class: "hints", hidden: true }, [
    ...shown.map((hint) => el("p", { class: "hints__line" }, [hint])),
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

  await speak(turn.say, speakOptions(context));

  // Recognition gives us the words needed to pick a branch. Where it is not
  // available, the learner taps the reply they said — a worse experience, but
  // the conversation still moves.
  if (context.micReady && recognitionSupported()) {
    const heard = await recognizeSpeech({ deadlineMs: context.deadlineMs });
    if (heard && heard.transcript.length > 0) {
      feedback.replaceChildren(
        el("span", { class: "heard" }, ["Bác nói: "]),
        el("span", { class: "heard__words" }, [heard.transcript]),
      );
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
          class: "btn btn--choice btn--choice--en",
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
      el("p", { class: "block__hint" }, ["Nói to câu bác chọn, rồi bấm vào câu đó"]),
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

    const attempt = await captureAttempt(context, feedback, item.phrase);
    attempted++;
    latencies.push(attempt.latencyMs);
    if (attempt.spoken) correct++;

    feedback.replaceChildren(el("span", { class: "answer-en" }, [item.phrase]));
    await speak(item.phrase, speakOptions(context));
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

// --- block 5: free talk (Zone B) ---------------------------------------------

/** How many exchanges the closing free-talk runs for (§12.3 budget). */
const FREE_TALK_TURNS = 6;

/**
 * Five minutes of unscripted conversation to close the session (§12.1).
 *
 * The only part of the app that calls a model, and the only part that costs
 * money. It is also the only part allowed to be skipped: when the backend is
 * unconfigured, offline or out of quota, the scripted provider answers instead
 * and the learner is never shown a failure.
 */
export async function runFreeTalkBlock(
  context: BlockContext,
  options: { accountId: string; phase: number },
): Promise<BlockResult> {
  const startedAt = Date.now();
  const provider = createConversationProvider();

  const knownPhrases = context.week.vocabulary.map((item) => item.phrase);
  const situation = context.week.roleplay.titleVi;

  const history: ConversationTurn[] = [];
  let attempted = 0;
  let spoken = 0;
  const latencies: number[] = [];

  for (let turn = 0; turn < FREE_TALK_TURNS; turn++) {
    const said = turn === 0 ? "Hello." : history[history.length - 1]?.text ?? "Hello.";

    const reply = await provider.reply({
      accountId: options.accountId,
      situation,
      phase: options.phase,
      history: [...history],
      userText: said,
      knownPhrases,
    });
    history.push({ role: "assistant", text: reply.text });

    const feedback = el("p", { class: "feedback" }, [""]);
    context.root.replaceChildren(
      el("main", { class: "block" }, [
        header("Nói tự do", "Trả lời thoải mái, sai cũng không sao", `Nói chuyện · ${turn + 1}/${FREE_TALK_TURNS}`),
        el("section", { class: "dialogue" }, [
          el("p", { class: "dialogue__who" }, ["Anna"]),
          el("p", { class: "dialogue__say" }, [reply.text]),
        ]),
        feedback,
      ]),
    );

    await speak(reply.text, speakOptions(context));

    let userText = "";
    let heardSomething = false;
    let latency = context.deadlineMs;

    if (context.micReady && recognitionSupported()) {
      const heard = await recognizeSpeech({ deadlineMs: context.deadlineMs });
      if (heard) {
        userText = heard.transcript;
        heardSomething = heard.spoken;
        latency = heard.latencyMs;
      }
    }

    if (!heardSomething) {
      const attempt = await captureAttempt(context, feedback);
      heardSomething = attempt.spoken;
      latency = attempt.latencyMs;
      // Without a transcript there is nothing to send back, so the
      // conversation continues from the assistant's own last line.
      if (!userText) userText = heardSomething ? "Yes." : "Sorry, I don't understand.";
    }

    history.push({ role: "user", text: userText });
    attempted++;
    latencies.push(latency);
    if (heardSomething) spoken++;
  }

  stopSpeaking();

  return {
    kind: "freeTalk",
    completed: attempted > 0,
    seconds: Math.round((Date.now() - startedAt) / 1000),
    itemsAttempted: attempted,
    itemsCorrect: spoken,
    avgLatencyMs: average(latencies),
  };
}

function average(values: readonly number[]): number | null {
  if (values.length === 0) return null;
  return Math.round(values.reduce((total, value) => total + value, 0) / values.length);
}
