/**
 * The three checkpoint tests (curriculum §6, §7).
 *
 * Test A closes phase 1 at week 8, B closes phase 2 at week 17, C closes the
 * course at week 26. Each one asks the same question in a harder form: can this
 * learner actually do the thing the phase was for.
 *
 * The rule that matters most here is what happens on a fail. The curriculum's
 * answer is to spend two more weeks on the phase, not to bar the learner or
 * reset them — a checkpoint is a measurement, and the only thing a bad
 * measurement should buy is more practice at the thing being measured.
 */

export type CheckpointKind = "A" | "B" | "C";

export type CheckpointSpec = {
  kind: CheckpointKind;
  /** The week this test is taken at the end of. */
  afterWeek: number;
  titleVi: string;
  /** Minutes it should take, so the learner knows before starting. */
  minutes: number;
  /** Phrases to shadow, and the pronunciation score each must reach. */
  shadowing: { count: number; minScore: number } | null;
  /** Listening gap-fills, and how many must be right. */
  listening: { count: number; minCorrect: number } | null;
  /** Role-plays that must reach their goal. */
  roleplay: { count: number } | null;
};

export const CHECKPOINTS: readonly CheckpointSpec[] = [
  {
    kind: "A",
    afterWeek: 8,
    titleVi: "Kiểm tra cuối giai đoạn 1",
    minutes: 15,
    shadowing: { count: 20, minScore: 70 },
    listening: { count: 15, minCorrect: 12 },
    roleplay: null,
  },
  {
    kind: "B",
    afterWeek: 17,
    titleVi: "Kiểm tra cuối giai đoạn 2",
    minutes: 20,
    shadowing: null,
    listening: null,
    // Three situations drawn at random: the point of phase 2 is handling a
    // conversation, not reciting one that was revised the night before.
    roleplay: { count: 3 },
  },
  {
    kind: "C",
    afterWeek: 26,
    titleVi: "Kiểm tra cuối khoá",
    minutes: 25,
    shadowing: null,
    listening: null,
    roleplay: { count: 2 },
  },
];

/** The checkpoint owed at the end of a week, if any. */
export function checkpointAfter(week: number): CheckpointSpec | null {
  return CHECKPOINTS.find((spec) => spec.afterWeek === week) ?? null;
}

/** The weeks a test draws from — everything the phase covered. */
export function weeksCovered(spec: CheckpointSpec): number[] {
  const index = CHECKPOINTS.findIndex((entry) => entry.kind === spec.kind);
  const from = index === 0 ? 1 : CHECKPOINTS[index - 1]!.afterWeek + 1;
  return Array.from({ length: spec.afterWeek - from + 1 }, (_, offset) => from + offset);
}

/**
 * Picks `count` items at random without replacement.
 *
 * Drawn rather than fixed because a checkpoint the learner could revise for
 * would measure their memory of twenty specific phrases instead of the phase
 * (§6). The generator is injected so tests are not at the mercy of chance.
 */
export function draw<T>(pool: readonly T[], count: number, random: () => number): T[] {
  const remaining = [...pool];
  const picked: T[] = [];
  while (picked.length < count && remaining.length > 0) {
    const index = Math.floor(random() * remaining.length);
    picked.push(...remaining.splice(index, 1));
  }
  return picked;
}

export type CheckpointResults = {
  /** Pronunciation scores, one per shadowed phrase. */
  shadowingScores: number[];
  /** Gap-fills answered correctly. */
  listeningCorrect: number;
  /** Role-plays that reached their goal. */
  roleplaysCompleted: number;
};

export type CheckpointVerdict = {
  passed: boolean;
  /** Plain-language lines for the result screen, one per part attempted. */
  linesVi: string[];
  /**
   * Extra weeks to spend on this phase before moving on. Zero on a pass.
   * §6 sets this at two — enough to be worth doing, short enough not to feel
   * like being held back a year.
   */
  extraWeeks: number;
};

export const EXTRA_WEEKS_ON_FAIL = 2;

/**
 * Judges an attempt.
 *
 * Every part must be met — passing the listening while failing the speaking is
 * not a pass at a course whose whole purpose is speaking. But the wording
 * reports each part separately, because "you failed" teaches nothing and
 * "listening was fine, the sounds need work" is something a learner can act on.
 */
export function judgeCheckpoint(
  spec: CheckpointSpec,
  results: CheckpointResults,
): CheckpointVerdict {
  const linesVi: string[] = [];
  let passed = true;

  if (spec.shadowing) {
    const good = results.shadowingScores.filter(
      (score) => score >= spec.shadowing!.minScore,
    ).length;
    const need = Math.ceil(spec.shadowing.count * 0.7);
    const ok = good >= need;
    passed &&= ok;
    linesVi.push(
      ok
        ? `Phát âm: ${good}/${spec.shadowing.count} câu đạt — tốt.`
        : `Phát âm: ${good}/${spec.shadowing.count} câu đạt, cần ${need}.`,
    );
  }

  if (spec.listening) {
    const ok = results.listeningCorrect >= spec.listening.minCorrect;
    passed &&= ok;
    linesVi.push(
      ok
        ? `Nghe: ${results.listeningCorrect}/${spec.listening.count} câu đúng — tốt.`
        : `Nghe: ${results.listeningCorrect}/${spec.listening.count} câu đúng, cần ${spec.listening.minCorrect}.`,
    );
  }

  if (spec.roleplay) {
    const ok = results.roleplaysCompleted >= spec.roleplay.count;
    passed &&= ok;
    linesVi.push(
      ok
        ? `Hội thoại: xong cả ${spec.roleplay.count} tình huống — tốt.`
        : `Hội thoại: xong ${results.roleplaysCompleted}/${spec.roleplay.count} tình huống.`,
    );
  }

  return {
    passed,
    linesVi,
    extraWeeks: passed ? 0 : EXTRA_WEEKS_ON_FAIL,
  };
}

/**
 * What to say about the outcome.
 *
 * A fail is phrased as more practice rather than as a verdict on the learner.
 * §15 rates discouragement as the failure mode that ends the course, and being
 * told at week 8 that you are not good enough is the clearest way to cause it.
 */
export function outcomeMessageVi(spec: CheckpointSpec, verdict: CheckpointVerdict): string {
  if (verdict.passed) {
    return spec.kind === "C"
      ? "Bác đã đi hết 26 tuần. Từ giờ là giữ nhịp — mỗi ngày vẫn nói một chút."
      : "Đạt rồi. Tuần sau bác sang giai đoạn mới.";
  }
  return `Mình học thêm ${EXTRA_WEEKS_ON_FAIL} tuần nữa ở phần này rồi kiểm tra lại. Không vội.`;
}
