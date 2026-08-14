/**
 * Speech playback and speech-onset timing.
 *
 * Playback uses the device's own voice (SpeechSynthesis) rather than recorded
 * audio files. That is a stopgap with a real benefit: the app can teach week 1
 * before a single audio file has been produced, and it works offline. Recorded
 * human audio replaces it for the core phrases (§14) — the interface here does
 * not change when it does.
 *
 * Onset timing is the important half. §3 makes response latency the headline
 * metric of the whole course, so it has to be measured from when speech
 * actually starts, not from when the learner taps a button. A tap measures
 * how fast someone can find a button after they finish talking, which is a
 * different thing entirely.
 */

export type SpeakOptions = {
  /** Playback rate; the listening block raises this as the ear improves. */
  rate?: number;
  lang?: string;
};

export type ListenResult = {
  /** False when the learner never spoke before the deadline. */
  spoken: boolean;
  /** Milliseconds from listening starting to speech being detected. */
  latencyMs: number;
  /** True when the microphone was unavailable and the learner self-reported. */
  degraded: boolean;
};

/** Above this energy for two consecutive frames counts as speech starting. */
const ONSET_RMS_THRESHOLD = 0.035;
const ONSET_FRAMES_REQUIRED = 2;
/** §5.2 gives the learner eight seconds to answer before it counts as a miss. */
export const RESPONSE_DEADLINE_MS = 8000;

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/**
 * Whether the device actually has a voice that can read English.
 *
 * `speechSynthesis` existing is not the same as it working. A device with no
 * installed voice accepts the utterance and then never fires `onend`, so
 * without this check every card would sit through the safety timeout in
 * silence — several wasted seconds each, on every card, for the whole session.
 */
export function hasEnglishVoice(): boolean {
  if (!speechSupported()) return false;
  try {
    const voices = window.speechSynthesis.getVoices();
    // An empty list early in page life usually means the list is still loading,
    // so assume a voice exists and let the timeout catch a device with none.
    if (voices.length === 0) return true;
    return voices.some((voice) => voice.lang.toLowerCase().startsWith("en"));
  } catch {
    return false;
  }
}

export function micSupported(): boolean {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.mediaDevices?.getUserMedia === "function" &&
    typeof window !== "undefined" &&
    ("AudioContext" in window || "webkitAudioContext" in window)
  );
}

/**
 * Speaks a line and resolves when it finishes.
 *
 * Never rejects: a device with no voice installed, or iOS refusing to speak
 * outside a user gesture, must not take the lesson down with it. The learner
 * still has the text on screen.
 */
export function speak(text: string, options: SpeakOptions = {}): Promise<void> {
  if (!speechSupported() || !hasEnglishVoice()) return Promise.resolve();

  return new Promise((resolve) => {
    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options.lang ?? "en-US";
      utterance.rate = options.rate ?? 1;

      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        resolve();
      };

      utterance.onend = finish;
      utterance.onerror = finish;

      // iOS sometimes drops the end event when the app is backgrounded
      // mid-utterance, which would otherwise hang the block forever.
      const guardMs = Math.max(4000, text.length * 120);
      setTimeout(finish, guardMs);

      window.speechSynthesis.speak(utterance);
    } catch {
      resolve();
    }
  });
}

export function stopSpeaking(): void {
  if (speechSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Nothing to stop.
    }
  }
}

type MicSession = {
  stream: MediaStream;
  context: AudioContext;
  analyser: AnalyserNode;
};

let micSession: MicSession | null = null;

/**
 * Opens the microphone once and keeps it open for the session.
 *
 * Re-prompting per card would be unusable, and on iOS each `getUserMedia` call
 * can re-trigger the permission sheet.
 */
async function openMic(): Promise<MicSession | null> {
  if (micSession) return micSession;
  if (!micSupported()) return null;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true },
    });

    const AudioContextCtor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    const context = new AudioContextCtor();
    const analyser = context.createAnalyser();
    analyser.fftSize = 1024;
    context.createMediaStreamSource(stream).connect(analyser);

    micSession = { stream, context, analyser };
    return micSession;
  } catch {
    // Permission denied, or no microphone. The caller degrades gracefully.
    return null;
  }
}

export function closeMic(): void {
  if (!micSession) return;
  for (const track of micSession.stream.getTracks()) track.stop();
  void micSession.context.close().catch(() => undefined);
  micSession = null;
}

