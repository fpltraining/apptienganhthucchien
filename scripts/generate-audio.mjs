/**
 * Pre-generates the spoken audio for all 26 weeks (curriculum §5.2, §12.7).
 *
 * Why pre-generate rather than speak on the fly: the content is fixed. Every
 * phrase, passage line, shadowing drill and role-play turn is written and will
 * not change between runs, so the audio can be made once and shipped with the
 * app. That buys three things at the same time — a voice that does not sound
 * synthetic, audio that works with no signal, and a cost that is paid once
 * instead of per lesson.
 *
 * Idempotent: a clip that already exists is left alone, so re-running after
 * adding a week only pays for that week.
 *
 *   AZURE_SPEECH_KEY=... AZURE_SPEECH_REGION=southeastasia \
 *     node scripts/generate-audio.mjs
 *
 * Without a key it reports what it would generate and exits cleanly, so the
 * repo stays buildable for anyone who has not set one up. The app falls back to
 * the device voice for any line with no clip, which is also what makes it safe
 * to ship this half-finished.
 */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const AUDIO_DIR = join(ROOT, "public", "audio");
const MANIFEST = join(ROOT, "src", "content", "audio-manifest.json");

const KEY = process.env.AZURE_SPEECH_KEY;
const REGION = process.env.AZURE_SPEECH_REGION ?? "southeastasia";

/**
 * One voice per accent the curriculum asks for (§giai đoạn 3).
 *
 * The accent gauntlet in week 25 is the reason this app needs a provider with
 * real regional voices rather than the most natural single voice: five
 * speakers who all sound American would make that week pointless.
 *
 * Anna is the app's usual speaker and is female throughout the content, so the
 * default voices are female to match.
 */
const VOICES = {
  "en-US": "en-US-AvaMultilingualNeural",
  "en-GB": "en-GB-SoniaNeural",
  "en-IN": "en-IN-NeerjaNeural",
  "en-AU": "en-AU-NatashaNeural",
  "en-PH": "en-PH-BlessicaNeural",
};

const DEFAULT_LANG = "en-US";

/** Everything that gets spoken aloud, with the accent it is spoken in. */
function collectUtterances() {
  const files = readFileSync(join(ROOT, "src", "content", "index.ts"), "utf8")
    .match(/from "\.\/(week\d+)"/g)
    ?.map((line) => line.replace(/from "\.\/|"/g, "")) ?? [];

  const seen = new Map();

  for (const file of files) {
    const source = readFileSync(join(ROOT, "src", "content", `${file}.ts`), "utf8");

    // The week's own voice, when it teaches an accent.
    const weekLang = source.match(/voiceLang: "([a-zA-Z-]+)"/)?.[1] ?? DEFAULT_LANG;

    // Listening lines may each carry their own accent — that is the gauntlet.
    for (const match of source.matchAll(
      /\{\s*speaker: "[^"]*",\s*text: "((?:[^"\\]|\\.)*)"(?:,\s*lang: "([a-zA-Z-]+)")?\s*\}/g,
    )) {
      add(seen, unescape_(match[1]), match[2] ?? weekLang);
    }

    // Vocabulary phrases, shadowing lines, role-play turns.
    for (const match of source.matchAll(/\bphrase: "((?:[^"\\]|\\.)*)"/g)) {
      add(seen, unescape_(match[1]), weekLang);
    }
    for (const match of source.matchAll(/\btext: "((?:[^"\\]|\\.)*)",\s*\n\s*focusVi:/g)) {
      add(seen, unescape_(match[1]), weekLang);
    }
    for (const match of source.matchAll(/\bsay: "((?:[^"\\]|\\.)*)"/g)) {
      add(seen, unescape_(match[1]), weekLang);
    }
  }

  return [...seen.values()];
}

function unescape_(text) {
  return text.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
}

