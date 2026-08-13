/**
 * One evaluated agent run. THIS FILE ONLY EVER EXECUTES INSIDE THE CONTAINER.
 *
 * It reads a job on stdin, runs a pi agent against it with the read-only tool
 * surface, and writes one JSON trace to stdout. It writes nothing else and
 * touches no file outside the read-only mounts.
 *
 * Never invoke this from the host. `eval/run.ts` is the entry point; it spawns
 * this under podman. The guard at the bottom refuses to run outside a container.
 *
 * Targets @earendil-works/pi-ai 0.84.x, where providers are registered
 * explicitly rather than read from a bundled catalog. Model definitions are
 * pinned here on purpose: the eval must not depend on a network catalog fetch.
 */

import fs from "node:fs";
import { Agent } from "@earendil-works/pi-agent-core";
import type { AgentMessage } from "@earendil-works/pi-agent-core";
import type { Message } from "@earendil-works/pi-ai";
import {
  createModels,
  fauxProvider,
  fauxAssistantMessage,
  fauxText,
  fauxToolCall,
} from "@earendil-works/pi-ai";
import { openrouterProvider } from "@earendil-works/pi-ai/providers/openrouter";
import { openaiCodexProvider } from "@earendil-works/pi-ai/providers/openai-codex";
import type { Model } from "@earendil-works/pi-ai";
import { buildTools, type RecordedCall } from "./tools.ts";
import { loadCatalog, SKILL_INSTRUCTIONS } from "./skills.ts";
import { seedWorkspace, collectMutations, releaseWorkspace, WORKSPACE, type Mutations } from "./workspace.ts";
import type { FauxStep } from "../suites/types.ts";

/** pi's reasoning levels, lowest to highest. */
export const THINKING_LEVELS = ["off", "minimal", "low", "medium", "high", "xhigh"] as const;
export type ThinkingLevel = (typeof THINKING_LEVELS)[number];

interface Job {
  prompt: string;
  provider: "openrouter" | "faux" | "codex";
  modelId: string;
  systemPrompt: string;
  thinkingLevel: ThinkingLevel;
  /** False runs the baseline arm: no skill catalog in the system prompt. */
  withSkill: boolean;
  /** Scripted assistant turns, faux provider only. */
  fauxScript?: FauxStep[];
}

/** Token and cost totals for one run, summed across every assistant turn. */
export interface UsageTotals {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
  reasoning: number;
  totalTokens: number;
  costUsd: number;
  /**
   * What the same tokens would have cost on a metered provider.
   *
   * A subscription run is charged nothing per request, so `costUsd` is zero and
   * says so honestly — but zero is not comparable to the other models in a
   * report. This is the equivalent at OpenRouter list prices, which makes a
   * Codex run readable beside a metered one.
   */
  notionalUsd: number;
  turns: number;
}

export interface Trace {
  toolCalls: RecordedCall[];
  finalText: string;
  usage: UsageTotals;
  /** What the agent actually changed in /workspace. */
  mutations: Mutations;
  error?: string;
}

const emptyUsage = (): UsageTotals => ({
  input: 0,
  output: 0,
  cacheRead: 0,
  cacheWrite: 0,
  reasoning: 0,
  totalTokens: 0,
  costUsd: 0,
  notionalUsd: 0,
  turns: 0,
});

/**
 * Model definitions, pinned.
 *
 * Prices are $ per million tokens as published by OpenRouter. Both models
 * support tool calling, which the eval depends on. Luna is the cheaper of the
 * two on input; deepseek is cheaper on output.
 *
 * `thinkingLevelMap` maps pi's level onto what the provider actually accepts.
 * A `null` entry means "send no reasoning parameter at this level" — that is
 * how deepseek's own catalog entry treats its lower levels, so it is kept here.
 * Luna takes OpenAI-style `reasoning_effort`, so its levels pass straight
 * through and `low` is a real low-effort request rather than a silent default.
 */
