# gamedev-skills harvest

## Result

All four declared candidates pass the six-part admission gate:

- [Fast gameplay prototyping](../../../pipelines/pipeline-gamedev-skills-fast-gameplay-prototyping.md)
- [Game-jam delivery](../../../pipelines/pipeline-gamedev-skills-game-jam-delivery.md)
- [Game-asset production](../../../pipelines/pipeline-gamedev-skills-game-asset-production.md)
- [Level blockout, teach, and test](../../../pipelines/pipeline-gamedev-skills-level-blockout-teach-test.md)

Each is an agent instruction with a source-stated order, artifacts or gates, a feedback or stop
path, and traceable authorship. This is the weakest accepted evidence tier: **Source-documented**.
The repository contains no finished prototype, jam entry, asset family, level, participant record,
or independent evaluation produced with these instructions. Admission makes the loops auditable; it
does not show that they are effective, practiced, production-used, or engine-neutral.

## Frozen source

| Field | Frozen value |
| --- | --- |
| Canonical repository | [`gamedev-skills/awesome-gamedev-agent-skills`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills) |
| Revision | [`9ca5296b219049c5b68494e1f3c274ead6d727b3`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/9ca5296b219049c5b68494e1f3c274ead6d727b3) |
| Tree | `bc9b20a3109f9c00d945f741643d8dd79aca6247` |
| Version | `v1.1.0-27-g9ca5296` |
| Revision author/date | Abhishek Barali; 2026-08-11T11:33:42+05:45 |
| Retrieval date | 2026-08-17 |
| History | 76 commits from 2026-06-24 through 2026-08-11; four recorded contributor identities |
| Root license | [Apache-2.0, Copyright 2026 Abhishek Barali and contributors](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/LICENSE) |
| Notice boundary | The [NOTICE](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/NOTICE) says the skills are original works written from primary documentation; it does not identify completed projects that used the workflows |

The repository was cloned as source and its omitted historical blobs were fetched only to inspect
path history. No target skill, dependency, helper, engine, service, build, or example was installed
or executed.

## Complete inspected artifact set

The frozen tree contains 172 tracked artifacts. The following groups are exhaustive and sum to the
tree count. Every skill route was classified; every reference, script, test, template, index, and
configuration artifact was included in the inventory. The sole image was viewed separately and
contains catalog marketing art rather than workflow evidence.

| Artifact group | Count | What was inspected |
| --- | ---: | --- |
| Root governance and catalog | 5 | `.gitignore`, `CONTRIBUTING.md`, `LICENSE`, `NOTICE`, `README.md` |
| Plugin and CI configuration | 3 | marketplace JSON and both GitHub Actions workflows |
| General documentation | 5 | compatibility, installation, skill format, version support, and the banner image |
| Router | 4 | router skill, OpenAI metadata, engine detection, and the exhaustive routing table |
| Repository tooling | 6 | three Python scripts, two test modules, and the skill template |
| Skill indexes | 9 | root skill index and eight category indexes |
| Skill bodies | 67 | 14 discipline, 9 genre, 15 Godot, 5 other-engine, 8 Unity, 6 Unreal, 6 web-engine, and 4 workflow skills |
| Skill references | 67 | 20 discipline, 9 genre, 15 Godot, 5 other-engine, 6 Unity, 4 Unreal, 6 web-engine, and 2 workflow references |
| Asset-skill extras | 6 | OpenAI metadata, two copyable assets, two Python helpers, and their requirements file |

The [root catalog](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/README.md)
lists 67 skills, and the frozen routing/distribution data covers the same set. The repository holds
no tracked game project or external playtest record. Its code examples are embedded recipes in
skill bodies and references, not demonstrations of the four declared workflows.

### Declared-candidate primary artifacts

