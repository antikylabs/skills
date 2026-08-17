# Deferred pipeline follow-up

## Frozen selection manifest

This manifest was frozen on 2026-08-17 at Antiky commit
`d741b955db9f7e24c27cdcf3ca0f5d05b448e8b4`, before any Goal 80 pipeline page was drafted. It
consumes the reconciled ranking in the [Goal 07 audit](12-library-audit-and-continuation.md#ranked-goal-80-candidate-queue).
Selection is not admission: every row must survive source refresh and all six admission gates before
its filename may be created.

The manifest takes ranks 1–5 and 7. Goal 07 rank 6, Sea Park GLB fauna replacement and audit, is
stronger than rank 7 in isolation but would be a third proposed page from `Pearl-Sea-Park`. The
two-pages-per-source bound therefore leaves it as explicit overflow and advances the next eligible
source-specific candidate. No later rejection permits a replacement.

| Order | Candidate | Source target and frozen artifact | Parent harvest | Exact proposed filename | Expected evidence | Reject if |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Sea Park simulation-first ride geometry correction | [`Pearl-Sea-Park@888fc57` geometry audit](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/scripts/audit-geometry.mjs) | [Goal 04 candidate ledger](09-recursive-wave-01-outcome.md#candidate-ledger) | `docs/pipelines/pipeline-pearl-sea-park-simulation-first-ride-geometry-correction.md` | Shared integrator, fixed-tick simulations, numeric route scans, owner sightings, correction record, stronger regression gate | The route is only a constituent check in the staged-build page, has no independent trigger/output, or requires invented ordering |
| 2 | Sea Park measured performance recovery | [`Pearl-Sea-Park@888fc57` opening-day record](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/opening-day.md) | [Goal 04 candidate ledger](09-recursive-wave-01-outcome.md#candidate-ledger) and Goal 07's consolidated performance family | `docs/pipelines/pipeline-pearl-sea-park-measured-performance-recovery.md` | Repeated measurement, bottleneck isolation, one bounded correction, same-condition remeasurement, keep/revert or stop evidence | The records are unrelated fixes rather than one source-stated loop, or the flow duplicates visual validation or the staged-build gate |
| 3 | Unity build and runtime validation | [`gamedev-skills@9ca5296` Unity build skill](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md) | [Goal 02 deferred ledger](07-gamedev-skills-harvest.md#additional-coherent-candidates-deferred) | `docs/pipelines/pipeline-gamedev-skills-unity-build-runtime-validation.md` | Scene list, platform/backend decisions, build script, `BuildReport`, CI exit gate, player/runtime smoke result, repair path | The source is only an API/configuration recipe, lacks an operative agent feedback path, or duplicates Unreal packaging without a source-specific contribution |
| 4 | Godot export and runtime validation | [`gamedev-skills@9ca5296` Godot export skill](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md) | [Goal 02 deferred ledger](07-gamedev-skills-harvest.md#additional-coherent-candidates-deferred) | `docs/pipelines/pipeline-gamedev-skills-godot-export-runtime-validation.md` | Version-matched templates, export presets, platform branch, artifact, export failure evidence, target runtime smoke gate | The source stops at command syntax, lacks a source-stated repair/stop path, or relies on the rejected Butler plugin to manufacture AI scope |
| 5 | Three.js gameplay-relationship bench | [`thrixel/goal-to-game@db2fd7d` worked feel test](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs) | [Goal 01 deferred ledger](06-thrixel-harvest.md#candidate-disposition) | `docs/pipelines/pipeline-thrixel-threejs-gameplay-relationship-bench.md` | Agent method, deterministic real-input driver, named relationship assertions, failure evidence, correction/retest path, honest stop | The example is an isolated test without a source-stated agent loop, depends on the unnamed reference project, or is a constituent of the published Goal to Game page |
| 6 | Unity imported-asset inspection and play-mode validation | [`thrixel/goal-to-game@db2fd7d` Unity method](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md) | [Goal 01 deferred ledger](06-thrixel-harvest.md#candidate-disposition) | `docs/pipelines/pipeline-thrixel-unity-imported-asset-validation.md` | Initial-download inspection, multi-angle captures, running-game/play-mode checks, explicit defect classes, revision/reinspection path | The loop is inseparable from Goal to Game, duplicates game-asset production, or has no independent output and stop |

### Manifest bounds

| Bound | Frozen value |
| --- | --- |
| Selected candidates | 6 |
| Proposed pages | 6 |
| `Pearl-Sea-Park` pages | 2 |
| `awesome-gamedev-agent-skills` pages | 2 |
| `thrixel/goal-to-game` pages | 2 |
| Other source targets | 0 |
| Replacement policy | None; a rejected row produces no substitute |
| Page state at freeze | All six proposed paths absent |
| Target queue state at freeze | 29 URL bullets, 29 unique; blob `b9df10e4aa8a6394b396da7d0e9a921d392699df` |

## Failing baseline

Before this file existed, an assertion for
`docs/objectives/skill-process/research/13-deferred-pipeline-follow-up.md` failed with exit 1. The
library contained 11 active pages and 11 index rows; the aggregate pipeline-library hash was
`df2a67b67a8c9152d5b2bfcc3db69c709bed8e75cd68212a6988d12491caf2fb`. This records the missing
deliverable before implementation rather than treating prior Goal 07 checks as Goal 80 evidence.

Source refresh, the complete Scott candidate ledger, selected-candidate admission, and any
source-to-diagram mappings follow this frozen manifest. This manifest does not authorize a new
candidate, a seventh filename, a third page from one source, or a replacement after rejection.

## Source refresh

All four repositories were refreshed from their canonical remotes on 2026-08-17. Each remote head
still equals the revision recorded by the parent harvest; there is no source drift between selection
and admission.

| Target | Refreshed revision and history | Authorship | License and reuse boundary |
| --- | --- | --- | --- |
| [`scottstts/Pearl-Sea-Park`](https://github.com/scottstts/Pearl-Sea-Park) | [`888fc57b817514049b5fb33b0a3e115b585de067`](https://github.com/scottstts/Pearl-Sea-Park/tree/888fc57b817514049b5fb33b0a3e115b585de067); 61 commits, 2026-07-09 through 2026-07-25 | `scott`; path history records the July 12–14 ride and performance corrections | No `LICENSE`, `COPYING`, or `NOTICE` file. Citation grants no reuse right for code, game content, audio, or models. |
| [`gamedev-skills/awesome-gamedev-agent-skills`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills) | [`9ca5296b219049c5b68494e1f3c274ead6d727b3`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/9ca5296b219049c5b68494e1f3c274ead6d727b3); selected paths introduced 2026-06-24 and last changed 2026-08-08 | Unity path introduced by Abhishek Barali; Godot path introduced by AbhishekBarali1; both last changed by Ishan Gautam | Repository text and code are Apache-2.0 with a [`NOTICE`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/NOTICE). Unity, Godot, platform tools, SDKs, and linked documentation retain separate terms. |
| [`thrixel/goal-to-game`](https://github.com/thrixel/goal-to-game) | [`db2fd7dc7260f1bb973903b9c0c943ecd2111ac9`](https://github.com/thrixel/goal-to-game/tree/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9); selected engine paths entered in Sining's 2026-08-12 plugin commit; head revised 2026-08-15 | Sining; six-commit repository history also names Rana Hanocka | Repository is Apache-2.0. Thrixel is a proprietary service; generated-asset rights, account limits, Unity, and third-party packages are not licensed by the repository. |
| [`scottstts/Threejs-Awesome-Graphics-Agent-Skills`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills) | [`98453747cc0678f6a5d910f38d7483596a5f9a40`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/tree/98453747cc0678f6a5d910f38d7483596a5f9a40), package `0.8.0`; 70 commits, 2026-06-19 through 2026-08-15 | Scott Sun; all commits recorded under `scott` | Root skill text is MIT. The package declares `MIT AND GPL-3.0-only`; GPL-derived examples and third-party assets retain the separate boundaries in the [notices](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/source_materials/THIRD_PARTY_NOTICES.md). |

### Inspected artifacts and execution boundary

| Target | Complete relevant inspection |
| --- | --- |
| Pearl Sea Park | [Agent contract](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/.codex/AGENTS.md), [plan and gates](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/plan.md#L193-L221), [lesson ledger](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md), [opening-day record](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/opening-day.md), [Torrent record](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/ride-torrent.md), geometry runner plus the Torrent/route audits it invokes, performance monitor, auto-quality controller, package scripts, and path history |
| Game-dev skills | Root README, `LICENSE`, `NOTICE`, full [Unity skill](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md) and [CI reference](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/references/ci-build-script.md), full [Godot skill](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md) and [preset/CLI reference](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/references/presets-and-cli.md), and path history |
| Thrixel | Root README and `LICENSE`; full shared skill; [Three.js method](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/threejs.md), [review process](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/PROCESS.md), worked feel bench, harness/input/self-test helpers, full [Unity branch](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md), and path history |
| Scott Three.js | Root README, package manifest, `LICENSE`, maintainer instructions, router, every one of the 21 atomic `SKILL.md` files, their linked-reference inventory, example inventory, source-material README, trace/coverage/example/routing ledgers, third-party notices, pack validator, routing and reference tests, gallery contract, capture script, and path history |

The repositories were inspected as untrusted text and Git history from temporary clones. No target
skill, example, game, dependency, build, engine, paid service, validation script, or runtime was
installed or executed. Structural test code was read only. No mutable engine claim was promoted
beyond the source's named version.

## Complete candidate ledger

### Frozen corpus selection and overflow

| Candidate | Trigger and outcome | Disposition | Exact reason |
| --- | --- | --- | --- |
| Sea Park simulation-first ride geometry correction | A new or reported ride-route defect; corrected route plus stronger numeric regression contract | **Admit** | Multiple practiced corrections preserve a shared simulate → scan → correct authoring → strengthen audit → reinspect loop distinct from the parent stage coordinator. |
| Sea Park measured performance recovery | A reproduced hitch or image/performance defect; retained measured correction and telemetry | **Admit** | The source repeatedly records instrumentation, attribution, bounded changes or reversions, and same-scenario remeasurement. |
| Unity build and runtime validation | A Unity project needs a player/CI build; runnable player plus build evidence | **Admit** | The agent skill states scene, target, backend, build-report, exit-code, and actual-player gates; failure classes identify the return point. |
| Godot export and runtime validation | A Godot project needs a distributable target build; preset, artifact, and runtime result | **Admit** | The agent skill states version-matched prerequisites, preset, platform branch, export failure, and target smoke gates. |
| Three.js gameplay-relationship bench | A runtime relationship is not proved by screenshots or magnitude-only smoke; numeric table and exit result | **Admit** | The checked-in bench drives the real input path under lockstep, compares independent runtime quantities, fails visibly, and fits the repository's measured owner/fix/retest loop. |
| Unity imported-asset inspection and play-mode validation | Every Thrixel asset downloaded for Unity; accepted imported asset plus scene/play-mode evidence | **Admit** | It has an independent per-asset trigger, initial and running-game gates, named defects, and correction/regeneration path. The existing Goal-to-Game page preserves only the parent handoff, not this two-gate method. |
| Sea Park GLB fauna replacement and audit | Authored fauna replaces a procedural stand-in; behavior-parity asset with offline/runtime evidence | **Defer** | Later bound: rank 6 would be a third Sea Park page, exceeding the frozen two-pages-per-source limit. It remains first explicit overflow and was not eligible as a replacement. |

### Scott Three.js reconsideration

The refreshed router still lists 23 atomic routes; two are already published (`threejs-image-pipeline`
and `threejs-visual-validation`). The following table accounts for the three named Goal 00 candidates
and every other routed atomic module individually. No module was grouped away.

| Goal 00 candidate | Refreshed disposition | Exact criterion or later bound |
| --- | --- | --- |
| New procedural-scene orchestration | **Reject** | Goal 80 excludes router/catalog pages. The source's principal artifact is skill selection; its nine-step order has no source-stated repair branch or independent project output outside the routed skills. |
| Skill-pack source distillation | **Reject** | Scope policy fails: the maintainer's clone → assess → approve → compare → publish-readiness flow authors agent skills, not an AI-assisted game-development artifact. |
| Deterministic gallery capture | **Duplicate** | Its paused capture, diagnostics, runtime-error, and regression evidence are constituent support already preserved by [`pipeline-threejs-visual-system-validation.md`](../../../pipelines/pipeline-threejs-visual-system-validation.md). |
| `threejs-camera-direction` | **Defer** | Outside the frozen manifest; a later goal must audit the linked camera contract and examples before mapping its build order and transition gates. |
| `threejs-procedural-animation` | **Defer** | Outside the frozen manifest; its phase/frame/kinematics order is plausible, but the linked motion reference and examples still need an individual evidence map. |
| `threejs-procedural-fields` | **Defer** | Outside the frozen manifest; its seven-step shared-field workflow needs a later reference/example parity and feedback audit. |
| `threejs-procedural-materials` | **Defer** | Outside the frozen manifest; the material graph spans several optical implementations that need separate trigger and acceptance-boundary analysis. |
| `threejs-parallax-occlusion-mapping` | **Defer** | Outside the frozen manifest; the relief build order and failure list require a later audit of the silhouette-relief contract and implementation. |
| `threejs-procedural-geometry` | **Defer** | Outside the frozen manifest; the eight-step craft loop is coherent, but its large quality kit and object-specific gates need a bounded dedicated harvest. |
| `threejs-procedural-vegetation` | **Defer** | Outside the frozen manifest; its growth sequence covers trees, grass, flowers, and ivy, so a later audit must prove a single trigger/output rather than a subject family. |
| `threejs-procedural-architecture` | **Defer** | Outside the frozen manifest; its plan-to-mesh compiler and acceptance views need individual example and feedback mapping. |
| `threejs-procedural-planets` | **Defer** | Outside the frozen manifest; its eight-step body build and completion tests need the linked field/atmosphere evidence audited together. |
| `threejs-atmosphere-aerial-perspective` | **Defer** | Outside the frozen manifest; the tier choice and required outputs are coherent, but the linked system contract must supply a project-level feedback path. |
| `threejs-volumetric-clouds` | **Defer** | Outside the frozen manifest; the seven-step system order and failures need reference/example mapping and a source-supported retry or stop. |
| `threejs-spectral-ocean` | **Defer** | Outside the frozen manifest; its ten-step build and non-negotiable gates are strong but require a dedicated audit of multiple backend and camera-medium branches. |
| `threejs-water-optics` | **Defer** | Outside the frozen manifest; analytic and bounded-pool variants need separate trigger/output analysis before one page can be justified. |
| `threejs-precipitation-surfaces` | **Defer** | Outside the frozen manifest; coupled event/surface order is plausible, but snow and rain variants plus GPL boundary need a dedicated audit. |
| `threejs-raymarched-space-effects` | **Defer** | Outside the frozen manifest; the numerical integration workflow needs its termination, approximation, and renderer-owned branches mapped from the references. |
| `threejs-procedural-vfx` | **Defer** | Outside the frozen manifest; the shared effect graph spans unrelated aurora, fluid, plasma, and projection implementations that need candidate splitting evidence. |
| `threejs-temporal-surfaces` | **Defer** | Outside the frozen manifest; persistent and procedural branches need separate artifact and acceptance mapping. |
| `threejs-shadow-systems` | **Defer** | Outside the frozen manifest; the cached-clipmap order and failures need a later audit of refresh-budget feedback and moving-caster boundaries. |
| `threejs-screen-space-ambient-occlusion` | **Defer** | Outside the frozen manifest; the six-step GTAO path needs reference-level artifact, diagnostic, and acceptance mapping. |
| `threejs-bloom` | **Defer** | Outside the frozen manifest; the seven-step HDR workflow needs the selective-ownership reference and feedback path audited. |
| `threejs-exposure-color-grading` | **Defer** | Outside the frozen manifest; the signal order is explicit, but the meter/adaptation reference must establish an operative acceptance loop rather than a recipe. |

Every Scott deferral names the frozen-manifest bound and the exact deeper evidence required later.
The refreshed skill files do expose ordered technical candidates; their presence as modules or their
worked examples do not by themselves authorize pages.

## Admission gate for the six selected candidates

| Candidate | 1. Order | 2. Artifacts/gate | 3. Author/date | 4. Concise diagram | 5. Distinctions | 6. Direct audit | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Sea Park ride geometry | Shared simulate, scan, correct, audit, inspect order | Speed profiles, clearance/curvature metrics, owner sightings, corrected routes | Scott; July 12–14 records; frozen/retrieved dates above | Nine nodes; no invented stage | Human sightings and numeric checks stay distinct; no-license boundary retained | Notes, system records, scripts, and code link directly | Admit |
| Sea Park performance | Reproduce, instrument, attribute, change/revert, remeasure | Hitch ring, timings, scripted circuit, retained/reverted fixes | Scott; July 12–14 records | Nine nodes; no invented stage | Source hypotheses, measurements, failed experiments, and limits remain distinct | Records and instrumentation link directly | Admit |
| Unity build/runtime | Seven-step core workflow | Scene list, build options/report, CI exit, player smoke | Abhishek Barali and Ishan Gautam; 2026-06-24/2026-08-08 | Nine nodes; retry connectors labeled inference | Unity-specific facts and inferred rebuild connector remain distinct | Frozen skill/reference links | Admit |
| Godot export/runtime | Six-step core workflow | Templates, preset, artifact/exit, target smoke | AbhishekBarali1 and Ishan Gautam; 2026-06-24/2026-08-08 | Nine nodes; retry connectors labeled inference | Platform rules and inferred re-export connector remain distinct | Frozen skill/reference links | Admit |
| Three.js relationship bench | Setup, drive, measure, report, gate, owner fix/retest | Lockstep cases, real input, numeric table, exit status | Sining; selected path 2026-08-12 | Nine nodes | Checked-in facts, unnamed reference-project claim, and generalization limit remain distinct | Frozen process, bench, input, and self-test links | Admit |
| Unity asset inspection | Group/download, initial inspect, import, playtest, runtime inspect | FBX, screenshots, defect classes, correction/regeneration, accepted asset | Sining; selected path 2026-08-12 | Nine nodes | Vendor rules and library scope/quality limits remain distinct | Frozen shared and Unity links | Admit |

Admission means that these flows are auditable, not that their quality, effectiveness, portability,
engine-version currency, or production readiness is established.

## Source-to-diagram mappings

### Sea Park ride geometry diagram mapping

| Node | Exact primary-source mapping |
| --- | --- |
| A — new route or observed defect | [Airborne-route sighting](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L69-L72); [owner-reported track knot](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L825-L843) |
| B — source-authoritative design simulation | [One shared runtime/design/simulator authority](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L814-L820); [design pass before geometry](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/ride-torrent.md#L13-L19) |
| C — numeric scans | [Clearance, route closure, lap, and speed results](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L638-L651); [curvature and self-distance scan](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L834-L843) |
| D — numeric gate | [Throwing roll/pacing/knot thresholds](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/ride-torrent.md#L117-L154) |
| E — correct authoring cause | [Terrain, waypoint, and analytic-frame corrections](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L644-L662); [control-point direction correction](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L825-L833) |
| F — strengthen failure-class audit | [Add a metric when a human finds a detectable class](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L834-L839) |
| G — ride and long-behavior inspection | [Thousands-of-ticks ride rule](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L69-L72); [actual-ride interaction test](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/ride-torrent.md#L93-L98) |
| H — behavior and owner gate | [Scott screenshot pass and measured corrections](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/ride-torrent.md#L117-L154) |
| I — corrected route and regression audit | [Corrected measured route state](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/ride-torrent.md#L129-L168); [audit runner output/failure](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/scripts/audit-geometry.mjs#L20-L105) |

| Edge | Exact primary-source mapping |
| --- | --- |
| A → B → C | Scott's knot report leads to numeric diagnosis, not visual guessing, while the shared integrator supplies the profile: [notes 814–843](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L814-L843). |
| C → D | The scans feed throwing contracts: [ride record 129–154](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/ride-torrent.md#L129-L154). |
| D — No → E → F → B | Failed values caused authoring changes and added metrics, then the shared simulator verified them: [notes 801–843](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L801-L843). |
| D — Yes → G → H | Numeric completion is followed by real ride testing and Scott's screenshot review: [ride testing and pass](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/ride-torrent.md#L93-L154). |
| H — No → C | The visible knot had passed earlier checks; the source next sorted numeric turn-rate samples: [notes 825–843](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L825-L843). |
| H — Yes → I | Passing measured values are retained in the source's route record and executable audit: [ride record 153–168](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/ride-torrent.md#L153-L168). |

No connector in this diagram is editorial inference.

### Sea Park performance diagram mapping

| Node | Exact primary-source mapping |
| --- | --- |
| A — repeatable performance defect | [Roaming freeze report and reproduction](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L897-L904); [reproduced residual freeze](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L1148-L1163) |
| B — matched scenario and telemetry | [Performance dataset fields](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/opening-day.md#L91-L95); [scripted full-park circuit](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L1170-L1176) |
| C — classify evidence | [Hitch record semantics](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/src/render/performanceMonitor.ts#L19-L48); [attribution rules](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L1135-L1139) |
| D — isolate one cause | [Pipeline and long-task probes reject two theories](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L897-L911); [pass isolation identifies coordinate-space cause](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L1148-L1157) |
| E — bounded correction | [Staggering, array release, persistence, and reuse corrections](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L1117-L1147) |
| F — rerun scenario | [Tier-2 scripted circuit](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L1170-L1176) |
| G — cadence/image gate | [Sustained-pressure and recovery policy](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/opening-day.md#L97-L110); [rejected low-resolution image tradeoff](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/opening-day.md#L83-L90) |
| H — revert or retain evidence | [Warmup/pinning/padding experiments reverted](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L1158-L1169); [remaining causes retained](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L936-L949) |
| I — retained fix and regression scenario | [Zero pipeline creations, threshold result, and steady measurement](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L1170-L1176) |

| Edge | Exact primary-source mapping |
| --- | --- |
| A → B → C → D | The freeze entries explicitly say reproduce and instrument first, then distinguish process/main-thread/heap causes: [notes 897–949](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L897-L949). |
| D → E → F | Isolated scheduled causes receive bounded changes and a scripted circuit: [notes 1117–1176](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L1117-L1176). |
| F → G | The rerun reports explicit frame/pipeline/shadow values, while image-affecting alternatives retain a visual gate: [opening-day 83–110](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/opening-day.md#L83-L110). |
| G — No → H → B | Failed warmup variants were reverted before the cause was remeasured; other residual causes remain in telemetry: [notes 936–953](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L936-L953) and [1158–1169](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L1158-L1169). |
| G — Yes → I | The source retains the stable-light fix after its full-circuit result: [notes 1170–1176](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L1170-L1176). |

No connector in this diagram is editorial inference.

### Unity build and runtime diagram mapping

| Node | Exact primary-source mapping |
| --- | --- |
| A — build trigger | [When to use](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md#L16-L25) |
| B — scenes | [Core step 1](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md#L27-L31) |
| C — target/backend/stripping/quality | [Core steps 2–4](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md#L31-L37) |
| D — BuildPlayer and report | [Core step 5](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md#L38-L39) |
| E — build/exit gate | [Result check](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md#L66-L84); [explicit CI exits](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/references/ci-build-script.md#L51-L63) |
| F — correct named failure | [Scene, toolchain, stripping, report, and content failures](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md#L95-L109) |
| G — launch player | [Core step 7](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md#L40-L42) |
| H — runtime gate | [Actual output must run](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md#L41-L42) |
| I — retained player/evidence | [Successful report output](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/references/ci-build-script.md#L51-L63) plus the required actual-player verification above |

| Edge | Exact primary-source mapping |
| --- | --- |
| A → B → C → D → E | Literal core workflow steps 1–6: [skill 27–40](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md#L27-L40). |
| E — No → F | The source lists the build failures and corrections: [skill 95–109](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md#L95-L109). |
| F → B | **Editorial inference:** rebuild from scene/configuration after correcting a named failure. The page and diagram label it inference. |
| E — Yes → G → H | Build success precedes the source's final instruction to launch the actual output: [skill 38–42](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md#L38-L42). |
| H — No → F | **Editorial inference:** correct a failed runtime and rebuild. The source requires the runtime gate but does not state its retry arrow. |
| H — Yes → I | The output is retained only after the actual player runs, combining the source's [successful build artifact and final runtime gate](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md#L38-L42). |

### Godot export and runtime diagram mapping

| Node | Exact primary-source mapping |
| --- | --- |
| A — export trigger | [When to use](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md#L16-L23) |
| B — version-matched templates | [Core step 1](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md#L25-L29) |
| C — preset and platform | [Core step 2 and platform branch](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md#L30-L38) |
| D — editor or CLI export | [Core steps 3–4](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md#L33-L35) |
| E — exit/artifact gate | [CLI exit contract](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/references/presets-and-cli.md#L31-L46) |
| F — correct setup | [Template, preset, web, resource, Android, Apple, and mode failures](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md#L91-L111) |
| G — target run | [Core step 6](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md#L38-L39); [web runtime requirements](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/references/presets-and-cli.md#L55-L66) |
| H — runtime/path gate | [Smoke and exported path rule](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md#L38-L39); [read-only failure](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md#L80-L89) |
| I — retained preset/artifact/result | [Preset is shared with CI](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/references/presets-and-cli.md#L5-L29) plus the source's export and smoke outputs |

| Edge | Exact primary-source mapping |
| --- | --- |
| A → B → C → D → E | Literal core workflow steps 1–5 and the CLI exit contract: [skill 25–38](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md#L25-L38). |
| E — No → F | The source names concrete export failures and their setup corrections: [skill 91–111](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md#L91-L111). |
| F → C | **Editorial inference:** re-export after correcting the preset or platform setup. The page and diagram label it inference. |
| E — Yes → G → H | The source follows platform export with a target smoke and exported path rules: [skill 25–39](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md#L25-L39). |
| H — No → F | **Editorial inference:** correct a failed target runtime and re-export. The source requires the gate but does not draw the retry. |
| H — Yes → I | A versioned preset, artifact, and target smoke together form the [stated shippable build output](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md#L25-L39). |

### Three.js gameplay relationship bench diagram mapping

| Node | Exact primary-source mapping |
| --- | --- |
| A — relationship needs proof | [Magnitude-only smoke and screenshot miss](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L9-L19) |
| B — quantities, cases, guards, thresholds | [Five yaws, direction quantities, and invalid-run guard](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L110-L150); [threshold table](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L184-L201) |
| C — real game, lockstep, input control | [Boot and control setup](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L24-L45) |
| D — place, settle, drive | [Case driver and synchronization frame](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L66-L107) |
| E — independent measurement | [Live camera matrix versus mover position](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L99-L126) |
| F — table and exit status | [Failure/JSON/report exits](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L36-L62); [reported table](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L184-L201) |
| G — relationship/guard gate | [Direction, speed, and diagonal thresholds](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L184-L201) |
| H — correct owner | [One-owner brief, measured evidence, verify and report](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/PROCESS.md#L85-L119) |
| I — numeric evidence | [Self-test table as report artifact](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/lib/selftest.js#L1-L18); [bench report](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L184-L201) |

| Edge | Exact primary-source mapping |
| --- | --- |
| A → B | The source responds to the [missed relationship](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L9-L19) by naming [independent direction and speed cases](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L110-L150). |
| B → C → D → E → F → G | This is the checked-in program's literal setup, run, measure, report, and exit order: [bench 24–201](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L24-L201). |
| G — No → H → C | The repository's owner loop sends measured failures to one owner, requires the no-visual gate, and reruns verification: [process 85–119](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/PROCESS.md#L85-L119). |
| G — Yes → I | A [zero exit](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L53-L62) follows the complete report; the [numeric table](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs#L184-L201) is the retained review artifact. |

No connector in this diagram is editorial inference.

### Unity imported asset diagram mapping

| Node | Exact primary-source mapping |
| --- | --- |
| A — every downloaded Unity asset | [Per-asset loop trigger](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L18-L21) |
| B — names, grouping, FBX, scale, forward | [Unity grouping/FBX path](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L43-L66); [scale and forward](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L455-L466); [inspect names first](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L617-L628) |
| C — initial multi-angle inspection | [First inspection stage](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L21-L25) |
| D — initial geometry gate | [Named initial defects and regeneration](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L22-L25) |
| E — regenerate or correct | [Scoped edit/look-again loop](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L547-L565); [Unity regeneration rule](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L23-L25) |
| F — import, place, run | [Unity in-game second inspection](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L26-L29) |
| G — scripted playtest/captures | [Play-mode verification loop](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L32-L41) |
| H — runtime asset/scene gate | [Runtime defect list](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L26-L41) |
| I — accepted asset/evidence | [Continue until critic acceptance](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L32-L41) plus the required two inspection stages |

| Edge | Exact primary-source mapping |
| --- | --- |
| A → B → C → D | The shared grouping/import order feeds the Unity branch's required first inspection: [shared 579–628](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L579-L628) and [Unity 18–25](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L18-L25). |
| D — No → E → B | The first gate explicitly says regenerate defective assets; the shared workflow says edit one scoped defect and look again: [Unity 21–25](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L21-L25), [shared 547–565](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L547-L565). |
| D — Yes → F → G → H | The source orders initial inspection before in-game play-mode inspection and then defines the scripted loop: [Unity 21–41](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L21-L41). |
| H — No → E | The source says keep building until critic acceptance and the shared skill places, edits, and looks again: [Unity 32–41](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L32-L41), [shared 450–452](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L450-L452). |
| H — Yes → I | The source's [critic gate](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L32-L41) ends only when the result is accepted, leaving the required screenshots and playtest evidence. |

No connector in this diagram is editorial inference.

## Outbound targets

The selected artifacts exposed no newly discovered direct source URL. The Sea Park live game,
Thrixel documentation, engine documentation families, and Scott source-material repositories were
already inspected or recorded by earlier outcomes. `targets.md` therefore remains unchanged at 29
URL-only, unique bullets with blob `b9df10e4aa8a6394b396da7d0e9a921d392699df`.

## Verification record

### Commands

| Check | Command | Result |
| --- | --- | --- |
| Manifest chronology | `git show --quiet --format='%H %s' 93f2533 && git show --format= --name-only 93f2533` | Passed: commit `93f25334673fa4be695cb30631cc7aaa4139badd` contains only this outcome's frozen manifest and predates every page file |
| Mermaid render | `for file in docs/pipelines/pipeline-*.md; do npx --yes @mermaid-js/mermaid-cli@11.16.0 -i "$file" -o "/tmp/$(basename "$file")"; done` | Passed: one chart found and rendered for each of 17 pipeline pages; no parser errors |
| Library links | `for file in docs/pipelines/*.md; do npx --yes markdown-link-check@3.15.0 "$file"; done` | Passed: all 20 Markdown files checked; 155 links and 0 failures |
| Outcome links | `npx --yes markdown-link-check@3.15.0 docs/objectives/skill-process/research/13-deferred-pipeline-follow-up.md` | Passed: 113 links and 0 failures |
| Prose proxy | `node /Users/josephduncan/github/AntikyLabs/.agents/skills/anti-slop/scripts/prose_lint.mjs <outcome> <README> <six-pages>` | Passed: 0 findings after replacing one ambiguous metaphor-shaped phrase with the exact route-closure mechanism |
| Target identity | `git hash-object docs/objectives/skill-process/targets.md` | Passed: unchanged blob `b9df10e4aa8a6394b396da7d0e9a921d392699df`; 29 URL bullets, 29 unique |
| Whitespace | `git diff --check` | Passed with no output |

The prose checker is a proxy for unsupported-claim, time-estimate, empty-metaphor, and structural-tic
patterns. It does not establish that a cited claim is true. A separate judgment review found no
placeholder evidence, hidden editorial connector, unsupported effectiveness or portability claim,
or validation check that could only pass.

### Corpus and page-structure audit

| Assertion | Result |
| --- | --- |
| Frozen selection | Pass: 6 exact, unique filenames; 2 each from Sea Park, game-dev skills, and Thrixel; no replacement |
| Scott reconsideration | Pass: 24 explicit dispositions, comprising all 3 named candidates and all 21 routed atomic modules |
| Accepted page set | Pass: the 6 manifest paths are the 6 new pages; rejected, duplicate, deferred, and overflow candidates have no page |
| Library/index parity | Pass: 17 pipeline files and 17 index rows name the same set; each new row's scope and evidence signals equal its page capsule |
| Page contract | Pass: every new page has all six required capsule fields and all six template sections in order |
| Target queue | Pass: no edit, no newly discovered child, and no duplicate among the 29 URL bullets |

### Diagram audit

| Page | Main nodes | Parser | Source mapping | Editorial inference |
| --- | ---: | --- | --- | --- |
| Sea Park ride geometry | 9 | Pass | Pass: 9 nodes, 6 edge groups | None |
| Sea Park performance | 9 | Pass | Pass: 9 nodes, 5 edge groups | None |
| Unity build/runtime | 9 | Pass | Pass: 9 nodes, 6 edge groups | 2 retry connectors, labeled in diagram, page, and mapping |
| Godot export/runtime | 9 | Pass | Pass: 9 nodes, 6 edge groups | 2 retry connectors, labeled in diagram, page, and mapping |
| Three.js relationship bench | 9 | Pass | Pass: 9 nodes, 4 edge groups | None |
| Unity asset inspection | 9 | Pass | Pass: 9 nodes, 5 edge groups | None |

Every node row links to a frozen primary artifact. Every non-inferred edge group links directly to
the artifact that supplies its order or branch.

### Cold-reader audit

| Page | Trigger | Ordered loop | Feedback gate | Outputs | Evidence level |
| --- | --- | --- | --- | --- | --- |
| Sea Park ride geometry | Pass | Pass | Pass | Pass | Pass |
| Sea Park performance | Pass | Pass | Pass | Pass | Pass |
| Unity build/runtime | Pass | Pass | Pass | Pass | Pass |
| Godot export/runtime | Pass | Pass | Pass | Pass | Pass |
| Three.js relationship bench | Pass | Pass | Pass | Pass | Pass |
| Unity asset inspection | Pass | Pass | Pass | Pass | Pass |
