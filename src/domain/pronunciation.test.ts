import { describe, expect, it } from "vitest";
import { feedbackFor, normalise, scoreAttempt, troubleWords } from "./pronunciation";

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
