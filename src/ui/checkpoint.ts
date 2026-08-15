/**
 * The checkpoint screens (curriculum §6).
 *
 * A checkpoint is not a lesson: nothing is taught, nothing is retried, and the
 * learner is told at the end how it went. It reuses the ordinary drills rather
 * than inventing new ones, because a test made of unfamiliar exercises measures
 * how well someone reads instructions.
 *
 * The tone is the design constraint. §15 names discouragement as the failure
 * mode that ends the course, and a test is exactly where a 60-year-old beginner
 * is most likely to decide they are too old for this. So: it says how long it
 * will take before starting, it never says "wrong", and a fail is phrased as
 * more practice.
 */

import { el, mount } from "./dom";
import {
  askChoice,
  captureAttempt,
  header,
  runSpeakingBlock,
  shuffleWithAnswer,
} from "./blocks";
import type { BlockContext } from "./blocks";
import {
  CHECKPOINTS,
  draw,
  judgeCheckpoint,
  outcomeMessageVi,
  weeksCovered,
} from "../domain/checkpoint";
import type { CheckpointKind, CheckpointResults, CheckpointSpec } from "../domain/checkpoint";
import { getWeek } from "../content";
import type { ShadowingLine } from "../content/types";

export type CheckpointOutcome = {
  passed: boolean;
  extraWeeks: number;
};

/** Gathers the drawn material for a test from the weeks its phase covered. */
function materialFor(spec: CheckpointSpec, random: () => number) {
  const weeks = weeksCovered(spec).map(getWeek).filter((week) => week !== undefined);

  const shadowing = spec.shadowing
    ? draw(
        weeks.flatMap((week) => week!.shadowing),
        spec.shadowing.count,
        random,
      )
    : [];

  // Gap-fills come from the listening passages: the third round of the ordinary
  // listening block, which is the one that tests the exact words (§5.2).
  const gaps = spec.listening
    ? draw(
        weeks.flatMap((week) =>
          week!.listening.gaps.map((gap) => ({ gap, passage: week!.listening })),
        ),
        spec.listening.count,
        random,
      )
    : [];

  // Whole scenarios, not loose turns: §6 asks for three role-plays, and a
  // role-play is a conversation carried to its goal rather than three replies
  // lifted out of three different ones.
  const roleplays = spec.roleplay
    ? draw(
        weeks.filter((week) => week!.roleplay.turns.length > 0),
        spec.roleplay.count,
        random,
      )
    : [];

  return { shadowing, gaps, roleplays };
}

function intro(spec: CheckpointSpec, onStart: () => void): HTMLElement {
  const parts: string[] = [];
  if (spec.shadowing) parts.push(`${spec.shadowing.count} câu đọc theo`);
  if (spec.listening) parts.push(`${spec.listening.count} câu nghe`);
  if (spec.roleplay) parts.push(`${spec.roleplay.count} tình huống hội thoại`);

  return el("section", { class: "block" }, [
    el("p", { class: "block__step" }, [`Khoảng ${spec.minutes} phút`]),
    el("h1", { class: "block__title" }, [spec.titleVi]),
    el("p", { class: "block__lead" }, [`Gồm ${parts.join(", ")}.`]),
    // Said before the test, not after it. Knowing beforehand that a bad result
    // costs nothing is what makes it possible to try properly.
    el("p", { class: "block__note" }, [
      "Làm không tốt cũng không sao — mình chỉ học thêm ít tuần nữa rồi kiểm tra lại.",
    ]),
    el("button", { class: "btn", type: "button", onclick: () => onStart() }, ["Bắt đầu"]),
  ]);
}

async function runShadowing(
  context: BlockContext,
  lines: readonly ShadowingLine[],
): Promise<number[]> {
  const scores: number[] = [];

  for (const [index, line] of lines.entries()) {
    const feedback = el("p", { class: "feedback" }, [""]);
    mount(
      context.root,
      el("section", { class: "block" }, [
        header("Đọc theo", line.focusVi, `${index + 1}/${lines.length}`),
        el("p", { class: "phrase" }, [line.text]),
        feedback,
      ]),
    );

    const attempt = await captureAttempt(context, feedback, line.text);
    // An unscorable attempt counts as a miss rather than being dropped: a test
    // that silently skips what it could not hear would report a score based on
    // fewer phrases than it claims.
    scores.push(attempt.pronunciationScore ?? 0);
  }

  return scores;
}

/**
 * Runs a checkpoint and returns what to do about it.
 *
 * Resolves only when the learner has seen the result, so the caller can settle
 * the profile knowing the outcome was actually shown.
 */
export async function runCheckpoint(
  context: BlockContext,
  kind: CheckpointKind,
  random: () => number = Math.random,
): Promise<CheckpointOutcome> {
  const spec = CHECKPOINTS.find((entry) => entry.kind === kind)!;
  const material = materialFor(spec, random);

  await new Promise<void>((resolve) => {
    mount(context.root, intro(spec, resolve));
  });

  const results: CheckpointResults = {
    shadowingScores: [],
    listeningCorrect: 0,
    roleplaysCompleted: 0,
  };

  if (material.shadowing.length > 0) {
    results.shadowingScores = await runShadowing(context, material.shadowing);
  }

  for (const [index, { gap, passage }] of material.gaps.entries()) {
    mount(
      context.root,
      el("section", { class: "block" }, [
        header("Nghe và chọn", passage.titleVi, `${index + 1}/${material.gaps.length}`),
      ]),
    );
    // Distractors come from the other gaps in the same passage, so the choice
    // is between plausible words rather than between a word and obvious noise.
    const { options, answerIndex } = shuffleWithAnswer(
      gap.answer,
      passage.gaps.map((other) => other.answer),
    );
    const correct = await askChoice(
      context,
      `${gap.before} ___ ${gap.after}`,
      options,
      answerIndex,
    );
    if (correct) results.listeningCorrect += 1;
  }

  for (const [index, week] of material.roleplays.entries()) {
    mount(
      context.root,
      el("section", { class: "block" }, [
        header("Tình huống", week!.titleVi, `${index + 1}/${material.roleplays.length}`),
      ]),
    );

    // The ordinary speaking block, pointed at a drawn week. Reusing it rather
    // than walking the turns here is what keeps the test honest: the script
    // branches on what the learner says, and a linear walk would be a different
    // conversation from the one they practised. Hints follow that week's level
    // too, so a phase-2 scenario is as bare in the test as it was in the lesson.
    const scoped: BlockContext = { ...context, week: week! };
    const result = await runSpeakingBlock(scoped);

    // Carried it, rather than every turn perfect: §6 asks whether the goal was
    // reached without falling back to Vietnamese.
    const needed = Math.ceil(result.itemsAttempted * 0.7);
    if (result.itemsAttempted > 0 && result.itemsCorrect >= needed) {
      results.roleplaysCompleted += 1;
    }
  }

  const verdict = judgeCheckpoint(spec, results);

  await new Promise<void>((resolve) => {
    mount(
      context.root,
      el("section", { class: "block" }, [
        el("h1", { class: "block__title" }, [
          // Finishing the whole course is the one moment this app is allowed to
          // make a fuss about.
          kind === "C" && verdict.passed ? "Bác học xong rồi" : "Xong rồi",
        ]),
        ...verdict.linesVi.map((line) => el("p", { class: "block__lead" }, [line])),
        el("p", { class: "block__note" }, [outcomeMessageVi(spec, verdict)]),
        el("button", { class: "btn", type: "button", onclick: () => resolve() }, ["Tiếp"]),
      ]),
    );
  });

  return { passed: verdict.passed, extraWeeks: verdict.extraWeeks };
}
