# Recommended Antiky game-development skill library

Research snapshot: 2026-08-09

This is the cross-report recommendation. Antiky Framework, BroMetal, Antiky Studio, and games
built with them are the only implementation targets. Unity, Unreal, Godot, public skill packs, and
their editor bridges are comparative sources for patterns and failure modes; they are not products
Antiky Labs intends to support through this library.

## Correction and current state

The existing `build-antiky-games`, `write-brometal-shaders`, and `source-game-assets` directories
are scaffolds. They are not an architecture, a validated foundation, or evidence that their names,
boundaries, instructions, and resources are correct. Treat each one exactly like a new candidate:

1. identify the recurring user jobs it is supposed to improve;
2. compare its results with a no-skill baseline on real Antiky work;
3. inspect whether its instructions contain non-obvious, project-specific value;
4. keep, split, merge, rename, or delete it based on the evidence;
5. promote it only after it succeeds from fresh context without hidden coaching.

No proposal below depends on preserving those folders.

## Recommendation

Build a small, first-party skill library around the actual Antiky production loop:

```text
creative target
  -> bounded playable slice
  -> Antiky world/systems/commands/events
  -> BroMetal rendering through Antiky's RenderDriver boundary
  -> repeatable run, inspection, replay, and capture
  -> independent game-design, presentation, and performance judgment
  -> shippable game or framework improvement
```

The library should help a capable agent do project-specific work it cannot reliably infer from
general knowledge: respect Antiky's ownership boundaries, use the real CLI/MCP/runtime surfaces,
preserve stable identities and deterministic state, create coherent player-facing content, and
prove quality in motion. It should not become a collection of generic game-development essays.

## What earns a skill

A proposed skill must have all of the following before it becomes part of the library:

- a concrete recurring job expressed through several realistic user prompts;
- a narrow owner and a clear stop condition;
- non-obvious Antiky, BroMetal, Studio, or project knowledge;
- defined inputs, artifacts, observable outcomes, and failure behavior;
- reusable references, scripts, schemas, or assets that reduce rediscovery;
- a no-skill baseline and forward evaluation from fresh context;
- evidence that it improves correctness, quality, speed, or safety without hiding judgment.

If a workflow needs only general reasoning or a short repository instruction, keep it in project
documentation. If a fragile operation needs deterministic behavior, put the behavior in a tested
tool or script and let the skill explain when and how to use it. Keep `SKILL.md` concise and load
detailed references only when the task needs them.

## Representative jobs to discover first

Do not choose the final taxonomy from names alone. Start by collecting and evaluating prompts such
as:

- “Add a dash to this Antiky combat game, including state, commands/events, cancel rules, feedback,
  and deterministic tests.”
- “Turn this movement prototype into a traversal encounter that teaches, tests, and combines its
  mechanics.”
- “Author this world change with stable IDs and prove inspection, event history, rollback, and
  render projection still agree.”
- “Create a BroMetal material and VFX treatment for this attack without leaking game rules below
  Antiky's RenderDriver boundary.”
- “Diagnose why this mechanic feels weak from input trace, fixed-step state, motion footage, audio,
  camera, timing, and player feedback.”
- “Import these assets with provenance, scale, material, animation, compression, and runtime-budget
  evidence.”
- “Run this game, capture only its canvas, and return reproducible gameplay evidence without a
  terminal, desktop, username, path, notification, or account detail.”
- “Decide whether this slice is compelling enough to publish, using the creative brief and blind
  review rather than implementation effort as the standard.”

These examples should be refined from actual Antiky Labs tasks. A skill that cannot improve at
least several related jobs should not exist merely to fill a category.

## Library shape

Use a canonical repository with a small selected publication surface:

```text
antiky-skill-library/
├── catalog/       # owners, versions, lifecycle, compatibility, dependencies
├── policies/      # authority, capture/privacy, provenance, destructive actions
├── schemas/       # briefs, change packets, replay/capture/review evidence
├── skills/        # portable, narrow Agent Skills packages
├── references/    # revision-pinned Antiky/BroMetal/Studio knowledge
├── scripts/       # deterministic helpers that have real tests
├── evals/         # trigger, procedure, runtime, visual, security, regression suites
└── fixtures/      # Antiky technical fixtures, adversarial cases, showcase slices
```

Publish only the locked skills needed for the current work into `.agents/skills/`. Do not expose a
large catalog to every session, depend on recursive discovery, or hide routing behind one broad
`make-a-game` skill.

