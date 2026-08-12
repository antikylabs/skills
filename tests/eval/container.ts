/**
 * Container plumbing, shared by the runner and the self-test.
 *
 * Everything that knows how to start a container lives here, so the security
 * posture is stated once. Neither caller ever runs the pi SDK in its own
 * process.
 *
 * Streams rather than blocks: the container's stderr carries the pi event log
 * line by line, which is written to the run directory and optionally tailed to
 * the console while the run is still going. stdout carries exactly one JSON
 * trace, so data and logs never interleave.
 */

import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { FauxStep, Trace } from "./suites/index.ts";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(HERE, "..", "..");
/**
 * The suites tree: one directory per skill, each with cases/ and fixtures/.
 * Mounted read-only in the container, which assembles /workspace from the
 * fixtures inside it — see sandbox/workspace.ts.
 */
export const SUITES = path.join(HERE, "suites");
export const RUNS_DIR = path.join(HERE, "runs");
export const IMAGE = "antiky-skills-eval";

/** pi's reasoning levels, lowest to highest. */
export const THINKING_LEVELS = ["off", "minimal", "low", "medium", "high", "xhigh"] as const;
export type ThinkingLevel = (typeof THINKING_LEVELS)[number];

/**
 * Flags that make the container a boundary rather than a convenience.
 * Asserted empirically by self-test.ts — do not weaken without updating it.
 *
 * The memory cap is measured. Bisected against the heaviest *faux* path — two
 * run_ste_lint calls, each spawning a second node process that loads the 653 KB
 * vocabulary — a run needs 192m and fails at 128m.
 *
 * But a faux run is not the worst case. A live run carries the skill catalog, a
 * long tool history, and a dozen turns of context, and at 384m real runs were
 * OOM-killed (exit 137) once several ran concurrently. The cap is 768m: measured
 * floor times four, sized for the live path rather than the cheap one.
 *
 * This matters beyond tidiness: the cap bounds how many runs fit in the
 * container VM at once, so a generous one silently serialises the suite. The
 * original 1g was five times the real requirement and held concurrency at two.
 */
export const HARDENING = [
  "--read-only",
  "--cap-drop=ALL",
  "--security-opt=no-new-privileges",
  "--memory=768m",
  "--cpus=1",
  "--pids-limit=256",
  "--tmpfs", "/tmp:rw,noexec,nosuid,size=64m",
  // The agent's writable scratch. Seeded from the read-only fixtures at start,
  // discarded with the container. Nothing on the host is reachable from it.
  "--tmpfs", "/workspace:rw,nosuid,size=64m",
];

/**
 * Reasoning effort for live runs, from EVAL_THINKING.
 *
 * Default `off`, chosen from measurement rather than caution. Across the full
 * 45-case paired suite, luna at `off` scores 34/45 against 36/45 at `low` — two
 * cases — while running 5.6× faster and 27% cheaper. The skill delta is +20
 * either way: reasoning helped both arms equally, so it was not what made the
 * skills work.
 *
 * `off` is enforced at the request level, not through pi's thinkingLevelMap.
 * See installProviderRouting in sandbox/agent-run.ts for why.
 */
export function thinkingLevel(): ThinkingLevel {
  const raw = (process.env.EVAL_THINKING ?? "off").trim().toLowerCase();
  if (!(THINKING_LEVELS as readonly string[]).includes(raw)) {
    process.stderr.write(
      `EVAL_THINKING="${raw}" is not valid. Use one of: ${THINKING_LEVELS.join(", ")}\n`,
    );
    process.exit(2);
  }
  return raw as ThinkingLevel;
}

export function detectRuntime(): string {
  for (const runtime of ["podman", "docker"]) {
    if (spawnSync(runtime, ["info"], { stdio: "ignore" }).status === 0) return runtime;
  }
  process.stderr.write(
    "\nNo container runtime is reachable.\n\n" +
      "This harness runs the pi agent SDK, which has no permission model of its\n" +
      "own. Its documentation is explicit that an in-process sandbox is not a\n" +
      "security boundary, so the SDK is never run on the host under any flag.\n\n" +
      "Start one and try again:\n" +
      "  podman machine start\n" +
      "  open -a Docker\n\n",
  );
  process.exit(2);
}