const MODELS: Record<string, Model<"openai-completions">> = {
  // A dated snapshot, not the rolling `deepseek-v4-flash` alias: an alias can be
  // repointed under a pinned eval, which would silently change what a release
  // measured. Routing is left to OpenRouter, so the endpoint — and therefore the
  // exact price — varies between $0.072 and $0.130 per M input. The shim records
  // which provider actually served each call; see the `served_by` log events.
  "deepseek/deepseek-v4-flash-0731": {
    id: "deepseek/deepseek-v4-flash-0731",
    name: "DeepSeek V4 Flash (0731)",
    api: "openai-completions",
    provider: "openrouter",
    baseUrl: "https://openrouter.ai/api/v1",
    reasoning: true,
    compat: { requiresReasoningContentOnAssistantMessages: true, thinkingFormat: "deepseek" },
    thinkingLevelMap: { minimal: null, low: null, medium: null, high: "high", xhigh: "max" },
    input: ["text"],
    cost: { input: 0.08, output: 0.18, cacheRead: 0.016, cacheWrite: 0 },
    contextWindow: 1_048_576,
    maxTokens: 8192,
  } as unknown as Model<"openai-completions">,
  // Routed to Cerebras at fp16 — see OPENROUTER_ROUTING. Pricing here is
  // Cerebras's ($0.35/$0.75), not gpt-oss-120b's default-routing price
  // ($0.03/$0.17): the fast provider costs about ten times the input rate, and
  // the cost report is only honest if it uses the endpoint actually billed.
  "openai/gpt-oss-120b:nitro": {
    id: "openai/gpt-oss-120b:nitro",
    name: "OpenAI gpt-oss-120b (Cerebras fp16)",
    api: "openai-completions",
    provider: "openrouter",
    baseUrl: "https://openrouter.ai/api/v1",
    reasoning: true,
    compat: { thinkingFormat: "openai" },
    thinkingLevelMap: { minimal: "low", low: "low", medium: "medium", high: "high", xhigh: "high" },
    input: ["text"],
    cost: { input: 0.35, output: 0.75, cacheRead: 0.35, cacheWrite: 0 },
    contextWindow: 131_072,
    maxTokens: 40_960,
  } as unknown as Model<"openai-completions">,
  // Routed to Novita — see OPENROUTER_ROUTING. The cheapest endpoint tested.
  "inclusionai/ling-3.0-flash:nitro": {
    id: "inclusionai/ling-3.0-flash:nitro",
    name: "InclusionAI Ling 3.0 Flash (Novita)",
    api: "openai-completions",
    provider: "openrouter",
    baseUrl: "https://openrouter.ai/api/v1",
    reasoning: true,
    compat: { thinkingFormat: "openai" },
    thinkingLevelMap: { minimal: "low", low: "low", medium: "medium", high: "high", xhigh: "high" },
    input: ["text"],
    cost: { input: 0.021, output: 0.063, cacheRead: 0.021, cacheWrite: 0 },
    contextWindow: 262_144,
    maxTokens: 16_384,
  } as unknown as Model<"openai-completions">,
  "openai/gpt-5.6-luna": {
    id: "openai/gpt-5.6-luna",
    name: "OpenAI GPT-5.6 Luna",
    api: "openai-completions",
    provider: "openrouter",
    baseUrl: "https://openrouter.ai/api/v1",
    reasoning: true,
    compat: { thinkingFormat: "openai" },
    thinkingLevelMap: {
      minimal: "minimal",
      low: "low",
      medium: "medium",
      high: "high",
      xhigh: "high",
    },
    input: ["text"],
    cost: { input: 0.1, output: 0.6, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 1_050_000,
    maxTokens: 32_000,
  } as unknown as Model<"openai-completions">,

  // Added because gpt-5.6-luna carries a new-account cap on this OpenRouter
  // account — 10 requests per minute, for that model alone. A paired run is
  // several hundred requests, so the cap made luna impractical here regardless
  // of how well it scores. hy3 has no such cap on this account and supports
  // tools, which the eval needs.
  "tencent/hy3": {
    id: "tencent/hy3",
    name: "Tencent HY3",
    api: "openai-completions",
    provider: "openrouter",
    baseUrl: "https://openrouter.ai/api/v1",
    reasoning: true,
    compat: { thinkingFormat: "openai" },
    thinkingLevelMap: {
      minimal: "minimal",
      low: "low",
      medium: "medium",
      high: "high",
      xhigh: "high",
    },
    input: ["text"],
    cost: { input: 0.132, output: 0.528, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 262_144,
    maxTokens: 32_000,
  } as unknown as Model<"openai-completions">,

  "nvidia/nemotron-3.5-lightning:nitro": {
    id: "nvidia/nemotron-3.5-lightning:nitro",
    name: "NVIDIA Nemotron 3.5 Lightning",
    api: "openai-completions",
    provider: "openrouter",
    baseUrl: "https://openrouter.ai/api/v1",
    reasoning: true,
    compat: { thinkingFormat: "openai" },
    thinkingLevelMap: {
      minimal: "minimal",
      low: "low",
      medium: "medium",
      high: "high",
      xhigh: "high",
    },
    input: ["text"],
    cost: { input: 0.1, output: 0.25, cacheRead: 0, cacheWrite: 0 },
    // Matches the pinned coreweave/bf16 endpoint. DeepInfra caps at 28k and
    // Venice serves 1M, so the window is a property of the endpoint, not the
    // model — which is why the endpoint is pinned rather than left to :nitro.
    contextWindow: 262_144,
    maxTokens: 32_000,
  } as unknown as Model<"openai-completions">,
};

/**
 * OpenRouter provider routing, per model.
 *
 * OpenRouter takes provider preferences as a request-body field. pi's
 * OpenAICompletionsOptions has no extra-body hook and the model slug cannot
 * carry a provider, so the only way through is to add the field to the outgoing
 * request — see installProviderRouting below.
 */
const OPENROUTER_ROUTING: Record<string, unknown> = {
  // `only` pins the endpoint: no silent fallback to a slower or differently
  // quantized provider, which would make a latency comparison meaningless.
  "openai/gpt-oss-120b:nitro": { only: ["cerebras/fp16"] },
  "inclusionai/ling-3.0-flash:nitro": { only: ["novita"] },
  // venice/fp4 serves the full million-token window but does no prompt caching:
  // 4.37M billed input tokens and $0.45 for six cases, against $0.008 on a model
  // whose cache absorbed most of it. coreweave/bf16 is the same weights at a
  // smaller window, kept pinned so the endpoint cannot drift under :nitro.
  "nvidia/nemotron-3.5-lightning:nitro": { only: ["coreweave/bf16"] },
};

/**
 * Inject OpenRouter provider routing into outgoing requests.
 *
 * Deliberately narrow: it rewrites only JSON POST bodies aimed at OpenRouter's
 * completions endpoint, and only when the pinned model asks for routing.
 * Everything else passes through untouched. This is a shim around a missing
 * hook in the SDK, not a general request interceptor — if pi grows an
 * extra-body option, delete this and pass the field properly.
 */
/** How many times a 429 is waited out before the request is allowed to fail. */
const RATE_LIMIT_RETRIES = 6;

/**
 * Published per-million prices, for pricing a subscription run as if metered.
 *
 * `cacheRead` is priced deliberately. Leaving it at zero is what made the
 * harness report $0.69 for a run the account was charged about $8.50 for — on a
 * cache-heavy run it is the largest column, not a rounding error.
 */
const LIST_PRICES: Record<string, { input: number; output: number; cacheRead: number }> = {
  // OpenRouter's luna pricing, so a Codex run is comparable to a metered one.
  "gpt-5.6-luna": { input: 0.1, output: 0.6, cacheRead: 0.01 },
  "gpt-5.3-codex-spark": { input: 0.2, output: 1.2, cacheRead: 0.02 },
};

function notionalCost(modelId: string, usage: UsageTotals): number {
  const price = LIST_PRICES[modelId];
  if (!price) return 0;
  return (
    (usage.input * price.input + usage.output * price.output + usage.cacheRead * price.cacheRead) / 1e6
  );
}

/**
 * Hand pi the Codex subscription tokens.
 *
 * pi keeps its own credential store rather than reading Codex CLI's
 * `~/.codex/auth.json`, and the sandbox cannot see the host filesystem anyway —
 * that isolation is the point, and mounting a home directory into the eval
 * container to reach one file would trade it away for nothing. So the tokens
 * arrive as an environment variable and this store serves them from memory.
 *
 * `modify` is deliberately a no-op sink. pi calls it to persist a refreshed
 * token, and there is nowhere in a read-only container to persist it to; the
 * refreshed value still flows back through pi's own return path for the life of
 * the process. A container is one run, so a token that outlives the run is not
 * something we need.
 */
function codexCredentials() {
  const raw = process.env.CODEX_OAUTH;
  if (!raw) {
    throw new Error("EVAL_PROVIDER=codex needs CODEX_OAUTH in the environment (see container.ts)");
  }
  const tokens = JSON.parse(raw) as { access: string; refresh: string; expires?: number };
  let current: { type: "oauth"; access: string; refresh: string; expires: number } = {
    type: "oauth",
    access: tokens.access,
    refresh: tokens.refresh,
    // Treat an unknown expiry as already stale so pi refreshes before the first
    // request rather than sending a token that may have lapsed.
    expires: tokens.expires ?? 0,
  };
  return {
    async read() {
      return current;
    },
    async list() {
      return [{ providerId: "openai-codex", type: "oauth" as const }];
    },
    async modify(_id: string, fn: (c: typeof current | undefined) => Promise<typeof current | undefined>) {
      const next = await fn(current);
      if (next) current = next;
      return current;
    },
    async delete() {
      /* nothing to remove: this store never touched disk */
    },
  };
}

/** Same line shape as the per-run logger, usable from module scope. */
const logEvent = (record: Record<string, unknown>) => {
  if (process.env.EVAL_LOG === "1") {
    process.stderr.write(JSON.stringify({ t: Date.now(), ...record }) + "\n");
  }
};

/**
 * What OpenRouter actually charged, summed over the run's requests.
 *
 * pi derives cost from the price table on the Model definition, and every one of
 * those declares `cacheRead: 0`. On a cache-heavy run that is not a rounding
 * error: one nemotron run billed 144M cache-read tokens, and the harness
 * reported $0.69 for what the account was charged roughly $8.50 for. The figure
 * matched `input × price + output × price` to the cent, which is how the cause
 * was found — it was our arithmetic, faithfully executed, on a table that priced
 * the largest column at zero.
 *
 * So the cost is no longer computed. OpenRouter returns what it charged when the
 * request asks for it, and that number is authoritative: it cannot drift when a
 * provider changes pricing, and it already accounts for cache tiers and
 * per-endpoint rates.
 */
const billed = { costUsd: 0, requests: 0 };

/**
 * Config for the fetch shim, set per batch rather than captured per install.
 *
 * A batch is homogeneous — same provider, same model, same thinking level — so
 * one config describes every job in it.
 */
let shimConfig: { routing: unknown; onServed: (provider: string) => void; disableReasoning: boolean } = {
  routing: undefined,
  onServed: () => {},
  disableReasoning: false,
};

/** Whether the wrapper is already in place. See installProviderRouting. */
let shimInstalled = false;

function installProviderRouting(
  routing: unknown,
  onServed: (provider: string) => void,
  disableReasoning = false,
): void {
  // Install exactly once per process.
  //
  // This used to reassign globalThis.fetch on every call, which was harmless
  // when a container held one job and is not now: twelve concurrent agents meant
  // twelve nested wrappers, every response unwinding through all of them. The
  // visible cost was arithmetic — each layer added the charged amount to
  // `billed`, so a run would have reported twelve times what it spent. It went
  // unnoticed because every batched run so far has been Codex, where the
  // subscription path forces the figure to zero before anyone could read it.
  shimConfig = { routing, onServed, disableReasoning };
  if (shimInstalled) return;
  shimInstalled = true;

  const original = globalThis.fetch;
  globalThis.fetch = async (input: any, init?: any) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.href : (input?.url ?? "");
    const isCompletion = url.includes("openrouter.ai") && url.includes("/chat/completions");

    /**
     * Reasoning cannot be forced off on the Codex transport.
     *
     * Three things were tried and all of them are dead ends, recorded here so
     * nobody repeats them. pi converts `thinkingLevel: "off"` to `undefined`
     * before the branch that would send `"none"` can see it
     * (openai-codex-responses.js:366), so nothing is sent and GPT-5.6 defaults
     * to *medium*. pi's injectable `fetch` option is documented as not affecting
     * WebSocket transports. Forcing `transport: "sse"` does put the request back
     * on this shim — and the body arrives gzipped, so rewriting it means
     * decompress, edit, recompress on someone else's wire format.
     *
     * Use `EVAL_THINKING=minimal` on Codex instead. It maps to `effort: low` and
     * measures 0.16 reasoning-to-output against 0.45 at the default.
     */
    if ((shimConfig.routing || shimConfig.disableReasoning) && init?.body && isCompletion) {
      try {
        const body = JSON.parse(String(init.body));
        if (shimConfig.routing) body.provider = shimConfig.routing;
        // Ask for the charged amount. Without this the response carries token
        // counts but no cost, and the only figure available is one we computed.
        body.usage = { include: true };
        if (shimConfig.disableReasoning) {
          // pi has no "off" in its thinkingLevelMap, so an off setting sends no
          // reasoning parameter at all — and a model that reasons by default
          // just keeps reasoning. Verified: gpt-5.6-luna at EVAL_THINKING=off
          // still emitted reasoning tokens until this was added, and
          // deepseek-v4-flash-0731 emitted 292k of them in a run labelled off.
          // OpenRouter's own switch is the only thing that actually stops it.
          body.reasoning = { enabled: false };
          delete body.reasoning_effort;
        }
        init = { ...init, body: JSON.stringify(body) };
      } catch {
        // Not a JSON body we understand. Leave it exactly as it was.
      }
    }

    // OpenRouter rate-limits by request, not by spend, and the limit is small:
    // a 429 carries `x-ratelimit-limit: 10` with `remaining: 0`. A paired run is
    // several hundred requests, so without backoff a run walks straight into the
    // wall — and pi surfaces the rejection as an empty turn, which reads like an
    // agent that answered briefly and stopped. That is how v0.3.0 shipped a
    // headline computed over 131 refused requests.
    //
    // Honour the reset header when it is present, since it is exact, and fall
    // back to exponential backoff when it is not.
    let response = await original(input, init);
    for (let attempt = 0; response.status === 429 && attempt < RATE_LIMIT_RETRIES; attempt++) {
      const resetAt = Number(response.headers.get("x-ratelimit-reset") ?? 0);
      const fromHeader = resetAt > 0 ? resetAt - Date.now() : 0;
      const backoff = 1000 * 2 ** attempt;
      const waitMs = Math.min(Math.max(fromHeader, backoff), 30_000);
      logEvent({ ev: "rate_limited", attempt: attempt + 1, waitMs });
      await new Promise((resolve) => setTimeout(resolve, waitMs));
      response = await original(input, init);
    }

    // Record the endpoint that actually served the call. With unpinned routing
    // the price varies by endpoint, so the reported cost is only checkable if we
    // know who answered. Reads a clone so the real stream is untouched.
    if (isCompletion && response.ok) {
      response
        .clone()
        .text()
        .then((text) => {
          const match = /"provider"\s*:\s*"([^"]+)"/.exec(text);
          if (match?.[1]) shimConfig.onServed(match[1]);

          // The charged amount, straight from the response. Matched loosely
          // because the field sits inside `usage` on a completion and inside the
          // final SSE frame on a stream, and both shapes are worth catching.
          const charged = /"cost"\s*:\s*([0-9.eE+-]+)/.exec(text);
          if (charged?.[1]) {
            const value = Number(charged[1]);
            if (Number.isFinite(value)) {
              billed.costUsd += value;
              billed.requests += 1;
            }
          }
        })
        .catch(() => {});
    }
    return response;
  };
}

