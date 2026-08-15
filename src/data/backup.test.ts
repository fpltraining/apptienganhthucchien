import { describe, expect, it } from "vitest";
import {
  BACKUP_VERSION,
  accountsIn,
  backupFileName,
  buildBackup,
  describeBackupVi,
  parseBackup,
} from "./backup";

const sample = buildBackup(
  {
    days: [{ accountId: "acc1", day: "2026-03-02" }],
    profiles: [{ accountId: "acc1" }, { accountId: "acc2" }],
  },
  new Date(2026, 2, 2),
);

describe("parseBackup", () => {
  it("round-trips a file it wrote", () => {
    const result = parseBackup(JSON.stringify(sample));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.backup.stores["days"]).toHaveLength(1);
  });

  it("refuses a newer file rather than dropping what it cannot read", () => {
    // Silently keeping the fields we understand would discard whatever the
    // newer version added, and the learner would never know.
    const newer = { ...sample, version: BACKUP_VERSION + 1 };
    const result = parseBackup(JSON.stringify(newer));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reasonVi).toContain("cập nhật app");
  });

  it("refuses a file from something else", () => {
    const result = parseBackup(JSON.stringify({ format: "other", version: 1, stores: {} }));
    expect(result.ok).toBe(false);
  });

  it("refuses text that is not JSON at all", () => {
    const result = parseBackup("khong phai json");
    expect(result.ok).toBe(false);
    // The person reading this is restoring their father's work; a parser error
    // string would tell them nothing about what to do.
    if (!result.ok) expect(result.reasonVi).toMatch(/file/i);
  });

  it("refuses a damaged store rather than importing part of it", () => {
    const damaged = { ...sample, stores: { ...sample.stores, cards: "not a list" } };
    expect(parseBackup(JSON.stringify(damaged)).ok).toBe(false);
  });

  it("accepts a file taken before a store existed", () => {
    // An early backup has no sounds; that is missing history, not damage.
    const early = { ...sample, stores: { days: [], profiles: [] } };
    expect(parseBackup(JSON.stringify(early)).ok).toBe(true);
  });

  it("never throws, whatever it is handed", () => {
    for (const input of ["", "null", "[]", "3", '{"format":null}']) {
      expect(() => parseBackup(input)).not.toThrow();
    }
  });
});

describe("backupFileName", () => {
  it("sorts by date and says what it is", () => {
    expect(backupFileName(new Date(2026, 2, 2))).toBe("tienganh-saoluu-2026-03-02.json");
  });
});

describe("describeBackupVi", () => {
  it("says how much is in the file, so it can be checked before overwriting", () => {
    expect(describeBackupVi(sample)).toContain("1 ngày học");
    expect(describeBackupVi(sample)).toContain("2026-03-02");
  });
});

describe("accountsIn", () => {
  it("lists each account once", () => {
    expect(accountsIn(sample)).toEqual(["acc1", "acc2"]);
  });
});
