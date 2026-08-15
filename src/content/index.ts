/**
 * Content library access.
 *
 * Bundled with the app rather than fetched: week 1 has to work on the very
 * first launch, before any network request has succeeded (§12.7). Later weeks
 * move to the pre-download path once there are enough of them to matter.
 */

import type { RoleplayTurn, VocabItem, WeekContent } from "./types";
import { week01 } from "./week01";
import { week02 } from "./week02";
import { week03 } from "./week03";
import { week04 } from "./week04";
import { week05 } from "./week05";
import { week06 } from "./week06";
import { week07 } from "./week07";
import { week08 } from "./week08";
import { week09 } from "./week09";
import { week10 } from "./week10";
import { week11 } from "./week11";
import { week12 } from "./week12";
import { week13 } from "./week13";
import { week14 } from "./week14";
import { week15 } from "./week15";
import { week16 } from "./week16";

const WEEKS: readonly WeekContent[] = [
  week01,
  week02,
  week03,
  week04,
  week05,
  week06,
  week07,
  week08,
  week09,
  week10,
  week11,
  week12,
  week13,
  week14,
  week15,
  week16,
];

export function getWeek(week: number): WeekContent {
  const found = WEEKS.find((candidate) => candidate.week === week);
  if (found) return found;

  // Past the end of what is written, the learner repeats the last week rather
  // than being dropped back to week 1. This is not hypothetical: placement
  // track D starts at week 9 (§4.4), so an advanced learner would otherwise
  // open the app and be handed beginner greetings with no explanation.
  const last = WEEKS[WEEKS.length - 1]!;
  if (week > last.week) return last;

  const first = WEEKS[0]!;
  return WEEKS.find((candidate) => candidate.week >= week) ?? first;
}

export function availableWeeks(): number[] {
  return WEEKS.map((week) => week.week);
}

export function allVocabulary(): VocabItem[] {
  return WEEKS.flatMap((week) => week.vocabulary);
}

export function findVocabItem(id: string): VocabItem | undefined {
  return allVocabulary().find((item) => item.id === id);
}

/**
 * Picks the next role-play turn from what the learner said.
 *
 * Keyword matching rather than exact comparison: the learner is not filling in
 * a blank, and "I am from Vietnam" must work as well as the scripted
 * "I'm from Vietnam" (§12.2). Matching is on word boundaries so "form" does not
 * satisfy "from".
 */
export function matchBranch(turn: RoleplayTurn, saidText: string): string | null {
  const normalised = ` ${saidText.toLowerCase().replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim()} `;

  for (const branch of turn.branches) {
    for (const keyword of branch.keywords) {
      if (normalised.includes(` ${keyword.toLowerCase()} `)) return branch.next;
    }
  }
  return turn.fallbackNext;
}

export function getTurn(script: WeekContent["roleplay"], id: string): RoleplayTurn | undefined {
  return script.turns.find((turn) => turn.id === id);
}

/**
 * Function words a keyword hint does not need.
 *
 * Negations stay in. "didn't catch" and "catch" are opposite instructions, and
 * a hint that quietly drops the "not" would send the learner the wrong way.
 */
const HINT_STOPWORDS = new Set([
  "a", "an", "the", "to", "for", "is", "are", "am", "was", "were", "be",
  "i", "im", "you", "your", "me", "my", "it", "its", "this", "that", "we",
  "and", "at", "in", "on", "of", "please", "could", "would", "can", "do",
  "does", "have", "has", "sorry", "thank", "thanks", "so", "just", "if",
]);

/**
 * The two or three words at the heart of a suggested reply.
 *
 * From week 12 the scaffolding comes away (§ giai đoạn 2): the learner is shown
 * what to talk about, not the sentence to copy. Building this from the whole
 * sentence rather than storing it separately keeps the two from drifting apart
 * as content is edited.
 */
export function keywordHint(sentence: string): string {
  const words = sentence
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 0 && !HINT_STOPWORDS.has(word));

  // A sentence made entirely of function words ("Thank you.") has no keywords
  // to show; the sentence itself is then the smallest honest hint.
  if (words.length === 0) return sentence;
  return words.slice(0, 3).join(" ");
}

/** What the hint panel shows for a turn, given how far the scaffolding is down. */
export function hintsToShow(
  script: WeekContent["roleplay"],
  turn: RoleplayTurn,
): string[] {
  switch (script.hintLevel ?? "sentence") {
    case "none":
      return [];
    case "keyword":
      return [...new Set(turn.hints.map(keywordHint))];
    case "sentence":
      return turn.hints;
  }
}

/** How often the other person goes off-script, once a week enables it (§12.2). */
export const SURPRISE_CHANCE = 0.2;

export type RoleplayProgress = { surpriseUsed: boolean };

/**
 * Picks the next turn, sometimes throwing the learner a curve.
 *
 * The surprise turn is an insertion, not a detour: it only fires where the
 * scripted next turn is the one the surprise itself rejoins, so the
 * conversation always lands back where it was going. That constraint is what
 * makes "the gate just changed" arrive at a moment where it makes sense
 * instead of before check-in has happened.
 */
export function advanceRoleplay(
  script: WeekContent["roleplay"],
  turn: RoleplayTurn,
  saidText: string,
  progress: RoleplayProgress,
  random: () => number = Math.random,
): string | null {
  const next = matchBranch(turn, saidText);
  if (progress.surpriseUsed || !script.surpriseTurnId) return next;

  const surprise = getTurn(script, script.surpriseTurnId);
  if (!surprise || turn.id === surprise.id) return next;
  if (next === null || next !== surprise.fallbackNext) return next;
  if (random() >= SURPRISE_CHANCE) return next;

  progress.surpriseUsed = true;
  return surprise.id;
}

export type { WeekContent, VocabItem, RoleplayTurn };
