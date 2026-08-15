/**
 * Home screen — today's lesson, and nothing else.
 *
 * There is no menu, no tab bar, no landing page that leads somewhere else. The
 * first thing on screen is the work for today and the button that starts it,
 * because every extra layer between opening the app and speaking is a layer a
 * learner can give up in.
 *
 * The four blocks are shown as a plan, not as live progress. A session runs
 * start to finish in one go and is not resumable partway, so marking one block
 * "in progress" here would be describing a state the app cannot actually be in.
 */

import type { AccountSummary } from "../data/repository";
import type { Account } from "../data/schema";
import type { StreakEvent } from "../domain/streak";
import { BLOCK_LABELS_VI, BLOCK_MINUTES, BLOCK_ORDER } from "../domain/session";
import { getWeek } from "../content";
import { el } from "./dom";

export type HomeActions = {
  onSwitchAccount: () => void;
  onStartSession: () => void;
};

/**
 * Freezes are applied silently and reported after the fact, never as a warning
 * beforehand — §10.4 rules out anything that reads as a threat.
 */
function freezeNotice(events: readonly StreakEvent[]): HTMLElement | null {
  const frozen = events.find((event) => event.type === "frozen");
  if (frozen?.type !== "frozen") return null;

  const dayWord =
    frozen.days.length === 1 ? "hôm qua bác nghỉ" : `bác nghỉ ${frozen.days.length} hôm`;
  const left =
    frozen.freezesLeft > 0
      ? `Còn ${frozen.freezesLeft} ngày nghỉ trong tháng này.`
      : "Tháng này bác đã dùng hết ngày nghỉ. Sang tháng có lại.";

  return el("p", { class: "notice" }, [`Không sao — ${dayWord}. ${left} Chuỗi vẫn nguyên.`]);
}

/**
 * A broken streak is stated once, plainly, with the way back in the same
 * sentence. No exclamation mark and no count of what was lost beyond the
 * number itself: §10.4 is explicit that this moment decides whether someone
 * opens the app again tomorrow.
 */
function brokenNotice(events: readonly StreakEvent[]): HTMLElement | null {
  const broken = events.find((event) => event.type === "broken");
  if (broken?.type !== "broken") return null;

  return el("p", { class: "notice" }, [
    `Chuỗi ${broken.lostStreak} ngày dừng lại rồi. Học đủ 2 buổi trong 3 ngày tới là lấy lại được.`,
  ]);
}

/** The trailing week as pips: studied, rest day, or not yet. */
function pips(pattern: readonly ("done" | "rest" | "none")[]): HTMLElement {
  return el(
    "span",
    { class: "pips", "aria-hidden": "true" },
    pattern.map((state) =>
      el("i", { class: state === "done" ? "pip pip--on" : state === "rest" ? "pip pip--rest" : "pip" }, []),
    ),
  );
}

function streakStrip(summary: AccountSummary): HTMLElement {
  const { streak, week } = summary;
  const rests = week.pattern.filter((day) => day === "rest").length;

  const note =
    week.done >= week.goal
      ? "Tuần này đủ buổi rồi."
      : `Tuần này ${week.done}/${week.goal} buổi — còn ${week.goal - week.done} buổi nữa.`;

  return el("section", { class: "streak" }, [
    el("span", { class: "streak__num" }, [String(streak.current)]),
    el("span", { class: "streak__body" }, [
      el("p", { class: "streak__label" }, [
        streak.current === 1 ? "ngày đầu tiên" : "ngày liên tiếp",
      ]),
      el("p", { class: "streak__note" }, [
        // Rest days are named so the hatched pips mean something, and named
        // neutrally: they were spent, not wasted.
        rests > 0 ? `${note} Có ${rests} ngày nghỉ.` : note,
      ]),
      pips(week.pattern),
    ]),
  ]);
}

/** The four blocks of today's session, with the time each one takes. */
function todayPlan(weekNumber: number, studiedToday: boolean): HTMLElement {
  const week = getWeek(weekNumber);

  return el("section", { class: "panel" }, [
    el("p", { class: "panel__label" }, [`Tuần ${week.week} · 45 phút`]),
    el("p", { class: "panel__stat panel__stat--title" }, [week.titleVi]),
    el(
      "ul",
      { class: "blocks" },
      BLOCK_ORDER.map((kind) =>
        el("li", { class: "blocks__item", "data-state": studiedToday ? "done" : "later" }, [
          el("span", { class: "blocks__dot" }, [studiedToday ? "✓" : ""]),
          el("span", { class: "blocks__name" }, [BLOCK_LABELS_VI[kind]]),
          el("span", { class: "blocks__mins" }, [`${BLOCK_MINUTES[kind]} phút`]),
        ]),
      ),
    ),
  ]);
}

export function renderHome(
  account: Account,
  summary: AccountSummary,
  events: readonly StreakEvent[],
  actions: HomeActions,
): HTMLElement {
  const { streak, studiedToday, profile } = summary;

  return el("main", { class: "home" }, [
    el("div", { class: "home__bar" }, [
      el("span", { class: "home__who" }, [account.displayName]),
      el(
        "button",
        { class: "linkish", type: "button", onclick: actions.onSwitchAccount },
        ["Đổi tài khoản"],
      ),
    ]),

    brokenNotice(events),
    freezeNotice(events),

    // The streak only appears once there is one. A zero on the first day is a
    // score the learner has already lost before starting.
    streak.current > 0 ? streakStrip(summary) : null,

    todayPlan(profile.currentWeek, studiedToday),

    el("button", { class: "btn", type: "button", onclick: actions.onStartSession }, [
      studiedToday ? "Học thêm một buổi" : "Bắt đầu",
    ]),
  ]);
}
