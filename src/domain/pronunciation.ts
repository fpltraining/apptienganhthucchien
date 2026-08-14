/**
 * Pronunciation scoring (curriculum §9).
 *
 * What this measures, stated plainly: whether a listener would recognise the
 * words. It compares what the speech recogniser heard against the phrase the
 * learner was asked to say. That is intelligibility, not phoneme accuracy — it
 * cannot tell a slightly-off vowel from a perfect one, and it will not catch a
 * dropped final /t/ unless the drop changes the word.
 *
 * That limitation is worth accepting for now, because the alternative is worse.
 * §15 rates "mis-scoring destroys the learner's trust" as the top risk, and a
 * measure of "could a person understand you" is honest about its own limits in
 * a way an invented phoneme score would not be. A real phoneme scorer replaces
 * `scoreAttempt` without touching anything that calls it.
 */

/** Words a recogniser routinely drops that carry almost no meaning. */
const FILLER = new Set(["uh", "um", "er", "ah", "eh", "hmm", "mm"]);

/**
 * Contractions written out in full.
 *
 * "I'm" and "I am" are the same utterance to a listener, so they have to reach
 * the comparison as the same tokens. Expanding is the direction that works:
 * stripping the apostrophe instead would leave "im" against "i am", which reads
 * as a missing word when nothing is missing.
 *
 * Only forms whose expansion is unambiguous are listed. "id", "well", "were"
 * and "shed" are ordinary words as often as they are contractions, and guessing
 * wrong on those would invent an error rather than forgive one.
 */
const CONTRACTIONS: Readonly<Record<string, string[]>> = {
  im: ["i", "am"],
  ive: ["i", "have"],
  youre: ["you", "are"],
  youve: ["you", "have"],
  theyre: ["they", "are"],
  theyve: ["they", "have"],
  weve: ["we", "have"],
  were: ["we", "are"],
  dont: ["do", "not"],
  doesnt: ["does", "not"],
  didnt: ["did", "not"],
  cant: ["can", "not"],
  couldnt: ["could", "not"],
  wouldnt: ["would", "not"],
  shouldnt: ["should", "not"],
  isnt: ["is", "not"],
  arent: ["are", "not"],
  wasnt: ["was", "not"],
  werent: ["were", "not"],
  hasnt: ["has", "not"],
  havent: ["have", "not"],
  hadnt: ["had", "not"],
  wont: ["will", "not"],
  thats: ["that", "is"],
  whats: ["what", "is"],
  wheres: ["where", "is"],
  hows: ["how", "is"],
  lets: ["let", "us"],
};

export function normalise(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 0 && !FILLER.has(word));

  const expanded: string[] = [];
  for (const word of words) {
    const parts = CONTRACTIONS[word];
    if (parts) expanded.push(...parts);
    else expanded.push(word);
  }
  return expanded;
}

/**
 * Longest common subsequence of two word lists.
 *
 * Subsequence rather than exact position: a learner who says
 * "I am from Vietnam" for "I'm from Vietnam" has said the phrase, and an
 * alignment that punishes the extra word would be measuring the wrong thing.
 */
function longestCommonSubsequence(a: readonly string[], b: readonly string[]): number {
  const table: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array<number>(b.length + 1).fill(0),
  );

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      table[i]![j] =
        a[i - 1] === b[j - 1]
          ? table[i - 1]![j - 1]! + 1
          : Math.max(table[i - 1]![j]!, table[i]![j - 1]!);
    }
  }
  return table[a.length]![b.length]!;
}

export type PronunciationScore = {
  /** 0–100 — share of the target phrase a listener would have caught. */
  score: number;
  /** Words of the target that did not come through. */
  missed: string[];
  /**
   * How much to trust this. `low` when the recogniser returned little to go
   * on, which is different from the learner having said little.
   */
  confidence: "low" | "normal";
};

/**
 * Scores one attempt against the phrase the learner was asked to say.
 *
 * Returns null when there is nothing to score — no transcript at all. Callers
 * treat that as "unscored" and fall back to timing alone, rather than as zero:
 * a failed recogniser is not a failed learner.
 */
export function scoreAttempt(target: string, transcript: string): PronunciationScore | null {
  const wanted = normalise(target);
  const heard = normalise(transcript);

  if (wanted.length === 0) return null;
  if (heard.length === 0) return null;

  const matched = longestCommonSubsequence(wanted, heard);
  const recall = matched / wanted.length;

  // Extra words are penalised gently: thinking aloud before the phrase is
  // normal speech, not a pronunciation error.
  const surplus = Math.max(0, heard.length - wanted.length);
  const surplusPenalty = Math.min(0.15, (surplus / wanted.length) * 0.15);

  const score = Math.round(Math.max(0, Math.min(1, recall - surplusPenalty)) * 100);

  const heardSet = new Set(heard);
  const missed = wanted.filter((word) => !heardSet.has(word));

  return {
    score,
    missed,
    // One or two words back from the recogniser is not enough to judge a
    // phrase on, however well they match.
    confidence: heard.length < Math.min(3, wanted.length) ? "low" : "normal",
  };
}

/**
 * The three-band wording shown in phase 1 (§9.3).
 *
 * No numbers for a beginner: a score attached to a first attempt discourages
 * before it informs. The number is still recorded, it is simply not displayed
 * until phase 2.
 */
export function feedbackFor(score: number): string {
  if (score >= 85) return "Chuẩn rồi.";
  if (score >= 60) return "Gần đúng rồi.";
  return "Nghe lại nhé.";
}

/**
 * Which sounds to work on, from the words that keep going missing.
 *
 * Only the words that were actually missed, and only when there are enough of
 * them to be a pattern rather than one bad take.
 */
export function troubleWords(
  attempts: readonly PronunciationScore[],
  minOccurrences = 3,
): string[] {
  const counts = new Map<string, number>();
  for (const attempt of attempts) {
    for (const word of attempt.missed) {
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .filter(([, count]) => count >= minOccurrences)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word);
}
