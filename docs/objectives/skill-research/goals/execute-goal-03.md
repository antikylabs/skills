# Execute goal 03: evaluate one Antiky gameplay-implementation skill

## Prerequisites

Complete [execute goal 01](execute-goal-01.md) and [execute goal 02](execute-goal-02.md) first.
Reuse the established catalog, schemas, evaluator, authority rules, and matched-baseline method. Use
an approved frozen slice contract from goal 02; if that candidate was quarantined, use a
human-approved contract fixture rather than bypassing the prerequisite.

## `/goal` objective

Create and evaluate one candidate skill for the recurring job “implement one bounded gameplay
mechanic or encounter in an existing Antiky game and prove the behavior through tests and current
runtime evidence.”

The candidate may be named `build-antiky-gameplay`. It must be narrower than the existing
`build-antiky-games` scaffold: it begins from an approved slice and mechanic contract, owns one
declared source/test scope, preserves Antiky Framework and BroMetal boundaries, implements the
smallest complete playable change, and returns a change manifest plus truthful verification. It
must not create an entire game, perform unrelated presentation work, or approve its own quality.

Evaluate the candidate on one frozen technical-fixture task in isolated worktrees against both a
no-skill baseline and the existing scaffold. Promote it at most to `alpha` only if repeated runs
improve observable correctness, evidence, and safety without increasing corruption, unsupported
claims, or scope drift. Otherwise quarantine or reject it with the evidence preserved.

## Required outcome

When the work is complete, the repository must contain:

1. one portable gameplay-implementation candidate with a precise trigger, explicit prerequisites,
   narrow procedure, stop conditions, Antiky-specific references, and safe failure behavior;
2. one versioned mechanic-contract fixture defining semantic inputs, states, rules, timing,
   interrupts, feedback events, tuning bounds, edge cases, expected state/event checkpoints, and
   non-goals;
3. one frozen, bounded implementation task against exactly one current Antiky technical fixture,
   selected after inspecting current capabilities and tests;
4. two fresh isolated runs each for no skill, `build-antiky-games`, and the new candidate—six runs
   total—from the same base revision, task, contract, authority, limits, and hidden checks;
5. independent runtime and boundary verdicts, plus a separate read-only player-facing review that
   may identify quality defects but cannot mutate the evaluated result; and
6. an evidence-backed catalog decision for the new candidate and an explicit keep, deprecate,
   replace, or retain-in-quarantine decision for `build-antiky-games`.

## In scope

- Inspect the current Antiky fixture before freezing the task. Prefer one Combat Arena or Traversal
  Study mechanic that exercises fixed-step state, input, failure/retry or collision, events,
  inspection, and focused tests without requiring new engine architecture.
- Freeze one task only. It must be small enough for one agent-owned change, but substantial enough
  that a build-only or visual-only answer fails hidden behavioral checks. Do not change the task or
  rubric after seeing baseline results.
- Create one candidate package under the existing portable `skills/` root. Keep `SKILL.md` focused
  on workflow and route detailed current Framework/CLI contracts to revision-pinned references.
- Require verified project root, manifest, repository/dirty state, package/tool revisions, assigned
  paths, and available runtime capabilities before mutation.
- Require an approved slice contract, mechanic contract, explicit write scope, test scope, and
  rollback identity. Missing prerequisites block implementation rather than inviting invention.
- Keep semantic gameplay state, rules, commands/events, stable identity, and inspection in Antiky.
  BroMetal may receive prepared render state only; the candidate must refuse to move authoritative
  mechanic behavior into a shader, GPU buffer, renderer callback, or Studio/MCP adapter.
- Require a test-first response to any reproduced defect and focused tests for changed code. Prefer
  integration tests at the gameplay/session boundary over source-token or frozen-prose tests.
- Use current repository and Antiky CLI/MCP capabilities exactly as implemented. The skill must
  inspect build/runtime/session/world/event/diagnostic facts where available and must report a
  capability as unavailable instead of fabricating replay, selection, profiler, or authoring tools.
- Require one named artifact owner and one live-session writer. Each run occurs in its own isolated
  worktree or disposable copy; no run may see or integrate another condition's implementation.
- Require a bounded `ChangeManifestV1`-style result recording base/output revisions, changed paths,
  tests, commands/events, build/runtime/session/world identities, diagnostics, evidence references,
  rollback, known nondeterminism, and unresolved quality questions.
