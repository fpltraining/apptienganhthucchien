/**
 * Backup and restore (curriculum §16.3).
 *
 * Everything this app knows about the two learners lives in one browser's
 * IndexedDB, on a device whose operating system reserves the right to clear it.
 * Installing to the home screen makes that unlikely, not impossible — and a
 * replaced iPad, a reset, or a mis-tap on "clear website data" all end the same
 * way. Six months of daily work is not something to leave on one copy.
 *
 * The format is deliberately plain JSON: readable, restorable by hand if this
 * code ever breaks, and small enough to sit in an email to yourself.
 */

import type { AccountId } from "./schema";

/**
 * Bumped only on a change that older code could not read correctly.
 *
 * A backup that cannot be understood must be refused, never guessed at: a
 * half-understood restore writes a schedule the learner never had, and unlike a
 * refusal it does so silently.
 */
export const BACKUP_VERSION = 1;

export type BackupFile = {
  format: "tienganhthucchien";
  version: number;
  /** When it was taken, so the learner can tell two files apart. */
  takenAt: string;
  stores: Record<string, unknown[]>;
};

/** The stores that carry learning history. Content is not backed up — it ships
 * with the app and is identical for everyone. */
export const BACKED_UP_STORES = ["days", "streaks", "profiles", "cards", "sounds"] as const;

export type BackupStore = (typeof BACKED_UP_STORES)[number];

export function buildBackup(
  stores: Record<string, unknown[]>,
  takenAt = new Date(),
): BackupFile {
  return {
    format: "tienganhthucchien",
    version: BACKUP_VERSION,
    takenAt: takenAt.toISOString(),
    stores,
  };
}

export type ParseResult =
  | { ok: true; backup: BackupFile }
  | { ok: false; reasonVi: string };

/**
 * Reads a backup file, refusing anything it cannot fully understand.
 *
 * Every failure is reported in Vietnamese and in terms of what to do, because
 * the person reading it is restoring six months of their father's work and
 * "SyntaxError: Unexpected token" tells them nothing.
 */
export function parseBackup(text: string): ParseResult {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    return { ok: false, reasonVi: "File này không đọc được. Bác chọn đúng file sao lưu chưa?" };
  }

  if (typeof value !== "object" || value === null) {
    return { ok: false, reasonVi: "File này không phải file sao lưu của app." };
  }

  const candidate = value as Partial<BackupFile>;

  if (candidate.format !== "tienganhthucchien") {
    return { ok: false, reasonVi: "File này là của app khác, không dùng được ở đây." };
  }

  // Newer than we understand: refuse rather than drop the fields we do not know
  // about, which would quietly discard whatever the newer version added.
  if (typeof candidate.version !== "number" || candidate.version > BACKUP_VERSION) {
    return {
      ok: false,
      reasonVi: "File này của bản app mới hơn. Bác cập nhật app rồi thử lại.",
    };
  }

  if (typeof candidate.stores !== "object" || candidate.stores === null) {
    return { ok: false, reasonVi: "File sao lưu bị thiếu dữ liệu." };
  }

  for (const store of BACKED_UP_STORES) {
    const rows = (candidate.stores as Record<string, unknown>)[store];
    // A missing store is allowed — an early backup has no sounds yet — but a
    // store that is present and not a list means the file is damaged.
    if (rows !== undefined && !Array.isArray(rows)) {
      return { ok: false, reasonVi: "File sao lưu bị hỏng." };
    }
  }

  return {
    ok: true,
    backup: {
      format: "tienganhthucchien",
      version: candidate.version,
      takenAt: typeof candidate.takenAt === "string" ? candidate.takenAt : "",
      stores: candidate.stores as Record<string, unknown[]>,
    },
  };
}

/** A filename that sorts by date and says what it is without being opened. */
export function backupFileName(takenAt = new Date()): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  const stamp =
    `${takenAt.getFullYear()}-${pad(takenAt.getMonth() + 1)}-${pad(takenAt.getDate())}`;
  return `tienganh-saoluu-${stamp}.json`;
}

/** How many days of study a file holds, so the learner can confirm before
 * overwriting what is on the device. */
export function describeBackupVi(backup: BackupFile): string {
  const days = backup.stores["days"]?.length ?? 0;
  const taken = backup.takenAt ? backup.takenAt.slice(0, 10) : "không rõ ngày";
  return `${days} ngày học, lưu ngày ${taken}`;
}

/** Accounts represented in a backup, for the confirmation text. */
export function accountsIn(backup: BackupFile): AccountId[] {
  const profiles = (backup.stores["profiles"] ?? []) as { accountId?: AccountId }[];
  return [...new Set(profiles.map((row) => row.accountId).filter(Boolean))] as AccountId[];
}
