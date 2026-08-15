/**
 * The placement screen (curriculum §4).
 *
 * §4.1 sets the tone rule: the learner sees "nói chuyện với app 7 phút", never
 * the word test, no score at the end, and no way to fail. What they get back is
 * a starting point, phrased as a plan rather than a verdict.
 */

import {
  LISTENING_LADDER,
  OPEN_QUESTIONS,
  PLACEMENT_ROLEPLAY,
  READ_ALOUD,
} from "../content/placement";
import {
  scoreCommunication,
  scoreListening,
  scoreOpenAnswers,
  scorePlacement,
  scoreReadAloud,
} from "../domain/placement";
import type { OpenAnswer, PlacementResult, ReadAloudAttempt } from "../domain/placement";
import {
  listenForSpeechOnset,
  recognitionSupported,
  recognizeSpeech,
  speak,
  stopSpeaking,
} from "../platform/speech";
import { el, mount } from "./dom";

type Ctx = { root: HTMLElement; micReady: boolean };

function screen(step: string, title: string, body: Node[]): HTMLElement {
  return el("main", { class: "block" }, [
    el("div", { class: "block__head" }, [
      el("p", { class: "block__step" }, [step]),
      el("h1", { class: "block__title" }, [title]),
    ]),
    ...body,
  ]);
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Same degraded path as the lesson: no mic means tapping, never a dead end. */
async function attempt(ctx: Ctx, host: HTMLElement): Promise<{ spoken: boolean; latencyMs: number }> {
  if (ctx.micReady) {
    const heard = await listenForSpeechOnset();
    if (!heard.degraded) return { spoken: heard.spoken, latencyMs: heard.latencyMs };
  }
  return new Promise((resolve) => {
    host.replaceChildren(
      el("div", { class: "stack" }, [
        el(
          "button",
          { class: "btn", type: "button", onclick: () => resolve({ spoken: true, latencyMs: 2500 }) },
          ["Tôi nói được"],
        ),
        el(
          "button",
          {
            class: "btn btn--ghost",
            type: "button",
            onclick: () => resolve({ spoken: false, latencyMs: 8000 }),
          },
          ["Chưa nói được"],
        ),
      ]),
    );
  });
}

function askChoice(
  ctx: Ctx,
  promptText: string,
  options: readonly string[],
  answerIndex: number,
  onReplay: () => void,
): Promise<boolean> {
  return new Promise((resolve) => {
    const buttons = options.map((option, index) =>
      el(
        "button",
        {
          class: "btn btn--choice",
          type: "button",
          onclick: () => {
            // No right/wrong feedback during placement: this is a measurement,
            // and marking someone wrong six times before they have started is
            // exactly the discouragement §4.1 is trying to avoid.
            for (const button of buttons) button.setAttribute("disabled", "");
            resolve(index === answerIndex);
          },
        },
        [option],
      ),
    );

    mount(
      ctx.root,
      screen("Nghe thử", promptText, [
        el("div", { class: "stack" }, buttons),
        el("button", { class: "btn btn--ghost", type: "button", onclick: onReplay }, [
          "Nghe lại",
        ]),
      ]),
    );
  });
}

/**
 * Runs the five parts and returns the result, or null if the learner backed out.
 */
export async function runPlacement(ctx: Ctx): Promise<PlacementResult | null> {
  // --- part 1: warm-up, and the only chance to leave ---
  const begin = await new Promise<boolean>((resolve) => {
    mount(
      ctx.root,
      screen("Trước khi bắt đầu", "Nói chuyện với app 7 phút", [
        el("p", { class: "block__sub" }, [
          "Để app biết nên bắt đầu từ đâu cho vừa sức bác. Không có điểm, không có đúng sai — cứ trả lời thoải mái.",
        ]),
        el("div", { class: "stack" }, [
          el("button", { class: "btn", type: "button", onclick: () => resolve(true) }, [
            "Bắt đầu",
          ]),
          el(
            "button",
            { class: "btn btn--ghost", type: "button", onclick: () => resolve(false) },
            ["Để lúc khác"],
          ),
        ]),
      ]),
    );
  });
  if (!begin) return null;

  // --- part 2: read six sentences aloud ---
  const readAloud: ReadAloudAttempt[] = [];
  for (let i = 0; i < READ_ALOUD.length; i++) {
    const sentence = READ_ALOUD[i]!;
    const host = el("div", { class: "feedback" }, [""]);

    mount(
      ctx.root,
      screen(`Đọc to · ${i + 1}/${READ_ALOUD.length}`, "Đọc câu này thành tiếng", [
        el("section", { class: "card" }, [el("p", { class: "card__prompt" }, [sentence.text])]),
        host,
      ]),
    );

    await speak(sentence.text, { rate: 0.9 });
    readAloud.push(await attempt(ctx, host));
    await wait(250);
  }

  // --- part 3: the listening ladder ---
  const listening: { rate: number; correct: boolean }[] = [];
  for (const clip of LISTENING_LADDER) {
    const play = () => void speak(clip.text, { rate: clip.rate });
    play();
    await wait(600);
    const correct = await askChoice(ctx, clip.promptVi, clip.options, clip.answerIndex, play);
    listening.push({ rate: clip.rate, correct });
  }

  // --- part 4: four open questions ---
  const open: OpenAnswer[] = [];
  for (let i = 0; i < OPEN_QUESTIONS.length; i++) {
    const question = OPEN_QUESTIONS[i]!;
    const host = el("div", { class: "feedback" }, [""]);

    mount(
      ctx.root,
      screen(`Trả lời · ${i + 1}/${OPEN_QUESTIONS.length}`, question.ask, [
        el("p", { class: "block__sub" }, [question.askVi]),
        el("p", { class: "block__hint" }, ["Nói bao nhiêu cũng được, dài ngắn tuỳ bác."]),
        host,
      ]),
    );

    await speak(question.ask, { rate: 0.95 });

    // Word count needs the words, so use recognition where it exists; the onset
    // timing still works either way.
    if (ctx.micReady && recognitionSupported()) {
      const heard = await recognizeSpeech({ deadlineMs: 15000 });
      if (heard) {
        open.push({
          rung: question.rung,
          spoken: heard.spoken,
          wordCount: heard.transcript.split(/\s+/).filter(Boolean).length,
          latencyMs: heard.latencyMs,
        });
        continue;
      }
    }

    const spoke = await attempt(ctx, host);
    open.push({
      rung: question.rung,
      spoken: spoke.spoken,
      // Without a transcript, assume a minimal answer rather than a generous
      // one — overstating here would start the learner too far along.
      wordCount: spoke.spoken ? question.rung * 2 : 0,
      latencyMs: spoke.latencyMs,
    });
  }

  // --- part 5: three-turn role-play ---
  let achieved = 0;
  for (const turn of PLACEMENT_ROLEPLAY) {
    const host = el("div", { class: "feedback" }, [""]);

    mount(
      ctx.root,
      screen("Thử một tình huống", "Bác đang gọi đồ ở quán cà phê", [
        el("section", { class: "dialogue" }, [
          el("p", { class: "dialogue__who" }, ["Nhân viên"]),
          el("p", { class: "dialogue__say" }, [turn.say]),
        ]),
        el("p", { class: "block__sub" }, [turn.sayVi]),
        host,
      ]),
    );

    await speak(turn.say, { rate: 0.95 });

    if (ctx.micReady && recognitionSupported()) {
      const heard = await recognizeSpeech();
      const said = heard?.transcript ?? "";
      const padded = ` ${said.replace(/[^a-z0-9' ]+/gi, " ").toLowerCase().trim()} `;
      if (turn.keywords.some((keyword) => padded.includes(` ${keyword} `))) achieved++;
      continue;
    }

    const spoke = await attempt(ctx, host);
    if (spoke.spoken) achieved++;
  }

  stopSpeaking();

  return scorePlacement({
    pronunciation: scoreReadAloud(readAloud),
    listening: scoreListening(listening),
    speaking: scoreOpenAnswers(open),
    communication: scoreCommunication(achieved, PLACEMENT_ROLEPLAY.length),
  });
}

/**
 * Shows where the learner will start.
 *
 * Deliberately no score and no level name (§4.1): a number here is a verdict,
 * and the useful information is simply where to begin.
 */
export function renderPlacementOutcome(
  root: HTMLElement,
  result: PlacementResult,
  onContinue: () => void,
): void {
  const pace =
    result.listeningTrack < result.track
      ? "App sẽ cho bác nghe chậm hơn một chút lúc đầu, rồi nhanh dần."
      : "Tốc độ nghe sẽ tăng dần theo từng tuần.";

  mount(
    root,
    screen("Xong rồi", "App đã biết nên bắt đầu từ đâu", [
      el("section", { class: "panel" }, [
        el("p", { class: "panel__label" }, ["Bác sẽ bắt đầu ở"]),
        el("p", { class: "panel__stat" }, [`Tuần ${result.startWeek}`]),
        el("p", { class: "panel__note" }, [pace]),
      ]),
      el("p", { class: "block__sub" }, [
        "Sau vài buổi, app sẽ tự chỉnh lại cho vừa sức — không cần làm lại bài này.",
      ]),
      el("button", { class: "btn", type: "button", onclick: onContinue }, ["Vào học"]),
    ]),
  );
}
