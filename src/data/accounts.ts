/**
 * The two accounts (curriculum §13.2).
 *
 * There is no sign-up, so these are fixed at build time rather than created at
 * runtime. Account 1 is the primary learner; account 2 is the owner.
 */

import type { Account, AccountId } from "./schema";
import { toDayKey } from "../domain/dates";

export const ACCOUNTS: readonly Account[] = [
  { id: "acc1", displayName: "Tài khoản 1", initial: "1" },
  { id: "acc2", displayName: "Tài khoản 2", initial: "2" },
];

export function isAccountId(value: unknown): value is AccountId {
  return value === "acc1" || value === "acc2";
}

export function getAccount(id: AccountId): Account {
  const account = ACCOUNTS.find((candidate) => candidate.id === id);
  if (!account) throw new Error(`unknown account: ${id}`);
  return account;
}

/**
 * Last account used, remembered for the rest of the calendar day so reopening
 * the app in the afternoon skips the picker entirely (§13.2).
 *
 * Deliberately localStorage rather than IndexedDB: this is read during the
 * first paint, and an async read would show the picker for a frame before
 * replacing it.
 */
const LAST_ACCOUNT_KEY = "last-account";

export function rememberAccount(id: AccountId, now = new Date()): void {
  try {
    localStorage.setItem(LAST_ACCOUNT_KEY, JSON.stringify({ id, day: toDayKey(now) }));
  } catch {
    // Private mode or a full disk. Forgetting the choice is a small annoyance,
    // not a reason to fail the launch.
  }
}

export function recallAccount(now = new Date()): AccountId | null {
  try {
    const raw = localStorage.getItem(LAST_ACCOUNT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;

    const { id, day } = parsed as { id?: unknown; day?: unknown };
    if (!isAccountId(id) || day !== toDayKey(now)) return null;
    return id;
  } catch {
    return null;
  }
}

export function forgetAccount(): void {
  try {
    localStorage.removeItem(LAST_ACCOUNT_KEY);
  } catch {
    // See rememberAccount.
  }
}
