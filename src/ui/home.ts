/**
 * Home screen for a chosen account.
 *
 * This is the slice that proves the loop end to end: the streak engine, the
 * per-account stores and the session record all meet here. The four learning
 * blocks (§5) plug into the "start" action next.
 */

import type { AccountSummary } from "../data/repository";
import type { Account } from "../data/schema";
import type { StreakEvent } from "../domain/streak";
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

  const dayWord = frozen.days.length === 1 ? "hôm qua bạn nghỉ" : `bạn nghỉ ${frozen.days.length} hôm`;
  const left =
    frozen.freezesLeft > 0
      ? `Còn ${frozen.freezesLeft} ngày đóng băng trong tháng này.`
      : "Đã dùng hết ngày đóng băng của tháng này.";

  return el("p", { class: "notice" }, [`Không sao — ${dayWord}. ${left} Chuỗi vẫn nguyên.`]);
}

function brokenNotice(events: readonly StreakEvent[]): HTMLElement | null {
  const broken = events.find((event) => event.type === "broken");
  if (broken?.type !== "broken") return null;

  return el("p", { class: "notice" }, [
    `Chuỗi ${broken.lostStreak} ngày đã dừng lại. Học đủ 2 buổi trong 3 ngày tới là lấy lại được.`,
  ]);
}

export function renderHome(
  account: Account,
  summary: AccountSummary,
  events: readonly StreakEvent[],
  actions: HomeActions,
): HTMLElement {
  const { streak, week, studiedToday } = summary;

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

    el("section", { class: "panel" }, [
      el("p", { class: "panel__label" }, ["Chuỗi hiện tại"]),
      el("p", { class: "panel__stat" }, [
        streak.current > 0 ? `🔥 ${streak.current}` : "—",
      ]),
      el("p", { class: "panel__note" }, [
        streak.best > 0 ? `Kỷ lục của bạn: ${streak.best} ngày` : "Buổi đầu tiên đang chờ bạn",
      ]),
    ]),

    el("section", { class: "panel" }, [
      el("p", { class: "panel__label" }, ["Tuần này"]),
      el("p", { class: "panel__stat" }, [`${week.done}/${week.goal}`]),
      el("p", { class: "panel__note" }, [
        week.met ? "Đạt mục tiêu tuần rồi" : "Đủ 5 ngày là tuần này xanh",
      ]),
    ]),

    el("button", { class: "btn", type: "button", onclick: actions.onStartSession }, [
      studiedToday ? "Học thêm" : "Bắt đầu buổi học",
    ]),
  ]);
}