/**
 * Turn declarative steps into faux assistant turns.
 *
 * Each tool step is its own assistant message, because the agent loop needs a
 * turn boundary to execute the call and feed the result back. A text step ends
 * the run.
 */
function scriptToResponses(steps: FauxStep[]) {
  return steps.map((step) =>
    step.kind === "tool"
      ? fauxAssistantMessage([fauxToolCall(step.name, step.args as never)], { stopReason: "toolUse" })
      : fauxAssistantMessage([fauxText(step.text)], { stopReason: "stop" }),
  );
}

/** Keep only the message roles an LLM understands. */
function convertToLlm(messages: AgentMessage[]): Message[] {
  return messages.filter((m: any) => ["user", "assistant", "toolResult"].includes(m.role)) as Message[];
}

/**
 * Many jobs in one container.
 *
 * A container per case cost one Node process and one SDK load each — about
 * 1.3s, which was never the problem, and 512 MB of budget, which was: the
 * concurrency ceiling was arithmetic on VM memory rather than anything the work
 * required. Several agents in one process share the runtime and the SDK, so the
 * marginal cost of another concurrent agent is its conversation, not another
 * interpreter.
 *
 * Each job still gets its own seeded copy of the fixtures under its own root.
 * That is the part a shared process gives away for free and has to earn back:
 * two cases from one suite running at once would otherwise see each other's
 * writes, and mutation assertions are what several suites turn on.
 *
 * Traces stream out as NDJSON keyed by index, so the orchestrator can record a
 * result the moment it lands rather than waiting for the slowest job.
 */
