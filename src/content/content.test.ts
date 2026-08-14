/**
 * Structural checks over every week of content.
 *
 * Content is hand-written data, and hand-written data goes wrong in ways
 * TypeScript cannot see: a role-play turn that nothing points at, a gap word
 * that is not in the transcript, an `answerIndex` off the end of the options,
 * two cards sharing an id. Every failure here would reach the learner as a
 * lesson that stalls or a question with no right answer, so the whole library
 * is checked rather than a sample.
 */

import { describe, expect, it } from "vitest";
import { allVocabulary, availableWeeks, getWeek, matchBranch } from "./index";
import type { WeekContent } from "./types";

const weeks: WeekContent[] = availableWeeks().map((week) => getWeek(week));

describe("the library", () => {
  it("covers phase 1 without gaps", () => {
    expect(availableWeeks()).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("hands a learner past the end the last week, not the first", () => {
    // Placement track D starts at week 9 (§4.4), beyond what is written.
    expect(getWeek(9).week).toBe(8);
    expect(getWeek(26).week).toBe(8);
  });

  it("gives every card a unique id", () => {
    // Cards are keyed by id in IndexedDB, so a duplicate silently merges two
    // different phrases into one review history.
    const ids = allVocabulary().map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("files every card under the week it lives in", () => {
    for (const week of weeks) {
      for (const item of week.vocabulary) {
        expect(item.week, `${item.id} is filed under week ${item.week}`).toBe(week.week);
      }
    }
  });
});

describe.each(weeks.map((week) => [week.week, week] as const))("week %i", (_number, week) => {
  it("has enough cards for a full session", () => {
    // §8.3 releases 8 new cards a day; a week under 20 would run dry midweek.
    expect(week.vocabulary.length).toBeGreaterThanOrEqual(20);
  });

  it("names a pronunciation focus and a title", () => {
    expect(week.titleVi.length).toBeGreaterThan(0);
    expect(week.pronunciationFocusVi.length).toBeGreaterThan(0);
  });

  it("drills the week's sound in five shadowing lines", () => {
    expect(week.shadowing).toHaveLength(5);
    for (const line of week.shadowing) {
      expect(line.text.length).toBeGreaterThan(0);
      expect(line.focusVi.length).toBeGreaterThan(0);
    }
  });

  describe("listening", () => {
    const passage = week.listening;

    it("asks a gist question with a real answer", () => {
      expect(passage.gist.options.length).toBeGreaterThanOrEqual(2);
      expect(passage.gist.options[passage.gist.answerIndex]).toBeDefined();
    });

    it("asks detail questions with real answers", () => {
      expect(passage.detail.length).toBeGreaterThanOrEqual(2);
      for (const question of passage.detail) {
        expect(question.options.length).toBeGreaterThanOrEqual(2);
        expect(
          question.options[question.answerIndex],
          `"${question.promptVi}" points past its options`,
        ).toBeDefined();
      }
    });

    it("gaps words that are actually in the transcript", () => {
      // Round 3 asks the learner to fill in a word they just heard. A gap word
      // that was never said is unanswerable.
      const transcript = passage.lines.map((line) => line.text).join(" ").toLowerCase();
      for (const gap of passage.gaps) {
        expect(transcript, `gap "${gap.answer}" is not in the passage`).toContain(
          gap.answer.toLowerCase(),
        );
      }
    });
  });

  describe("role-play", () => {
    const script = week.roleplay;
    const ids = new Set(script.turns.map((turn) => turn.id));

    it("starts at a turn that exists", () => {
      expect(ids.has(script.startTurnId)).toBe(true);
    });

    it("never points at a turn that does not exist", () => {
      for (const turn of script.turns) {
        for (const branch of turn.branches) {
          if (branch.next !== null) {
            expect(ids.has(branch.next), `${turn.id} -> ${branch.next}`).toBe(true);
          }
        }
        if (turn.fallbackNext !== null) {
          expect(ids.has(turn.fallbackNext), `${turn.id} fallback`).toBe(true);
        }
      }
    });

    it("can reach every turn from the start", () => {
      // An unreachable turn is wasted writing at best; more often it means a
      // branch was meant to point at it and points somewhere else.
      const reached = new Set([script.startTurnId]);
      const queue = [script.startTurnId];

      while (queue.length > 0) {
        const id = queue.shift()!;
        const turn = script.turns.find((candidate) => candidate.id === id);
        if (!turn) continue;
        const next = [...turn.branches.map((branch) => branch.next), turn.fallbackNext];
        for (const id of next) {
          if (id !== null && !reached.has(id)) {
            reached.add(id);
            queue.push(id);
          }
        }
      }

      expect([...ids].filter((id) => !reached.has(id))).toEqual([]);
    });

    it("always finishes, whatever the learner says", () => {
      // Silence must end the conversation, not loop it. Following only the
      // fallbacks is the worst case, so it is the one worth checking.
      let current: string | null = script.startTurnId;
      const seen = new Set<string>();

      for (let step = 0; step < 20 && current !== null; step++) {
        expect(seen.has(current), `fallback loop at ${current}`).toBe(false);
        seen.add(current);
        const turn = script.turns.find((candidate) => candidate.id === current);
        expect(turn).toBeDefined();
        current = turn!.fallbackNext;
      }

      expect(current).toBeNull();
    });

    it("offers hints that match a branch", () => {
      // A hint is the app telling the learner what to say. If saying it hits no
      // branch keyword, the app has set them up to fail — and comparing against
      // fallbackNext would not catch it, since a branch may legitimately lead to
      // the same turn the fallback does.
      for (const turn of script.turns) {
        expect(turn.hints.length, `${turn.id} has no hints`).toBeGreaterThan(0);
        if (turn.branches.length === 0) continue;

        for (const hint of turn.hints) {
          const words = new Set(hint.toLowerCase().replace(/[^a-z0-9' ]+/g, " ").split(/\s+/));
          const matched = turn.branches.some((branch) =>
            branch.keywords.some((keyword) => words.has(keyword.toLowerCase())),
          );
          expect(matched, `hint "${hint}" on ${turn.id} matches no branch`).toBe(true);
          // And the router must agree with that reading.
          expect(matchBranch(turn, hint)).not.toBeUndefined();
        }
      }
    });

    it("glosses every turn in Vietnamese", () => {
      for (const turn of script.turns) {
        expect(turn.say.length).toBeGreaterThan(0);
        expect(turn.sayVi.length, `${turn.id} has no gloss`).toBeGreaterThan(0);
      }
    });
  });
});