function add(seen, text, lang) {
  const trimmed = text.trim();
  if (!trimmed) return;
  // Vietnamese stage directions inside role-play lines are not spoken English
  // and would be read out as gibberish by an English voice.
  if (/[àáâãèéêìíòóôõùúýăđĩũơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i.test(trimmed)) {
    return;
  }
  const key = `${lang}|${trimmed}`;
  if (!seen.has(key)) seen.set(key, { text: trimmed, lang, key });
}

function fileNameFor(entry) {
  const hash = createHash("sha256").update(entry.key).digest("hex").slice(0, 16);
  return `${entry.lang}-${hash}.mp3`;
}

/** Escapes the five characters that would otherwise break the SSML document. */
function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * How many clips to ask for at once.
 *
 * The free tier throttles hard — a handful of requests a minute — and answers
 * everything above that with 429. Paid tiers are far more generous. Rather than
 * pick one and be wrong on the other, this starts modest and the retry logic
 * below backs it off further whenever the service says to.
 */
const START_CONCURRENCY = Number(process.env.AUDIO_CONCURRENCY ?? 4);

/** Raised whenever a 429 arrives, so the next attempt waits longer. */
let backoffMs = 0;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function synthesise(entry) {
  const voice = VOICES[entry.lang] ?? VOICES[DEFAULT_LANG];
  const ssml =
    `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${entry.lang}">` +
    `<voice name="${voice}">${escapeXml(entry.text)}</voice></speak>`;

  const response = await fetch(
    `https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
    {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": KEY,
        "Content-Type": "application/ssml+xml",
        // 24kHz mono at 48kbps: clearly better than speech needs, still small
        // enough that all 26 weeks fit in a few megabytes.
        "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
        "User-Agent": "tienganhthucchien",
      },
      body: ssml,
    },
  );

  if (response.status === 429) {
    // The service tells us how long to wait; trust it over any guess, and keep
    // the delay for subsequent requests so the whole run slows rather than
    // hammering the limit once per clip.
    const retryAfter = Number(response.headers.get("retry-after") ?? 0);
    const wait = retryAfter > 0 ? retryAfter * 1000 : Math.min(60_000, Math.max(2000, backoffMs * 2));
    backoffMs = wait;
    throw Object.assign(new Error(`throttled, waiting ${Math.round(wait / 1000)}s`), {
      retryable: true,
      wait,
    });
  }

  if (response.status >= 500) {
    throw Object.assign(new Error(`${response.status} from the service`), {
      retryable: true,
      wait: 5000,
    });
  }

  if (!response.ok) {
    // 401 and 403 mean the key or region is wrong, and no amount of retrying
    // fixes that. Say so plainly rather than burying it in a per-line warning.
    const body = await response.text().catch(() => "");
    if (response.status === 401 || response.status === 403) {
      console.error(
        `\nAzure refused the key (${response.status}). Check AZURE_SPEECH_KEY and that ` +
          `AZURE_SPEECH_REGION is the resource's region — currently "${REGION}".`,
      );
      process.exit(1);
    }
    throw new Error(`${response.status} ${body}`);
  }

  // A successful call means the current pace is acceptable; ease off the brake.
  backoffMs = Math.floor(backoffMs / 2);
  return Buffer.from(await response.arrayBuffer());
}

/** Synthesises one clip, waiting out throttling rather than giving up on it. */
async function synthesiseWithRetry(entry, attempts = 6) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      if (backoffMs > 0) await sleep(backoffMs);
      return await synthesise(entry);
    } catch (error) {
      if (!error.retryable || attempt === attempts) throw error;
      await sleep(error.wait ?? 2000);
    }
  }
  throw new Error("unreachable");
}

const utterances = collectUtterances();
const manifest = {};
for (const entry of utterances) manifest[entry.key] = fileNameFor(entry);

if (!KEY) {
  const chars = utterances.reduce((total, entry) => total + entry.text.length, 0);
  console.log(`${utterances.length} lines, ${chars.toLocaleString()} characters.`);
  console.log("Set AZURE_SPEECH_KEY to generate. Nothing was written.");
  process.exit(0);
}

mkdirSync(AUDIO_DIR, { recursive: true });

const pending = utterances.filter((entry) => !existsSync(join(AUDIO_DIR, fileNameFor(entry))));
const skipped = utterances.length - pending.length;

console.log(`${pending.length} to generate, ${skipped} already present.`);

let made = 0;
let failed = 0;
let next = 0;

async function worker() {
  while (next < pending.length) {
    const entry = pending[next++];
    try {
      writeFileSync(join(AUDIO_DIR, fileNameFor(entry)), await synthesiseWithRetry(entry));
      made++;
      if (made % 50 === 0) console.log(`  ${made}/${pending.length}…`);
    } catch (error) {
      // One failed line must not lose the whole run: the manifest simply will
      // not point at it, and the app falls back to the device voice there.
      console.warn(`skipped "${entry.text.slice(0, 40)}…": ${error.message}`);
      delete manifest[entry.key];
      failed++;
    }
  }
}

await Promise.all(
  Array.from({ length: Math.max(1, START_CONCURRENCY) }, () => worker()),
);

writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`\n${made} generated, ${skipped} already present, ${failed} failed.`);
console.log(`Manifest: ${Object.keys(manifest).length} lines.`);