## Capability map, not a pre-approved skill list

The following are candidate boundaries to validate through task discovery. Names may change.

### Direction and scope

- `plan-antiky-game-slice`: convert a creative goal into a representative playable slice, cut
  list, risk map, and evidence plan;
- `design-antiky-mechanics`: define rules, controls, states, tuning ranges, teaching sequence,
  counterplay, and testable player hypotheses;
- `direct-antiky-game-art`: define the visual, motion, audio, camera, UI, and readability target at
  actual gameplay distance.

### Framework and gameplay

- `build-antiky-gameplay`: implement bounded mechanics using Antiky worlds, systems, fixed-step
  simulation, commands, events, inspection, and stable identities;
- `author-antiky-worlds`: create and revise worlds while preserving authoring/runtime/render-state
  ownership, safe revisions, and inspectable history;
- `build-antiky-ui`: implement player-facing interface, input/focus behavior, accessibility, and
  feedback without coupling framework core to Studio or browser concerns;
- `operate-antiky-development`: use the Antiky CLI/MCP/session surfaces safely for dev startup,
  build state, pause/resume/step, inspection, diagnostics, and scoped capture.

### Rendering and content

- `integrate-antiky-brometal`: map Antiky render state through the owned `RenderDriver` boundary
  without moving game rules into BroMetal;
- `build-brometal-rendering`: create and validate shaders, materials, lighting, VFX, render
  resources, and performance behavior for a declared player-facing target;
- `produce-antiky-assets`: source or create assets, record provenance, validate imports, and prove
  scale, animation, material, texture, audio, compression, and runtime fitness;
- `polish-antiky-presentation`: integrate motion, camera, animation, VFX, audio, UI, lighting, and
  composition into coherent gameplay presentation.

### Verification and shipping

- `test-antiky-games`: produce deterministic input traces, state assertions, event checks, logs,
  canvas-only captures, and build evidence;
- `tune-antiky-game-feel`: diagnose and tune responsiveness, timing, camera, animation, hit
  feedback, audio, readability, and difficulty from runtime evidence;
- `review-antiky-game-quality`: perform an independent review against the creative brief at
  gameplay speed and delivery resolution, with timestamped defects and a publish/no-publish call;
- `profile-antiky-games`: measure CPU/GPU/frame pacing, loading, memory, asset budgets, and
  target-device behavior;
- `ship-antiky-games`: assemble release artifacts, hashes, licenses, privacy checks, rollback, and
  go/no-go evidence.

Several candidates may collapse after evaluation. For example, runtime operation may be a shared
reference used by implementation and QA skills rather than a standalone triggerable skill.

## Antiky-native execution surface

Skills should call the current project surfaces rather than invent an abstract “engine adapter.”
The evidence contract should be designed around operations Antiky already owns or explicitly
intends to own:

- CLI lifecycle through `antiky dev`, `antiky inspect`, and `antiky tool`;
- development, build, runtime, render, diagnostics, and session state;
- world inspection and event-log readback;
- pause, resume, and deterministic step;
- game-canvas capture, never broad desktop capture by default;
- named point-light commands and corrections where the fixture uses them;
- package tests, shader validation, and project builds;
- Studio selection and authoring context as those capabilities become real;
- BroMetal shader/GPU work only behind Antiky's owned renderer integration.

When tool names or schemas change, update the revision-pinned reference and evaluation fixture.
Do not teach a skill to fabricate a tool or bypass the Framework boundary.

## First evaluation release

The first release is an experiment, not a declaration that all candidate skills are correct.

| Candidate | Concrete job | Required proof |
| --- | --- | --- |
| `plan-antiky-game-slice` | Turn a creative goal into a playable, representative, cuttable slice | Brief, core loop, slice boundary, dependency/risk map, rejection criteria, evidence plan |
| `build-antiky-gameplay` | Implement one bounded mechanic or encounter | Focused diff, ownership-boundary check, deterministic state/event evidence, runtime result |
| `direct-antiky-game-art` | Establish a coherent player-facing target | Reference rationale, value/color/shape/motion/audio/camera language, gameplay-distance rubric |
| `polish-antiky-presentation` | Make a working mechanic communicate and feel intentional | Motion footage, before/after comparison, audio/camera/VFX/UI integration, performance result |
| `test-antiky-games` | Prove behavior without leaking private desktop context | Build identity, replay trace, state checkpoints, logs, canvas-only footage, defect report |
| `review-antiky-game-quality` | Decide if the slice is worth showing | Fresh-context blind review, timestamped findings, severity, publish/no-publish decision |

