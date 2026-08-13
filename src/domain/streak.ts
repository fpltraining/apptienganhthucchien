/**
 * Streak engine (curriculum §10).
 *
 * The design goal is stated in §10.1: protect the *habit*, not the numbers. A
 * streak that punishes one forgotten evening is what makes an older learner
 * quit, so every rule here leans toward keeping the chain alive:
 *
 *  - all three completion tiers count, including the 5-minute one;
 *  - two missed days a month are absorbed silently by freezes;
 *  - a broken streak can be repaired once a month.
 *
 * Nothing in this module ever *lowers* `best`. A learner who loses a 47-day
 * run keeps 47 as their record forever.
 */

import type { AccountId, SessionTier, StreakState } from "../data/schema";
import { addDays, daysBetween, toMonthKey } from "./dates";

export const FREEZES_PER_MONTH = 2;
/** Days after a break during which a repair is still allowed. */
export const REPAIR_WINDOW_DAYS = 3;
/** Full sessions required inside that window to earn the streak back. */
export const REPAIR_SESSIONS_REQUIRED = 2;
/** Frozen days are kept only for recent history; older ones are pruned. */
const FROZEN_DAYS_KEPT = 60;

export type StreakEvent =
  | { type: "extended"; streak: number }
  | { type: "started"; streak: number }
  | { type: "frozen"; days: string[]; freezesLeft: number }
  | { type: "broken"; lostStreak: number }
  | { type: "repaired"; streak: number }
  | { type: "record"; streak: number };

export function createStreakState(accountId: AccountId): StreakState {
  return {
    accountId,
    current: 0,
    best: 0,
    lastCountedDay: null,
    freezesLeft: FREEZES_PER_MONTH,
    freezeMonth: null,
    frozenDays: [],
    repairUsedMonth: null,
    brokenAt: null,
  };
}

function monthOf(day: string): string {
  return toMonthKey(new Date(`${day}T00:00:00`));
}

/**
 * Refills the freeze allowance for the month `day` falls in.
 *
 * Freezes deliberately do not accumulate (§10.3): letting them stack would turn
 * two months of diligence into a licence to disappear for four days, which is
 * the opposite of the habit this is protecting.
 *
 * The allowance is refilled per *missed day*, not per settle call, so a gap
 * that straddles a month boundary spends each day against its own month rather
 * than draining whichever month happens to be current when the app reopens.
 */
function refillFreezes(state: StreakState, day: string): StreakState {
  const month = monthOf(day);
  if (state.freezeMonth === month) return state;
  return { ...state, freezeMonth: month, freezesLeft: FREEZES_PER_MONTH };
}

/**
 * True when every day between `from` and `to` was already absorbed by a freeze,
 * so the chain is intact and `to` extends it.
 *
 * Without this, a frozen day would preserve the count on the day it happened
 * and then silently reset it on the learner's next session — the exact failure
 * the freeze exists to prevent.
 */
function isContinuation(state: StreakState, from: string, to: string): boolean {
  const gap = daysBetween(from, to);
  if (gap === 1) return true;
  if (gap < 1) return false;

  const frozen = new Set(state.frozenDays);
  for (let offset = 1; offset < gap; offset++) {
    if (!frozen.has(addDays(from, offset))) return false;
  }
  return true;
}

/**
 * Brings a streak up to date as of `today`, spending freezes on days the
 * learner missed and breaking the streak when the freezes run out.
 *
 * Runs on load, not on a timer: the app may be closed for a week, so the
 * passage of time has to be reconciled when it next opens.
 */
