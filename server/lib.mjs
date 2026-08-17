/**
 * Pure helpers for the free-talk proxy.
 *
 * Split out from index.mjs so they can be tested without starting a server or
 * holding an API key — the quota rule and the length clamp are the two things
 * here that would cost real money or confuse a learner if they were wrong.
 */

/** §12.3 — the cap contains a runaway loop; it is not a savings measure. */
export const DEFAULT_DAILY_TURN_CAP = 45;

/** Local calendar day in Vietnam, matching how the app counts days (§10). */
export function vnToday(now = Date.now()) {
  return new Date(now + 7 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

/** Reply length by phase (§12.6): the model must not outrun the learner. */
export function maxWordsForPhase(phase) {
  const value = Number(phase);
  if (value >= 3) return 25;
  if (value === 2) return 20;
  return 12;
}

/**
 * Spends one turn against an account's daily allowance.
 *
 * Returns the counters rather than mutating anything, so the caller decides
 * whether to persist — a failed write must not silently grant a free turn.
 */
export function spendTurn(quota, accountId, { today = vnToday(), cap = DEFAULT_DAILY_TURN_CAP } = {}) {
  const key = `${accountId}:${today}`;
  const used = quota[key] ?? 0;

  if (used >= cap) return { allowed: false, remaining: 0, quota };

  // Drop other days so the file cannot grow without bound.
  const next = Object.fromEntries(
    Object.entries(quota).filter(([entry]) => entry.endsWith(today)),
  );
  next[key] = used + 1;

  return { allowed: true, remaining: cap - used - 1, quota: next };
}

/**
 * §12.6 — three constraints, because an unconstrained model talks over a
 * beginner: too long, too fast, and using words they have not met.
 */
export function systemPrompt({ situation, phase, knownPhrases = [] }) {
  return [
    `You are role-playing with an adult Vietnamese learner of English. The situation: ${situation}.`,
    "",
    "Rules you must follow:",
    `- Reply in at most ${maxWordsForPhase(phase)} words. Short turns keep the learner talking.`,
    "- Use everyday spoken English. Prefer words the learner has already met.",
    "- Stay in character and stay in this situation. Do not change the subject.",
    "- Never switch to Vietnamese.",
    "- Do not teach, correct grammar, or explain. You are a person, not a tutor.",
    "- Do not praise every answer. No 'Great job!' after each turn.",
    "- Ask one simple question most turns, so the learner has something to answer.",
    knownPhrases.length
      ? `Phrases the learner has studied: ${knownPhrases.slice(0, 40).join("; ")}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Enforces the length rule in code as well as in the prompt.
 *
 * A prompt is a request; this is the guarantee. A model that ignores the word
 * limit would bury a beginner, and that is not something to leave to chance.
 */
export function trimToWords(text, maxWords) {
  const clean = String(text ?? "").trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return clean;

  const cut = words.slice(0, maxWords).join(" ");

  // Always fall back to the last complete sentence rather than trailing off:
  // a beginner can act on a short finished sentence, but a clause cut mid-air
  // just reads as broken.
  //
  // Taking the *last* boundary rather than the first also protects the closing
  // question. Models reply "Yes. Where are you from?" constantly, and keeping
  // only "Yes." would leave the learner with nothing to answer — the opposite
  // of what §12.6 asks the model to do.
  const lastStop = Math.max(cut.lastIndexOf("."), cut.lastIndexOf("?"), cut.lastIndexOf("!"));
  return lastStop >= 0 ? cut.slice(0, lastStop + 1) : `${cut}…`;
}

/** Normalises client history into the shape the Messages API expects. */
export function toMessages(history, fallbackText) {
  const turns = (Array.isArray(history) ? history : [])
    .slice(-12)
    .filter((turn) => turn && typeof turn.text === "string" && turn.text.trim())
    .map((turn) => ({
      role: turn.role === "assistant" ? "assistant" : "user",
      content: turn.text.slice(0, 2000),
    }));

  // The API requires the conversation to end on the learner's turn.
  if (turns.length === 0 || turns[turns.length - 1].role !== "user") {
    turns.push({ role: "user", content: String(fallbackText ?? "Hello.").slice(0, 2000) });
  }
  return turns;
}
