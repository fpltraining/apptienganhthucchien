/**
 * IndexedDB access.
 *
 * Hand-rolled rather than pulled from a library: the surface we need is four
 * calls wide, and a dependency here would be larger than the code it replaces.
 *
 * Isolation rule (curriculum §13.1): learning stores are keyed by `accountId`,
 * and every read path below takes an account. There is no query in this module
 * that returns rows for both accounts at once.
 */

import type { AccountId, DayRecord, StreakState, AccountProfile } from "./schema";

const DB_NAME = "tiengannh";
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      // Compound key lets us range-scan one account's days without an index.
      if (!db.objectStoreNames.contains("days")) {
        db.createObjectStore("days", { keyPath: ["accountId", "day"] });
      }
      if (!db.objectStoreNames.contains("streaks")) {
        db.createObjectStore("streaks", { keyPath: "accountId" });
      }
      if (!db.objectStoreNames.contains("profiles")) {
        db.createObjectStore("profiles", { keyPath: "accountId" });
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      // A version change from another tab would otherwise block that tab's
      // upgrade forever.
      db.onversionchange = () => db.close();
      resolve(db);
    };
    request.onerror = () => reject(request.error);
    request.onblocked = () =>
      reject(new Error("IndexedDB upgrade blocked by another open tab"));
  });

  return dbPromise;
}

function promisify<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore<T>(
  store: "days" | "streaks" | "profiles",
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, mode);
    let result: T;
    const request = run(tx.objectStore(store));
    request.onsuccess = () => {
      result = request.result;
    };
    // Resolving on transaction completion rather than request success means a
    // write that later fails to commit surfaces as a rejection instead of a
    // phantom success.
    tx.oncomplete = () => resolve(result);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error ?? new Error("transaction aborted"));
  });
}

// --- days -------------------------------------------------------------------

export async function putDay(record: DayRecord): Promise<void> {
  await withStore("days", "readwrite", (store) => store.put(record));
}

export async function getDay(
  accountId: AccountId,
  day: string,
): Promise<DayRecord | undefined> {
  return withStore("days", "readonly", (store) => store.get([accountId, day]));
}

/** Days in `[fromDay, toDay]` inclusive, ascending, for one account only. */
export async function getDaysBetween(
  accountId: AccountId,
  fromDay: string,
  toDay: string,
): Promise<DayRecord[]> {
  const range = IDBKeyRange.bound([accountId, fromDay], [accountId, toDay]);
  return withStore("days", "readonly", (store) => store.getAll(range));
}

// --- streaks ----------------------------------------------------------------

export async function getStreak(accountId: AccountId): Promise<StreakState | undefined> {
  return withStore("streaks", "readonly", (store) => store.get(accountId));
}

export async function putStreak(state: StreakState): Promise<void> {
  await withStore("streaks", "readwrite", (store) => store.put(state));
}

// --- profiles ---------------------------------------------------------------

export async function getProfile(
  accountId: AccountId,
): Promise<AccountProfile | undefined> {
  return withStore("profiles", "readonly", (store) => store.get(accountId));
}

export async function putProfile(profile: AccountProfile): Promise<void> {
  await withStore("profiles", "readwrite", (store) => store.put(profile));
}

/** Test seam — drops the cached connection so a fresh `openDb` runs. */
export function resetDbForTests(): void {
  dbPromise = null;
}
