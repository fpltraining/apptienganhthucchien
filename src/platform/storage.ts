/**
 * Storage durability.
 *
 * Without a persistence grant, iOS and Android both treat a web app's data as
 * evictable and will clear it when the device runs low on space — which for
 * this app means six months of progress and the voice journal disappearing
 * with no warning (curriculum §16.3, item 3).
 *
 * iOS only grants persistence to a site installed on the home screen, so this
 * is expected to fail while testing in a browser tab. That is not an error
 * worth surfacing to the learner; it is recorded for the diagnostics screen.
 */

export type PersistenceState = {
  /** Whether the browser has promised not to evict our data. */
  persisted: boolean;
  /** False when the browser has no Storage Manager at all (older iOS). */
  supported: boolean;
  usageBytes: number | null;
  quotaBytes: number | null;
};

let cached: PersistenceState | null = null;

export async function ensurePersistentStorage(): Promise<PersistenceState> {
  if (cached) return cached;

  const manager = navigator.storage;
  if (!manager || typeof manager.persist !== "function") {
    cached = { persisted: false, supported: false, usageBytes: null, quotaBytes: null };
    return cached;
  }

  let persisted = false;
  try {
    // `persisted()` first: re-requesting an existing grant is harmless, but on
    // some browsers `persist()` shows a prompt, and we never want to prompt
    // twice.
    persisted = (await manager.persisted?.()) ?? false;
    if (!persisted) persisted = await manager.persist();
  } catch {
    persisted = false;
  }

  let usageBytes: number | null = null;
  let quotaBytes: number | null = null;
  try {
    const estimate = await manager.estimate?.();
    usageBytes = estimate?.usage ?? null;
    quotaBytes = estimate?.quota ?? null;
  } catch {
    // Estimates are advisory; failing to read them changes nothing.
  }

  cached = { persisted, supported: true, usageBytes, quotaBytes };
  return cached;
}
