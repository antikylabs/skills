# Library audit and continuation

## Result

All 11 published pipeline pages survive the corpus audit. Each page still satisfies the flat-file
contract, maps every top-level Mermaid node and connector to its recorded primary evidence, states
an auditable trigger and stop, separates observed from potential supporting skills, and keeps its
license and effectiveness limits visible. No page claim required repair, and no page or index row
was withdrawn.

The recursive target branch should **stop**. Wave 1 selected 4 of 35 direct children (11.4%) and
admitted one page from each selected target. Those four harvests produced ten direct children.
Wave 2 selected 0 of those 10 (0%): seven were already-covered artifacts or constituents and three
failed the AI-scope or distinct-workflow threshold. Goal 06 consequently harvested zero targets,
admitted zero pages, and discovered zero children. A third recursive URL wave has neither a selected
parent nor measured yield to justify it.

Stopping recursive traversal does not discard the coherent candidates already deferred by the four
source harvests. After removing published duplicates, one scope-ineligible meta-workflow, two
validation constituents, and two lower-evidence performance variants, 29 source-specific candidates
remain for the bounded [Goal 80 follow-up](../goals/execute-goal-80.md). That goal owns source refresh,
admission decisions, and at most six new pages; this audit does not pre-admit any candidate.

[`targets.md`](../targets.md) is cut from a 79-URL discovery history to the 29 exact primary-artifact
URLs that represent those active candidates. Rejected, harvested, duplicate, and no-retry targets
remain recoverable in the numbered research outcomes instead of remaining active queue entries.

## Audit boundary and baseline

The audit used the completed Goal 00–06 outcomes as the source record. It re-read every published
page, the index, template, researcher guide, target queue, recursive plans and outcomes, and the flat
filename decision. Frozen source mappings were checked as mappings; target packages, skills, engines,
services, and game projects were not installed or executed.

| Baseline item | Observation |
| --- | --- |
| Goal 07 base commit | `206b490e2d28540df9288f25caf3958089917174` |
| Active page files | 11 `docs/pipelines/pipeline-*.md` files |
| Indexed page rows | 11; exact filename bijection with active files |
| Pipeline tree hash | `df2a67b67a8c9152d5b2bfcc3db69c709bed8e75cd68212a6988d12491caf2fb` before audit edits |
| Target queue | 79 URL bullets, 79 unique, before continuation pruning |
| Target queue blob | `891ef0976ac1918f1fb76de79675e15ffdeb1d89` before audit edits |
| Failing baseline | Audit outcome and Goal 07 intake row were absent; the assertion failed with exit 1 as expected |

## Page-by-page contract and source-fidelity audit

Every row below was checked for all six evidence-capsule fields, one Mermaid chart, no more than nine
main nodes, all six required page sections, a cold-reader-visible trigger/order/gate/output/evidence
level, observed-versus-potential skills, source limits, license boundaries, and direct citations.
“Mapped” means every node and connector is accounted for by the linked completed source mapping.

