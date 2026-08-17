import { describe, expect, it, vi } from "vitest";
import {
  FallbackProvider,
  ProviderUnavailable,
  ProxyProvider,
  ScriptedProvider,
} from "./conversation";
import type { ConversationProvider, ConversationRequest } from "./conversation";

function request(overrides: Partial<ConversationRequest> = {}): ConversationRequest {
  return {
    accountId: "acc1",
    situation: "greeting a neighbour",
    phase: 1,
    history: [],
    userText: "Hello.",
    knownPhrases: [],
    ...overrides,
  };
}

describe("ScriptedProvider", () => {
  it("always answers", async () => {
    const reply = await new ScriptedProvider().reply(request());
    expect(reply.text.length).toBeGreaterThan(0);
    expect(reply.source).toBe("scripted");
  });

  it("does not repeat itself turn after turn", async () => {
    const provider = new ScriptedProvider();
    const history: ConversationRequest["history"] = [];
    const seen: string[] = [];

    for (let turn = 0; turn < 4; turn++) {
      const reply = await provider.reply(request({ history: [...history] }));
      seen.push(reply.text);
      history.push({ role: "assistant", text: reply.text });
      history.push({ role: "user", text: "Yes." });
    }

    expect(new Set(seen).size).toBe(seen.length);
  });
});

describe("ProxyProvider", () => {
  it("returns the model's reply", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: "Nice to meet you.", remaining: 40 }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const reply = await new ProxyProvider().reply(request());
    expect(reply).toEqual({ text: "Nice to meet you.", source: "model", remaining: 40 });

    vi.unstubAllGlobals();
  });

  it("treats every failure the same way", async () => {
    // 503 unconfigured, 429 out of quota, 502 upstream down — the caller only
    // needs to know it has to fall back.
    for (const status of [429, 502, 503]) {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status }));
      await expect(new ProxyProvider().reply(request())).rejects.toBeInstanceOf(
        ProviderUnavailable,
      );
    }
    vi.unstubAllGlobals();
  });

  it("rejects an empty reply rather than showing the learner nothing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ reply: "   " }) }),
    );
    await expect(new ProxyProvider().reply(request())).rejects.toBeInstanceOf(
      ProviderUnavailable,
    );
    vi.unstubAllGlobals();
  });
});

describe("FallbackProvider", () => {
  const failing: ConversationProvider = {
    reply: () => Promise.reject(new ProviderUnavailable(503)),
  };

  it("uses the model when it works", async () => {
    const working: ConversationProvider = {
      reply: async () => ({ text: "Hello there.", source: "model", remaining: 3 }),
    };
    const reply = await new FallbackProvider(working).reply(request());
    expect(reply.source).toBe("model");
  });

  it("falls back rather than failing the block", async () => {
    // The rule from §12.1: the free-talk block never blocks progress.
    const reply = await new FallbackProvider(failing).reply(request());
    expect(reply.source).toBe("scripted");
    expect(reply.text.length).toBeGreaterThan(0);
  });

  it("stops retrying the model once it has failed this session", async () => {
    // A learner mid-conversation should not sit through the same timeout on
    // every turn.
    const primary = { reply: vi.fn().mockRejectedValue(new ProviderUnavailable(502)) };
    const provider = new FallbackProvider(primary);

    await provider.reply(request());
    await provider.reply(request());
    await provider.reply(request());

    expect(primary.reply).toHaveBeenCalledTimes(1);
    expect(provider.degraded).toBe(true);
  });
});