interface Batch {
  jobs: Job[];
  concurrency?: number;
}

export async function runBatch(batch: Batch): Promise<void> {
  const limit = Math.max(1, batch.concurrency ?? 1);
  let next = 0;

  const worker = async (slot: number): Promise<void> => {
    const root = `${WORKSPACE}/w${slot}`;
    while (true) {
      const index = next++;
      if (index >= batch.jobs.length) return;
      const job = batch.jobs[index]!;
      let trace: Trace;
      try {
        trace = await runJob(job, root, index);
      } catch (error) {
        // One job's crash must not take the batch down with it — that is the
        // isolation a container-per-case used to provide for free.
        trace = {
          toolCalls: [],
          finalText: "",
          usage: emptyUsage(),
          mutations: { created: [], modified: [], deleted: [], contents: {} },
          error: String(error),
        };
      } finally {
        releaseWorkspace(root);
      }
      process.stdout.write(JSON.stringify({ index, trace }) + "\n");
    }
  };

  await Promise.all(Array.from({ length: Math.min(limit, batch.jobs.length) }, (_, i) => worker(i)));
}

export async function runJob(job: Job, workspaceRoot: string = WORKSPACE, tag?: number): Promise<Trace> {
  const toolCalls: RecordedCall[] = [];
  const record = (call: RecordedCall) => toolCalls.push(call);
  const usage = emptyUsage();

  // The agent works on a copy. /suites stays pristine so the run can be diffed.
  // With several agents in one container each gets its own copy; the tool layer
  // maps the agent-visible /workspace onto it, so nothing else has to know.
  seedWorkspace(workspaceRoot);

  // Every agent event, as JSONL on stderr. The orchestrator streams this to the
  // run directory and can tail it live. stdout stays clean for the trace.
  const logEvents = process.env.EVAL_LOG === "1";
  // `job` tags the line with its index so the orchestrator can split one
  // container's interleaved stderr back into per-case logs. Absent on the
  // single-job path, where there is nothing to disentangle.
  const logLine = (record: Record<string, unknown>) => {
    if (logEvents) {
      process.stderr.write(JSON.stringify({ t: Date.now(), ...(tag === undefined ? {} : { job: tag }), ...record }) + "\n");
    }
  };

  const models = createModels(job.provider === "codex" ? { credentials: codexCredentials() } : undefined);
  let model: Model<any>;

  if (job.provider === "faux") {
    const faux = fauxProvider({ tokensPerSecond: 0 });
    models.setProvider(faux.provider);
    faux.setResponses(scriptToResponses(job.fauxScript ?? [{ kind: "text", text: "(no script)" }]));
    model = faux.getModel();
  } else if (job.provider === "codex") {
    // A ChatGPT Plus/Pro subscription rather than metered API credits. There is
    // no per-request charge to report, so every cost column stays at zero — the
    // run is not free, it is prepaid, and the report says so rather than
    // implying the tokens cost nothing.
    const provider = openaiCodexProvider();
    models.setProvider(provider);
    const catalog = provider.getModels();
    const found = catalog.find((m: { id: string }) => m.id === job.modelId);
    if (!found) {
      throw new Error(
        `unknown codex model: ${job.modelId}. Known: ${catalog.map((m: { id: string }) => m.id).join(", ")}`,
      );
    }
    model = found as Model<any>;
    logLine({ ev: "provider_auth", provider: "openai-codex", subscription: true });
  } else {
    models.setProvider(openrouterProvider());
    const pinned = MODELS[job.modelId];
    if (!pinned) {
      throw new Error(`unknown model: ${job.modelId}. Known: ${Object.keys(MODELS).join(", ")}`);
    }
    model = pinned;

    // Always installed: even unrouted models need the served-by record, because
    // an unpinned endpoint is exactly the case where the price is unknown.
    const routing = OPENROUTER_ROUTING[job.modelId];
    const off = job.thinkingLevel === "off";
    const seen = new Set<string>();
    installProviderRouting(
      routing,
      (provider) => {
        if (seen.has(provider)) return;
        seen.add(provider);
        logLine({ ev: "served_by", model: job.modelId, provider });
      },
      off,
    );
    logLine({
      ev: "provider_routing",
      model: job.modelId,
      routing: routing ?? "default",
      reasoning: off ? "disabled" : job.thinkingLevel,
    });
  }

  // Discovery through pi's own loader, against the skills baked into the image.
  // The baseline arm loads nothing, so its prompt carries no catalog.
  let promptText = job.systemPrompt;
  if (job.withSkill) {
    const catalog = await loadCatalog("/skills");
    for (const d of catalog.diagnostics) {
      logLine({ ev: "skill_diagnostic", code: d.code, message: d.message, path: d.path });
    }
    logLine({ ev: "skills_loaded", count: catalog.skills.length, names: catalog.skills.map((s) => s.name) });
    if (catalog.catalogXml) {
      promptText = `${job.systemPrompt}\n\n${SKILL_INSTRUCTIONS}\n\n${catalog.catalogXml}`;
    }
  }

  logLine({ ev: "run_start", provider: job.provider, model: job.modelId, withSkill: job.withSkill, thinking: job.thinkingLevel });

  const agent = new Agent({
    initialState: {
      systemPrompt: promptText,
      model,
      // Both arms get the identical tool surface. The only difference is
      // whether the system prompt carries the skill catalog — which is exactly
      // the difference a real deployment has, since activation is a file read.
      tools: buildTools(record, job.withSkill, workspaceRoot),
      messages: [],
      thinkingLevel: job.thinkingLevel,
    },
    streamFn: (m, context, options) => models.streamSimple(m, context, options),
    convertToLlm,
    getApiKey: (provider) =>
      provider === "openrouter" ? process.env.OPENROUTER_API_KEY : undefined,
    // Mutating tools run for real inside /workspace. The tools themselves refuse
    // a path outside it, so nothing here needs to block — and a case can assert
    // on the resulting files instead of on the agent's prose.
  });

  const chunks: string[] = [];
  /** Assistant turns the provider returned with no tokens at all. See below. */
  let emptyTurns = 0;
  agent.subscribe((event: any) => {
    switch (event.type) {
      case "tool_execution_start":
        logLine({ ev: "tool_start", tool: event.toolName, args: event.args });
        break;
      case "tool_execution_end":
        logLine({ ev: "tool_end", tool: event.toolName, isError: event.isError ?? false });
        break;
      case "turn_start":
        logLine({ ev: "turn_start" });
        break;
      case "agent_end":
        logLine({ ev: "agent_end" });
        break;
    }

    if (event.type !== "message_end" || event.message?.role !== "assistant") return;

    for (const block of event.message.content ?? []) {
      if (block?.type === "text" && block.text) chunks.push(block.text);
    }

    // Usage is per assistant turn. A tool-using run has several, so they sum.
    const u = event.message.usage;
    if (u) {
      // A turn that consumed nothing and produced nothing is the provider
      // declining to answer — a 429, a truncation, an empty completion. pi ends
      // the run cleanly and the trace looks like a well-behaved agent that
      // simply stopped early, so the case fails on its own assertion and the
      // report blames the skill.
      //
      // This shipped a release. A throttled burst produced 131 empty final turns
      // out of 134 runs and the headline read "7/67 with the skills, 5/67
      // without" — a plausible number that measured nothing but rate limiting.
      // Count them so the run can refuse to be reported.
      if (!u.input && !u.output && !u.cacheRead && !u.cacheWrite) emptyTurns += 1;
      usage.input += u.input ?? 0;
      usage.output += u.output ?? 0;
      usage.cacheRead += u.cacheRead ?? 0;
      usage.cacheWrite += u.cacheWrite ?? 0;
      usage.reasoning += u.reasoning ?? 0;
      usage.totalTokens += u.totalTokens ?? 0;
      usage.costUsd += u.cost?.total ?? 0;
      usage.turns += 1;
      logLine({
        ev: "usage",
        input: u.input, output: u.output,
        cacheRead: u.cacheRead, cacheWrite: u.cacheWrite,
        reasoning: u.reasoning, cost: u.cost?.total,
      });
    }
  });

  /**
   * Replace the computed cost with what the provider charged.
   *
   * Only when at least one request reported one — a faux run bills nothing and
   * must stay at zero rather than inherit a stale figure. `usage.costUsd` is
   * otherwise pi's arithmetic over our price table, which zeroes cache reads.
   */
  const settle = (): typeof usage => {
    // A subscription has no per-request charge. pi still computes one from the
    // catalog's price table, and reporting that would invent a bill nobody was
    // sent — so the column reads zero and the notional figure goes to the log,
    // where it is a curiosity rather than an accounting claim.
    if (job.provider === "codex") {
      const notionalUsd = notionalCost(job.modelId, usage);
      logEvent({ ev: "billed", subscription: true, costUsd: 0, notionalUsd });
      return { ...usage, costUsd: 0, notionalUsd };
    }
    if (billed.requests > 0) {
      logEvent({ ev: "billed", requests: billed.requests, costUsd: billed.costUsd, computed: usage.costUsd });
      // On a metered provider the charged amount is the honest figure for both.
      return { ...usage, costUsd: billed.costUsd, notionalUsd: billed.costUsd };
    }
    return usage;
  };

  try {
    await agent.prompt(job.prompt);
  } catch (error) {
    return { toolCalls, finalText: chunks.join("\n"), usage: settle(), mutations: collectMutations(workspaceRoot), error: String(error) };
  }
  if (emptyTurns > 0 && !chunks.length) {
    // No text at all and at least one refused turn: the model never answered.
    // An error here is honest — the alternative is a verdict about a skill,
    // derived from a response that was never produced.
    return {
      toolCalls,
      finalText: "",
      usage: settle(),
      mutations: collectMutations(workspaceRoot),
      error: `provider returned ${emptyTurns} empty turn(s) and no text — throttled or truncated, not a skill result`,
    };
  }
  return { toolCalls, finalText: chunks.join("\n"), usage: settle(), mutations: collectMutations(workspaceRoot) };
}

function inContainer(): boolean {
  if (process.env.EVAL_IN_SANDBOX === "1") return true;
  // podman and docker each leave one of these behind.
  return fs.existsSync("/run/.containerenv") || fs.existsSync("/.dockerenv");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (!inContainer()) {
    process.stderr.write(
      "agent-run.ts refuses to run outside a container.\n" +
        "The pi SDK has no permission model; this harness relies on the container\n" +
        "as its only real boundary. Use `npm run test:skill-behavior` instead.\n",
    );
    process.exit(2);
  }
  const input = JSON.parse(fs.readFileSync(0, "utf-8")) as Job | Batch;
  if ("jobs" in input) {
    runBatch(input).catch((error) => {
      process.stderr.write(`batch failed: ${String(error)}\n`);
      process.exitCode = 1;
    });
  } else {
    runJob(input)
      .then((trace) => process.stdout.write(JSON.stringify(trace) + "\n"))
      .catch((error) => {
        process.stdout.write(
          JSON.stringify({ toolCalls: [], finalText: "", error: String(error) }) + "\n",
        );
        process.exitCode = 1;
      });
  }
}
