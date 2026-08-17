/**
 * Getting a file out of, and back into, an installed iOS web app.
 *
 * This is more awkward than it looks. In a home-screen PWA — which is how this
 * app is meant to be used (§16.3) — a plain `<a download>` often does nothing
 * at all: no file, no error, no clue. The share sheet is the path that actually
 * works there, and it is also the better one, because it lets the learner put
 * the file wherever they already keep things (Files, iCloud, a message to
 * themselves) instead of into a Downloads folder they will never open.
 *
 * The download link stays as a fallback for desktop browsers, where the share
 * sheet does not exist.
 */

export type SaveResult = "shared" | "downloaded" | "cancelled" | "failed";

/**
 * Hands the learner a file to keep.
 *
 * Cancelling is reported separately from failing: a learner who backed out of
 * the share sheet has not hit a problem, and telling them something went wrong
 * would be a lie that makes them distrust the backup.
 */
export async function saveFile(
  name: string,
  contents: string,
  mimeType = "application/json",
): Promise<SaveResult> {
  const file = new File([contents], name, { type: mimeType });

  // canShare with files is the only reliable test: iOS exposes navigator.share
  // for text on versions that cannot share files at all.
  if (typeof navigator.canShare === "function" && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      return "shared";
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return "cancelled";
      // Anything else falls through to the link: a share that failed for some
      // other reason should not cost the learner their backup.
    }
  }

  try {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.append(link);
    link.click();
    link.remove();
    // Revoked on the next frame rather than immediately: Safari has not always
    // finished reading the blob by the time click() returns.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return "downloaded";
  } catch {
    return "failed";
  }
}

/**
 * Asks the learner for a file and reads it as text.
 *
 * Resolves null when they close the picker without choosing. There is no
 * cancel event for a file input, so this settles on the next interaction after
 * the picker closes rather than hanging forever on a dialog that was dismissed.
 */
export function readTextFile(accept = "application/json,.json"): Promise<string | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.style.display = "none";

    let settled = false;
    const finish = (value: string | null) => {
      if (settled) return;
      settled = true;
      input.remove();
      resolve(value);
    };

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return finish(null);
      file
        .text()
        .then(finish)
        .catch(() => finish(null));
    };

    // Fires when the picker closes, chosen or not. Not supported everywhere,
    // which is why it only ever resolves null and never contradicts onchange.
    input.oncancel = () => finish(null);

    document.body.append(input);
    input.click();
  });
}
