/**
 * What happens after week 26 (curriculum §7, "kế hoạch duy trì sau khoá").
 *
 * Without this the course has no ending: progression holds at the final week,
 * so a learner who finished would be handed week 26 again every day, forever.
 * That is worse than an ending — it reads as the app not having noticed.
 *
 * Maintenance is deliberately lighter than a lesson. The goal changes at week
 * 26 from building the habit to not losing what it built, and a learner who has
 * just finished six months of 45-minute days will not keep that up. A shorter
 * session they actually do beats a full one they quietly stop doing (§15).
 */

import type { SessionTier } from "../data/schema";

/** Minutes a maintenance session aims at, against 45 during the course. */
export const MAINTENANCE_MINUTES = 20;

export type Graduation = {
  /** Day the course was completed, for the report. */
  day: string;
  /** Whether Test C was passed, as opposed to reaching week 26 and stopping. */
  passedFinal: boolean;
};

export type CourseReport = {
  daysStudied: number;
  longestStreak: number;
  /** Phrases in review, i.e. met and kept. */
  phrasesLearned: number;
  /** Sounds still worth working on — named, because the report is a starting
   * point rather than a trophy. */
  soundsRemaining: string[];
};

/**
 * The closing summary (§7: "cấp báo cáo tổng kết").
 *
 * Counts what was done, not what was missed. A learner who studied 140 of 182
 * days did 140 days of English; presenting that as 77% turns an achievement
 * into a shortfall, which is the exact framing §15 warns kills the habit.
 *
 * Deliberately does not claim how many sounds were fixed. Trouble words age out
 * of storage once they stop being missed, so nothing here knows how many there
 * ever were — and a number invented for a graduation screen is the same
 * mis-scoring §15 puts at the top of the risk list, just dressed as praise.
 */
export function buildReport(input: {
  daysStudied: number;
  longestStreak: number;
  cardsInReview: number;
  soundsStillTroubled: readonly string[];
}): CourseReport {
  return {
    daysStudied: input.daysStudied,
    longestStreak: input.longestStreak,
    phrasesLearned: input.cardsInReview,
    soundsRemaining: [...input.soundsStillTroubled],
  };
}

/** Vietnamese lines for the report screen, in the order they should be read. */
export function reportLinesVi(report: CourseReport): string[] {
  return [
    `Bác đã học ${report.daysStudied} ngày.`,
    `Chuỗi dài nhất: ${report.longestStreak} ngày liền.`,
    `${report.phrasesLearned} câu đang nằm trong trí nhớ dài hạn.`,
  ];
}

/**
 * Minutes each block gets in a maintenance session, adding to
 * MAINTENANCE_MINUTES.
 */
export const MAINTENANCE_BLOCK_MINUTES: Record<"review" | "speaking" | "freeTalk", number> = {
  review: 7,
  speaking: 8,
  freeTalk: 5,
};

/**
 * What a maintenance session is made of.
 *
 * No new vocabulary block: there is no week 27 to teach. What is left is
 * keeping the phrases retrievable and keeping the mouth working, which is
 * review plus talking.
 */
export const MAINTENANCE_BLOCKS = ["review", "speaking", "freeTalk"] as const;

/**
 * Grades a maintenance session for the streak.
 *
 * A shorter target means the tiers have to move with it, or every maintenance
 * day would count as a partial one and the streak the learner spent six months
 * building would start reading as a decline.
 */
export function maintenanceTier(minutes: number): SessionTier {
  if (minutes >= MAINTENANCE_MINUTES) return "full";
  if (minutes >= 10) return "short";
  return "minimal";
}
