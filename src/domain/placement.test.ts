import { describe, expect, it } from "vitest";
import {
  audioRateForListening,
  scoreCommunication,
  scoreListening,
  scoreOpenAnswers,
  scorePlacement,
  scoreReadAloud,
  startWeekForTrack,
  trackForScore,
  weightedTotal,
} from "./placement";
import type { PlacementScores } from "./placement";

function scores(overrides: Partial<PlacementScores> = {}): PlacementScores {
  return { pronunciation: 60, listening: 60, speaking: 60, communication: 60, ...overrides };
}

describe("weightedTotal", () => {
  it("uses the weights from the curriculum", () => {
    // 0.30 / 0.25 / 0.25 / 0.20 — §4.3.
    expect(
      weightedTotal({ pronunciation: 100, listening: 0, speaking: 0, communication: 0 }),
    ).toBe(30);
    expect(
      weightedTotal({ pronunciation: 0, listening: 0, speaking: 0, communication: 100 }),
    ).toBe(20);
  });

  it("never drags speech below 0.85", () => {
    // Below that the linking and stress of real speech flatten out, and the
    // learner practises hearing something nobody says.
    for (const score of [0, 10, 29, 30, 54, 75, 100]) {
      expect(audioRateForListening(score)).toBeGreaterThanOrEqual(0.85);
    }
  });
});

describe("trackForScore", () => {
  it("splits at the published thresholds", () => {
    expect(trackForScore(0)).toBe("A");
    expect(trackForScore(29.99)).toBe("A");
    expect(trackForScore(30)).toBe("B");
    expect(trackForScore(54.99)).toBe("B");
    expect(trackForScore(55)).toBe("C");
    expect(trackForScore(74.99)).toBe("C");
    expect(trackForScore(75)).toBe("D");
    expect(trackForScore(100)).toBe("D");
  });
});

describe("scorePlacement", () => {
  it("places a balanced intermediate on track D at week 9", () => {
    const result = scorePlacement(scores({ pronunciation: 80, listening: 80, speaking: 80, communication: 80 }));
    expect(result.track).toBe("D");
    expect(result.startWeek).toBe(startWeekForTrack("D"));
  });

  it("holds back the start week when listening lags the rest", () => {
    // The §4.4 override, and the main reason placement is not one number: this
    // learner reads and speaks like a C but cannot follow the audio, so
    // starting them at week 4 would put them in front of material their ears
    // cannot handle.
    const result = scorePlacement(
      scores({ pronunciation: 85, listening: 20, speaking: 80, communication: 80 }),
    );

    expect(result.track).toBe("C");
    expect(result.listeningTrack).toBe("A");
    expect(result.startWeek).toBe(1);
  });

  it("does not let a strong listening score pull a weak learner forward", () => {
    const result = scorePlacement(
      scores({ pronunciation: 10, listening: 95, speaking: 10, communication: 10 }),
    );
    expect(result.track).toBe("B");
    expect(result.startWeek).toBe(1);
  });

  it("opens at a playback speed the learner can follow", () => {
    expect(audioRateForListening(10)).toBe(0.85);
    expect(audioRateForListening(45)).toBe(0.95);
    expect(audioRateForListening(60)).toBe(1.0);
    expect(audioRateForListening(90)).toBe(1.15);
  });
});

describe("scoreReadAloud", () => {
  it("scores zero when nothing was said", () => {
    expect(scoreReadAloud([{ spoken: false, latencyMs: 8000 }])).toBe(0);
  });

  it("rewards fast, confident reading", () => {
    const fast = scoreReadAloud(Array.from({ length: 6 }, () => ({ spoken: true, latencyMs: 900 })));
    const slow = scoreReadAloud(Array.from({ length: 6 }, () => ({ spoken: true, latencyMs: 6000 })));
    expect(fast).toBeGreaterThan(slow);
  });

  it("stays below full marks while nothing has heard the sounds", () => {
    // Without a pronunciation scorer we cannot award a perfect pronunciation
    // score; understating beats claiming evidence we do not have.
    const perfect = scoreReadAloud(Array.from({ length: 6 }, () => ({ spoken: true, latencyMs: 500 })));
    expect(perfect).toBeLessThanOrEqual(80);
  });
});

describe("scoreListening", () => {
  it("scores on the fastest speed still understood", () => {
    const slowOnly = scoreListening([
      { rate: 0.75, correct: true },
      { rate: 0.75, correct: true },
      { rate: 1.0, correct: false },
      { rate: 1.0, correct: false },
    ]);
    const fastToo = scoreListening([
      { rate: 0.75, correct: true },
      { rate: 0.75, correct: true },
      { rate: 1.0, correct: true },
      { rate: 1.0, correct: true },
    ]);
    expect(fastToo).toBeGreaterThan(slowOnly);
  });

  it("needs most of a speed rung right before crediting it", () => {
    const flukes = scoreListening([
      { rate: 1.1, correct: true },
      { rate: 1.1, correct: false },
      { rate: 1.1, correct: false },
    ]);
    expect(flukes).toBe(0);
  });

  it("scores zero when even the slowest clips were missed", () => {
    expect(scoreListening([{ rate: 0.75, correct: false }])).toBe(0);
  });
});

describe("scoreOpenAnswers", () => {
  it("weights the harder questions more heavily", () => {
    const easyOnly = scoreOpenAnswers([
      { rung: 1, spoken: true, wordCount: 8, latencyMs: 1000 },
      { rung: 4, spoken: false, wordCount: 0, latencyMs: 8000 },
    ]);
    const hardOnly = scoreOpenAnswers([
      { rung: 1, spoken: false, wordCount: 0, latencyMs: 8000 },
      { rung: 4, spoken: true, wordCount: 20, latencyMs: 1000 },
    ]);
    expect(hardOnly).toBeGreaterThan(easyOnly);
  });

  it("gives no credit for silence", () => {
    expect(
      scoreOpenAnswers([{ rung: 2, spoken: false, wordCount: 0, latencyMs: 8000 }]),
    ).toBe(0);
  });

  it("credits a longer answer over a one-word one", () => {
    const terse = scoreOpenAnswers([{ rung: 2, spoken: true, wordCount: 1, latencyMs: 1000 }]);
    const full = scoreOpenAnswers([{ rung: 2, spoken: true, wordCount: 12, latencyMs: 1000 }]);
    expect(full).toBeGreaterThan(terse);
  });
});

describe("scoreCommunication", () => {
  it("is the share of role-play goals reached", () => {
    expect(scoreCommunication(3, 3)).toBe(100);
    expect(scoreCommunication(0, 3)).toBe(0);
    expect(scoreCommunication(2, 3)).toBe(67);
  });
});