| Page | Contract and mapping | Source-fidelity result | Evidence and boundary decision |
| --- | --- | --- | --- |
| [Three.js visual-system validation](../../../pipelines/pipeline-threejs-visual-system-validation.md) | 9 nodes; [A–I and all edges mapped](05-scott-threejs-harvest.md#visual-system-validation-diagram-mapping); no inferred connector | Contract → baselines → diagnostics → cameras/extremes → temporal/budget checks → four-layer gate → sign-off or rejection preserves source order and failure direction | Keep `Source-documented; Author-practiced`; gallery artifacts support author practice, not independent effectiveness. MIT applies to the frozen repository, not every referenced example asset. |
| [Three.js final-image pipeline](../../../pipelines/pipeline-threejs-final-image.md) | 9 nodes; [A–I and all edges mapped](05-scott-threejs-harvest.md#final-image-diagram-mapping); `H→A` labeled inference in diagram and prose | Shared-signal inventory, ownership, resolution/order, graph implementation, mechanism diagnostics, and acceptance gate remain source-specific; the repair repeat is not presented as authored | Keep `Source-documented; Author-practiced`; author-owned graphs support practice only. MIT and cross-engine limits remain explicit. |
| [Thrixel Goal to Game](../../../pipelines/pipeline-thrixel-goal-to-game.md) | 9 nodes; [A–I and all edges mapped](06-thrixel-harvest.md#goal-to-game-diagram-mapping); no inferred connector | User request → engine/account gates → asset and system work → import/runtime review → revision/export/report preserves the shared skill and engine branches | Keep `Source-documented` only. The one-image/one-or-more-images contradiction, mutable service limits, proprietary-service boundary, plan-dependent asset rights, and missing independent outcome remain visible. |
| [Fast gameplay prototyping](../../../pipelines/pipeline-gamedev-skills-fast-gameplay-prototyping.md) | 8 nodes; [A–H and all edges mapped](07-gamedev-skills-harvest.md#fast-gameplay-prototyping-diagram-mapping); no inferred connector | One question → containment/timebox → greybox/instrument → outside playtest → keep, kill, or narrow-and-repeat retains the source's learning outcome and hard stop | Keep `Source-documented` only. Apache-2.0 covers the source contribution; no completed prototype or effectiveness record is claimed. |
| [Game-jam delivery](../../../pipelines/pipeline-gamedev-skills-game-jam-delivery.md) | 9 nodes; [A–I and all edges mapped](07-gamedev-skills-harvest.md#game-jam-delivery-diagram-mapping); no inferred connector | Rules/theme → concept/scope → vertical loop → playtest/cut → freeze → clean build/page/credits → submission preserves deadline-driven gates | Keep `Source-documented` only. No named jam entry, timestamp trail, or postmortem is treated as evidence. |
| [Game-asset production](../../../pipelines/pipeline-gamedev-skills-game-asset-production.md) | 9 nodes; [A–I and all edges mapped](07-gamedev-skills-harvest.md#game-asset-production-diagram-mapping); no inferred connector | Brief/system/manifest → target approval → family production → normalize/import → context validation → provenance preserves branches and the return to the source asset | Keep `Source-documented` only. Bundled helpers prove deterministic checks, not asset quality or production use; source and third-party asset rights stay separate. |
| [Level blockout, teach, and test](../../../pipelines/pipeline-gamedev-skills-level-blockout-teach-test.md) | 9 nodes; [A–I and all edges mapped](07-gamedev-skills-harvest.md#level-blockout-teach-and-test-diagram-mapping); no inferred connector | Metrics → blockout/path/pacing → teach/test → reachability/readability/pacing gate → player observation → dress-only-after-pass preserves the source's order | Keep `Source-documented` only. Illustrative metrics and confident guidance are not a player study or production result. |
| [Pearl Sea Park staged agent build](../../../pipelines/pipeline-pearl-sea-park-staged-agent-build.md) | 9 nodes; [A–I and all edges mapped](09-recursive-wave-01-outcome.md#pearl-sea-park-diagram-mapping); no inferred connector | Confirmed design → dependency stage → runnable system/docs → structural/runtime checks → owner ruling → correction/regression → next stage/final stop matches the practiced records | Keep `Source-documented; Author-practiced`. One public author-owned project supports practice, not portability or independent effectiveness; the frozen project exposes no reusable license. |
| [Unreal package and runtime validation](../../../pipelines/pipeline-unreal-package-runtime-validation.md) | 9 nodes; [A–I and all edges mapped](09-recursive-wave-01-outcome.md#unreal-package-and-runtime-validation-diagram-mapping); no inferred connector | Target/configuration → editor or automation → build/cook/stage/package → completion/log repair → staged artifact → target-runtime gate preserves Epic and wrapper order | Keep `Source-documented` only. Live UE 5.8 details, SDK requirements, Epic rights, and the absence of a named packaged outcome remain explicit. |
| [itch.io Butler publish and update](../../../pipelines/pipeline-itchio-butler-publish-update.md) | 9 nodes; [A–I and all edges mapped](09-recursive-wave-01-outcome.md#itchio-butler-publish-and-update-diagram-mapping); preview approval and its repeat edges labeled inference | Portable folder/page/channel → optional preview gate → push → troubleshoot or live/processing state → same-channel update preserves manual behavior without claiming runtime validation | Keep `Source-documented` only. MIT covers Butler source/docs, not the hosted service or uploaded game; service limits are mutable and no agent-run release is claimed. |
| [Steamworks SteamPipe build and release](../../../pipelines/pipeline-steamworks-steampipe-build-release.md) | 9 nodes; [A–I and all edges mapped](09-recursive-wave-01-outcome.md#steamworks-steampipe-build-and-release-diagram-mapping); no inferred connector | Account/app setup → parallel store/build tracks → VDF preview/upload identity → beta runtime test → ordered reviews → authority/time gate → manual release/update preserves both required tracks | Keep `Source-documented` only. Partner access, permissions, security delays, reviews, SDK behavior, and Valve rights remain mutable or external to the Apache-2.0 wrapper. |

## Corpus audit

### Index, filename, and page contract

- The 11 active `pipeline-*.md` files use the flat `pipeline-<group-name>-<name>.md` form.
- The index names all 11 files exactly once and contains no extra page row.
- The index evidence labels match every page capsule: all 11 are Source-documented; exactly the two
  Scott coordinator pages and Pearl Sea Park also carry Author-practiced.
- No page claims Study-observed, Production-used, or Independently validated evidence.
- The template, researcher guide, index contract, and every active page agree on the six capsule
  fields, one top-level chart, nine-node maximum, required sections, evidence vocabulary, inference
  labeling, and cold-reader questions.

### Duplicate and overlap audit

| Overlap family | Why both published pages survive |
| --- | --- |
| Three.js final-image coordination vs visual-system validation | The final-image page orders shared render signals before implementation; the validation page starts after a visual system exists and produces acceptance or rejection evidence. Different triggers, artifacts, and stop conditions. |
| Thrixel Goal to Game vs Pearl Sea Park staged build | Thrixel coordinates proprietary asset generation with Unity/Three.js game construction; Sea Park governs dependency stages, persistent system records, owner rulings, and regression audits in one practiced project. |
| Fast prototype vs level blockout | The prototype page answers one keep/kill/refactor question under a timebox; the level page produces a teachable, traversable blockout and withholds art dressing until player-facing gates pass. |
| Game-asset production vs Thrixel Goal to Game | The asset page produces and validates a cohesive asset family; Thrixel uses an asset-generation subloop inside a larger end-to-end game request and preserves proprietary service branches. |
| Unreal packaging vs Butler and SteamPipe | Unreal produces and runtime-tests a standalone engine build. Butler and SteamPipe consume a build for storefront delivery, with different identity, review, release, and update gates. |
| Butler vs SteamPipe | Butler's core identity is project/channel push and same-channel update. SteamPipe requires depot manifests, parallel store/build tracks, beta installation, ordered reviews, authority/time gates, and manual release. |
| Game-jam delivery vs storefront delivery | The jam page is governed by rules, a fixed deadline, scope cuts, clean export, credits, and entry attachment. Store pages begin from a finished build and govern platform delivery. |
| Sea Park staged build vs component validation | Sea Park contains visual checks as one stage gate but adds dependency ordering, system records, owner rulings, corrections, and multi-stage continuation. It does not replace the component-level visual protocol. |

No two active pages have the same trigger, principal artifact path, feedback gate, and terminal output.
The source-specific overlap is therefore declared rather than hidden, and consolidation would erase
material source direction.

### Vocabulary, inference, evidence, and reuse

- Source vocabulary is preserved where it changes action: Thrixel projects/sources and grouped
  exports, Butler channels and processing, Steam depots/VDF/BuildID, Unreal build/cook/stage/package,
  and Sea Park dependency stages and owner rulings are not normalized into house terminology.
- The only editorial Mermaid connections are the final-image `H→A` repair repeat and Butler's
  preview-approval branch/repeat. Each is labeled in the diagram, ordered prose, evidence boundary,
  and source mapping. Every page also labels its portable **Potential** skills as inference.
- Popularity, repository size, tests, examples, and self-report are never promoted to independent
  validation. Tests and artifacts are described only at the level they establish.
- Repository licenses are kept separate from live services, SDKs, game projects, uploaded games,
  and third-party assets. Missing or mutable licenses remain explicit rather than inferred.

### Corrections, withdrawals, and linter judgment

| Item | Audit decision and evidence |
| --- | --- |
| Wave-1 rejection count | Corrected here, without rewriting the completed plan: its 35-row ledger contains 4 selections, 3 target-only deferrals, and **28** rejections. The plan's prose and verification table say 27, an arithmetic error that does not change any row disposition, selected manifest, harvest, or page. |
| Active page corrections | None. All claims, mappings, labels, links, diagrams, and index fields passed; changing wording without a source need would violate the smallest-repair rule. |
| Withdrawals | None. Every page still passes all six admission gates and has a complete primary-source mapping. |
| Prose checker warning | The deterministic anti-slop checker flagged “seams” in the game-asset page. It is a false-positive proxy: the step literally inspects mesh/texture seams during asset validation, not an empty metaphor. The source-faithful wording remains. |

## Deduplicated continuation graph

The graph separates active deferred **pipeline candidates** from recursive **target leads**. A
candidate edge comes from a completed deep-harvest ledger and is eligible for Goal 80 source
refresh. A target-only edge never became a pipeline candidate.

```text
Goal 00 — Scott Three.js harvest
├── active: procedural-scene orchestration
├── active: 21 atomic technical-workflow candidates
├── exclude: skill-pack source distillation (repository-maintenance scope)
└── exclude: deterministic gallery capture (constituent of visual-system validation)

Goal 01 — Thrixel harvest
├── active: Unity imported-asset inspection and play-mode validation
├── active: Three.js gameplay-relationship bench
├── exclude: capture-measure-fix review (duplicate/constituent of visual-system validation)
└── consolidate: pixel-gated performance optimization → Goal 04 measured-performance family

Goal 02 — gamedev-skills harvest
├── active: Godot export and runtime validation
├── active: Unity build and runtime validation
├── consolidate: profile-fix-remeasure → Goal 04 measured-performance family
└── exclude: Butler, SteamPipe, and Unreal candidates (published by Goal 04)

Goal 03 — wave-1 selection
└── terminal target-only leads: CodePen RNKpmQj, Elysium-Mars-Park, Stellar

Goal 04 — wave-1 harvest
├── active: Sea Park GLB fauna replacement and audit
├── active: Sea Park measured performance recovery
├── active: Sea Park simulation-first ride geometry correction
└── 10 direct children → Goal 05 terminal ledger

Goal 05 — wave-2 selection
└── 7 duplicate/constituent + 3 AI-scope/workflow rejections → 0 selected

Goal 06 — empty wave-2 harvest
└── 0 targets, 0 candidates, 0 pages, 0 children

Goal 07 — corpus audit
└── no new pipeline candidate; 29 reconciled candidates remain under Goals 00, 01, 02, and 04
```

The performance candidates are one comparison family, not three Goal 80 slots. Pearl Sea Park is
the representative intake identity because it has author-practiced measurement, diagnosis,
correction, and remeasurement records. Thrixel's pixel gate and `gamedev-skills`' CPU/GPU,
keep/revert, and reporting branches remain supporting comparison evidence in their preserved
outcomes; Goal 80 must still test whether the Sea Park route is distinct enough to publish.

## Ranked Goal 80 candidate queue

Ranks reflect current recorded evidence, distinct coverage, source accessibility, and bounded
refresh cost. They are selection priorities, not admission. The first six fit Goal 80's maximum
selection size, but Goal 80 must freeze its own manifest after refreshing identity and distinctness.

| Rank | Candidate and exact primary artifact | Parent edge | Expected contribution | Known risk |
| ---: | --- | --- | --- | --- |
| 1 | [Sea Park simulation-first ride geometry correction](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/scripts/audit-geometry.mjs) | [Goal 04 candidate ledger](09-recursive-wave-01-outcome.md#candidate-ledger) | Practiced shared-integrator, fixed-tick simulation, numeric scan, owner sighting, correction, and regression loop | May collapse into one project-specific branch of the staged-build page |
| 2 | [Sea Park measured performance recovery](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/opening-day.md) | [Goal 04 candidate ledger](09-recursive-wave-01-outcome.md#candidate-ledger) plus consolidated Goal 01/02 variants | Practiced measure → isolate → bound/remove one cause → remeasure workflow, with stronger evidence than the two source-documented variants | Cross-source overlap is high; refresh must produce one source-faithful page or reject the family as duplicate/constituent |
| 3 | [Unity build and runtime validation](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md) | [Goal 02 deferred ledger](07-gamedev-skills-harvest.md#additional-coherent-candidates-deferred) | Engine-specific scene/backend decisions, build report, CI exit gate, and actual-player smoke gate; fills the Unity build gap beside Unreal | Source-documented only; may be an API/checklist recipe without a demonstrated operative feedback loop |
| 4 | [Godot export and runtime validation](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md) | [Goal 02 deferred ledger](07-gamedev-skills-harvest.md#additional-coherent-candidates-deferred) | Version-matched templates, presets, platform branch, export artifact, and target smoke gate; fills the Godot build gap | Source-documented only; the rejected Butler plugin adds no AI scope and must not be used to manufacture feedback |
| 5 | [Three.js gameplay-relationship bench](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/example/feeltest.mjs) | [Goal 01 candidate ledger](06-thrixel-harvest.md#candidate-disposition) | Deterministic real-input assertions for gameplay relationships missed by screenshots and boot smoke tests | The worked kit is public, but the claimed large reference project is unnamed; evidence must stay limited to the checked-in bench |
| 6 | [Sea Park GLB fauna replacement and audit](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/scripts/audit-fauna-assets.mjs) | [Goal 04 candidate ledger](09-recursive-wave-01-outcome.md#candidate-ledger) | Practiced authored asset → normalize/compress → load/scale → behavioral parity → offline audit → runtime inspection | May duplicate the published game-asset production page or remain too project-specific |
| 7 | [Unity imported-asset inspection and play-mode validation](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md) | [Goal 01 candidate ledger](06-thrixel-harvest.md#candidate-disposition) | Initial-download, multi-angle, and running-game inspection with explicit defect feedback | Likely constituent of Thrixel Goal to Game and overlaps game-asset production |
| 8 | [New procedural-scene orchestration](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-skill-router/SKILL.md) | [Goal 00 candidate ledger](05-scott-threejs-harvest.md#candidate-disposition) | Nine-step construction/validation coordination across procedural scene capabilities | Router may fail Gate 1 or duplicate Sea Park/Thrixel end-to-end coordination after full refresh |

The remaining 21 Goal 00 candidates are ranked below the candidates with already-recorded
project-level artifacts. Each has an exact frozen skill URL and a distinct routed subject, but its
current evidence is only a possible atomic workflow. Their shared risk is that a “workflow” section
may resolve to an implementation recipe, feature inventory, or constituent rather than an operative
artifact-and-feedback pipeline. Goal 80 must refresh and disposition every one.

| Rank | Exact candidate source | Expected workflow contribution |
| ---: | --- | --- |
| 9 | [`threejs-camera-direction`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-camera-direction/SKILL.md) | Camera contracts and cross-system handoffs |
| 10 | [`threejs-procedural-animation`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-procedural-animation/SKILL.md) | Authored motion phases and convergence checks |
| 11 | [`threejs-procedural-geometry`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-procedural-geometry/SKILL.md) | Complete procedural object construction |
| 12 | [`threejs-procedural-vegetation`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-procedural-vegetation/SKILL.md) | Growth, placement, and wind coordination |
| 13 | [`threejs-procedural-architecture`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-procedural-architecture/SKILL.md) | Building-grammar construction and validation |
| 14 | [`threejs-procedural-planets`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-procedural-planets/SKILL.md) | Terrain, biome, and planet-field coordination |
| 15 | [`threejs-spectral-ocean`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-spectral-ocean/SKILL.md) | Spectral ocean system construction and checks |
| 16 | [`threejs-water-optics`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-water-optics/SKILL.md) | Analytic water and pool-optics validation |
| 17 | [`threejs-precipitation-surfaces`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-precipitation-surfaces/SKILL.md) | Snow, puddle, and rain surface coordination |
| 18 | [`threejs-atmosphere-aerial-perspective`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-atmosphere-aerial-perspective/SKILL.md) | Sky and aerial-perspective construction |
| 19 | [`threejs-volumetric-clouds`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-volumetric-clouds/SKILL.md) | Weather-driven cloud construction and checks |
| 20 | [`threejs-procedural-vfx`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-procedural-vfx/SKILL.md) | Volumetric and event-effect coordination |
| 21 | [`threejs-raymarched-space-effects`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-raymarched-space-effects/SKILL.md) | Curved-ray space-effect construction |
| 22 | [`threejs-procedural-fields`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-procedural-fields/SKILL.md) | Shared procedural-field authoring and handoff |
| 23 | [`threejs-procedural-materials`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-procedural-materials/SKILL.md) | Procedural and optical material construction |
| 24 | [`threejs-parallax-occlusion-mapping`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-parallax-occlusion-mapping/SKILL.md) | Relief and self-shadowing implementation checks |
| 25 | [`threejs-temporal-surfaces`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-temporal-surfaces/SKILL.md) | History-driven surface-effect validation |
| 26 | [`threejs-shadow-systems`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-shadow-systems/SKILL.md) | Stable large-world shadow construction and checks |
| 27 | [`threejs-screen-space-ambient-occlusion`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-screen-space-ambient-occlusion/SKILL.md) | GTAO and bent-normal construction and validation |
| 28 | [`threejs-bloom`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-bloom/SKILL.md) | HDR bloom setup and acceptance checks |
| 29 | [`threejs-exposure-color-grading`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-exposure-color-grading/SKILL.md) | Exposure, tone mapping, and grading order |

## Recursive-wave stop and no-retry record

| Measure | Wave 1 | Wave 2 |
| --- | ---: | ---: |
| Direct children considered | 35 | 10 |
| Selected targets | 4 (11.4%) | 0 (0%) |
| Deeply harvested targets | 4 | 0 |
| Admitted pages | 4 | 0 |
| New direct children | 10 | 0 |

The apparent wave-1 page yield of 4/4 applies only after selection; it does not offset the collapse
from 35 source-graph children to four selections and then from ten new children to zero. Goal 05's
complete ledger resolves all ten second-layer children, so there is no unexamined child behind the
zero. The decision is therefore:

- **Stop recursive URL harvesting from this branch.** Do not scaffold or execute a third wave.
- **Continue only through Goal 80's bounded deferred-candidate refresh.** It owns the 29 candidates
  above, may select at most six, may publish at most two pages per source, and may validly produce
  zero pages.

The three Goal 03 target-only deferrals are not Goal 80 candidates and are removed from the active
target queue:

| Exact target | Parent edge | Possible contribution | Do-not-retry condition |
| --- | --- | --- | --- |
| `https://codepen.io/sabosugi/pen/RNKpmQj` | [Scott direct child S02](08-recursive-wave-01-plan.md#scott-threejs-target) | Unknown procedural/visual example | Returned `403`; do not retry until a reproducible public artifact or canonical mirror is supplied |
| [scottstts/Elysium-Mars-Park](https://github.com/scottstts/Elysium-Mars-Park) | [Scott direct child S22](08-recursive-wave-01-plan.md#scott-threejs-target) | Plans, system docs, build notes, headless checks, and a first-person artifact | Do not retry until a direct AI/agent-use artifact supplies order distinct from the two published Three.js pages and Sea Park |
| `https://github.com/scottstts/Stellar` | [Scott direct child S27](08-recursive-wave-01-plan.md#scott-threejs-target) | Unknown Scott project evidence | Returned `404`; do not guess a replacement or retry until a restored canonical URL is supplied |

The 28 selection rejections and Goal 05's three AI-scope/workflow rejections also remain terminal.
New source evidence may justify a later new decision, but unchanged access, popularity, README
wording, or repository activity does not.

## Goal 80 intake reconciliation

The authoritative serialized table is in [Goal 80](../goals/execute-goal-80.md#candidate-intake).
The reconciled state is:

| Source goal | Eligible count | Reconciliation | Intake state |
| --- | ---: | --- | --- |
| 00 | 22 | Procedural-scene orchestration plus all 21 atomic modules remain; skill-pack distillation is scope-ineligible and deterministic gallery capture duplicates the visual-validation page | Ready for Goal 80 |
| 01 | 2 | Unity imported-asset validation and gameplay-relationship bench remain; capture review duplicates visual validation and pixel performance is consolidated into Goal 04's practiced family | Ready for Goal 80 |
| 02 | 2 | Godot and Unity build/runtime candidates remain; performance is consolidated into Goal 04 and Butler, SteamPipe, and Unreal are now published | Ready for Goal 80 |
| 03 | 0 | Three unresolved URLs are target-only, not pipeline candidates | No eligible candidates |
| 04 | 3 | GLB fauna, measured performance, and simulation-first geometry remain; the performance record represents the cross-source comparison family | Ready for Goal 80 |
| 05 | 0 | Seven direct children are duplicates/constituents and three fail scope or distinctness | No eligible candidates |
| 06 | 0 | Empty manifest and harvest produced no candidate | No eligible candidates |
| 07 | 0 | The audit found no new candidate; it only reconciles earlier candidates and closes recursion | No eligible candidates |

## Verification record

| Check | Result |
| --- | --- |
| Index/page bijection | Passed: 11 indexed filenames equal 11 active page files, each exactly once |
| Template conformance | Passed: every page has six capsule values, one chart, six required sections, and at most nine main nodes |
| Source mapping and admission | Passed: 11 complete node/edge mappings; every surviving page retains all six admission gates |
| Inference and evidence labels | Passed: two editorial diagram connections are labeled everywhere; all 11 pages are Source-documented and only three have supported Author-practiced labels |
| Duplicate and cold-reader audit | Passed: every overlap has a distinct trigger/artifact/gate/output rationale; all five cold-reader questions are answerable on every page |
| Mermaid | Mermaid CLI 11.16.0 parsed all 11 page charts without failure |
| Pipeline links | `markdown-link-check@3.15.0` passed every file under `docs/pipelines/` |
| Anti-slop prose proxy | Self-test passed 42 examples; corpus scan returned zero errors and one reviewed false-positive warning on literal asset “seams” |
| Continuation traceability | 29 active candidate artifacts map to Goals 00, 01, 02, or 04; every other branch is published, consolidated, excluded, rejected, or no-retry |
| Recursive decision | Passed: 4/35 wave-1 selection and 0/10 wave-2 selection support stop; the wave-1 27/28 arithmetic discrepancy is corrected above |
| Goal 80 intake | Passed: one row for every Goal 00–07; each state is `Ready for Goal 80` or `No eligible candidates` |
| Target queue | Passed: 29 URL bullets, 29 unique, each equal to one active ranked candidate's primary artifact |
| Repository hygiene | `git diff --check` passed; no active pipeline page, index row, template, or researcher-guide content changed |
