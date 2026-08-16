# Existing Antiky Research Synthesis

Research corpus: `docs/objectives/skill-research/`  
Corpus snapshot date: 2026-08-09  
Research line: 1 — Existing Antiky research synthesis

## Evidence interpretation

This synthesis preserves the earlier reports’ labels but applies the current objective’s three-label vocabulary:

- **Established** — the prior report says it directly inspected a public source file, repository metadata, paper, or first-party documentation. This means the process is demonstrably documented, not that its effectiveness is independently proven.
- **Claimed** — a maintainer, publisher, registry entry, or source document asserts something that the earlier research did not independently exercise.
- **Inferred** — an Antiky assessment, recommendation, translation, or synthesis. It is not evidence that a public author uses the resulting pipeline.

No external workflow was installed or run during the prior research. I did not re-open every external source during this synthesis. Therefore, “established” below means established by the dated local evidence corpus, and volatile facts still need refresh before publication.

---

## 1. Publicly documented or repeatedly demonstrated pipelines

The local corpus contains several source-observed, AI-assisted game-development pipelines or discipline-level loops. It also contains many useful Antiky-designed workflows that must not be presented as public practice.

### Candidate-pipeline table

| Candidate pipeline | Source-observed flow | Artifacts and gates actually identified | Evidence | Source paths and direct links | Possible portable supporting skills | First-pass disposition |
|---|---|---|---|---|---|---|
| Automated browser-game runtime QA | Boot → exercise main verbs → traverse transitions → inspect runtime state/HUD/responsive states → capture screenshots → report severity-ranked defects | Screenshots, runtime observations, issue report; canvas/WebGL must be visually inspected because DOM assertions alone are insufficient; performance claims require suitable graphics/performance tooling | **Established** as a first-party documented workflow. **Claimed/unverified** as an outcome-improving process because the corpus found no independent validation | `docs/objectives/skill-research/game-design-ux.md`, especially “OpenAI game-studio material”; [game-playtest](https://github.com/openai/plugins/blob/main/plugins/game-studio/skills/game-playtest/SKILL.md), [playtest checklist](https://github.com/openai/plugins/blob/main/plugins/game-studio/references/playtest-checklist.md) | `runtime-playtest`, `input-scenario-runner`, `game-surface-capture`, `visual-defect-triage`, `performance-evidence-router` | **Initial library candidate.** Narrow, observable, and easy to diagram. Call it automated runtime QA, not human playtesting |
| Level blockout and teach-test loop | Define player metrics → build blockout → establish critical path and pacing → teach a mechanic → test it later → check traversal and soft locks → revise from play evidence | Player metrics, blockout, critical path, pacing beats, traversal checks, soft-lock findings | **Established** as a documented discipline workflow in inspected source. **Unverified** behaviorally; repository tests cover package structure, not whether the workflow produces better levels | `docs/objectives/skill-research/game-design-ux.md`, “awesome-gamedev-agent-skills”; [level-design source](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/858c3e58e1f35ea3a5746c4df6003ffbd1c4dad0/skills/disciplines/level-design/SKILL.md) | `player-metrics`, `level-blockout`, `critical-path-review`, `teach-test-pacing`, `navigation-and-softlock-check`, `play-path-evidence` | **Initial library candidate**, with fixed numerical recipes removed or labeled as source-specific hypotheses |
| Art direction and visual-target approval | Consume product/game-design inputs → define camera/composition/shape/color/light/material/HUD/motion/audio direction → create target coverage and signature moments → state failure examples → approve before asset engineering | `ART_DIRECTION.md`, `VISUAL_TARGETS.md`, coverage requirements, signature moments, failure examples, approval boundary | **Established** as a source-documented workflow. **Claimed/unverified** effectiveness; the source was very new and tightly coupled to its own larger pipeline | `docs/objectives/skill-research/art-content-pipeline.md`, “Art-direction and generation shortlist”; [game-art-direction](https://github.com/worldwonderer/novel-to-game/blob/main/skills/game-art-direction/SKILL.md) | `game-art-direction`, `visual-target-board`, `reference-rights-review`, `target-coverage-review`, `art-direction-gate` | **Initial library candidate** if the document preserves the author’s actual artifact names and identifies portability as an inference |
| Art-bible to asset-spec handoff | Create a nine-section art bible → run parallel art, technical, and UX reviews → pass approval gates → produce asset inventory/specification and manifest | `design/art/art-bible.md`, review outputs, approval state, asset inventory and manifest | **Established** as documented in inspected public source. **Unverified** in production; its very large parent repository is new and popularity is not quality evidence | `docs/objectives/skill-research/art-content-pipeline.md`; [Claude Code Game Studios](https://github.com/Donchitos/Claude-Code-Game-Studios), [art-bible registry entry](https://skills.sh/donchitos/claude-code-game-studios/art-bible) | `art-bible`, `technical-art-review`, `game-ux-art-review`, `asset-specification`, `asset-manifest` | **Candidate with caution.** It may be a source-specific variant of the art-direction pipeline rather than a separate general pipeline |
| Deterministic stylized 3D asset validation | Run deterministic builders → record profile/manifests → validate collision/navigation → capture off-desktop multi-angle renders → run separate traversal/NavMesh checks → record p95 performance evidence | Builder output, manifests, collision/navigation probes, multi-angle captures, traversal/NavMesh results, p95 measurements | **Established** as an inspectable source workflow. **Weak use evidence:** approximately 13 stars, three commits, and a July 2026 creation date in the corpus snapshot | `docs/objectives/skill-research/art-content-pipeline.md`, “Art-direction and generation shortlist” and “Environments”; [godot-create-3d-assets](https://github.com/LuigiDeFacci/godot-create-3d-assets) | `deterministic-asset-builder`, `asset-manifest`, `collision-probe`, `navigation-probe`, `offscreen-turntable-capture`, `asset-performance-check` | **Lead, not initial established library.** Strong pipeline evidence, weak maturity, and Godot-specific implementation |
| Human playtest planning | Define research question → choose method → define participant plan → write moderator script → define observation tags and telemetry → predeclare decision rules | Research plan, participant plan, moderator script, observation scheme, telemetry plan, decision rules | **Established** as required outputs in the inspected LVTD skill. **Weak use evidence:** one-star repository, no behavioral evals, and some key support comes from a commercial book not inspectable in the repository | `docs/objectives/skill-research/game-design-ux.md`, “LVTD game-design skills”; [game-playtest-planning](https://github.com/LVTD-LLC/skills/blob/dd65cf333e2b58db66c898572d0e8a7df97d16f7/skills/game-playtest-planning/SKILL.md) | `playtest-question-design`, `participant-plan`, `moderator-script`, `observation-coding`, `playtest-consent-and-retention`, `decision-rule-design` | **Lead.** The pipeline should be validated against professional games-user-research sources before admission |
| Playtest-report and balance fix/recheck | Record session metadata and first-five-minute observations → categorize findings → route actions to responsible roles → run combat/economy/progression/loot balance checks → fix → recheck | Playtest report, categorized findings, routed action list, balance report, recheck result | **Established** as source-defined workflow scaffolding. **Unverified** as research validity or balance effectiveness | `docs/objectives/skill-research/game-design-ux.md`, “Claude Code Game Studios”; [playtest-report](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/984023ddac0d5e27624f2baacde6105e45de375f/.claude/skills/playtest-report/SKILL.md), [balance-check](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/984023ddac0d5e27624f2baacde6105e45de375f/.claude/skills/balance-check/SKILL.md) | `playtest-report`, `finding-router`, `balance-review`, `economy-review`, `fix-recheck-loop` | **Lead.** Reporting structure is credible; research method and balance policy need separate validation |
| Backtracking multi-review game workflow | Separate simulated player-experience review, playtest-protocol design, UX review, game-feel pass, and balance review → route downstream design defects backward to the responsible earlier stage | Session artifacts, separate review outputs, explicit backward routes | **Established** as a documented workflow in the inspected `gstack-game` bundle. **Claimed/unverifiable:** unsupported precision and benchmark language. Simulated-player narration is not player evidence | `docs/objectives/skill-research/game-design-ux.md`, “gstack-game”; [registry entry](https://skills.sh/fagemx/gstack-game/gstack-game) | `review-router`, `playtest-plan`, `ux-review`, `game-feel-pass`, `balance-review`, `design-defect-backtrack` | **Research lead only.** Preserve the backtracking structure; reject simulated-player claims and home-directory telemetry defaults |
| Three.js QA-to-release workflow | Deterministic canvas inspection → desktop/mobile evidence → decide whether bot playtesting is needed → production preview → decide whether a visual harness is needed → bundle/base-path review → risk report | Canvas evidence, platform captures, bot-playtest decision, preview, visual-harness decision, bundle review, release risk report | **Established** according to the local report’s source inspection. **Unverified** independently; source-specific scripts and thresholds were not run | `docs/objectives/skill-research/production-qa.md`, “Skills.sh discovery results”; [threejs-qa-release](https://skills.sh/majidmanzarpour/threejs-game-skills/threejs-qa-release), [source repository](https://github.com/majidmanzarpour/threejs-game-skills) | `deterministic-game-capture`, `responsive-game-check`, `bot-playtest-decision`, `production-preview`, `visual-regression-decision`, `bundle-release-review` | **Initial candidate after source refresh.** General structure is portable, but Three.js-specific steps belong in a variant |
| Unity compile/play/capture proof loop | Compile and inspect logs → run tests → enter Play mode → simulate or replay input → capture Game view → inspect runtime state → collect profiler evidence → report changes or roll back | Compile log, tests, input recording/replay, screenshot, runtime state, profiler/memory evidence, changed-file list, rollback | **Established** as capabilities and recommended loop in the inspected Unity CLI Loop source. **Claimed/unverified** reliability; the prior report did not run it | `docs/objectives/skill-research/unity.md`, “Unity CLI Loop”; [unity-cli-loop](https://github.com/hatayama/unity-cli-loop) | `compile-test-loop`, `input-record-replay`, `runtime-state-check`, `game-view-capture`, `performance-evidence`, `change-journal`, `rollback` | **Discipline-level lead.** Useful as an engine-specific variant of a broader implementation proof loop |
| Structured Unreal multi-agent generation and playtest | Decompose scene/art from gameplay/interaction → retrieve tool documentation → prepare structured specifications for scene generation, gameplay code, and interactive objects → integrate → automated playtest | Structured specifications, generated scene/code/interactions, dependency declarations, playtest results | **Established** as a method reported in the AutoUE preprint. **Claimed with bounded study evidence:** only 20 benchmark tasks and substantial LLM-judge evaluation | `docs/objectives/skill-research/unreal-vibeue.md`, “Execution protocol”; [AutoUE paper](https://arxiv.org/abs/2603.07106) | `brief-decomposition`, `tool-document-retrieval`, `structured-change-packet`, `dependency-check`, `serialized-editor-integration`, `automated-playtest` | **Research lead.** It is the corpus’s clearest research pipeline, but its limited benchmark and Unreal coupling prevent general effectiveness claims |

### Processes present only as Antiky house recommendations

The following are useful pipeline hypotheses, but the local corpus does not establish that a public author uses these exact combined flows:

1. `gameplay brief → reference dossier → art bible + targets → asset contract → source asset → deterministic export → validation → engine import/reimport → captures → runtime/performance report → independent approval → publish`
2. `creative target → bounded playable slice → Antiky systems → BroMetal rendering → replay/inspection/capture → independent design/presentation/performance judgment → ship`
3. `change/PR → validation → tests → build manifest → nightly builds → target-device lanes → release candidate → provenance/signing/certification → human go/no-go → staged rollout/rollback`
4. The three-to-five-role “production cell” with producer, designer/art director, implementer, QA, and independent reviewer
5. The rendering specialist handoff from visual brief through shader/material/VFX work, engine integration, GPU diagnostics, visual QA, and human art-direction approval
6. The eight-stage Antiky vertical-slice handoff from experience brief through specialist specs, implementation, deterministic QA, human playtests, synthesis, trust/accessibility gates, and human acceptance

These appear in:

- `docs/objectives/skill-research/art-content-pipeline.md`
- `docs/objectives/skill-research/recommended-library.md`
- `docs/objectives/skill-research/production-qa.md`
- `docs/objectives/skill-research/rendering-shaders-materials.md`
- `docs/objectives/skill-research/orchestration-and-library-design.md`
- `docs/objectives/skill-research/game-design-ux.md`

They should be labeled **inferred / Antiky house recommendation** if retained as future comparison baselines.

---

## 2. Evidence sufficient to distinguish practice from checklist, promotion, or demo

### Strongest local evidence

The strongest candidates have explicit order, named artifacts, observable gates, and inspectable source:

- OpenAI automated browser-game QA
- `awesome-gamedev-agent-skills` level blockout
- `worldwonderer/novel-to-game` art direction and visual targets
- `threejs-qa-release`
- Unity CLI Loop’s compile/play/capture cycle
- AutoUE’s structured multi-agent research method

Even these are evidence of a documented process, not proof of production effectiveness.

### Moderate evidence

- Claude Code Game Studios has explicit ownership, “must not do” boundaries, artifact routing, and fix/recheck loops. Its large role and skill count demonstrates breadth, but not that 49 agents improve delivery.
- `godot-create-3d-assets` has unusually concrete validation artifacts but almost no maturity history.
- LVTD defines disciplined artifacts but has negligible adoption and no behavioral evaluation.

### Weak evidence or checklist-only

The corpus explicitly rejects the following as proof:

- Stars, installs, forks, or a popular parent monorepo
- Structural skill-package tests
- A project’s own demo
- A screenshot without motion/runtime context
- “Production-ready” generative-art language
- Generic art, sound, producer, or “game developer” mega-skills
- Simulated-player role-play
- Hard-coded universal budgets or retention figures
- A green compile/export as proof of quality
- Tool inventories without an ordered flow

---

## 3. Reusable taxonomy of stages, artifacts, gates, loops, roles, and failures

### Pipeline scope

| Scope | Meaning | Corpus examples |
|---|---|---|
| End-to-end slice | Intent through integrated playable evidence | AutoUE; Antiky house vertical-slice pipeline |
| Discipline pipeline | One game-development discipline with an internal loop | Level blockout, art direction, playtest planning |
| Asset pipeline | Source asset through engine/runtime approval | `godot-create-3d-assets`; Antiky house content pipeline |
| Verification pipeline | Existing build through reproducible findings | OpenAI game playtest, Unity CLI Loop, Three.js QA/release |
| Release pipeline | Approved change through distributed build and rollback | Antiky house build/release flow, supported by official engine mechanics |
| Orchestration protocol | Multiple owners exchanging bounded artifacts | AutoUE; Claude Code Game Studios; gstack backtracking |

### Recurring stage verbs

1. Frame the intent or question.
2. Inspect current project/tool state.
3. Declare constraints, target, and acceptance.
4. Produce a bounded artifact or change packet.
5. Mutate through one named owner.
6. Build/import/compile.
7. Read back persisted state.
8. Run deterministic or scripted runtime scenarios.
9. Capture state, motion, visual, and performance evidence.
10. Review independently.
11. Route defects backward.
12. Approve, reject, revise, or roll back.
13. Package or publish only the accepted revision.

No one source contains this entire sequence. It is an **inferred taxonomy** from recurring source fragments.

### Recurring artifact classes

- Intent: experience brief, art direction, visual target, research question
- Contract: mechanic spec, asset spec, change packet, input scenario, acceptance checklist
- Production: blockout, source asset, generated code, imported scene, build
- Identity/provenance: commit, tool version, asset manifest, hashes, license record
- Runtime evidence: state trace, input replay, log, screenshot, video, profiler capture
- Review: defect report, playtest report, balance report, accessibility finding
- Decision: gate verdict, approval, rejection delta, rollback record

### Recurring gates

- Brief/target approval before production
- Exclusive mutation ownership
- Compile/import/build success
- Reload/readback after mutation
- Scripted runtime behavior
- Collision/navigation/traversal validation
- Deterministic visual capture
- Target-device performance evidence
- Independent review
- Human approval for taste, player value, release, credentials, and production mutation

### Recurring feedback loops

- Implement → compile/test → inspect failure → revise
- Blockout → traverse/play → find path or teaching defect → revise
- Change → read back persisted state → reject stale or incomplete mutation
- Capture → compare with target → adjust presentation → recapture
- Human session → code observations → synthesize → change hypothesis → retest
- Downstream review → classify defect ownership → route backward to the responsible stage
- Release → health gate → pause or rollback

### Recurring role boundaries

- Intent owner: product, game design, or art direction
- Producer/router: scope, dependencies, decisions, gate state
- Specialist author: code, scene, asset, shader, UX, audio
- Exclusive editor/integration operator
- QA/runtime observer
- Performance or GPU diagnostician
- Human playtest researcher
- Independent reviewer
- Human approver

The corpus repeatedly favors artifact ownership over persona imitation.

### Recurring failure paths

- Missing or ambiguous brief → stop before production
- Wrong project/editor/session/revision → block mutation
- Shared binary or live editor conflict → serialize or isolate worktrees
- Compile/import/reload failure → do not continue to runtime claims
- Runtime state differs from claimed result → reopen implementation
- Visual polish obscures weak mechanics → route back to design
- Screenshot passes but motion/performance fails → keep gate open
- Automated QA passes but human comprehension/fun is unknown → require player research
- Provenance or rights are ambiguous → block import/publish
- Performance evidence lacks device/scenario/build identity → reject the measurement
- Release health degrades → pause or roll back
- Source claim cannot be verified → retain it as a labeled lead

---

## 4. Portable agent skills that can support the pipelines

The following skill families recur across candidates without requiring one engine:

| Skill family | Portable responsibility |
|---|---|
| `experience-brief` | State player, experience promise, verbs, risky question, non-goals, and rejection criteria |
| `acceptance-contract` | Turn intent into observable acceptance and refusal conditions |
| `project-state-inspection` | Verify project, revision, tool version, dirty state, and active session before mutation |
| `bounded-change-packet` | Declare targets, prerequisites, forbidden changes, rollback, and required evidence |
| `single-writer-coordination` | Lease shared editor/session/binary artifacts and route isolated parallel preparation |
| `compile-import-build-proof` | Run the project’s authoritative transformation and preserve machine-readable evidence |
| `persisted-state-readback` | Reload or re-query changed state before claiming success |
| `deterministic-runtime-scenario` | Run seeded inputs with expected checkpoints |
| `game-surface-capture` | Capture only game/viewport output with reproducible metadata |
| `performance-evidence` | Bind measurement to exact build, device, scenario, and trace |
| `visual-target-review` | Compare gameplay-camera evidence against an approved visual target |
| `human-playtest-research` | Plan, consent, observe, code, synthesize, and preserve dissent |
| `finding-router` | Assign a discovered defect to the stage and artifact that owns it |
| `asset-provenance` | Record source, rights, transformations, hashes, and restrictions |
| `independent-gate-review` | Review without mutating or self-approving |
| `rollback-and-recovery` | Restore the prior accepted artifact and verify compatibility |

These are **inferred skill boundaries**. Their presence in this table does not claim equivalent public skills already exist.

---

## 5. Additional targets beyond `targets.md`

The local corpus supplies a strong source graph for future web discovery.

### Highest-priority pipeline sources

1. [OpenAI game-studio skills](https://github.com/openai/plugins/tree/main/plugins/game-studio) — runtime QA, game UI, and web-game foundation workflows.
2. [worldwonderer/novel-to-game](https://github.com/worldwonderer/novel-to-game) — art direction, visual targets, and larger pipeline coupling.
3. [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) — artifact handoffs, playtest reporting, balance fix/recheck, art-bible review, and role boundaries.
4. [LVTD-LLC/skills](https://github.com/LVTD-LLC/skills) — playtest planning, player-experience models, balance, interface feedback, and responsibility review.
5. [fagemx/gstack-game](https://skills.sh/fagemx/gstack-game/gstack-game) — explicit backward routing and separation of review jobs; telemetry and unsupported claims require scrutiny.
6. [majidmanzarpour/threejs-game-skills](https://github.com/majidmanzarpour/threejs-game-skills) — QA-to-release pipeline.
7. [LuigiDeFacci/godot-create-3d-assets](https://github.com/LuigiDeFacci/godot-create-3d-assets) — deterministic asset validation.
8. [hatayama/unity-cli-loop](https://github.com/hatayama/unity-cli-loop) — closed compile/play/capture loop.
9. [AutoUE](https://arxiv.org/abs/2603.07106) — structured multi-agent Unreal workflow with reported ablations.
10. [GameDevBench](https://github.com/waynchi/gamedevbench) and [GameCraft-Bench](https://github.com/FreedomIntelligence/gamecraft-bench) — replayable tasks, visual feedback, complete-project fixtures, and hidden evaluation.

### Professional practice and discipline sources

- [Games User Research](https://gamesuserresearch.com/how-to-run-a-games-user-research-playtest/) for human playtest method, consent, pilots, and method selection
- [Xbox Accessibility Guidelines](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines)
- [Gaming and Disability Player Experience Guide](https://learn.microsoft.com/en-us/xbox/accessibility/gadpeg)
- [AbleGamers Accessible Player Experiences](https://accessible.games/accessible-player-experiences/)
- [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/full-list/)
- Epic, Unity, and Godot first-party build, testing, import, localization, and profiling documentation
- Khronos and ASWF projects for glTF, shader, and MaterialX production workflows
- RenderDoc, NVIDIA FLIP, OpenImageIO, and engine visual-test systems for reproducible rendering evidence

These should be monitored for authored processes, postmortems, worked examples, and failure reports—not merely tool features.

---

## 6. Keeping a five-minute pipeline faithful to its authors

A concise pipeline document can remain faithful if it uses a strict separation:

1. **Author-stated core flow** — only stages explicitly present in the source.
2. **Author-stated artifacts and gates** — use the source’s own artifact names where practical.
3. **Source-specific variant** — retain engine, framework, or repository mechanics that materially affect the flow.
4. **Evidence box** — provenance, snapshot date, use evidence, independent validation, and limitations.
5. **Supporting skills** — explicitly label these as Antiky’s inferred decomposition unless the source itself names them.
6. **Omissions** — state what the source does not specify rather than filling gaps.

Recommended Mermaid constraint:

- Five to nine primary nodes
- One visible backward edge for the principal feedback loop
- Gates shown as decisions only when the source actually specifies them
- Artifact names attached to transitions or short sublabels
- Failure routes shown when they change ownership or stop the pipeline

A pipeline should not be made “complete” by silently adding research, QA, human approval, release, or provenance stages. Those can appear in a clearly labeled “possible composition” section, not in the author-stated diagram.

---

## 7. Credible initial library versus leads

### Credible for initial pipeline drafting

These have enough local pipeline evidence to justify a source-faithful first draft, though not an effectiveness claim:

1. Automated browser-game runtime QA
2. Level blockout and teach-test
3. Art direction and visual-target approval
4. Three.js QA-to-release, after refreshing its source and history
5. Unity compile/play/capture proof loop as an engine-specific variant of a general implementation-verification loop
6. AutoUE structured generation/playtest as a research pipeline with its limited-study caveat

### Keep as leads pending validation

- `godot-create-3d-assets`: strong mechanics, insufficient history
- LVTD human playtest planning: good artifact contract, negligible maturity and incomplete inspectable foundation
- Claude Code Game Studios art-bible and playtest/balance flows: strong structure, very large and new source
- gstack backtracking workflow: useful routing idea mixed with telemetry and unsupported quantitative claims
- PlayableIntelligence/Opus Game Labs: reusable QA mechanics, but its visual workflow deliberately avoids gameplay changes and can decorate a weak game
- Generic production, release, content, and rendering pipelines from the Antiky corpus: house syntheses, not public-source candidates

---

## Explicit gaps

1. No mature verified source spans concept/reference → art direction → content production → engine import → runtime visual/performance QA.
2. No public candidate in the corpus has strong independent validation that its pipeline improves shipped game outcomes.
3. Human playtesting, accessibility, telemetry ethics, onboarding, localization/LQA, technical audio, rigging/retargeting, certification, and live operations remain weakly represented by agent pipelines.
4. Most public repositories validate packaging or syntax rather than behavior.
5. Public workflows rarely preserve provenance, rights, privacy, build identity, and rollback together.
6. Visual review commonly stops at a static screenshot.
7. Simulated player personas are sometimes presented adjacent to real playtesting without a sufficiently hard evidence boundary.
8. Cross-engine portability has not been demonstrated. It is usually an Antiky inference from analogous engine-specific loops.
9. The reports identify source URLs but do not always pin them to immutable commits.
10. The reports do not contain longitudinal evidence of repeated shipped-game use for most candidates.
11. Audio has no credible end-to-end rights → authoring → middleware → runtime → mix-validation pipeline.
12. No robust cross-engine material-equivalence validation process was found.
13. No common capability-negotiation contract exists across editor bridges.
14. Generic numeric budgets and timing recipes lack game-, platform-, and hardware-specific provenance.

---

## Contradictions and tensions that must remain visible

1. **Automated “playtest” versus human playtest:** OpenAI and browser QA workflows produce runtime evidence, but they do not establish enjoyment, comprehension, fairness, or return intent. The documents should call them automated runtime QA.
2. **Parallel agents versus shared editor safety:** Several sources advertise multi-agent work, while Unity, Unreal, Godot, and Antiky synthesis repeatedly require one live editor/session writer. The defensible synthesis is parallel preparation with serialized mutation, but that is an inference unless the source states it.
3. **Visual polish versus game design:** PlayableIntelligence’s design workflow explicitly adds effects while avoiding gameplay change. The broader corpus says this is a failure mode, not a quality pipeline.
4. **Large virtual studios versus small production cells:** Claude Code Game Studios defines 49 roles; Antiky recommends three to five active roles. The corpus supports borrowing boundaries, not the headcount.
5. **Static screenshot versus visual approval:** Some public workflows emphasize screenshots; the corpus insists that motion, runtime state, performance, target frames, and independent review are separate gates.
6. **Generic budgets versus measured targets:** Community skills contain fixed timings, dimensions, and ratios; the corpus recommends project- and platform-specific tuning backed by measurement.
7. **MCP convenience versus deterministic authority:** Editor bridges enable rich interaction, but the corpus repeatedly prefers first-party CLI/headless paths for repeatable import, test, build, and export authority.
8. **Popularity versus maturity:** Several very new repositories have large star or install counts. The corpus explicitly treats these as discovery signals only.
9. **PlayableIntelligence source availability conflict:** `game-design-ux.md` says it inspected `PlayableIntelligence/game-creator` at commit `4e64b83b…`; `production-qa.md` says the `opusgamelabs/game-creator` GitHub API endpoint returned not found at research time. This may reflect an owner/name change, disappearance, or two different repositories. It requires external resolution.
10. **Registry-count inconsistency:** `game-design-ux.md` records about 1.4K installs for `game-ui-ux`, while `art-content-pipeline.md` records about 847, despite both carrying the same snapshot date. Install counts must not be used without a fresh dated query.
11. **“Verified” does not mean executed:** Across the corpus, verified often means source-inspected or documented. No external skills, bridges, or engines were installed or run.
12. **Source fidelity versus portable abstraction:** Removing engine details can make a diagram readable and reusable, but can also erase the barriers—domain reload, asset serialization, editor game-thread constraints, import state—that make the original workflow real. Each generalized pipeline needs a source-specific variant note.

---

## Headline conclusion

The local corpus is sufficient to seed a small pipeline library, but not to claim that it has identified proven universal AI game-development processes. Its best evidence supports narrow, observable loops: define a target, produce a bounded artifact, serialize mutation, read back state, run the game, capture evidence, route defects backward, and require independent or human judgment where automation cannot establish quality.

The initial documents should begin with automated runtime QA, level blockout, art direction, QA-to-release, and compile/play/capture loops. End-to-end production, content, release, and multi-agent studio pipelines should remain explicitly labeled Antiky hypotheses until independent web research finds authors who actually use and document those exact flows.
