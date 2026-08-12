/**
 * Shared vocabulary for eval cases.
 *
 * A case bundles four things that belong together and used to live in three
 * separate files: the prompt, the assertion, the scripted turns that should
 * satisfy it, and a negative control proving the assertion can fail.
 *
 * `negativeControl` is REQUIRED. An assertion with no negative control is not a
 * test — it is a green light with no bulb. `self-test.ts` iterates every case
 * and fails the suite if any one of them accepts its own counter-example.
 */

/** A declarative agent turn. Crosses a process boundary as JSON, so no functions. */
export type FauxStep =
  | { kind: "text"; text: string }
  | { kind: "tool"; name: string; args: Record<string, unknown> };

/** What the agent did, as observed by the sandbox run. */
export interface Trace {
  toolCalls: { name: string; args: Record<string, unknown>; blocked: boolean }[];
  finalText: string;
  /** What the agent changed in its workspace. */
  mutations?: {
    created: string[]; modified: string[]; deleted: string[];
    contents: Record<string, string>;
  };
  /** Token and cost totals, present on live runs. */
  usage?: {
    input: number; output: number; cacheRead: number; cacheWrite: number;
    reasoning: number; totalTokens: number; costUsd: number; turns: number;
  };
  error?: string;
}

export interface Verdict {
  passed: boolean;
  detail: string;
}

/**
 * A counter-example. Either a literal trace, or a script to actually run in the
 * container when the misbehavior involves the tool layer (a blocked edit, say)
 * and a hand-written trace would beg the question.
 */
export interface NegativeControl {
  /** Why this must fail. Shown in the self-test report. */
  reason: string;
  trace?: Trace;
  script?: FauxStep[];
  /** Prompt to use when `script` is set. Defaults to the case's own prompt. */
  prompt?: string;
}

export type CaseKind = "trigger" | "audit" | "fix" | "reporting" | "write" | "patch" | "pr" | "update";

/**
 * One suite per skill under test. The suite name IS the skill name, and matches a
 * directory under both cases/ and fixtures/ — so a skill, its cases, and its
 * fixtures are always found under the same name.
 */
export type Suite =
  | "team-simplified-technical-english"
  | "team-write-adrs"
  | "team-write-objectives"
  | "team-brometal";

export interface EvalCase {
  id: string;
  /** Which skill's suite this belongs to. Set by the suite's index, not by hand. */
  suite?: Suite;
  kind: CaseKind;
  prompt: string;
  /** Human-readable statement of what must hold. */
  expectation: string;
  assert: (trace: Trace) => Verdict;
  /** Scripted turns that SHOULD satisfy `assert`. */
  script: FauxStep[];
  negativeControl: NegativeControl;
}

/** Stamp a suite onto its cases so reports and selectors can group them. */
export const inSuite = (suite: Suite, cases: EvalCase[]): EvalCase[] =>
  cases.map((c) => ({ ...c, suite }));

// --- assertion helpers -----------------------------------------------------

export const SKILL = "team-simplified-technical-english";

export const MUTATING = ["edit_file", "write_file", "move_file"] as const;

/** A tool that ran (was not blocked). */
export const called = (trace: Trace, name: string): boolean =>
  trace.toolCalls.some((c) => c.name === name && !c.blocked);

/** A tool the agent tried to use, whether or not it was allowed. */
export const attempted = (trace: Trace, name: string): boolean =>
  trace.toolCalls.some((c) => c.name === name);

/**
 * Did the agent activate the skill?
 *
 * pi has no activation tool: the model reads the SKILL.md at the location given
 * in the `<available_skills>` catalog. So activation is a read_file whose path
 * lands inside that skill's directory — which is a genuinely harder bar than
 * calling a tool named after the thing you want.
 */
export const skillInvoked = (trace: Trace, skill: string = SKILL): boolean =>
  trace.toolCalls.some(
    (c) =>
      !c.blocked &&
      (c.name === "read_file" || c.name === "list_dir") &&
      new RegExp(`/skills/${skill}(/|$)`).test(String(c.args.path ?? "")),
  );

export const mentions = (trace: Trace, pattern: RegExp): boolean => pattern.test(trace.finalText);

export const mutationsAttempted = (trace: Trace): string[] =>
  trace.toolCalls.filter((c) => (MUTATING as readonly string[]).includes(c.name)).map((c) => c.name);

/** Compact tool trace for reports: `read_file → run_ste_lint`. */
export const toolPath = (trace: Trace): string =>
  trace.toolCalls.map((c) => (c.blocked ? `${c.name}(BLOCKED)` : c.name)).join(" → ") || "none";

// --- mutation helpers ------------------------------------------------------

/** Files the agent created, relative to the workspace root. */
export const created = (trace: Trace): string[] => trace.mutations?.created ?? [];
export const modified = (trace: Trace): string[] => trace.mutations?.modified ?? [];
export const deleted = (trace: Trace): string[] => trace.mutations?.deleted ?? [];

/** Did the agent change anything at all? The read-only cases turn on this. */
export const changedAnything = (trace: Trace): boolean =>
  created(trace).length + modified(trace).length + deleted(trace).length > 0;

/** Every path the agent touched, for reporting a violation precisely. */
export const touched = (trace: Trace): string[] =>
  [...created(trace), ...modified(trace), ...deleted(trace)].sort();

/** A created file whose path matches, with its contents. */
export const createdMatching = (trace: Trace, pattern: RegExp): { path: string; content: string }[] =>
  created(trace)
    .filter((p) => pattern.test(p))
    .map((p) => ({ path: p, content: trace.mutations?.contents[p] ?? "" }));

// --- small builders --------------------------------------------------------

export const tool = (name: string, args: Record<string, unknown> = {}): FauxStep => ({
  kind: "tool",
  name,
  args,
});

export const text = (value: string): FauxStep => ({ kind: "text", text: value });

/** A trace with no tool calls and the given answer. For literal negative controls. */
export const saying = (finalText: string): Trace => ({ toolCalls: [], finalText });

// --- skill names -----------------------------------------------------------

export const SKILLS = {
  ste: "team-simplified-technical-english",
  adr: "team-write-adrs",
  objectives: "team-write-objectives",
  brometal: "team-brometal",
} as const;

// --- fixture paths ---------------------------------------------------------
//
// Fixtures mount at /fixtures with one directory per suite, mirroring cases/.

/**
 * A fixture path, as the agent sees it.
 *
 * Points at /workspace — the writable copy the agent works on — not at the
 * pristine /fixtures mount, which exists so the run can be diffed.
 */
export const fixture = (suite: Suite, name: string): string => `/workspace/${suite}/${name}`;
