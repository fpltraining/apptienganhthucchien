import { describe, expect, it } from "vitest";
import {
  DEFAULT_DAILY_TURN_CAP,
  maxWordsForPhase,
  spendTurn,
  systemPrompt,
  toMessages,
  trimToWords,
  vnToday,
} from "./lib.mjs";

describe("vnToday", () => {
  it("rolls the day over at Vietnam midnight, not UTC", () => {
    // 23:30 in Vietnam on 2 March is 16:30 UTC the same day.
    expect(vnToday(Date.parse("2026-03-02T16:30:00Z"))).toBe("2026-03-02");
    // 00:30 in Vietnam on 3 March is 17:30 UTC on 2 March.
    expect(vnToday(Date.parse("2026-03-02T17:30:00Z"))).toBe("2026-03-03");
  });
});

describe("spendTurn", () => {
  const today = "2026-03-02";

  it("counts turns per account", () => {
    let quota = {};
    ({ quota } = spendTurn(quota, "acc1", { today }));
    ({ quota } = spendTurn(quota, "acc1", { today }));
    expect(quota[`acc1:${today}`]).toBe(2);
  });

  it("keeps the two accounts' allowances separate", () => {
    // The isolation rule reaches the server too: one learner burning their
    // turns must not stop the other from talking.
    let quota = {};
    for (let i = 0; i < DEFAULT_DAILY_TURN_CAP; i++) {
      ({ quota } = spendTurn(quota, "acc1", { today }));
    }
    expect(spendTurn(quota, "acc1", { today }).allowed).toBe(false);
    expect(spendTurn(quota, "acc2", { today }).allowed).toBe(true);
  });

  it("refuses once the cap is reached", () => {
    let quota = {};
    let last;
    for (let i = 0; i < DEFAULT_DAILY_TURN_CAP + 3; i++) {
      last = spendTurn(quota, "acc1", { today, cap: DEFAULT_DAILY_TURN_CAP });
      if (last.allowed) quota = last.quota;
    }
    expect(last.allowed).toBe(false);
    expect(last.remaining).toBe(0);
    expect(quota[`acc1:${today}`]).toBe(DEFAULT_DAILY_TURN_CAP);
  });

  it("starts fresh on a new day and forgets the old one", () => {
    let quota = {};
    ({ quota } = spendTurn(quota, "acc1", { today: "2026-03-02" }));
    const next = spendTurn(quota, "acc1", { today: "2026-03-03" });

    expect(next.allowed).toBe(true);
    expect(next.quota["acc1:2026-03-03"]).toBe(1);
    // Yesterday's counter is pruned rather than accumulating forever.
    expect(next.quota["acc1:2026-03-02"]).toBeUndefined();
  });
});

describe("trimToWords", () => {
  it("leaves a short reply alone", () => {
    expect(trimToWords("Nice to meet you.", 12)).toBe("Nice to meet you.");
  });

  it("clamps a long reply even though the prompt already asked for short", () => {
    // The prompt is a request; this is the guarantee.
    const long = Array.from({ length: 40 }, () => "word").join(" ");
    const trimmed = trimToWords(long, 12);
    expect(trimmed.split(/\s+/).length).toBeLessThanOrEqual(13); // 12 + ellipsis token
  });

  it("ends on a complete sentence rather than trailing off", () => {
    const text = "I live in Hanoi. It is a very big and very busy city in the north.";
    expect(trimToWords(text, 12)).toBe("I live in Hanoi.");
  });

  it("keeps the closing question when one fits", () => {
    // Models answer with "Yes. Where are you from?" constantly. Cutting back to
    // "Yes." would leave the learner nothing to answer, which is the opposite
    // of what the prompt asks the model to do (§12.6).
    const text = "Yes. Where are you from? I have never been to that part of the country myself.";
    expect(trimToWords(text, 12)).toBe("Yes. Where are you from?");
  });

  it("trails off only when there is no sentence to end on", () => {
    const text = Array.from({ length: 30 }, () => "word").join(" ");
    expect(trimToWords(text, 5).endsWith("…")).toBe(true);
  });
});

describe("maxWordsForPhase", () => {
  it("lets replies grow as the learner does", () => {
    expect(maxWordsForPhase(1)).toBe(12);
    expect(maxWordsForPhase(2)).toBe(20);
    expect(maxWordsForPhase(3)).toBe(25);
  });
});

describe("systemPrompt", () => {
  it("carries the three constraints that keep the model in range", () => {
    const prompt = systemPrompt({ situation: "ordering coffee", phase: 1 });
    expect(prompt).toContain("at most 12 words");
    expect(prompt).toContain("Never switch to Vietnamese");
    expect(prompt).toContain("ordering coffee");
  });

  it("passes on the phrases the learner has met", () => {
    const prompt = systemPrompt({
      situation: "greeting a neighbour",
      phase: 1,
      knownPhrases: ["Hello, nice to meet you."],
    });
    expect(prompt).toContain("Hello, nice to meet you.");
  });
});

describe("toMessages", () => {
  it("ends on the learner's turn, which the API requires", () => {
    const messages = toMessages([{ role: "assistant", text: "Hello!" }], "Hi there.");
    expect(messages[messages.length - 1]).toEqual({ role: "user", content: "Hi there." });
  });

  it("drops empty turns", () => {
    const messages = toMessages(
      [
        { role: "user", text: "   " },
        { role: "assistant", text: "Hello!" },
        { role: "user", text: "Hi." },
      ],
      "fallback",
    );
    expect(messages).toHaveLength(2);
  });

  it("keeps only the recent window", () => {
    const history = Array.from({ length: 40 }, (_, i) => ({ role: "user", text: `turn ${i}` }));
    expect(toMessages(history, "x").length).toBeLessThanOrEqual(12);
  });
});
