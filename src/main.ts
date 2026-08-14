/**
 * App entry point and screen switching.
 *
 * There is no route in the URL: the learner never types an address, and a
 * standalone PWA has no address bar to show one. Screens are plain state.
 */

import { ensurePersistentStorage } from "./platform/storage";
import {
  ACCOUNTS,
  forgetAccount,
  getAccount,
  recallAccount,
  rememberAccount,
} from "./data/accounts";
import { loadAccount } from "./data/repository";
import type { AccountId } from "./data/schema";
import type { StreakEvent } from "./domain/streak";
import { mount } from "./ui/dom";
import { emptyEntries, renderAccountPicker } from "./ui/account-picker";
import type { PickerEntry } from "./ui/account-picker";
import { renderHome } from "./ui/home";
import { runSession } from "./ui/session";

const root = document.querySelector<HTMLElement>("#app");
if (!root) throw new Error("#app is missing from index.html");

async function showPicker(): Promise<void> {
  // Streaks come from storage so each tile shows a real number; if a read
  // fails, the picker still renders rather than leaving a blank screen.
  let entries: PickerEntry[];
  try {
    entries = await Promise.all(
      ACCOUNTS.map(async (account) => {
        const { summary } = await loadAccount(account.id);
        return {
          id: account.id,
          displayName: account.displayName,
          initial: account.initial,
          streak: summary.streak.current,
        };
      }),
    );
  } catch (error) {
    console.error("Could not read streaks for the picker", error);
    entries = emptyEntries();
  }

  mount(root!, renderAccountPicker(entries, (id) => void openAccount(id)));
}

async function openAccount(id: AccountId, events: StreakEvent[] = []): Promise<void> {
  rememberAccount(id);

  const { summary, events: settleEvents } = await loadAccount(id);
  const allEvents = [...settleEvents, ...events];

  mount(
    root!,
    renderHome(getAccount(id), summary, allEvents, {
      onSwitchAccount: () => {
        forgetAccount();
        void showPicker();
      },
      onStartSession: () => void startLesson(id),
    }),
  );
}

/**
 * Starts a lesson and returns to the home screen when it ends.
 *
 * Which week to teach comes from the profile once the placement test exists;
 * until then everyone starts at week 1, which is the correct starting point for
 * the primary learner anyway (§4.4, track C notwithstanding).
 */
async function startLesson(id: AccountId): Promise<void> {
  const { summary } = await loadAccount(id);

  const outcome = await runSession(root!, id, {
    week: 1,
    audioRate: summary.profile.audioRate,
    lastStudyDay: summary.streak.lastCountedDay,
  });

  await openAccount(id, outcome.events);
}

async function start(): Promise<void> {
  // Requested before the first storage write so the grant, where it is given,
  // covers everything we go on to store (curriculum §16.3, item 3).
  const persistence = await ensurePersistentStorage();
  if (!persistence.persisted) {
    console.warn(
      "Storage is not persistent; iOS grants this only to home-screen installs.",
    );
  }

  const remembered = recallAccount();
  if (remembered) {
    await openAccount(remembered);
    return;
  }
  await showPicker();
}

void start();
