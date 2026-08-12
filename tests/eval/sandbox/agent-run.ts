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
import type { Model } from "@earendil-works/pi-ai";
import { buildTools, type RecordedCall } from "./tools.ts";
import { loadCatalog, SKILL_INSTRUCTIONS } from "./skills.ts";
import { seedWorkspace, collectMutations, type Mutations } from "./workspace.ts";
import type { FauxStep } from "../cases/types.ts";

/** pi's reasoning levels, lowest to highest. */
export const THINKING_LEVELS = ["off", "minimal", "low", "medium", "high", "xhigh"] as const;
export type ThinkingLevel = (typeof THINKING_LEVELS)[number];

interface Job {
  prompt: string;
  provider: "openrouter" | "faux";
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
  "deepseek/deepseek-v4-flash": {
    id: "deepseek/deepseek-v4-flash",
    name: "DeepSeek V4 Flash",
    api: "openai-completions",
    provider: "openrouter",
    baseUrl: "https://openrouter.ai/api/v1",
    reasoning: true,
    compat: { requiresReasoningContentOnAssistantMessages: true, thinkingFormat: "deepseek" },
    thinkingLevelMap: { minimal: null, low: null, medium: null, high: "high", xhigh: "max" },
    input: ["text"],
    cost: { input: 0.14, output: 0.28, cacheRead: 0.022, cacheWrite: 0 },
    contextWindow: 1_048_576,
    maxTokens: 8192,
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
};

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

export async function runJob(job: Job): Promise<Trace> {
  const toolCalls: RecordedCall[] = [];
  const record = (call: RecordedCall) => toolCalls.push(call);
  const usage = emptyUsage();

  // The agent works on a copy. /fixtures stays pristine so the run can be diffed.
  seedWorkspace();

  const models = createModels();
  let model: Model<any>;

  if (job.provider === "faux") {
    const faux = fauxProvider({ tokensPerSecond: 0 });
    models.setProvider(faux.provider);
    faux.setResponses(scriptToResponses(job.fauxScript ?? [{ kind: "text", text: "(no script)" }]));
    model = faux.getModel();
  } else {
    models.setProvider(openrouterProvider());
    const pinned = MODELS[job.modelId];
    if (!pinned) throw new Error(`unknown model: ${job.modelId}`);
    model = pinned;
  }

  // Every agent event, as JSONL on stderr. The orchestrator streams this to the
  // run directory and can tail it live. stdout stays clean for the trace.
  const logEvents = process.env.EVAL_LOG === "1";
  const logLine = (record: Record<string, unknown>) => {
    if (logEvents) process.stderr.write(JSON.stringify({ t: Date.now(), ...record }) + "\n");
  };

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
      tools: buildTools(record, job.withSkill),
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

  try {
    await agent.prompt(job.prompt);
  } catch (error) {
    return { toolCalls, finalText: chunks.join("\n"), usage, mutations: collectMutations(), error: String(error) };
  }
  return { toolCalls, finalText: chunks.join("\n"), usage, mutations: collectMutations() };
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
  const job: Job = JSON.parse(fs.readFileSync(0, "utf-8"));
  runJob(job)
    .then((trace) => process.stdout.write(JSON.stringify(trace) + "\n"))
    .catch((error) => {
      process.stdout.write(
        JSON.stringify({ toolCalls: [], finalText: "", error: String(error) }) + "\n",
      );
      process.exitCode = 1;
    });
}