export function ensureImage(runtime: string, rebuild = false): void {
  const exists = spawnSync(runtime, ["image", "exists", IMAGE], { stdio: "ignore" });
  if (exists.status === 0 && !rebuild) return;
  process.stderr.write(`building ${IMAGE}...\n`);
  const build = spawnSync(
    runtime,
    ["build", "-t", IMAGE, "-f", path.join(HERE, "Dockerfile"), REPO_ROOT],
    { stdio: "inherit" },
  );
  if (build.status !== 0) {
    process.stderr.write("image build failed\n");
    process.exit(2);
  }
}

// --- run directory ---------------------------------------------------------

export interface RunLog {
  dir: string;
  id: string;
  /** Append a line to the orchestrator log, and echo it to the console. */
  note: (line: string) => void;
  /** Absolute path for a per-case log file. */
  casePath: (caseId: string, arm: string, ext: string) => string;
}

/**
 * Create `eval/runs/<id>/`, gitignored, holding every log and report for one
 * run. `EVAL_TAIL=1` additionally streams container stderr to the console as it
 * arrives.
 */
export function openRunLog(label: string, timestamp: string): RunLog {
  const id = `${timestamp}-${label}`;
  const dir = path.join(RUNS_DIR, id);
  fs.mkdirSync(path.join(dir, "cases"), { recursive: true });
  const logPath = path.join(dir, "run.log");

  return {
    dir,
    id,
    note: (line: string) => {
      fs.appendFileSync(logPath, line + "\n");
      process.stdout.write(line + "\n");
    },
    casePath: (caseId, arm, ext) => path.join(dir, "cases", `${caseId}.${arm}.${ext}`),
  };
}

// --- traces ----------------------------------------------------------------

/** A well-formed trace carrying only an error. */
const errorTrace = (error: string): Trace => ({ toolCalls: [], finalText: "", error });

/**
 * Force a parsed container response into the Trace shape.
 *
 * The container is supposed to print exactly one JSON trace on stdout, but a
 * crash mid-write, a stray log line, or a partial flush can leave the last line
 * parseable yet not a trace. Returning that raw would hand every downstream
 * consumer an object with no `toolCalls`, and one bad case would take out a
 * whole paid run. Normalising here means a malformed response fails its own
 * case and nothing else.
 */
function normalizeTrace(parsed: unknown, raw: string): Trace {
  if (!parsed || typeof parsed !== "object" || !Array.isArray((parsed as Trace).toolCalls)) {
    return errorTrace(`trace missing toolCalls: ${raw.slice(0, 200)}`);
  }
  const trace = parsed as Trace;
  return { ...trace, finalText: trace.finalText ?? "" };
}

// --- running ---------------------------------------------------------------

export interface RunOptions {
  prompt: string;
  provider: "faux" | "openrouter";
  modelId: string;
  systemPrompt: string;
  thinkingLevel?: ThinkingLevel;
  /** False runs the baseline arm: no skills offered. Default true. */
  withSkill?: boolean;
  /**
   * Mount this tree over /skills instead of the baked-in one. The sham arm uses
   * it to present an identical catalog with generic bodies; see eval/sham.ts.
   */
  shamSkillsDir?: string;
  script?: FauxStep[];
  /** Where to write this run's container log. Omit to discard it. */
  logFile?: string;
}

const TAIL = process.env.EVAL_TAIL === "1";

/**
 * Run one agent job in a fresh container and return its trace.
 *
 * The container's stderr is streamed to `logFile` as it arrives, and mirrored to
 * the console when EVAL_TAIL=1, so a long live run is observable rather than
 * silent until it finishes.
 */