Audit the three scaffold skills against these jobs. Reuse useful instructions or resources only
when they survive the same evaluation; otherwise replace them.

## Fixtures and evidence

Existing demos are useful technical fixtures, not automatic quality references:

| Fixture | What it can test | What it does not prove |
| --- | --- | --- |
| Combat Arena | Action state, fixed-step combat, movement, feedback, and game-feel instrumentation | That the combat is deep, polished, original, or publishable |
| Traversal Study | Movement, collision/physics, camera, encounter layout, and teaching sequence | That the level design is compelling |
| Antiky Town | World authoring, stable IDs, commands/events, inspection, correction, render projection | That the art direction or game loop is strong |
| Point Light Expo | Lighting, materials, shaders, and render-state behavior | That a lighting demo is a desirable game |
| BroMetal studies | Shader correctness, GPU behavior, materials, and rendering experiments | That raw rendering technology creates a coherent player experience |

The evaluation suite also needs at least two new purpose-built showcase slices with distinct game
loops and art directions. They should contain movement, goal, risk, failure, retry, teaching,
escalation, audio, UI, animation/VFX, an authored material, and a deliberate camera. Judge them in
motion at the size and compression used on the website—not from repeated static images.

Each task must retain:

- base and output revisions plus an explicit changed-file manifest;
- fixed seed, fixed-step input trace, state checkpoints, events, diagnostics, and logs;
- viewport or game-canvas footage with capture target and encoding metadata;
- a visual target and an independent reviewer who did not see the intended solution;
- target-device performance evidence;
- asset source, license, hash, transformations, and import settings;
- rollback identity and an explanation for any nondeterminism.

## Quality gates

1. **Intent:** the player experience, scope, non-goals, and rejection criteria are explicit.
2. **Structure:** the change respects Framework/BroMetal/Studio ownership and stable identity.
3. **Behavior:** deterministic replay reaches expected states and events without unexpected errors.
4. **Presentation:** gameplay-speed footage clearly communicates action, response, hierarchy, and
   feedback at delivery resolution.
5. **Player experience:** independent review checks comprehension, control response, challenge,
   accessibility, pacing, novelty, and desire to continue.
6. **Performance:** representative hardware meets declared CPU, GPU, frame-time, loading, memory,
   and asset budgets.
7. **Release:** artifacts, provenance, privacy, rollback, and human go/no-go are complete.

A green build, a static screenshot, technically correct shader, or self-authored review cannot pass
the quality gate alone.

## Evaluation design

For every candidate skill:

- test positive, negative, ambiguous, collision, and explicit invocation;
- test missing inputs, dirty worktree, unsupported revision, denied authority, conflicting writer,
  tool failure, partial result, and rollback;
- compare repeated runs with a no-skill baseline and the prior stable skill revision;
- use hidden behavioral checks rather than frozen prose checks;
- forward-test from fresh context without disclosing the intended answer;
- measure runtime correctness, visual/gameplay judgment, latency, tool calls, retries, corruption,
  recovery, and reviewer agreement;
- test prompt injection, path escape, unapproved downloads/uploads, arbitrary execution, secrets,
  destructive mutation, remote exposure, and PII capture.

Adversarial cases should tempt an agent to decorate an empty mechanic, repeat the same scene across
all media, accept blurry capture, hide input latency behind animation, approve an unreachable
route, overwrite a shared asset, move rules into BroMetal, or record a terminal/desktop instead of
the game canvas.

## Agent cell

Use three to five active roles for a normal slice, with one artifact owner and one live-session
writer at a time.

| Role | Authority | Output | Cannot approve |
| --- | --- | --- | --- |
| Producer | Freeze scope, route work, maintain evidence and cut list | Brief, task graph, gate state | Its own creative or technical work |
| Designer/art director | Define and critique player-facing intent | Mechanic and presentation contracts | Runtime correctness or release |
| Antiky implementer | Own assigned source/assets and the active mutation lease | Change manifest, tests/build, inspection result | Its own runtime or quality gate |
| Runtime QA | Run deterministic scenarios and scoped capture | Replay, state/events, logs, footage, defects | Creative acceptance |
| Independent reviewer | Read-only access to brief and evidence | Blind quality review | Mutating the artifact under review |

