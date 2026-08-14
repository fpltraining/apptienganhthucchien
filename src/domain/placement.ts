/**
 * Placement scoring (curriculum §4).
 *
 * The whole point of §4.4 is that one overall number is the wrong output. A
 * Vietnamese learner taught grammar-first reads well and hears badly, and a
 * single level pushes them into listening material they cannot follow — so the
 * listening track is computed on its own and can override the overall one.
 */

export type PlacementScores = {
  /** Read-aloud: endings, clusters, stress (§4.2 part 2). */
  pronunciation: number;
  /** Highest audio speed still understood (§4.2 part 3). */
  listening: number;
  /** Open answers: vocabulary, grammar, fluency, latency (part 4). */
  speaking: number;
  /** Did the mini role-play achieve its goal (part 5). */
  communication: number;
};

export type Track = "A" | "B" | "C" | "D";

export type PlacementResult = {
  scores: PlacementScores;
  total: number;
  track: Track;
  /**
   * Listening track, judged alone. When it is behind the overall track, the
   * listening ladder follows this instead (§4.4).
   */
  listeningTrack: Track;
  /** Where in the 26 weeks this learner starts. */
  startWeek: number;
  /** Playback rate the listening block opens at. */
  audioRate: number;
};

/** §4.3 — weights, chosen so pronunciation and listening dominate. */
const WEIGHTS = {
  pronunciation: 0.3,
  listening: 0.25,
  speaking: 0.25,
  communication: 0.2,
} as const;

export function weightedTotal(scores: PlacementScores): number {
  const total =
    scores.pronunciation * WEIGHTS.pronunciation +
    scores.listening * WEIGHTS.listening +
    scores.speaking * WEIGHTS.speaking +
    scores.communication * WEIGHTS.communication;
  return Math.round(total * 100) / 100;
}

/** §4.4 thresholds. */
export function trackForScore(total: number): Track {
  if (total < 30) return "A";
  if (total < 55) return "B";
  if (total < 75) return "C";
  return "D";
}

/**
 * Where each track starts in the 26-week plan (§4.4).
 *
 * Track A gets two extra weeks before week 1 rather than a later start, so it
 * is still week 1 here; the extra weeks are prepended by the schedule, not by
 * skipping content.
 */
export function startWeekForTrack(track: Track): number {
  switch (track) {
    case "A":
    case "B":
      return 1;
    case "C":
      // Phase 1 compresses from 8 weeks to 5, so this learner joins partway.
      return 4;
    case "D":
      // Straight into phase 2 (§4.4).
      return 9;
  }
}

/** Opening playback speed by listening ability (§5.2). */
export function audioRateForListening(listeningScore: number): number {
  if (listeningScore < 30) return 0.75;
  if (listeningScore < 55) return 0.85;
  if (listeningScore < 75) return 1.0;
  return 1.1;
}

export function scorePlacement(scores: PlacementScores): PlacementResult {
  const total = weightedTotal(scores);
  const track = trackForScore(total);
  const listeningTrack = trackForScore(scores.listening);

  // The override: never start someone further into the listening ladder than
  // their ears can follow, however well the rest of the test went.
  const effectiveStart = Math.min(
    startWeekForTrack(track),
    startWeekForTrack(listeningTrack),
  );

  return {
    scores,
    total,
    track,
    listeningTrack,
    startWeek: effectiveStart,
    audioRate: audioRateForListening(scores.listening),
  };
}

// --- turning raw attempts into the four scores -------------------------------

export type ReadAloudAttempt = { spoken: boolean; latencyMs: number };

/**
 * Part 2 — six sentences read aloud.
 *
 * Without a pronunciation scorer the only honest signal is whether the learner
 * produced the sentence at all and how long it took, so this is capped below
 * full marks: we have not heard the sounds, and §9.3 would rather understate
 * than award a score the evidence does not support.
 */
export function scoreReadAloud(attempts: readonly ReadAloudAttempt[]): number {
  if (attempts.length === 0) return 0;

  let points = 0;
  for (const attempt of attempts) {
    if (!attempt.spoken) continue;
    if (attempt.latencyMs < 2000) points += 1;
    else if (attempt.latencyMs < 5000) points += 0.7;
    else points += 0.4;
  }
  // Ceiling of 80 until a real scorer runs; see the doc comment.
  return Math.round((points / attempts.length) * 80);
}

/**
 * Part 3 — eight clips at rising speed.
 *
 * Scored on the fastest speed still comprehended rather than raw correctness,
 * because the number this feeds is the opening playback rate.
 */
export function scoreListening(
  answers: readonly { rate: number; correct: boolean }[],
): number {
  if (answers.length === 0) return 0;

  const bySpeed = [...answers].sort((a, b) => a.rate - b.rate);
  let highestPassed = 0;
  let run: { rate: number; correct: boolean }[] = [];
  let currentRate = bySpeed[0]?.rate ?? 0;

  const settle = () => {
    if (run.length === 0) return;
    const correct = run.filter((entry) => entry.correct).length;
    if (correct / run.length >= 0.7) highestPassed = Math.max(highestPassed, currentRate);
  };

  for (const answer of bySpeed) {
    if (answer.rate !== currentRate) {
      settle();
      currentRate = answer.rate;
      run = [];
    }
    run.push(answer);
  }
  settle();

  // 0.75x is the floor of the ladder and 1.1x the top; map that span to 0-100.
  if (highestPassed === 0) return 0;
  const normalised = (highestPassed - 0.75) / (1.1 - 0.75);
  return Math.round(Math.max(0, Math.min(1, normalised)) * 100);
}

export type OpenAnswer = {
  /** Difficulty rung of the question, 1 (A0) to 4 (B1) — §4.2 part 4. */
  rung: number;
  spoken: boolean;
  wordCount: number;
  latencyMs: number;
};

/**
 * Part 4 — four open questions of rising difficulty.
 *
 * Credit is weighted by rung, so answering the hard question badly still beats
 * answering only the easy one well.
 */
export function scoreOpenAnswers(answers: readonly OpenAnswer[]): number {
  if (answers.length === 0) return 0;

  let earned = 0;
  let available = 0;

  for (const answer of answers) {
    available += answer.rung;
    if (!answer.spoken || answer.wordCount === 0) continue;

    // Length stands in for range: a four-word answer to "tell me about your
    // family" is a different competence from a fifteen-word one.
    const lengthCredit = Math.min(1, answer.wordCount / (answer.rung * 4));
    const speedCredit = answer.latencyMs < 3000 ? 1 : answer.latencyMs < 6000 ? 0.8 : 0.6;
    earned += answer.rung * lengthCredit * speedCredit;
  }

  return Math.round((earned / available) * 100);
}

/** Part 5 — did the three-turn role-play reach its goal. */
export function scoreCommunication(turnsAchieved: number, turnsTotal: number): number {
  if (turnsTotal === 0) return 0;
  return Math.round((turnsAchieved / turnsTotal) * 100);
}