export async function runInSandbox(runtime: string, options: RunOptions): Promise<Trace> {
  const job = {
    prompt: options.prompt,
    provider: options.provider,
    modelId: options.modelId,
    systemPrompt: options.systemPrompt,
    thinkingLevel: options.thinkingLevel ?? thinkingLevel(),
    withSkill: options.withSkill !== false,
    fauxScript: options.script,
  };

  const args = ["run", "--rm", "-i", ...HARDENING, "-v", `${SUITES}:/suites:ro`,
                "-e", "EVAL_IN_SANDBOX=1", "-e", "EVAL_LOG=1"];

  // Shadowing the baked-in /skills is what makes the sham arm a controlled
  // comparison: identical image, identical prompt, identical catalog, and the
  // only difference on disk is the body of each SKILL.md.
  if (options.shamSkillsDir) args.push("-v", `${options.shamSkillsDir}:/skills:ro`);

  if (options.provider === "faux") {
    // A deterministic run needs no network. Remove it rather than trust it.
    args.push("--network=none");
  } else {
    const key = process.env.OPENROUTER_API_KEY;
    if (!key) {
      process.stderr.write("EVAL_PROVIDER=openrouter needs OPENROUTER_API_KEY in the environment.\n");
      process.exit(2);
    }
    args.push("-e", `OPENROUTER_API_KEY=${key}`);
  }
  args.push(IMAGE);

  const log = options.logFile ? fs.createWriteStream(options.logFile, { flags: "a" }) : null;
  const tailPrefix = options.logFile ? path.basename(options.logFile, ".log") : "";

  return await new Promise<Trace>((resolve) => {
    const child = spawn(runtime, args, { stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "";
    let stderrTail = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      log?.write(text);
      stderrTail = (stderrTail + text).slice(-2000);
      if (TAIL) {
        for (const line of text.split("\n")) {
          if (line.trim()) process.stdout.write(`      │ ${tailPrefix} ${line}\n`);
        }
      }
    });

    const finish = (status: number | null) => {
      log?.end();
      if (status !== 0 && !stdout.trim()) {
        resolve(errorTrace(`container exited ${status}: ${stderrTail.slice(-300)}`));
        return;
      }
      try {
        const line = stdout.trim().split("\n").filter(Boolean).pop() ?? "{}";
        resolve(normalizeTrace(JSON.parse(line), stdout));
      } catch {
        resolve(errorTrace(`unparseable trace: ${stdout.slice(0, 200)}`));
      }
    };

    child.on("close", finish);
    child.on("error", (error) => {
      log?.end();
      resolve(errorTrace(String(error)));
    });

    child.stdin.write(JSON.stringify(job));
    child.stdin.end();
  });
}

/** Run an arbitrary command in the image, for probing the sandbox itself. */
export function probe(runtime: string, command: string): { out: string; code: number } {
  const result = spawnSync(
    runtime,
    ["run", "--rm", "--network=none", ...HARDENING,
     "-v", `${SUITES}:/suites:ro`,
     "--entrypoint", JSON.stringify(["/bin/sh", "-c", command]), IMAGE],
    { encoding: "utf-8", timeout: 60_000 },
  );
  return { out: (result.stdout ?? "") + (result.stderr ?? ""), code: result.status ?? -1 };
}

/**
 * The system prompt an evaluated agent gets.
 *
 * The baseline arm is identical except that it lists no skills and is not told
 * to load one — so a difference between the arms is attributable to the skill
 * rather than to a differently worded prompt.
 */
export function systemPrompt(withSkill = true): string {
  // This must match the tool surface in sandbox/tools.ts. It said the
  // environment was read-only for two releases after the writable workspace
  // landed, and agents believed it: they explained what they would write
  // instead of writing it, and every "created no file" failure was the harness
  // contradicting itself rather than the skill failing.
  const base = `You are a documentation engineer working in a repository.

The repository is at /workspace and you can read and write it: read_file, list_dir, write_file, edit_file, and move_file all work there. run_ste_lint runs the STE checker over a file.

/skills is read-only — you can read a skill and its playbooks, but not change them. There is no shell.

When a task asks you to create or change something, do it. Do not describe the change you would make instead of making it.`;

  // The catalog is built inside the container by pi's own loadSkills(), so the
  // host never parses SKILL.md. The two arms differ only in whether that catalog
  // is offered — the prose above is byte-identical either way, which is what
  // makes a delta attributable to the skill rather than to the wording.
  void withSkill;
  return base;
}