| Candidate | Primary and supporting artifacts | Path history |
| --- | --- | --- |
| Fast gameplay prototyping | [`prototype-fast/SKILL.md`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/prototype-fast/SKILL.md); router and workflow indexes | Introduced by Abhishek Barali in [`cc7ca2d`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/commit/cc7ca2d39329ca5955d9480ce8e4ca32ec106750) on 2026-06-24; last path change by Ishan Gautam in [`3727d02`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/commit/3727d02499efac5d4703ccdc5e59e54e60e954b7) on 2026-08-08 |
| Game-jam delivery | [`game-jam/SKILL.md`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/game-jam/SKILL.md); router and workflow indexes | Introduced and last changed with the same two commits as `prototype-fast` |
| Game-asset production | [`create-game-assets/SKILL.md`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/SKILL.md), four references, two copyable assets, two helpers, requirements, tests, and OpenAI metadata | Introduced by Ishan Gautam in `3727d02` on 2026-08-08 |
| Level blockout, teach, and test | [`level-design/SKILL.md`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/SKILL.md), [`pacing-and-flow.md`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/references/pacing-and-flow.md), router and discipline indexes | Introduced by Abhishek Barali in [`fa7a8dd`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/commit/fa7a8dda049d883923329fae0067800c3da6f746) on 2026-06-24; last path change in `3727d02` |

### What the tests establish

The frozen [CI workflow](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/.github/workflows/ci.yml)
runs a frontmatter/link/router/manifest validator, its regression tests, the two asset-helper tests,
and documentation-site generation. The asset tests prove that the raster report can pass a valid
fixture, fail a wrong-size constraint, and emit JSON, and that the preview helper produces an image.

Those are structural and helper-behavior signals only. They do not execute an agent instruction,
build or play a game, judge an asset, observe a player, or compare an outcome. Stars, examples,
commit count, version pins, and catalog breadth were likewise not converted into effectiveness
evidence.

## Candidate evidence matrix

| Candidate | Source-stated order | Named artifacts or gates | Feedback, branch, or stop | Provenance | Decision |
| --- | --- | --- | --- | --- | --- |
| Fast gameplay prototyping | Question → containment choice → timebox → greybox → instrument → playtest → decide | Prototype brief, isolated spike, timer, debug display, keep/kill criteria, decision log | Keep schedules a rewrite; kill logs and stops; refactor narrows the question and repeats; timer is a hard stop | Frozen skill and two-commit path history | **Admit** |
| Game-jam delivery | Rules → permitted prep → concept → scope → vertical loop → shipping buffer → submit | Rule record, one-sentence concept, playable loop, clean export, page, credits, attached entry | Cut when the loop misses the first-third gate; playtest/cut; freeze features; fix only submission-blocking defects | Frozen skill and two-commit path history | **Admit** |
| Game-asset production | Inspect → frame/system → manifest → approve target → family → normalize → import → validate → provenance | Brief, manifest, approved target, contact sheet, technical report, engine import, rights and quality gates | Branches by asset need; a failed context gate returns to the source asset; missing tools stop at brief/placeholders | Frozen skill, resources, helper tests, and creation commit | **Admit** |
| Level blockout, teach, and test | Metrics → blockout → paths → pacing → teach/test → gate → player observation → dress | Locked metrics, blockout, path graph, pacing beats, teaching sequence, review checklist | Failed reachability/readability/pacing/teaching review returns to the blockout; dressing waits for a pass | Frozen skill/reference and two-commit path history | **Admit** |

All four also pass the remaining admission requirements: their authors and evidence dates are
traceable, each fits a concise diagram without invented stages, facts and inference remain
separable, and every page has direct frozen-source links. None receives Author-practiced,
Study-observed, Production-used, or Independently validated labels.

## Candidate disposition

### Declared publication candidates

| Exact page path | Decision | Reason |
| --- | --- | --- |
| `docs/pipelines/pipeline-gamedev-skills-fast-gameplay-prototyping.md` | Admitted and published | One question, artifact containment, observable criteria, an outside-player check, three decision paths, and a hard stop form a reconstructable learning loop |
| `docs/pipelines/pipeline-gamedev-skills-game-jam-delivery.md` | Admitted and published | A fixed deadline drives concept, scope, playable-loop, cut/freeze, clean-build, and submission gates |
| `docs/pipelines/pipeline-gamedev-skills-game-asset-production.md` | Admitted and published | The top-level skill coordinates concrete briefs, manifests, target approval, production branches, deterministic normalization, engine import, context feedback, and provenance |
| `docs/pipelines/pipeline-gamedev-skills-level-blockout-teach-test.md` | Admitted and published | Metrics, blockout, paths, pacing, teaching, order gates, real-player observation, and the dress-only-after-pass rule form one discipline workflow |

