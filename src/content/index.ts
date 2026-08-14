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

const WEEKS: readonly WeekContent[] = [
  week01,
  week02,
  week03,
  week04,
  week05,
  week06,
  week07,
  week08,
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

export type { WeekContent, VocabItem, RoleplayTurn };
