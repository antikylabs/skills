# Antiky game-creation orchestration and skill-library design

Research snapshot: 2026-08-09

This report proposes how Antiky should organize agents, skills, runtime controls, evidence, and
approvals to build Antiky Framework, BroMetal, Antiky Studio, and games made with them. These are
the only implementation targets. Unity, Unreal, Godot, public skill packs, and their editor bridges
are comparative evidence used to identify useful patterns and failure modes.

The existing `build-antiky-games`, `write-brometal-shaders`, and `source-game-assets` skills are
unvalidated scaffolds. Nothing in this design assumes their names, contents, or boundaries should
survive evaluation.

## Reading guide

- **Verified fact** means a claim was checked against a primary specification, official project
  documentation, or the current Antiky repository.
- **Observed signal** is a time-sensitive repository, registry, or benchmark measurement useful
  for discovery, not proof.
- **Comparative lesson** is a pattern worth testing in Antiky, not a recommendation to support the
  source engine or install its integration.
- **Recommendation** is an Antiky/BroMetal design decision inferred from the evidence.

## Executive recommendation

Build a small, staged Antiky production cell around three layers:

1. A **direction and approval layer** owns the creative brief, playable-slice boundary, task graph,
   cut list, evidence requirements, and go/no-go decisions. It normally has no mutation authority.
2. A **discipline layer** owns game design, gameplay, world authoring, art, BroMetal rendering,
   assets, animation, audio, UI/UX, accessibility, performance, QA, and release artifacts.
3. An **Antiky execution layer** uses the repository, Framework, CLI, MCP, runtime inspection, and
   eventually Studio. BroMetal operations remain behind Antiky's owned `RenderDriver` boundary.

Only one role holds the mutation lease for a running development session or shared artifact at a
time. Parallel roles may research, design, review, write isolated source, or prepare bounded change
packets. Every playable change must pass deterministic runtime evidence and independent
player-facing review. Compilation is necessary evidence; it is not proof that a game is good.

```text
creative brief -> slice contract -> bounded implementation
               -> build + deterministic run + state/event evidence
               -> motion capture + independent design/presentation review
               -> revise, cut, approve, or stop
```

A failed gate returns a structured defect to one artifact owner. It does not invite every role to
edit the same project, and it does not trigger an unlimited “polish” loop.

## Verified foundations

### Antiky architecture

The repository establishes the target boundaries:

- Antiky owns worlds, fixed-step simulation, authoring state, runtime state, render state,
  commands, accepted events/facts, stable identities, inspection, and the mapping into rendering.
- Only an Antiky-owned `RenderDriver` uses BroMetal directly. BroMetal owns typed shaders, shader
  compilation, GPU resources, and WebGPU execution—not game rules, worlds, editor state, or agent
  protocol.
- Framework core remains independent from DOM, Node, React, Studio, MCP, and BroMetal imports.
- Each world has one command/tick loop. Expensive worker results apply only at a safe revision.
- CLI commands include `antiky dev`, `antiky inspect`, and `antiky tool`.
- Current read surfaces include development, build, runtime, render, diagnostic, session, world,
  event-log, and point-light inspection.
- Current actions include reload, canvas capture, pause, resume, deterministic step, and bounded
  point-light command/correction workflows.
- Games and framework needs drive Studio capability; Studio is not a second engine model.

These are stronger orchestration anchors than a generic cross-engine abstraction.

### Agent Skills format