### Additional coherent candidates deferred

These source-stated workflows were found outside the four-page publication scope. They remain
eligible for a later admission refresh; this harvest does not pre-admit them.

| Stable candidate | Source | Why it is coherent | Why deferred now |
| --- | --- | --- | --- |
| Profile–fix–remeasure performance optimization | [`performance-optimization`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/performance-optimization/SKILL.md#L33-L58) | Repeatable scene, profile capture, CPU/GPU branch, single change, same-hardware measurement, keep/revert result, budgets and report | Additional discipline candidate, not a declared path |
| itch.io Butler publish and update | [`itch-publish`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/itch-publish/SKILL.md#L29-L51) | Project page, portable build, named channel, upload, platform gate, version, preview, and update artifacts | Additional delivery candidate, not a declared path |
| Steam parallel presence/build release | [`steam-publish`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/steam-publish/SKILL.md#L30-L76) | Store and build tracks, depot/VDF/BuildID artifacts, preview and beta branch, dual approval gate, manual release, update loop | Additional delivery candidate with mutable commercial-service rules |
| Godot export and runtime validation | [`godot-export`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/godot/godot-export/SKILL.md#L25-L39) | Version-matched templates, presets, platform branch, build artifact, and target smoke gate | Additional engine-specific candidate, not a declared path |
| Unity build and runtime validation | [`unity-build-pipeline`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unity/unity-build-pipeline/SKILL.md#L27-L42) | Scene list, target/backend decisions, build script, `BuildReport`, CI exit gate, and actual-player smoke gate | Additional engine-specific candidate, not a declared path |
| Unreal cook, package, and runtime validation | [`unreal-packaging`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unreal/unreal-packaging/SKILL.md#L28-L47) | Launch map, configuration, cook/package artifacts, editor/CLI branch, and packaged-build runtime gate | Additional engine-specific candidate, not a declared path |

### Recorded exclusions and rejections

| Inspected route or group | Disposition | Exact reason |
| --- | --- | --- |
| Master router, routing table, engine-detection map, category indexes, root catalog, marketplace bundles | Rejected as pipeline pages | They select and classify skills. Their order operates a catalog router, not one game-development outcome; the goal explicitly excludes routers and inventories |
| Nine genre skills: card game, FPS, platformer, puzzle, roguelike, RPG, survival crafting, tower defense, visual novel | Rejected as development pipelines | Their bold “core loops” describe player actions and their numbered sections inventory must-have systems. A gameplay loop is not an AI-assisted development workflow |
| Remaining 11 discipline skills: audio, camera, dialogue, game AI, game feel, UI/UX, input, physics, procedural generation, save systems, shaders, plus their references | Rejected at this harvest | Their uniform numbered “core workflow” sections are implementation/configuration recipes. They do not expose a distinct project-level artifact-and-feedback loop strong enough to survive this harvest's anti-inventory test |
| Remaining 37 engine/API skills and their references | Rejected at this harvest | They teach API setup and implementation order. Excluding the three build/export flows deferred above, they are engine capability recipes rather than pipeline candidates |
| Asset visual-target, raster-family, 3D concept-to-runtime, and provenance subflows | Subsumed; ineligible for Goal 80 from this harvest | They are documented constituents or branches of the admitted game-asset production page. Publishing them now would split or repeat the accepted source-level flow |
| Level teaching loop and blockout review checklist | Subsumed; ineligible for Goal 80 from this harvest | They provide the feedback gate for the admitted level page rather than a separate workflow |
| Skill authoring, router maintenance, validation, test, and site-generation procedures | Rejected by scope | They are coherent repository-maintenance workflows but are not game-development pipelines |
| Banner, stars/commit badges, code examples, version table, validator results, and asset-helper tests | Rejected as outcome evidence | They establish presentation, activity, version intent, repository shape, or helper behavior—not use or effectiveness of any declared workflow |

The remaining-discipline and remaining-engine counts are route classifications, not claims that the
content is poor. The repository applies a standard “core workflow” shape to capability instructions;
that heading alone does not satisfy the library's admission gate.

## Alternative interpretations checked

| Interpretation | Result |
| --- | --- |
| Every numbered `Core workflow` is a pipeline | Rejected. The template makes numbered order a house format, including one-shot API setup and configuration recipes. Artifacts, a project-level gate, and feedback still have to survive inspection. |
| A genre's `Core loop` is a development pipeline | Rejected. Those loops describe what the player repeats, while the following section is a system inventory. |
| Asset production should become separate 2D, 3D, art-direction, and provenance pages | Rejected for this goal. The top-level skill explicitly coordinates those branches and one shared manifest/approval loop; splitting them would overpublish declared scope and repeat the source. |
| Godot, Unity, and Unreal build instructions can be merged into one universal shipping page | Rejected. Their artifacts, toolchains, failure gates, and runtime checks are engine-specific. |
| Four admissions imply the collection is practiced or effective | Rejected. All four remain Source-documented only; no tracked outcome artifact supports a stronger label. |

## Fast gameplay prototyping diagram mapping

### Nodes

| Node | Primary source mapping |
| --- | --- |
| A — one question and observable criteria | [Workflow step 1 and prototype brief](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/prototype-fast/SKILL.md#L25-L29); [brief criteria](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/prototype-fast/SKILL.md#L47-L58) |
| B — throwaway or keepable prototype | [Workflow step 2](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/prototype-fast/SKILL.md#L30-L33) |
| C — timebox and greybox | [Workflow steps 3–4](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/prototype-fast/SKILL.md#L34-L38) |
| D — instrument the question | [Workflow step 5](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/prototype-fast/SKILL.md#L39-L40) |
| E — self and uncoached-player test | [Workflow step 6](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/prototype-fast/SKILL.md#L41-L42) |
| F — keep, kill, or refactor gate | [Workflow step 7](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/prototype-fast/SKILL.md#L43-L45); [observable criteria](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/prototype-fast/SKILL.md#L72-L83) |
| G — schedule a rewrite | [Keep and containment rules](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/prototype-fast/SKILL.md#L43-L45); [rewrite, not promotion](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/prototype-fast/SKILL.md#L85-L93) |
| H — log lesson and stop | [Kill path](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/prototype-fast/SKILL.md#L43-L45) |

### Edges

`A→B→C→D→E→F` is the source's seven-step order. `F→G`, `F→H`, and `F→A` are its literal
keep, kill, and narrow-and-spike-again outcomes. No node or connector is editorial inference.

## Game-jam delivery diagram mapping

### Nodes

| Node | Primary source mapping |
| --- | --- |
| A — rules, deadline, and timezone | [Workflow step 1](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/game-jam/SKILL.md#L27-L32) |
| B — permitted build and export prep | [Workflow step 2](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/game-jam/SKILL.md#L33-L35) |
| C — one-sentence concept | [Workflow step 3](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/game-jam/SKILL.md#L36-L38) |
| D — one mechanic and one hook | [Workflow step 4](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/game-jam/SKILL.md#L39-L40) |
| E — 30-second playable loop | [Workflow step 5](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/game-jam/SKILL.md#L41-L42) |
| F — first-third playability gate | [Scope-creep failure rule](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/game-jam/SKILL.md#L97-L100) |
| G — playtest, cut, and freeze | [48-hour playtest, cut, and freeze blocks](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/game-jam/SKILL.md#L63-L73); [feature triage](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/game-jam/SKILL.md#L76-L84) |
| H — export and clean-build gate | [Shipping buffer](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/game-jam/SKILL.md#L43-L44); [pre-submission check](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/game-jam/SKILL.md#L86-L95) |
| I — uploaded and attached entry | [Submit-early step](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/game-jam/SKILL.md#L45-L47); [attachment check](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/game-jam/SKILL.md#L86-L95) |

### Edges

`A→B→C→D→E` follows workflow steps 1–5. `E→F→D` maps the explicit instruction to cut
features immediately when the loop is not playable by the first third. The pass path into
`G→H→I` follows the source's playtest, freeze, export, clean-test, page, and submission sequence.
The `H→G` failure edge is bounded to the source's freeze rule: fix only crashes and soft locks.
No connector is editorial inference.

## Game-asset production diagram mapping

### Nodes

| Node | Primary source mapping |
| --- | --- |
| A — inspect existing game and assets | [Workflow step 1](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/SKILL.md#L11-L15) |
| B — technical frame and visual system | [Workflow steps 2–3](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/SKILL.md#L16-L21); [brief contract](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/assets/art-direction-brief.md) |
| C — asset manifest | [Workflow step 4](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/SKILL.md#L22-L24); [manifest schema](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/assets/asset-manifest.json) |
| D — approved in-context visual target | [Workflow step 5](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/SKILL.md#L25-L28) |
| E — small related families | [Workflow step 6](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/SKILL.md#L29-L31) |
| F — deterministic normalization | [Workflow step 7](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/SKILL.md#L32-L34); [raster helpers](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/SKILL.md#L80-L98) |
| G — engine-native import | [Workflow step 8](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/SKILL.md#L35-L37) |
| H — context and technical gates | [Workflow step 9](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/SKILL.md#L38-L40); [quality gates](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/SKILL.md#L100-L117) |
| I — provenance and approved set | [Workflow step 10](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/SKILL.md#L41-L42); [recordkeeping fields](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/create-game-assets/references/provenance.md#L6-L20) |

### Edges

`A→B→C→D→E→F→G→H→I` preserves the source's ten-step order; B combines two adjacent
definition steps to respect the nine-node page limit. `H→E` maps the explicit instruction to
iterate on the source asset when context validation fails. The source's production-path table
branches inside E and F without changing the top-level order. No connector is editorial inference.

## Level blockout, teach, and test diagram mapping

### Nodes

| Node | Primary source mapping |
| --- | --- |
| A — locked player metrics | [Workflow step 1](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/SKILL.md#L33-L37) |
| B — whole-level blockout | [Workflow step 2](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/SKILL.md#L38-L40) |
| C — critical, golden, and optional paths | [Workflow step 3](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/SKILL.md#L41-L42); [path definitions](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/references/pacing-and-flow.md#L35-L45) |
| D — rising sawtooth pace | [Workflow step 4](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/SKILL.md#L43-L45); [pacing curve](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/references/pacing-and-flow.md#L6-L19) |
| E — introduce, develop, twist, test | [Workflow step 5](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/SKILL.md#L46-L48); [four-step teaching loop](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/references/pacing-and-flow.md#L21-L33) |
| F — gates and guidance | [Workflow step 6](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/SKILL.md#L49-L50); [gates and guidance](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/references/pacing-and-flow.md#L47-L73) |
| G — player observation | [Workflow step 7](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/SKILL.md#L51-L52) |
| H — complete blockout review gate | [Eight-item review checklist](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/references/pacing-and-flow.md#L84-L93) |
| I — dress the validated level | [Blockout-before-dress rule and workflow stop](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/SKILL.md#L13-L16); [only dress when it plays well](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/disciplines/level-design/SKILL.md#L51-L52) |

### Edges

`A→B→C→D→E→F→G` preserves the seven-step core workflow. `G→H` applies the source's
blockout checklist to the observed run. `H→B` maps “fix the blockout” when players get lost,
stuck, bored, or killed unfairly; `H→I` maps the explicit dress-only-when-it-plays-well rule. No
node or connector is editorial inference.

## Supporting skills

| Page | Observed in the source | Potential, inferred by this research |
| --- | --- | --- |
| Fast gameplay prototyping | `game-jam`, engine-core skills, genre skills | Playtest observation capture; prototype telemetry; decision-log maintenance |
| Game-jam delivery | `prototype-fast`, `itch-publish`, engine-core skills, genre skills | Rule capture; scope tracking; clean-build smoke testing; submission verification |
| Game-asset production | Optional `imagegen`, bundled raster helpers, engine import/rendering skills, UI, feel, shader, and audio skills | Visual-review facilitation; DCC cleanup; license snapshotting; import QA; asset-budget regression |
| Level blockout, teach, and test | Engine movement, input, tilemap, procedural generation, AI, and named genre skills | Metric capture; path-solvability checks; pacing visualization; observation capture; soft-lock regression |

Observed labels mean the frozen source names or ships the capability. Potential labels are Antiky's
decomposition and may not correspond to an installed skill.

## License, reuse, and evidence boundaries

- Apache-2.0 covers the repository's text, scripts, templates, and other contributions, subject to
  its notice and redistribution terms. It does not relicense an engine, service, game project,
  generated asset, font, sound, marketplace file, or external documentation.
- The asset manifest correctly leaves source/tool and license fields open. Its rights gate is a
  recordkeeping requirement, not a conclusion that an asset may ship.
- The source describes every skill as agent-readable, so the four pages are AI-assisted in the
  limited sense that an agent is instructed to run the process. No evidence shows autonomy,
  portability across agents, or an improvement caused by AI.
- The current README's “built to trust,” broad compatibility, and “build any game” presentation are
  source claims. This harvest does not repeat them as verified findings.
- The source's version pins, timelines, storefront limits, fees, and platform rules are mutable.
  Later publication of a deferred service or engine flow requires a fresh primary-source check.

## Direct outbound targets

Three direct primary-documentation URLs support deferred operative workflows and were added to
`targets.md` for later selection:

- https://itch.io/docs/butler
- https://partner.steamgames.com/doc/sdk/uploading
- https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project

Other outbound links were inspected but not queued. They are engine/API references, version pages,
license/provenance tools, skill-format/client documentation, package installers, the repository's
generated site, badges, or author/catalog surfaces. They support claims or setup; they are not
direct evidence for a distinct game-development pipeline. Broad Godot and Unity documentation URLs
were not substituted for the exact primary pages the source does not link.

## Verification record

### Commands and results

| Check | Command | Result |
| --- | --- | --- |
| Failing baseline | Assert the outcome, four pages, and Goal 02 intake row existed before editing | Failed as expected with exit 1 |
| Frozen tree | `git rev-parse HEAD HEAD^{tree}` and `git ls-files` in the target clone | Revision, tree, and 172-path inventory recorded above |
| Candidate history | `git log --follow` and `git blame --line-porcelain` on all four primary skill paths | Introduction, last-change commits, and prose authors recorded above |
| Route inventory | Enumerate every router/skill file and classify headings, ordered steps, feedback/gate terms, references, scripts, tests, and category | All 67 skill bodies plus router classified; exact grouped tree count reconciles to 172 |
| Mermaid | `for file in docs/pipelines/pipeline-*.md; do npx --yes @mermaid-js/mermaid-cli@11.16.0 -i "$file" -o "/tmp/$(basename "$file")"; done` | Passed: all seven pages contained one chart and rendered without a parser error |
| Links | Run `npx --yes markdown-link-check@3.15.0` over `docs/pipelines/*.md`, this outcome, Goal 02, and Goal 80 | Passed: 56 library links, 74 outcome links, and nine links in each goal file; zero failures |
| Page contract | Check required headings, six evidence-capsule fields, one chart, and no more than nine unique main nodes per page | Passed: one chart each; fast prototype has eight nodes and the other new pages have nine |
| Cold reader | Review trigger, ordered loop, feedback gate, outputs, and evidence level on all four new pages | Passed on all five items for all four pages |
| Rejected outputs | Confirm the only new `pipeline-gamedev-skills-*` paths are the four declared accepted pages | Passed: four files, each admitted above; no deferred, rejected, or subsumed page or row exists |
| Intake and queue | Compare Goal 02's row with the candidate ledger; check URL-only queue and duplicates | Passed: six eligible names match; exclusions summarize ineligible records; three URL-only additions and zero duplicate URLs |
| Repository hygiene | `git diff --check` | Passed with no output; unrelated `brometal-patching` deletion remains untouched |

### Completion audit

| Requirement | Evidence | Status before final checks |
| --- | --- | --- |
| All four decisions | Admission matrix and exact-path disposition above | Pass |
| Full target inspection | Frozen 172-artifact inventory, all-route classification, histories, and test boundary | Pass |
| Reconstructable accepted loops | Four node/edge mapping sections above | Pass |
| No router, inventory, gameplay loop, or capability list promoted | Rejection ledger and alternative-interpretation audit | Pass |
| Observed and potential support separated | Page sections and consolidated table above | Pass |
| Evidence labels match observation | Source-documented only; negative outcome evidence recorded | Pass |
| Deferred work complete | Six eligible stable candidates and all ineligible subflows recorded | Pass |
| Direct children queued without research prose | Three URL-only targets identified above | Pass |
| Goal 80 handoff | Six eligible names and exclusions match the intake row | Pass |
| Mechanical and cold-reader checks | Commands and results above | Pass |