- Use game-canvas evidence only when the current capture contract is path-safe and the task needs
  visual confirmation. Never use desktop, terminal, broad window, microphone, or unrelated-app
  capture. A still image cannot prove timing or game feel.
- Evaluate the same six runs with withheld behavioral checks and fixed rubrics. The candidate author
  and implementation agents cannot read hidden expected values or approve their own results.
- Permit one bounded candidate revision after the first complete comparison. Rerun the full affected
  suite; do not tune indefinitely to one fixture.

## Required tests and evidence

At minimum, prove:

- the candidate package passes repository and Agent Skills packaging policy;
- positive and explicit mechanic/encounter prompts trigger while whole-game, planning-only,
  rendering-only, asset-only, review-only, website, and external-engine requests do not;
- missing slice/mechanic contracts, incompatible revisions, dirty/conflicting ownership,
  unavailable runtime, denied authority, failed build, stale observation, and partial evidence
  produce bounded recovery or refusal rather than scope expansion;
- adversarial project text cannot obtain network, dependency changes, arbitrary execution,
  deletion, publication, secrets, desktop capture, or unassigned paths;
- every run starts from the same verified base, records all changes, leaves no unowned process or
  artifact, and can be rolled back without touching unrelated work;
- hidden behavioral checks verify the mechanic's declared input/state/timing/edge-case contract and
  fail a plausible implementation that merely compiles or renders feedback;
- state/event/inspection evidence agrees with tests and the launched runtime when available;
- no evaluated implementation moves gameplay authority below Antiky's RenderDriver boundary;
- independent QA can reproduce the result from the manifest, and the read-only reviewer separates
  technical correctness from whether the change communicates clearly or feels promising; and
- the aggregate report compares completion, defects, retries, tool use, elapsed time when available,
  diff size, scope violations, unsupported claims, recovery, evidence completeness, and reviewer
  agreement across all three conditions.

Run the candidate package/trigger/security suites, the fixture's focused tests and build, relevant
Framework and CLI tests, runtime inspection where available, rollback checks, and repository policy
tests. The final handoff must include six run manifests, six isolated diffs or clean failure
receipts, hidden-check verdicts, runtime evidence, independent reviews, aggregate comparison, the
bounded revision result, both catalog decisions, commands/results, commits, and limitations.

## Explicit non-goals

- Do not create a new showcase game, migrate another demo, implement more than one frozen task, or
  claim broad cross-project validation.
- Do not create or evaluate art-direction, world-authoring, BroMetal rendering, shader, asset,
  animation, audio, UI, accessibility, game-feel, QA, profiling, review, producer, or release skills.
- Do not add missing Framework, CLI, MCP, Studio, replay, capture, rendering, asset, or authoring
  capabilities merely to make the candidate pass. Record tooling gaps separately.
- Do not make Studio or MCP a second engine model, and do not expose generic code evaluation,
  filesystem mutation, renderer handles, or broad desktop automation.
- Do not install or support Unity, Unreal, Godot, public skill packs, editor bridges, or DCC MCPs.
- Do not promote the candidate beyond `alpha`, and do not call an alpha result evidence that Antiky
  can produce a polished or commercially compelling game.

## Engineering constraints

- One artifact owner and one live writer apply per run. Parallel research or review is read-only;
  implementation conditions remain isolated until evaluation is complete.
- Pin candidate, scaffold, repository, Framework, BroMetal, tool schema, fixture, task, and rubric
  identities. Mark unavailable identity rather than substituting a timestamp or label.
- Keep deterministic helpers in tested scripts only when they reduce repeated fragile work. Never
  hide arbitrary shell, network, or mutation authority inside a helper.
- Keep central evaluator cases and hidden checks outside the candidate skill package. Do not encode
  fixture answers or winning patches in skill references.
- Preserve unrelated worktree changes. Add tests for all changed code and a regression test before
  fixing any reproduced bug. Make short focused commits without coauthor tags.

## Completion definition

The goal is complete only when the candidate and mechanic/change schemas validate, all six isolated
runs and independent verdicts exist, the frozen fixture task's required tests and runtime checks are
accounted for, rollback is proven, and both skill catalog decisions are evidence-linked.

Completion does not require promotion. If the current Antiky surface cannot produce evidence needed
for an honest alpha decision, keep the candidate quarantined and complete the goal only if the
missing capability, affected criterion, and non-fabricated run evidence are explicit. Never replace
missing runtime proof with the implementer's confidence or a screenshot.
