/**
 * Backend proxy for the free-talk block (curriculum §12.5).
 *
 * The one job here is to hold the API key. The app must never call the model
 * provider directly: a key shipped inside the client can be read out of it by
 * anyone who installs the app, and then spent on the owner's account.
 *
 * Everything else the app does — the four lesson blocks, the SRS, the streak —
 * runs without this server. If it is down, unconfigured, or out of quota, the
 * lesson still completes and still counts (§12.1).
 *
 *   ANTHROPIC_API_KEY=sk-... node server/index.mjs
 */
import { createServer } from "node:http";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import {
  DEFAULT_DAILY_TURN_CAP,
  maxWordsForPhase,
  spendTurn,
  systemPrompt,
  toMessages,
  trimToWords,
  vnToday,
} from "./lib.mjs";

const PORT = Number(process.env.PORT ?? 8787);
const API_KEY = process.env.ANTHROPIC_API_KEY;
const DAILY_TURN_CAP = Number(process.env.DAILY_TURN_CAP ?? DEFAULT_DAILY_TURN_CAP);

/** §12.3 — Haiku is the cost decision; ~34k VND/month at the expected volume. */
const MODEL = process.env.MODEL ?? "claude-haiku-4-5";

/** A role-play turn is a sentence or two; this is a ceiling, not a target. */
const MAX_REPLY_TOKENS = 120;

const STATE_DIR = join(dirname(fileURLToPath(import.meta.url)), ".state");
const QUOTA_FILE = join(STATE_DIR, "quota.json");

const client = API_KEY ? new Anthropic({ apiKey: API_KEY }) : null;

/**
 * Turn counts, persisted so a restart cannot hand out a fresh allowance —
 * which is exactly what a crash loop would do.
 */
function readQuota() {
  try {
    return JSON.parse(readFileSync(QUOTA_FILE, "utf8"));
  } catch {
    return {};
  }
}

function writeQuota(quota) {
  try {
    mkdirSync(STATE_DIR, { recursive: true });
    writeFileSync(QUOTA_FILE, JSON.stringify(quota));
  } catch (error) {
    // Losing the counter is survivable; failing the lesson over it is not.
    console.warn("could not persist quota:", error.message);
  }
}

function send(response, status, body) {
  const payload = JSON.stringify(body);
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(payload),
    "access-control-allow-origin": process.env.ALLOW_ORIGIN ?? "*",
    "access-control-allow-headers": "content-type",
    "access-control-allow-methods": "POST, GET, OPTIONS",
  });
  response.end(payload);
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let raw = "";
    request.on("data", (chunk) => {
      raw += chunk;
      // A learner's turn is a sentence; anything larger is not from this app.
      if (raw.length > 64_000) reject(new Error("body too large"));
    });
    request.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("invalid JSON"));
      }
    });
    request.on("error", reject);
  });
}

async function handleRoleplay(body) {
  const accountId = String(body.accountId ?? "");
  if (accountId !== "acc1" && accountId !== "acc2") {
    return { status: 400, body: { error: "unknown_account" } };
  }
  if (!client) {
    // Not an error the learner should see: the app falls back to the scripted
    // conversation and carries on (§12.5).
    return { status: 503, body: { error: "unconfigured" } };
  }

  const spend = spendTurn(readQuota(), accountId, {
    today: vnToday(),
    cap: DAILY_TURN_CAP,
  });
  if (!spend.allowed) return { status: 429, body: { error: "quota_exhausted", remaining: 0 } };
  writeQuota(spend.quota);

  const phase = Number(body.phase ?? 1);

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_REPLY_TOKENS,
      system: systemPrompt({
        situation: String(body.situation ?? "a friendly everyday conversation"),
        phase,
        knownPhrases: Array.isArray(body.knownPhrases) ? body.knownPhrases : [],
      }),
      messages: toMessages(body.history, body.userText),
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join(" ")
      .trim();

    if (!text) return { status: 502, body: { error: "empty_reply" } };

    return {
      status: 200,
      body: {
        reply: trimToWords(text, maxWordsForPhase(phase)),
        remaining: spend.remaining,
      },
    };
  } catch (error) {
    console.error("roleplay failed:", error?.message ?? error);
    return { status: 502, body: { error: "upstream_failed" } };
  }
}

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") return send(response, 204, {});

  const url = new URL(request.url ?? "/", `http://${request.headers.host}`);

  if (url.pathname === "/api/health") {
    return send(response, 200, {
      configured: client !== null,
      model: MODEL,
      cap: DAILY_TURN_CAP,
    });
  }

  if (url.pathname === "/api/roleplay" && request.method === "POST") {
    try {
      const body = await readBody(request);
      const result = await handleRoleplay(body);
      return send(response, result.status, result.body);
    } catch (error) {
      return send(response, 400, { error: String(error.message ?? "bad_request") });
    }
  }

  return send(response, 404, { error: "not_found" });
});

server.listen(PORT, () => {
  console.log(
    `free-talk proxy on :${PORT} (${client ? MODEL : "NO API KEY — app will fall back"})`,
  );
});
