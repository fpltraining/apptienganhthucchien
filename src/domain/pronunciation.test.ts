import { describe, expect, it } from "vitest";
import {
  feedbackFor,
  mergeTroubleWords,
  normalise,
  scoreAttempt,
  soundsToPractise,
  troubleWords,
} from "./pronunciation";

describe("normalise", () => {
  it("treats contractions as the same word", () => {
    // A listener hears no difference, so the score should not either.
    expect(normalise("I'm from Vietnam")).toEqual(normalise("Im from Vietnam"));
  });

  it("drops fillers the recogniser picks up", () => {
    expect(normalise("uh hello um there")).toEqual(["hello", "there"]);
  });
});

describe("scoreAttempt", () => {
  it("scores a perfect match at 100", () => {
    expect(scoreAttempt("Nice to meet you.", "nice to meet you")?.score).toBe(100);
  });

  it("accepts an expanded contraction as saying the phrase", () => {
    const result = scoreAttempt("I'm from Vietnam.", "I am from Vietnam");
    expect(result?.score).toBeGreaterThanOrEqual(90);
  });

  it("marks down a phrase with words missing", () => {
    const result = scoreAttempt("Could you speak a bit slower, please?", "you speak slower");
    expect(result?.score).toBeLessThan(70);
    expect(result?.missed).toContain("could");
  });

  it("penalises extra words only gently", () => {
    // Thinking aloud before the phrase is normal speech, not a pronunciation
    // error, so it must not read as one.
    const clean = scoreAttempt("Thank you very much.", "thank you very much")!.score;
    const rambling = scoreAttempt("Thank you very much.", "er okay thank you very much")!.score;
    expect(clean - rambling).toBeLessThanOrEqual(15);
  });

  it("reports which words did not come through", () => {
    const result = scoreAttempt("See you later.", "see you");
    expect(result?.missed).toEqual(["later"]);
  });

  it("returns null when there is nothing to score", () => {
    // A recogniser that heard nothing is not the same as a learner who said
    // nothing, so this must not become a zero.
    expect(scoreAttempt("Hello there.", "")).toBeNull();
    expect(scoreAttempt("", "hello")).toBeNull();
  });

  it("flags low confidence when the recogniser returned very little", () => {
    const result = scoreAttempt("Could you say that again please?", "you");
    expect(result?.confidence).toBe("low");
  });

  it("does not flag low confidence on a short target", () => {
    expect(scoreAttempt("Excuse me.", "excuse me")?.confidence).toBe("normal");
  });

  it("scores a wrong phrase near zero", () => {
    const result = scoreAttempt("Where is the station?", "banana telephone");
    expect(result?.score).toBeLessThan(20);
  });
});

describe("feedbackFor", () => {
  it("uses words rather than a number in phase 1", () => {
    // §9.3 — a score attached to a beginner's first attempt discourages before
    // it informs.
    expect(feedbackFor(95)).toBe("Chuẩn rồi.");
    expect(feedbackFor(70)).toBe("Gần đúng rồi.");
    expect(feedbackFor(30)).toBe("Nghe lại nhé.");
  });
});

describe("troubleWords", () => {
  it("surfaces a word only once it is a pattern", () => {
    const attempts = [
      { score: 60, missed: ["three"], confidence: "normal" as const },
      { score: 60, missed: ["three"], confidence: "normal" as const },
    ];
    expect(troubleWords(attempts)).toEqual([]);

    attempts.push({ score: 60, missed: ["three"], confidence: "normal" as const });
    expect(troubleWords(attempts)).toEqual(["three"]);
  });

  it("puts the most persistent word first", () => {
    const attempts = [
      { score: 50, missed: ["three", "street"], confidence: "normal" as const },
      { score: 50, missed: ["three", "street"], confidence: "normal" as const },
      { score: 50, missed: ["three", "street"], confidence: "normal" as const },
      { score: 50, missed: ["three"], confidence: "normal" as const },
    ];
    expect(troubleWords(attempts)[0]).toBe("three");
  });
});

describe("mergeTroubleWords", () => {
  it("counts a word up across sessions", () => {
    let known = mergeTroubleWords([], ["three"], "2026-03-02");
    known = mergeTroubleWords(known, ["three"], "2026-03-03");
    expect(known[0]).toEqual({ word: "three", misses: 2, lastMissedDay: "2026-03-03" });
  });

  it("counts every miss within one session", () => {
    // Struggling with the same word three times in one sitting is the signal,
    // not an accident to be de-duplicated away.
    const known = mergeTroubleWords([], ["three", "three", "three"], "2026-03-02");
    expect(known[0]?.misses).toBe(3);
  });

  it("drops a word that has not come up inside the window", () => {
    // A word fixed two months ago must not keep sending the learner back to
    // practise something they can already say.
    const stale = [{ word: "three", misses: 9, lastMissedDay: "2026-01-01" }];
    expect(mergeTroubleWords(stale, [], "2026-03-02")).toEqual([]);
  });

  it("keeps a word that came up recently", () => {
    const recent = [{ word: "three", misses: 4, lastMissedDay: "2026-02-25" }];
    expect(mergeTroubleWords(recent, [], "2026-03-02")).toHaveLength(1);
  });

  it("puts the most persistent word first", () => {
    const known = mergeTroubleWords(
      [
        { word: "street", misses: 2, lastMissedDay: "2026-03-01" },
        { word: "three", misses: 6, lastMissedDay: "2026-03-01" },
      ],
      [],
      "2026-03-02",
    );
    expect(known.map((record) => record.word)).toEqual(["three", "street"]);
  });
});

describe("soundsToPractise", () => {
  it("names a word only once it is a pattern", () => {
    const known = [{ word: "three", misses: 2, lastMissedDay: "2026-03-02" }];
    expect(soundsToPractise(known)).toEqual([]);
    expect(soundsToPractise([{ ...known[0]!, misses: 3 }])).toEqual(["three"]);
  });

  it("shows at most three, so it reads as a hint not a report card", () => {
    const many = ["a", "b", "c", "d", "e"].map((word) => ({
      word,
      misses: 5,
      lastMissedDay: "2026-03-02",
    }));
    expect(soundsToPractise(many)).toHaveLength(3);
  });
});