/** Root-mean-square energy of the current frame, roughly 0–1. */
function frameEnergy(analyser: AnalyserNode, buffer: Float32Array<ArrayBuffer>): number {
  analyser.getFloatTimeDomainData(buffer);
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) {
    const sample = buffer[i] ?? 0;
    sum += sample * sample;
  }
  return Math.sqrt(sum / buffer.length);
}

/**
 * Waits for the learner to start speaking and reports how long it took.
 *
 * Resolves as soon as speech starts — the block does not wait for them to
 * finish, because the number being measured is how long it took to *begin*.
 */
export async function listenForSpeechOnset(
  options: { deadlineMs?: number; signal?: AbortSignal } = {},
): Promise<ListenResult> {
  const deadline = options.deadlineMs ?? RESPONSE_DEADLINE_MS;
  const session = await openMic();

  if (!session) {
    return { spoken: false, latencyMs: deadline, degraded: true };
  }

  const buffer = new Float32Array(session.analyser.fftSize);
  const startedAt = performance.now();

  return new Promise((resolve) => {
    let loudFrames = 0;
    let frame = 0;

    const tick = () => {
      if (options.signal?.aborted) {
        resolve({ spoken: false, latencyMs: performance.now() - startedAt, degraded: false });
        return;
      }

      const elapsed = performance.now() - startedAt;
      if (elapsed >= deadline) {
        resolve({ spoken: false, latencyMs: deadline, degraded: false });
        return;
      }

      loudFrames = frameEnergy(session.analyser, buffer) > ONSET_RMS_THRESHOLD ? loudFrames + 1 : 0;

      // Two frames rather than one: a door closing or a cough spikes a single
      // frame, and a false onset would report a latency the learner never had.
      if (loudFrames >= ONSET_FRAMES_REQUIRED) {
        resolve({ spoken: true, latencyMs: Math.round(elapsed), degraded: false });
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    options.signal?.addEventListener("abort", () => cancelAnimationFrame(frame), { once: true });
  });
}

/**
 * Asks for microphone access up front, so the permission sheet appears once at
 * the start of the session rather than in the middle of the first card.
 *
 * @returns true when the microphone is usable
 */
export async function primeMicrophone(): Promise<boolean> {
  return (await openMic()) !== null;
}

// --- speech recognition ------------------------------------------------------

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  onspeechstart: (() => void) | null;
};

type RecognitionCtor = new () => SpeechRecognitionLike;

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const scope = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return scope.SpeechRecognition ?? scope.webkitSpeechRecognition ?? null;
}

export function recognitionSupported(): boolean {
  return recognitionCtor() !== null;
}

export type RecognitionResult = ListenResult & {
  /** What the learner said, lowercased. Empty when nothing was recognised. */
  transcript: string;
};

/**
 * Listens for an English reply and returns both the words and the onset delay.
 *
 * Used by the role-play block, which needs the words to pick a branch. Support
 * is patchy — Safari has it, but a standalone PWA on an older iOS may not — so
 * a `supported: false` answer is a normal outcome, and the caller falls back to
 * letting the learner tap the reply they said.
 */
export function recognizeSpeech(
  options: { deadlineMs?: number; lang?: string } = {},
): Promise<RecognitionResult | null> {
  const Ctor = recognitionCtor();
  if (!Ctor) return Promise.resolve(null);

  const deadline = options.deadlineMs ?? RESPONSE_DEADLINE_MS;

  return new Promise((resolve) => {
    let recognition: SpeechRecognitionLike;
    try {
      recognition = new Ctor();
    } catch {
      resolve(null);
      return;
    }

    recognition.lang = options.lang ?? "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const startedAt = performance.now();
    let onsetMs: number | null = null;
    let transcript = "";
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try {
        recognition.abort();
      } catch {
        // Already stopped.
      }
      resolve({
        spoken: transcript.length > 0,
        latencyMs: Math.round(onsetMs ?? deadline),
        degraded: false,
        transcript: transcript.toLowerCase().trim(),
      });
    };

    const timer = setTimeout(finish, deadline + 2000);

    // Onset comes from the recognizer rather than our own analyser, so the two
    // are not competing for the microphone on platforms that allow only one.
    recognition.onspeechstart = () => {
      if (onsetMs === null) onsetMs = performance.now() - startedAt;
    };
    recognition.onresult = (event) => {
      transcript = event.results[0]?.[0]?.transcript ?? "";
    };
    recognition.onerror = finish;
    recognition.onend = finish;

    try {
      recognition.start();
    } catch {
      finish();
    }
  });
}