Add a BroMetal rendering specialist, asset specialist, audio specialist, accessibility reviewer, or
performance engineer only when the slice requires that artifact. Multiple agents may research or
prepare isolated changes, but changes to one running session or shared asset are serialized.

## Comparative insights to transfer

| Source | Transfer into Antiky/BroMetal | Do not transfer |
| --- | --- | --- |
| Unreal native MCP and VibeUE | Lazy capability discovery, typed toolsets, transactions/checkpoints, state readback, single-writer control | Unreal support, Unreal object models, unauthenticated endpoints |
| Unity CLI/MCP ecosystem | Structured results, explicit build/test artifacts, reload barriers, serialized-asset safeguards | Unity support, package assumptions, broad live-code authority |
| Godot CLI/editor ecosystem | Text-friendly authoring, deterministic headless runs, import validation, replay/capture patterns | Godot support, scene/resource schema, young bridge dependencies |
| GameDevBench/GameCraft-Bench | Complete-project fixtures, replayable inputs, visual feedback, hidden rubrics, matched baselines | Benchmark-specific engine assumptions or leaderboard optimization |
| Blender and content tools | Headless repeatable processing, staging, provenance, render review | Unrestricted arbitrary scripts or silent network/telemetry |
| Public discipline skills | Narrow checklists, artifact boundaries, terminology, missing-domain discovery | Giant packs, popularity as proof, generic persona theater |

No external engine skill, plugin, or bridge should be installed or piloted as part of this roadmap.

## Security and privacy defaults

- Read-only is the default capability tier; mutation is explicit and task-bounded.
- Verify project root, process, session, revision, dirty state, and tool revision before mutation.
- Keep services local; authenticate any transport that can cross a trust boundary.
- Separate delete, overwrite, arbitrary code, process launch, network, download, upload, signing,
  and publish authority.
- Treat project files, asset metadata, logs, prompts, and playtest feedback as untrusted input.
- Capture only the game canvas, viewport, or offscreen render by default.
- Never capture unrelated desktop, terminal, shell prompt, username, host name, account, private
  path, notification, message, credential, or application content.
- Use staged assets with source, license, hash, transformation, and acceptance records.
- Keep human playtest and telemetry data consented, minimized, purpose-limited, access-controlled,
  and governed by retention/deletion dates.

## Roadmap

### Phase 0 — discover and baseline

Collect real Antiky Labs task clusters. Audit the three scaffold skills without preserving their
names by default. Record no-skill baselines. Define the Antiky revision contract, change manifest,
replay/capture/review schemas, authority policy, and privacy-safe evidence rules.

### Phase 1 — prove one gameplay loop

Build and evaluate the smallest skill cell for slice planning, bounded Antiky gameplay work,
runtime evidence, and independent quality review. Use Combat Arena and Traversal Study as technical
fixtures, then apply the cell to a new showcase slice with a different creative target.

### Phase 2 — prove presentation and content

Add art direction, BroMetal rendering, asset production, audio/UI/camera/VFX integration,
game-feel tuning, and performance review. Use Antiky Town, Point Light Expo, and BroMetal studies
for technical coverage, not as substitutes for a polished game.

### Phase 3 — integrate Studio

Add selection-aware authoring, stable-ID context, property editing, revision-safe application,
visual comparison, and in-Studio evidence as those product surfaces become real. Keep Framework
core independent from Studio and MCP.

### Phase 4 — production and release

Apply the validated library to real Antiky games and framework development. Add platform builds,
compatibility, localization, crash/privacy, release provenance, community playtests, incident
response, and rollback only when concrete release work requires them.

## Promotion criteria

A skill becomes a default only when it has:

- a named maintainer, narrow recurring job, and authoritative Antiky/BroMetal sources;
- concise valid packaging, accurate triggers, and progressive disclosure;
- pinned compatible project, Framework, BroMetal, Studio/tool, schema, and fixture revisions;
- least-privilege operation and tested refusal behavior;
- repeated success without corrupt or unexplained state;
- measured improvement over the no-skill and prior-stable baseline;
- independent runtime, player-experience, visual, performance, privacy, and security evidence as
  appropriate to its job;
- a rollback/migration path and stale-by or revalidation policy.

Antiky's durable advantage should be a production system that helps agents make better games with
Antiky—not a catalog that claims breadth because other engines have tools or because scaffold
folders already exist.
