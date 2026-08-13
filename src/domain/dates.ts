/**
 * Calendar-day helpers.
 *
 * Streaks are judged on the learner's *local* calendar day, never on UTC. A
 * session finished at 11pm in Vietnam must count for that day, and a UTC-based
 * day key would push it into tomorrow and silently break the streak.
 */

/** `YYYY-MM-DD` in the device's local timezone. */
export function toDayKey(date: Date): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** `YYYY-MM` in the device's local timezone. */
export function toMonthKey(date: Date): string {
  return toDayKey(date).slice(0, 7);
}

export function parseDayKey(day: string): Date {
  const [y, m, d] = day.split("-").map(Number);
  // Constructing from parts (rather than `new Date(day)`) keeps this local;
  // `new Date("2026-01-01")` is parsed as UTC midnight.
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

export function addDays(day: string, delta: number): string {
  const date = parseDayKey(day);
  date.setDate(date.getDate() + delta);
  return toDayKey(date);
}

/** Whole days from `from` to `to`; negative when `to` precedes `from`. */
export function daysBetween(from: string, to: string): number {
  const a = parseDayKey(from);
  const b = parseDayKey(to);
  // Comparing at local midnight sidesteps DST hour shifts, which would
  // otherwise make some day gaps read as 0.96 or 1.04 days.
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

/** 0 = Sunday. Sunday is the deliberately light day (curriculum §5.3). */
export function isSunday(day: string): boolean {
  return parseDayKey(day).getDay() === 0;
}
