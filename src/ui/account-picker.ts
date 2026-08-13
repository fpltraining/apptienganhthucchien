/**
 * The first screen (curriculum §13.2).
 *
 * Two tiles, one tap, no intermediate confirmation. The streak sits on the tile
 * because it is the first thing the learner sees each day, and §10.5 makes it
 * the motivator rather than something buried in a stats screen.
 */

import { ACCOUNTS } from "../data/accounts";
import type { AccountId } from "../data/schema";
import { el } from "./dom";

export type PickerEntry = {
  id: AccountId;
  displayName: string;
  initial: string;
  streak: number;
};

export function renderAccountPicker(
  entries: readonly PickerEntry[],
  onPick: (id: AccountId) => void,
): HTMLElement {
  const tiles = entries.map((entry) =>
    el(
      "button",
      {
        class: "tile",
        type: "button",
        "aria-label": `${entry.displayName}, chuỗi ${entry.streak} ngày`,
        onclick: () => onPick(entry.id),
      },
      [
        el("span", { class: "tile__avatar", "aria-hidden": true }, [entry.initial]),
        el("span", { class: "tile__name" }, [entry.displayName]),
        el(
          "span",
          // A string, not a boolean: `el` renders `true` as a valueless
          // attribute, which would not match the `[data-empty="true"]` rule.
          { class: "tile__streak", "data-empty": entry.streak === 0 ? "true" : "false" },
          [entry.streak > 0 ? `🔥 ${entry.streak} ngày` : "Bắt đầu hôm nay"],
        ),
      ],
    ),
  );

  return el("main", { class: "picker" }, [
    el("h1", { class: "picker__title" }, ["Hôm nay ai học?"]),
    el("div", { class: "picker__tiles" }, tiles),
  ]);
}

/** Falls back to the two configured accounts with no streak yet. */
export function emptyEntries(): PickerEntry[] {
  return ACCOUNTS.map((account) => ({
    id: account.id,
    displayName: account.displayName,
    initial: account.initial,
    streak: 0,
  }));
}
