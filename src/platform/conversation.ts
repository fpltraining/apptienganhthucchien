/**
 * Conversation providers (curriculum §12.5).
 *
 * Zone B of the hybrid design. One interface, three implementations, chosen at
 * runtime — swapping providers is a config change, not a rewrite of the lesson.
 *
 * The scripted provider is not a placeholder. It is the floor that makes the
 * rule in §12.1 true: the free-talk block never blocks progress, so a dead
 * network, an exhausted quota or a server that was never configured all end in
 * a working conversation rather than an error screen.
 */

export type ConversationTurn = { role: "user" | "assistant"; text: string };

export type ConversationRequest = {
  accountId: string;
  situation: string;
  /** 1, 2 or 3 — governs how long a reply may be (§12.6). */
  phase: number;
  history: ConversationTurn[];
  userText: string;
  /** Phrases the learner has studied, so the model stays inside them. */
  knownPhrases: string[];
};

export type ConversationReply = {
  text: string;
  /** Which provider answered, so the UI can be honest about it. */
  source: "model" | "scripted";
  /** Turns left today, when the provider tracks them. */
  remaining: number | null;
};

export interface ConversationProvider {
  reply(request: ConversationRequest): Promise<ConversationReply>;
}

/**
 * Fixed replies that keep a conversation moving without a model.
 *
 * Deliberately generic and question-shaped: the aim is only to keep the
 * learner talking for the last few minutes of a session, not to simulate a
 * person. Anything more elaborate would be a worse use of the effort than
 * writing another week of scripted role-play.
 */
const SCRIPTED_REPLIES: readonly string[] = [
  "That's interesting. Tell me more.",
  "I see. And why is that?",
  "Really? How often do you do that?",
  "Nice. Who do you usually go with?",
  "Okay. What happened after that?",
  "That sounds good. Do you like it?",
  "Mmm. And what about tomorrow?",
  "I understand. Can you say a bit more?",
];

export class ScriptedProvider implements ConversationProvider {
  async reply(request: ConversationRequest): Promise<ConversationReply> {
    // Walk the list rather than picking at random, so a learner doing this
    // every day is not asked the same question twice in a row.
    const index = request.history.filter((turn) => turn.role === "assistant").length;
    const text = SCRIPTED_REPLIES[index % SCRIPTED_REPLIES.length] ?? SCRIPTED_REPLIES[0]!;
    return { text, source: "scripted", remaining: null };
  }
}

/** Talks to the backend proxy, which holds the key (§12.5). */
export class ProxyProvider implements ConversationProvider {
  constructor(private readonly baseUrl = "") {}

  async reply(request: ConversationRequest): Promise<ConversationReply> {
    const response = await fetch(`${this.baseUrl}/api/roleplay`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      // 503 unconfigured, 429 out of quota, 502 upstream down — all the same
      // to the caller, which falls back rather than surfacing a status code.
      throw new ProviderUnavailable(response.status);
    }

    const body = (await response.json()) as { reply?: unknown; remaining?: unknown };
    const text = typeof body.reply === "string" ? body.reply.trim() : "";
    if (!text) throw new ProviderUnavailable(502);

    return {
      text,
      source: "model",
      remaining: typeof body.remaining === "number" ? body.remaining : null,
    };
  }
}

/**
 * Picks a provider from the build configuration.
 *
 * With no backend URL set there is nothing to call, so the scripted provider is
 * used directly rather than firing a request that is certain to fail. The owner
 * sets `VITE_API_BASE` when they deploy the proxy; until then free talk works,
 * it is simply not model-backed.
 */
export function createConversationProvider(): ConversationProvider {
  const base = (import.meta.env.VITE_API_BASE ?? "").trim();
  if (!base) return new ScriptedProvider();
  return new FallbackProvider(new ProxyProvider(base === "/" ? "" : base));
}

export class ProviderUnavailable extends Error {
  constructor(readonly status: number) {
    super(`conversation provider unavailable (${status})`);
    this.name = "ProviderUnavailable";
  }
}

/**
 * Tries the model, falls back to the script.
 *
 * Once the model has failed inside a session it is not retried: a learner
 * mid-conversation should not sit through the same timeout on every turn, and
 * a conversation that alternates between two very different voices is worse
 * than one that is consistently simple.
 */
export class FallbackProvider implements ConversationProvider {
  private modelFailed = false;

  constructor(
    private readonly primary: ConversationProvider,
    private readonly fallback: ConversationProvider = new ScriptedProvider(),
  ) {}

  async reply(request: ConversationRequest): Promise<ConversationReply> {
    if (!this.modelFailed) {
      try {
        return await this.primary.reply(request);
      } catch {
        this.modelFailed = true;
      }
    }
    return this.fallback.reply(request);
  }

  /** True once this session gave up on the model. */
  get degraded(): boolean {
    return this.modelFailed;
  }
}