The [Agent Skills specification](https://agentskills.io/specification) defines a portable skill as
a directory containing `SKILL.md`, with optional `scripts/`, `references/`, and `assets/`. Compact
metadata supports discovery; detailed instructions and resources load only when needed. The
official skill-authoring guidance favors one recurring job per skill, concise non-obvious
instructions, deterministic scripts for fragile repeated operations, and forward evaluation from
fresh context.

**Recommendation:** maintain a richer Antiky catalog and evaluation system, but publish only a
small flat selection of conventional skill packages into discovery scope.

### Comparative engine evidence

The external engine reports remain useful because they reveal recurring orchestration needs:

| Comparative source | Verified or observed pattern | Antiky experiment it suggests |
| --- | --- | --- |
| Unreal 5.8 native MCP | Focused toolsets, lazy discovery, serial game-thread calls, transactions with limits | Discover bounded Antiky capability groups, serialize live-session mutation, checkpoint non-undoable work |
| VibeUE | Tool surfaces evolve substantially; live capability discovery reduces static catalog cost | Pin Framework/tool/schema revisions and query actual capabilities before a workflow |
| Unity CLI/Test Framework | Structured test artifacts matter; process exit alone may be insufficient; reload/import state is a barrier | Preserve build/test/log artifacts and model reload/runtime identity explicitly |
| Godot CLI and text assets | Headless runs, fixed-rate execution, import checks, and inspectable files aid automation | Expand Antiky deterministic replay, import validation, and headless evidence where useful |
| GameDevBench | Visual feedback improved reported agent performance; graphics tasks remained difficult | Require an observe-revise loop rather than trusting source or tests alone |
| GameCraft-Bench | Complete projects, replayable inputs, gameplay footage, hidden rubrics, and multimodal review expose failures | Evaluate Antiky skills on complete playable slices with private checks and independent review |

The detailed [Unreal](unreal-vibeue.md), [Unity](unity.md), and [Godot](godot.md) reports are
comparative case studies only. There is no external-engine adapter or skill roadmap.

## Production cell

Use three to five active roles for a normal playable slice:

| Role | Authority | Primary output | Cannot approve |
| --- | --- | --- | --- |
| Producer | Freeze scope, route work, maintain risks, evidence, and cut list | Brief, task graph, gate state | Its own creative or technical work |
| Designer/art director | Define player-facing mechanics and presentation intent | Mechanic and art-direction contracts | Runtime correctness or release |
| Antiky implementer | Own assigned source/assets and active mutation lease | Change manifest, build/test/inspection result | Its own runtime or quality gate |
| Runtime QA | Run scenarios and privacy-safe capture | Replay, state/events, logs, footage, defects | Creative acceptance |
| Independent reviewer | Read-only review against the approved target | Timestamped design/presentation judgment | Mutating the reviewed artifact |

Add a BroMetal specialist, asset artist, animator, audio designer, UI/accessibility reviewer,
performance engineer, or release engineer only when the current slice needs that artifact. A role
name does not grant authority; the handoff does.

### Ownership rules

- One named owner writes each artifact.
- One role holds the active Antiky session mutation lease.
- An asset specialist works in staging; the Antiky integrator moves accepted outputs into the
  project with provenance and import evidence.
- QA records observed results and defects; it does not silently fix the game.
- The independent reviewer receives the brief, rubric, build identity, trace, and footage, but not
  the author's hidden rationale or expected score.
- Parallel experiments use isolated worktrees, project copies, or staging files. A selected owner
  integrates one chosen result.

## Artifact contracts

Chat is coordination; versioned artifacts are the source of truth.

| Artifact | Owner | Required contents | Consumers |
| --- | --- | --- | --- |
| `game-brief.yaml` | Producer + human | player, experience promise, loop, pillars, non-goals, platform, rejection criteria | All roles |
| `vertical-slice.md` | Producer | playable boundary, expected duration, entry/exit, dependencies, cut list, evidence | Implementer, QA, reviewers |
| `mechanics/<id>.yaml` | Designer | inputs, states, rules, feedback, tuning ranges, teaching, edge cases, scenarios | Implementer, QA, game-feel review |
| `art-direction.md` | Art director + human | value/color/shape/motion/material/audio/camera/UI language, references, avoid list | Content roles, reviewer |
| `antiky-context.json` | Context analyst | repository revision, Framework/BroMetal/tool revisions, project manifest, package graph, constraints | Implementation and QA |
| `handoffs/<task>.json` | Producer | bounded task envelope | Assigned owner and reviewers |
| `asset-manifest.json` | Asset producer/integrator | source, license, author/provider, transformations, hashes, target, import settings | Integrator, release review |
| `change-manifest.json` | Mutation owner | before/after revisions, changed paths, commands/events, migrations, rollback | QA, reviewers, producer |
| `replays/<scenario>.json` | Designer/QA | seed, fixed timestep, initial identity/state, input trace, expected checkpoints | Runtime verifier |
| `evidence/<run>/` | QA | build/runtime/session identities, state, events, diagnostics, logs, render stats, capture metadata | Reviewers, producer |
| `reviews/<run>.json` | Independent reviewer | rubric version, timestamped findings, severity, confidence, decision | Producer + human |

### Handoff example

```json
{
  "schema": "antiky.handoff/v1",
  "taskId": "combat-dash-014",
  "role": "antiky-gameplay-implementer",
  "project": "combat-arena",
  "baseRevision": "<full-git-sha>",
  "runtime": {
    "frameworkRevision": "<full-git-sha>",
    "brometalVersion": "<locked-version>",
    "toolSchema": "<locked-schema-version>"
  },
  "inputs": [
    {"path": "design/mechanics/dash.yaml", "sha256": "<hash>"},
    {"path": "design/art-direction.md", "sha256": "<hash>"}
  ],
  "skills": [
    {"id": "build-antiky-gameplay", "version": "0.1.0", "sha256": "<hash>"}
  ],
  "permissions": {
    "writePaths": ["packages/demos/antiky/combat-arena/src/**"],
    "tools": ["get_dev_status", "get_latest_build", "get_runtime_status", "get_session_status", "get_world_inspection", "get_event_log", "pause_simulation", "resume_simulation", "step_simulation", "capture_frame"],
    "network": [],
    "prohibited": ["desktop-capture", "publish", "unapproved-download", "broaden-scope"]
  },
  "acceptance": [
    "fixed-step replay reaches the declared dash states",
    "command/event facts match the contract",
    "motion footage communicates anticipation, travel, recovery, and collision response",
    "no game rule is moved into BroMetal"
  ],
  "outputs": ["change-manifest.json", "evidence/combat-dash-014/"],
  "rollback": "git:<baseRevision>"
}
```

An agent may return a blocked handoff. It may not silently substitute a different acceptance
criterion, tool, asset source, project, capture target, or external service.

## Antiky execution contract

### Read before mutation

Use the actual project surface:

1. `get_dev_status` verifies the development session.
2. `get_latest_build` relates source/shader/asset changes to an accepted build revision.
3. `get_runtime_status` proves whether a browser runtime is connected.
4. `get_session_status` reports world/runtime identities, fixed clock, completed-step count,
   revisions, pause reasons, and state digest.
5. `get_world_inspection` and `get_event_log` return structured Framework-owned state and accepted
   facts.
6. `get_render_stats` reports Framework-owned render measurements; it does not prove appearance.
7. `get_diagnostics` reports failures using stable codes.

Do not invent missing facts. A null inspection, stale build, disconnected runtime, or ambiguous
session is a blocked prerequisite.

### Deterministic operation

- Pause with `pause_simulation` while preserving other pause reasons.
- Read `completedStepCount` from `get_session_status` before each `step_simulation` call.
- Treat a stale step request as a safe rejection, not a reason to bypass concurrency controls.
- Record build, session, runtime, world, revision, seed/input, state digest, and event sequence with
  every replay.
- Use named commands and expected revisions for mutation. Keep correction facts rather than
  silently rewriting accepted history.

### BroMetal boundary

- Antiky gameplay and world code owns rules and semantic state.
- The Antiky `RenderDriver` maps render state into BroMetal resources and draw work.
- A shader or renderer skill may change typed shader code, GPU resources, materials, lighting,
  VFX, and performance behavior within its assignment.
- It may not make BroMetal the source of truth for gameplay, world identity, commands, events,
  Studio selection, or agent protocol.

### Studio boundary

Studio should eventually expose selection, stable IDs, hierarchy, property editing, authored
changes, diff/revision context, and game-canvas evidence. Skills must not assume those surfaces
exist before they are implemented. Framework and games must remain operable headlessly without
Studio or MCP.

## Authority and safety

| Tier | Capability | Default |
| --- | --- | --- |
| 0 | Read repository, docs, manifests, structured inspection, existing evidence | Allowed |
| 1 | Run package tests, shader validation, builds, and isolated deterministic replay | Allowed for assigned role |
| 2 | Write owned source/assets and operate a verified local Antiky session | Requires bounded handoff and mutation lease |
| 3 | Delete/overwrite shared data, run arbitrary code, launch external DCC automation, use network/download/upload, change dependencies | Explicit per-task approval and isolation |
| 4 | Sign, publish, deploy, expose a service, send external messages, or mutate production/live data | Human approval and release procedure |

Before tier 2 or higher work:

1. verify exact project root, repository revision, dirty state, package/tool revisions, and running
   session identity;
2. record allowed paths, operations, processes, and destinations;
3. checkpoint non-undoable state;
4. acquire the one-writer lease;
5. execute one bounded change packet;
6. read back structured state and retain the change journal;
7. release the lease after the session reaches a known state.

### Capture privacy

`capture_frame` captures exact pixels from the connected game canvas and returns path, hash, size,
session identity, runtime identity, and build revision. It is the default capture surface.

Prohibit broad desktop or terminal capture. Evidence must not include a shell prompt, username,
host name, personal directory, account identity, notification, private message, credential, or an
unrelated application. Motion-recording tooling must target the game canvas/window or a controlled
offscreen render and preserve capture bounds plus encoding metadata.

## Skill-library structure

```text
antiky-skill-library/
├── catalog/
│   ├── catalog.yaml
│   ├── lock.json
│   └── compatibility.yaml
├── policies/
│   ├── authority.md
│   ├── session-lease.md
│   ├── capture-privacy.md
│   └── asset-provenance.md
├── schemas/
│   ├── handoff-v1.schema.json
│   ├── change-manifest-v1.schema.json
│   ├── replay-v1.schema.json
│   └── review-v1.schema.json
├── skills/
│   ├── direction/
│   ├── antiky/
│   ├── brometal/
│   ├── content/
│   └── verification/
├── references/
│   ├── antiky/
│   ├── brometal/
│   └── studio/
├── scripts/
├── evals/
│   ├── triggers/
│   ├── tasks/
│   ├── rubrics/
│   ├── baselines/
│   └── reports/
└── fixtures/
    ├── technical/
    ├── adversarial/
    └── showcases/
```

Publish a small selected flat set into `.agents/skills/`, such as
`plan-antiky-game-slice`, `build-antiky-gameplay`, `test-antiky-games`, and
`review-antiky-game-quality`. Do not assume recursive discovery of the canonical tree.

### Skill package shape

```text
build-antiky-gameplay/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── scripts/
│   ├── verify-context.sh
│   └── collect-evidence.sh
├── references/
│   ├── framework-boundaries.md
│   ├── command-event-contracts.md
│   └── common-failures.md
└── assets/
    └── change-manifest.example.json
```

Only add a script when repeated deterministic behavior warrants it, and test the script. Keep
`SKILL.md` focused on one recurring job and non-obvious procedure. Keep detailed revision-specific
knowledge one reference level away. Central evals must not be bundled where an executing agent can
read hidden answers.

### Minimal frontmatter

```yaml
---
name: build-antiky-gameplay
description: >-
  Implements a bounded gameplay mechanic or encounter in an Antiky Framework
  project using the fixed-step world, command/event, inspection, and renderer
  ownership contracts. Use after an approved slice and mechanic contract exist.
---
```

Keep lifecycle, risk, dependencies, immutable hashes, and evaluation identity in the internal
catalog rather than inventing non-portable frontmatter.

### Catalog record

```yaml
id: build-antiky-gameplay
version: 0.1.0
status: alpha
owner: gameplay-systems
source:
  revision: <full-commit-sha>
content_sha256: <directory-content-hash>
compatibility:
  antiky_framework: <revision-or-range>
  brometal: <locked-version>
  tool_schema: <locked-version>
schemas:
  - antiky.handoff/v1
  - antiky.change-manifest/v1
capabilities:
  - repo-write-owned-paths
  - antiky-session-mutation
requires:
  - id: plan-antiky-game-slice
    version: ">=0.1.0 <1.0.0"
eval_suite: antiky-gameplay-v1
last_verified:
  date: 2026-08-09
  fixture: combat-arena
  report: <content-hash>
```

The lockfile resolves every selected skill, reference set, schema, script, Framework/BroMetal/tool
revision, and fixture to immutable identity. Nothing auto-installs or updates during game work.

## Evaluation

### Layers

1. **Package:** frontmatter, directory/name, links, references, scripts, license/provenance.
2. **Trigger:** positive, negative, ambiguous, collision, and explicit-invocation prompts.
3. **Procedure:** missing inputs, dirty repository, incompatible revision, denied authority, lease
   conflict, build/tool failure, partial result, and rollback.
4. **Antiky fixture:** bounded source change, build, deterministic operation, world/event readback,
   render evidence, and hidden behavioral checks.
5. **Runtime:** repeated trace, state/event checkpoints, diagnostics, and identity consistency.
6. **Presentation:** gameplay-speed canvas footage at delivery resolution and compression.
7. **Player experience:** fresh-context review or representative human playtest.
8. **Security/privacy:** prompt injection, path escape, dependency/network changes, arbitrary code,
   secrets, destructive mutation, remote exposure, and PII capture.
9. **Regression:** no-skill baseline, prior stable skill, candidate skill, and current model/tool
   combination.

### Fixture roles

Existing demos are technical substrates, not quality endorsements:

- Combat Arena: combat state, motion, feedback, and game-feel instrumentation;
- Traversal Study: movement, collision/physics, camera, level teaching, and failure/retry;
- Antiky Town: stable IDs, world authoring, commands/events, inspection, corrections, render
  projection;
- Point Light Expo: lighting, materials, shaders, and render state;
- BroMetal studies: typed shaders, GPU resources, render behavior, and visual experiments.

Add adversarial fixtures that tempt boundary violations or false approval. Add at least two new
showcase slices with distinct loops and art directions. A showcase must be judged as a game in
motion; technical fixture success cannot substitute for originality, coherence, or desire to play.

### Minimum playable-slice requirements

- a movement or interaction verb with measurable response;
- goal, risk, failure, retry, and meaningful feedback;
- a short teaching sequence followed by a real test or combination;
- an authored world/encounter with deliberate camera and spatial composition;
- integrated art, animation/VFX, audio, UI, and at least one authored material;
- deterministic trace and state/event checks;
- gameplay footage covering actions, transitions, edge cases, and more than one visual condition;
- performance evidence on representative hardware;
- independent review against explicit positive and negative references.

### Promotion states

| State | Meaning | Allowed use |
| --- | --- | --- |
| `quarantine` | Unreviewed external source or imported scaffold | Static audit only |
| `alpha` | Package-valid and beats baseline on a narrow fixture | Isolated experiments |
| `beta` | Repeated Antiky fixture success with runtime/security review | Supervised project work |
| `stable` | Repeated cross-project success, regression baseline, named owner | Default workflow |
| `deprecated` | Replacement and migration documented | Existing locked work only |
| `blocked` | Security, license, compatibility, or quality failure | Not runnable |

A Framework, BroMetal, Studio/tool, schema, model, or fixture change invalidates the qualified
combination until targeted regression passes.

## Starter role configuration

Conceptual only:

```text
.codex/agents/
├── game-producer.toml
├── antiky-context.toml
├── antiky-gameplay-worker.toml
├── brometal-render-worker.toml
├── runtime-qa.toml
└── game-quality-reviewer.toml
```

- Producer, context, and reviewer roles are read-only.
- Exactly one worker has the live-session mutation lease.
- Runtime QA writes only to a designated evidence location.
- The BroMetal worker owns bounded shader/render paths and cannot own gameplay truth.
- A normal cell has at most four concurrent roles and one active mutation owner.
- Alternate concepts use isolated worktrees or staging, with one chosen result integrated.

## Anti-patterns

### Organization

- Always-on giant simulated studio.
- Parallel writers in one project/session or shared asset.
- Hierarchy without versioned artifacts.
- Author as sole reviewer.
- Producer treated as universal design, art, QA, and release authority.

### Skills

- Preserving scaffold names because they already exist.
- Creating a skill for every topic instead of a recurring validated job.
- Monolithic `make-a-game` instructions.
- Generic advice that Codex already knows.
- Opaque routing, deep reference mazes, silent dependencies, auto-install, or unpinned sources.
- Popularity, stars, or registry installs used as trust or quality evidence.

### Architecture

- A cross-engine abstraction that weakens Antiky's own model.
- Game rules, commands, identity, or authoring truth moved into BroMetal.
- Studio or MCP imports introduced into Framework core.
- Expensive asynchronous results applied without revision checks.
- Tool output or null state replaced with invented runtime facts.

### Evidence and quality

- Green build treated as a good game.
- One static screenshot treated as gameplay proof.
- Repeated nearly identical images used to imply breadth.
- Blurry or overcompressed footage accepted because capture technically succeeded.
- Desktop or terminal capture exposing PII.
- “Make it polished” without an explicit target, negative examples, or gameplay-distance rubric.
- Self-reported success without launched runtime evidence and independent review.

## Roadmap

### Phase 0 — task discovery and baseline

Collect real Antiky Labs prompt clusters. Audit the three scaffold skills as disposable candidates.
Run no-skill baselines. Define the catalog/lock format, authority tiers, session lease,
change/replay/review schemas, capture policy, and evaluation runner.

Exit criteria:

- at least three recurring task clusters have concrete inputs and outcomes;
- scaffold instructions are retained only when they improve a measured result;
- PII/desktop capture attempts fail closed;
- replay evidence carries build/session/runtime/world identity and stable hashes;
- a failed gate returns a structured defect.

### Phase 1 — minimum Antiky gameplay cell

Evaluate slice planning, bounded gameplay implementation, runtime verification, and independent
quality review using Combat Arena and Traversal Study as technical fixtures. Then exercise the same
cell on a new showcase slice with a different creative target.

Exit criteria:

- deterministic scenarios reach hidden state/event checks;
- ownership boundaries and rollback remain intact;
- reviewers catch seeded gameplay and presentation defects missed by technical tests;
- motion evidence is clear at website delivery size;
- no author self-approves.

### Phase 2 — BroMetal presentation and content

Add art direction, shaders/materials, lighting/VFX, assets, animation, audio, UI/accessibility,
camera, game-feel, and performance workflows. Use Antiky Town, Point Light Expo, and BroMetal
studies for technical coverage while requiring a distinct polished showcase game.

Exit criteria:

- shader and render validation respects the RenderDriver boundary;
- every asset has provenance, transformation, import, and runtime evidence;
- final motion, lighting, scale, audio, UI, and compression pass independent review;
- target-device budgets are met.

### Phase 3 — Studio integration

Add selection-aware context, stable-ID hierarchy, property authoring, revision-safe change
application, visual comparison, and in-Studio feedback as those capabilities ship. Preserve
headless Framework operation and one engine model.

### Phase 4 — real game production and release

Apply stable skills to Antiky games and framework work. Add compatibility, localization, crash and
privacy handling, release provenance, community playtests, incident response, and rollback only as
concrete production needs demand them.

There is no phase for Unity, Unreal, or Godot support.

## Source audit priorities

1. Current Antiky architecture, CLI/MCP tool definitions, framework types, demos, package scripts,
   tests, product direction, and existing scaffold skills.
2. [Agent Skills specification](https://agentskills.io/specification) and current first-party
   [OpenAI skill patterns](https://github.com/openai/skills) for portable packaging.
3. [GameDevBench](https://github.com/waynchi/gamedevbench) and
   [GameCraft-Bench](https://github.com/FreedomIntelligence/gamecraft-bench) for replay, visual
   feedback, hidden-rubric, and complete-project evaluation patterns.
4. External engine reports in this directory for comparative architecture lessons only.
5. Graphics, Blender/content, accessibility, performance, and platform primary sources needed by a
   concrete Antiky task.

## Antiky verification commands

Representative repository commands must be resolved against the relevant package scripts and
record their exact versions, arguments, exit status, structured output, and logs:

```bash
# Start or inspect an Antiky project
npm run antiky -- dev --project /absolute/path/to/game.antiky
npm run antiky -- inspect --project /absolute/path/to/game.antiky

# Query the same structured tools available to coding agents
npm run antiky -- tool get_dev_status --project /absolute/path/to/game.antiky
npm run antiky -- tool get_latest_build --project /absolute/path/to/game.antiky
npm run antiky -- tool get_runtime_status --project /absolute/path/to/game.antiky
npm run antiky -- tool get_session_status --project /absolute/path/to/game.antiky
npm run antiky -- tool get_world_inspection --project /absolute/path/to/game.antiky
npm run antiky -- tool get_event_log --project /absolute/path/to/game.antiky
npm run antiky -- tool get_render_stats --project /absolute/path/to/game.antiky
npm run antiky -- tool capture_frame --project /absolute/path/to/game.antiky

# Repository verification examples
npm run test --workspace @antiky/framework
npm run test --workspace @antiky/cli
npm run test --workspace @antiky/demo-combat-arena
npm run shaders --workspace @antiky/demo-combat-arena
```

Before relying on an example, confirm the current manifest path and package script. A command is
evidence only when its build/session/runtime identities and output artifacts are retained.

## Decision summary

Antiky should build a compact, artifact-driven production system for its own framework, renderer,
Studio, and games. Its core abstractions are:

- one accountable owner per artifact and one writer per live session;
- explicit, hashed handoffs and versioned outputs;
- pinned Antiky, BroMetal, Studio/tool, skill, script, schema, and fixture revisions;
- deterministic build/run/state/event evidence;
- clear game-canvas motion capture with strict privacy boundaries;
- independent technical, game-design, presentation, accessibility, performance, and human gates;
- a small portable skill surface backed by task baselines, forward evals, and a richer catalog.

Other engines demonstrate useful ideas. The product is the Antiky-native system that turns those
ideas into better, reproducible games—not skills or adapters for those engines.
