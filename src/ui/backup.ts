/**
 * The backup screen (curriculum §16.3).
 *
 * Two buttons and a warning. The restore path is the dangerous one — it
 * replaces what is on the device — so it names what is in the file and what
 * will be lost before it does anything, and the confirmation says what will
 * happen rather than "OK".
 */

import { el, mount } from "./dom";
import { dumpStore, replaceStores } from "../data/db";
import {
  BACKED_UP_STORES,
  backupFileName,
  buildBackup,
  describeBackupVi,
  parseBackup,
} from "../data/backup";
import { readTextFile, saveFile } from "../platform/files";

async function collectStores(): Promise<Record<string, unknown[]>> {
  const stores: Record<string, unknown[]> = {};
  for (const name of BACKED_UP_STORES) {
    stores[name] = await dumpStore(name);
  }
  return stores;
}

/** Renders the screen. Resolves when the learner goes back. */
export function runBackupScreen(root: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const status = el("p", { class: "feedback" }, [""]);

    const onExport = async () => {
      status.textContent = "Đang chuẩn bị…";
      const backup = buildBackup(await collectStores());
      const result = await saveFile(backupFileName(), JSON.stringify(backup));

      status.textContent =
        result === "shared" || result === "downloaded"
          ? "Đã lưu. Bác cất file này vào iCloud hoặc gửi vào email cho chắc."
          : // Backing out of the share sheet is not a problem, and saying it
            // failed would make the learner distrust a backup that works.
            result === "cancelled"
            ? "Chưa lưu gì cả."
            : "Không lưu được. Bác thử lại giúp em.";
    };

    const onImport = async () => {
      const text = await readTextFile();
      if (text === null) {
        status.textContent = "Chưa chọn file nào.";
        return;
      }

      const parsed = parseBackup(text);
      if (!parsed.ok) {
        status.textContent = parsed.reasonVi;
        return;
      }

      // Named before it happens, not after. Restoring is the one action here
      // that destroys something, and the learner must be able to see what they
      // are trading before they agree to it.
      const confirmed = window.confirm(
        `File này có ${describeBackupVi(parsed.backup)}.\n\n` +
          "Khôi phục sẽ thay toàn bộ dữ liệu đang có trên máy này. Bác chắc chưa?",
      );
      if (!confirmed) {
        status.textContent = "Chưa khôi phục gì cả.";
        return;
      }

      try {
        await replaceStores(parsed.backup.stores);
        // Reloaded rather than re-rendered: every screen in the app was built
        // from data that has just been replaced underneath it.
        window.location.reload();
      } catch {
        status.textContent = "Khôi phục không xong. Dữ liệu cũ vẫn còn nguyên.";
      }
    };

    mount(
      root,
      el("section", { class: "block" }, [
        el("h1", { class: "block__title" }, ["Sao lưu dữ liệu"]),
        el("p", { class: "block__lead" }, [
          "Dữ liệu học nằm trong máy này. Nếu iPad hỏng hoặc phải cài lại, " +
            "không có file sao lưu là mất hết.",
        ]),

        el("button", { class: "btn", type: "button", onclick: () => void onExport() }, [
          "Lưu ra file",
        ]),
        el("button", { class: "btn btn--ghost", type: "button", onclick: () => void onImport() }, [
          "Khôi phục từ file",
        ]),

        status,

        el("button", { class: "linkish", type: "button", onclick: () => resolve() }, ["Quay lại"]),
      ]),
    );
  });
}
