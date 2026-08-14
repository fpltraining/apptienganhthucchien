/**
 * Content library access.
 *
 * Bundled with the app rather than fetched: week 1 has to work on the very
 * first launch, before any network request has succeeded (§12.7). Later weeks
 * move to the pre-download path once there are enough of them to matter.
 */

import type { RoleplayTurn, VocabItem, WeekContent } from "./types";
import { week01 } from "./week01";

const WEEKS: readonly WeekContent[] = [week01];

export function getWeek(week: number): WeekContent {
  const found = WEEKS.find((candidate) => candidate.week === week);
  // Falling back to week 1 keeps a learner who has run past the available
  // content in a working lesson rather than an empty screen.
  return found ?? week01;
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