export function settle(
  state: StreakState,
  today: string,
): { state: StreakState; events: StreakEvent[] } {
  const events: StreakEvent[] = [];
  let next = state;

  // A streak that has already been broken has nothing left to settle; it waits
  // for either a repair or a fresh start.
  if (next.lastCountedDay === null) return { state: refillFreezes(next, today), events };

  // Held separately because `next` is rebound as freezes are spent, and the
  // anchor for the missed-day walk must stay fixed.
  const anchor = next.lastCountedDay;
  const gap = daysBetween(anchor, today);
  // gap <= 1 means the last counted day was today or yesterday: nothing is
  // missed yet, because today is still in play.
  if (gap <= 1) return { state: refillFreezes(next, today), events };

  const frozen = new Set(next.frozenDays);
  const newlyFrozen: string[] = [];

  for (let offset = 1; offset < gap; offset++) {
    const missedDay = addDays(anchor, offset);
    if (frozen.has(missedDay)) continue;

    next = refillFreezes(next, missedDay);

    if (next.freezesLeft > 0) {
      next = { ...next, freezesLeft: next.freezesLeft - 1 };
      frozen.add(missedDay);
      newlyFrozen.push(missedDay);
      continue;
    }

    // Out of freezes: the chain is broken. `best` is untouched, and
    // `lastCountedDay` is cleared so a later settle cannot break it a second
    // time and overwrite the streak value the repair path needs.
    const lost = next.current;
    if (newlyFrozen.length > 0) {
      events.push({
        type: "frozen",
        days: newlyFrozen,
        freezesLeft: next.freezesLeft,
      });
    }
    events.push({ type: "broken", lostStreak: lost });
    next = {
      ...next,
      current: 0,
      lastCountedDay: null,
      frozenDays: [],
      brokenAt: { day: today, streak: lost, repairDays: [] },
    };
    return { state: refillFreezes(next, today), events };
  }

  if (newlyFrozen.length > 0) {
    next = {
      ...next,
      frozenDays: [...next.frozenDays, ...newlyFrozen].slice(-FROZEN_DAYS_KEPT),
    };
    events.push({
      type: "frozen",
      days: newlyFrozen,
      freezesLeft: next.freezesLeft,
    });
  }

  return { state: refillFreezes(next, today), events };
}

function canRepair(state: StreakState, day: string): boolean {
  if (!state.brokenAt) return false;
  if (state.repairUsedMonth === monthOf(day)) return false;
  const elapsed = daysBetween(state.brokenAt.day, day);
  return elapsed >= 0 && elapsed <= REPAIR_WINDOW_DAYS;
}

/**
 * Records a completed session and returns the updated streak.
 *
 * Safe to call more than once for the same day — a learner who finishes a short
 * session and later comes back for a full one must not gain two days.
 */
export function recordSession(
  state: StreakState,
  day: string,
  tier: SessionTier,
): { state: StreakState; events: StreakEvent[] } {
  const settled = settle(state, day);
  let next = settled.state;
  const events = [...settled.events];

  // Repair path: full sessions inside the window buy the old streak back.
  if (tier === "full" && canRepair(next, day) && next.brokenAt) {
    const repairDays = next.brokenAt.repairDays.includes(day)
      ? next.brokenAt.repairDays
      : [...next.brokenAt.repairDays, day];

    if (repairDays.length >= REPAIR_SESSIONS_REQUIRED) {
      const restored = next.brokenAt.streak + repairDays.length;
      next = {
        ...next,
        current: restored,
        best: Math.max(next.best, restored),
        lastCountedDay: day,
        brokenAt: null,
        repairUsedMonth: monthOf(day),
      };
      events.push({ type: "repaired", streak: restored });
      if (restored > state.best) events.push({ type: "record", streak: restored });
      return { state: next, events };
    }

    next = { ...next, brokenAt: { ...next.brokenAt, repairDays } };
  }

  if (next.lastCountedDay === day) {
    // Already counted today; the extra session still counts for minutes and
    // SRS, just not for the streak.
    return { state: next, events };
  }

  const continues =
    next.lastCountedDay !== null && isContinuation(next, next.lastCountedDay, day);
  const current = continues ? next.current + 1 : 1;
  const best = Math.max(next.best, current);

  next = { ...next, current, best, lastCountedDay: day };
  events.push(
    continues
      ? { type: "extended", streak: current }
      : { type: "started", streak: current },
  );
  if (best > state.best) events.push({ type: "record", streak: best });

  return { state: next, events };
}

/**
 * Whether a day counts toward the weekly 5-of-7 goal (§10.4). The weekly goal
 * is deliberately independent of the streak: a learner can miss a day, keep the
 * week green, and see that reflected without any freeze being spent.
 */
export function weeklyProgress(
  studiedDays: readonly string[],
  weekStartDay: string,
): { done: number; goal: number; met: boolean } {
  const start = weekStartDay;
  const end = addDays(weekStartDay, 6);
  const done = studiedDays.filter((day) => day >= start && day <= end).length;
  return { done, goal: 5, met: done >= 5 };
}
