/**
 * Playback of the pre-generated voice (curriculum §5.2).
 *
 * The whole app is built around listening to English, so the model voice is not
 * a detail — a synthetic-sounding one teaches the learner to understand a robot.
 * Since all 26 weeks of content are fixed, the audio is recorded once by
 * `scripts/generate-audio.mjs` and shipped with the app, which gets a natural
 * voice and offline playback at the same time.
 *
 * This module is deliberately incomplete on its own: any line with no clip
 * falls back to the device voice. That keeps the app working before the audio
 * has been generated, and keeps a single failed line from silently breaking a
 * lesson.
 */

import manifest from "../content/audio-manifest.json";

const CLIPS = manifest as Record<string, string>;

/** True once there is any recorded audio at all. */
export function hasRecordedAudio(): boolean {
  return Object.keys(CLIPS).length > 0;
}

/**
 * The clip for a line, or null when it was never recorded.
 *
 * Keyed on the exact text and accent, so a phrase spoken in Indian English in
 * week 19 and American English in week 4 are two different recordings rather
 * than one shared by accident.
 */
export function clipUrlFor(text: string, lang: string): string | null {
  const file = CLIPS[`${lang}|${text.trim()}`];
  if (!file) return null;
  // BASE_URL carries the trailing slash, and it differs between a domain root
  // and the GitHub Pages sub-path.
  return `${import.meta.env.BASE_URL}audio/${file}`;
}

let playing: HTMLAudioElement | null = null;

/**
 * Plays a recorded clip. Resolves false when there is nothing to play, so the
 * caller can fall back rather than leaving the learner in silence.
 *
 * Never rejects. A missing file, a codec the device will not take, an autoplay
 * refusal — all of them mean "fall back", none of them mean "stop the lesson".
 */
export function playClip(
  text: string,
  options: { lang?: string; rate?: number } = {},
): Promise<boolean> {
  const url = clipUrlFor(text, options.lang ?? "en-US");
  if (!url) return Promise.resolve(false);

  return new Promise((resolve) => {
    let settled = false;
    const finish = (played: boolean) => {
      if (settled) return;
      settled = true;
      resolve(played);
    };

    try {
      stopClip();

      const audio = new Audio(url);
      // The listening ladder still applies to recorded audio: §5.2 raises the
      // speed as the ear improves, and a recording can be slowed the same way
      // a synthesised voice could.
      audio.playbackRate = options.rate ?? 1;
      audio.preservesPitch = true;
      playing = audio;

      audio.onended = () => finish(true);
      audio.onerror = () => finish(false);

      void audio.play().catch(() => finish(false));
    } catch {
      finish(false);
    }
  });
}

export function stopClip(): void {
  if (!playing) return;
  try {
    playing.pause();
    playing.currentTime = 0;
  } catch {
    // Already stopped.
  }
  playing = null;
}
