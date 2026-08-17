# Thrixel harvest

## Result

The refreshed target supports one of the two declared pages:

- [Thrixel Goal to Game pipeline](../../../pipelines/pipeline-thrixel-goal-to-game.md)

The source refresh showed that the declared asset-to-engine candidate is not the source's top-level
pipeline. It is the central subloop inside the named Goal to Game workflow, which also covers the
game request, tool and engine checks, parallel system construction, engine integration, runtime
review, and reporting. The source-faithful end-to-end workflow passes all six admission gates and is
published under the source's name.

The deterministic Three.js build is rejected as a separate page: its detailed process and kit are
public, but every measured result is attributed only to an unnamed “reference project.” Goal 01
explicitly requires that page to name the actual source of that workflow. No deterministic-build
page or index entry was created.

Admission means that the Goal to Game loop is auditable. It does not establish Thrixel's effectiveness,
recommend the paid service, validate its quality claims, or make its engine-specific branches
portable.

## Frozen source

| Field | Frozen value |
| --- | --- |
| Canonical repository | [`thrixel/goal-to-game`](https://github.com/thrixel/goal-to-game) |
| Revision | [`db2fd7dc7260f1bb973903b9c0c943ecd2111ac9`](https://github.com/thrixel/goal-to-game/tree/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9) |
| Revision author/date | Sining `<sining@thrixel.com>`; 2026-08-15T22:00:11Z |
| Retrieval date | 2026-08-16 |
| History inspected | Six commits, 2026-08-03 through 2026-08-15; no tags |
| Recorded authors | Rana Hanocka; Sining under two email addresses |
| Root license | [Apache License 2.0](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/LICENSE) |
| Service terms | [Thrixel Terms of Service](https://www.thrixel.com/terms-of-service), last updated 2026-08-03 |

The source was inspected from a partial clone whose checked-out tree was complete. Missing
historical blobs were fetched only to trace path history. No target skill, package, example,
proprietary endpoint, or paid service was installed or executed.

The core skill, Unity branch, and Three.js kit first appeared together in
[`5a3245f`](https://github.com/thrixel/goal-to-game/commit/5a3245fecb0a0513dec2d6b37f0666d108695973)
on 2026-08-03. The Three.js method has only that initial code release plus the later plugin-path
move in its history. The asset skill later received style-channel changes in
[`b8cb176`](https://github.com/thrixel/goal-to-game/commit/b8cb17613543f65fe0e5ad940547bc4f08520284)
and scale/axis guidance at the frozen revision. History establishes authorship, not validation.

## Complete source inventory

All 48 tracked files at the frozen revision were included in the repository inspection. The
semantic audit covered the following surfaces:

| Surface | Inspected artifacts | What was checked |
| --- | --- | --- |
| Repository boundary | `README.md`, `LICENSE`, `.gitignore`, `.mcp.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` | Product claims, entry route, connector dependency, authorship, package metadata, license |
| Shared skill | `skills/goal-to-game/SKILL.md`, `SetupAndInstallationFlow.md` | Account and credit gate, asset planning, path choice, generation, feedback, style, grouping, export handoff, setup failures |
| Unity route | `engines/unity.md` | FBX export, import inspection, multi-angle and play-mode loops, concurrency and project isolation |
| Three.js method | `engines/threejs/threejs.md`, `PROCESS.md`, `PITFALLS.md`, `templates/ARCHITECTURE.md`, `templates/subsystem.js` | Phase order, artifacts, gates, review, performance, determinism, stopping, reference-project claims |
| Runtime kit | `lib/config.js`, `dispose.js`, `engine.js`, `index.js`, `input.js`, `lights.js`, `pool.js`, `prewarm.js`, `registry.js`, `rng.js`, `selftest.js`, `shots.js` | Whether named process artifacts and deterministic hooks exist in code |
| Harness | `tools/baseline.mjs`, `capture.mjs`, `contactsheet.mjs`, `crop.mjs`, `imagediff.mjs`, `pixelstats.mjs`, `profile.mjs`, `smoke.mjs`, `tools/lib/harness.mjs` | Capture, measurement, diff, profiling, blank-frame, context-loss, and failure gates |
| Worked example | `example/index.html`, `main.js`, `shots.js`, `feeltest.mjs`, and `systems/{fx,player,render,ui,world}.js` | Concrete use of the runtime, shot API, input bench, diagnostics, and deterministic example path |
| Package boundary | `package.json`, `package-lock.json`, `vite.config.js`, engine `.gitignore` | Script entry points and locked toolchain; Three.js 0.180.0, Playwright 1.62.0, pngjs 7.0.0, Vite 7.3.6 |

The code inventory proves that the kit contains the named tools. It does not prove the claimed
55,000-line source project, critic rounds, score changes, frame stalls, or production suitability.

## Primary service refresh

The repository is open source, but the asset workflow depends on the proprietary Thrixel service.
The following current first-party sources were inspected on 2026-08-16:

| Constraint | Primary-source result |
| --- | --- |
| Authentication and concurrency | [Getting Started](https://thrixel.com/docs/getting-started) requires an API key for submissions and lists default limits of three active jobs, ten hourly requests, and fifty daily requests, while warning that plans may differ. The frozen skill correctly requires live account values rather than remembered numbers. |
| Credits | The frozen [README](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/README.md#L203-L219) and skill make generation credit-dependent. Pricing and allowances are mutable, so this outcome records no price. No credits were spent. |
| Generation branches | [Sculptor](https://thrixel.com/docs/sculptor) accepts either text or one image and returns a single dense mesh. [Detailer](https://thrixel.com/docs/detailer) documents optional part preservation and calls it experimental. |
| Style and reference state | [Projects and Sources](https://thrixel.com/docs/organize) applies stored text sources to later project submissions. [Image Hub](https://thrixel.com/docs/imagehub) stores reusable reference-image IDs. |
| Targeted revision | [Edit](https://thrixel.com/docs/edit) accepts a parent submission and optional node names, holding unselected parts bit-identical according to the vendor contract. |
| Triangle reduction | [Remesh](https://thrixel.com/docs/remesh) changes triangle count without regenerating texture and restricts part-focused remesh to part-preserving results. |
| Export | [Download](https://thrixel.com/docs/download) provides GLB immediately and converts FBX, OBJ, STL, and USDZ on demand. The Unity route specifically requires FBX. |
| Asset rights and attribution | [Terms §3.3](https://www.thrixel.com/terms-of-service#3-content-and-intellectual-property-rights) makes rights depend on the plan at generation time. Free-plan objects are CC BY 4.0 and require Thrixel attribution; paid-plan users retain rights to their objects. Neither tier receives Thrixel's excluded platform IP. |
| Preservation and risk | [Terms §§3.3, 6.2, and 7.1](https://www.thrixel.com/terms-of-service) disclaim uniqueness, copyrightability, accuracy, fitness, and data preservation. Users must download assets they need to retain. |

The service pages and testimonials are vendor evidence. They were not counted as independent
validation. The API was not called, and no current endpoint behavior was benchmarked.

## Admission decisions

| Gate | Goal to Game | Deterministic Three.js build |
| --- | --- | --- |
| 1. Observable order | Pass: game request, engine/tool check, plan assets, check account, generate assets with systems, integrate, review, report | Pass: contract, spine, shots, subsystems, review, performance, report |
| 2. Artifacts, gates, feedback, branches, or stops | Pass: asset list, project/style sources, game systems, captures, scoped-edit loop, grouped exports, runtime gates, gap report | Pass: architecture contract, shot list, captures, smoke gate, pixel gate, profiler, plateau stop |
| 3. Traceable author and date | Pass: frozen revision and path history | Pass: frozen revision and path history |
| 4. Concise diagram without invented stages | Pass: nine main nodes preserve the shared flow and its engine-specific runtime branches | Pass in structure alone |
| 5. Facts, contradictions, and inference stay distinct | Pass: service constraints and image-input conflict can remain explicit | Pass in structure alone |
| 6. Direct audit links | Pass: frozen skill plus current API and Terms | **Fail:** the measured source workflow is only an unnamed “reference project” with no repository, immutable artifact, author, or direct audit link |
| Goal-specific reference-source requirement | Not applicable | **Fail:** `threejs.md` names only an FPS description and aggregate measurements, not the actual reference source required by Goal 01 |
| Decision | **Admit** | **Reject** |

### Evidence signal

The admitted page is **Source-documented**. It is not labeled Author-practiced: the repository says
its Claude steps were tested, but it includes no public, attributable asset set or game artifact
showing the author applying this complete asset loop. Community showcases and testimonials do not
establish author practice. Study-observed, Production-used, and Independently validated evidence
were not found.

The deterministic kit contains a worked example, so its implementation surface is more than prose.
That example still does not identify or reproduce the project from which the workflow and measured
results were reportedly distilled. A public kit cannot substitute for the missing reference source
under this goal's explicit test.

## Candidate disposition

Only the two declared candidates could be published. Full-repository inspection exposed narrower
coherent workflows; they are deferred for Goal 80 rather than admission-tested or published here.

| Candidate | Disposition | Reason |
| --- | --- | --- |
| Thrixel Goal to Game | Admitted | The refreshed declared candidate is a source-named end-to-end workflow containing the asset loop plus engine/system construction, runtime verification, and reporting |
| Thrixel deterministic Three.js build | Rejected | Fails direct auditability and the goal-specific source requirement because its claimed measured reference project is unnamed |
| Unity imported-asset inspection and play-mode validation | Deferred | Unity file provides initial-download and running-game inspection loops with screenshots and explicit defects; outside the declared publication paths |
| Three.js capture-measure-fix review | Deferred | `PROCESS.md` gives a capture→contact sheet→critique and measurement→fix→smoke→recapture loop with a plateau stop; outside the declared publication paths |
| Three.js pixel-gated performance optimization | Deferred | Determinism→baseline→attribute→one gated optimization→three-run measurement is explicit and distinct enough for later admission testing |
| Three.js gameplay-relationship bench | Deferred | The method and worked `feeltest.mjs` drive real input and assert runtime relationships that screenshots and smoke checks miss; outside this batch |

The following inspected flows are not additional deferred pipeline candidates:

| Inspected flow | Exclusion |
| --- | --- |
| Installation, login, connector registration, and self-update | Setup and skill-maintenance procedures outside the game-development library boundary |
| Project-style propagation | Constituent of the admitted Goal to Game page, not a separate publication in this harvest |
| Hero-asset in-scene refinement | The admitted page's central feedback loop; a second page would duplicate it |
| Part grouping and engine import | The admitted page's required terminal phase; a separate page would split one source workflow |
| Credit allocation and concurrency scheduling | Service constraints embedded in the admitted flow, not independently complete workflows |
| Sequential ownership for coupled Three.js concerns | A rule and comparison inside the rejected deterministic-build source; the same unnamed reference prevents an evidence upgrade here |

## Image-input contradiction

The contradiction remains unresolved and visible:

- The frozen skill first says the service turns [text or image prompts into meshes](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L380-L391).
- It later says [never pass an image and use text only on every endpoint](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L439-L466).
- The same file says passing or reusing an image avoids an image-generation charge and instructs
  Sculptor to receive an image in the [style-reference section](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L509-L539).
- Current [Sculptor](https://thrixel.com/docs/sculptor), [Image Hub](https://thrixel.com/docs/imagehub),
  and [Detailer](https://thrixel.com/docs/detailer) documentation accepts image input.

The published page does not choose one source statement as secretly authoritative. It tells the
reader to treat the frozen text-only rule as unsettled and verify the current endpoint contract.

## Goal to Game diagram mapping

### Nodes

| Node | Primary source mapping |
| --- | --- |
| A — game request, engine, and tools | [README request and tool-entry route](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/README.md#L109-L130); [engine selection](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L368-L378) |
| B — rank assets; record scale and moving parts | [Required asset-list order](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L115-L137); [path and scale decisions](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L393-L466) |
| C — live plan, limits, and asset rights | [Live pricing/account requirement and free-plan stop](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L134-L168); [current rate limits](https://thrixel.com/docs/getting-started#rate-limits); [plan-specific object rights](https://www.thrixel.com/terms-of-service#3-content-and-intellectual-property-rights) |
| D — project, style, and paths | [Project start/resume and three style channels](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L484-L539); [moving-part path gate](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L393-L437) |
| E — assets and game systems | [Bounded asset waves while writing systems](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L541-L545); [source division between assets and game logic](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L99-L107) |
| F — assemble, inspect, and fix one issue | [Thumbnail and in-context hero review loop](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L547-L565); [Three.js measured correction](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/PROCESS.md#L8-L24) |
| G — inspect, group, export, and import | [Grouping order, pivot and failure rules](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/SKILL.md#L567-L633); [Unity FBX import](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L43-L67); [export API](https://thrixel.com/docs/download) |
| H — engine runtime gate | [Unity inspection and play-mode loops](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/unity.md#L18-L42); [Three.js review, smoke, and plateau gate](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/PROCESS.md#L8-L24) |
| I — playable game and report | [Three.js honest report output](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/threejs.md#L171-L179); [stop and report contract](https://github.com/thrixel/goal-to-game/blob/db2fd7dc7260f1bb973903b9c0c943ecd2111ac9/skills/goal-to-game/engines/threejs/PROCESS.md#L170-L180) |

### Edges

`A→B→C` follows the request into the required first asset plan and its live-account check. `C→D`
maps the free-plan hard stop before the project/style/path setup. `D→E` maps that setup into the
source's explicit overlap of bounded generation with game-system construction. `E→F→G` moves
returned assets through in-scene correction and the ordered detail, reduction, grouping, export, and
import steps. `G→H` enters the selected engine's runtime checks. `H→F` is the shared literal feedback
shape: Unity repeats scripted play-mode review, while Three.js fixes, smokes, and recaptures. `H→I`
maps a passing run to the game plus the Three.js branch's required honest report. No diagram node or
connector is editorial inference.

## Supporting skills

| Page | Observed in the source | Potential, inferred by this research |
| --- | --- | --- |
| Goal to Game | Thrixel MCP account/project/generation/edit/inspect/group/reduce/download tools; Unity CLI and play mode; Three.js capture, measurement, smoke, diff, and profiler tools | Asset-list prioritization; art-direction authoring; reference comparison; mesh-budget planning; engine-import QA; gameplay-test authoring; attribution tracking |

Potential skills may not exist. They are capability notes, not evidence that the source or this
repository implements them.

## Proprietary, license, and portability boundaries

- Apache-2.0 covers the repository text and code. It does not license access to Thrixel's service,
  models, algorithms, or other excluded IP.
- Free-plan exports require Thrixel attribution under CC BY 4.0. Paid-plan object rights attach at
  generation time. Users remain responsible for uploaded-content rights and generated-object risk.
- User prompts receive a broad service-operation and improvement license under the current Terms.
  Paid-plan objects are excluded from training according to those Terms; free-plan objects are not.
- The service can change limits, features, fees, or retention. The source's live account and pricing
  calls are operational requirements, not optional freshness advice.
- Concurrency is account-wide in the Unity multi-build branch. Parallel generation does not imply
  unlimited independent workers.
- Export availability does not prove engine-neutral workflow portability. Unity requires FBX and
  play-mode inspection in the source; Three.js has a separate runtime and review method.
- Detailer part preservation is experimental. Grouping retains moving parts but returns geometric
  centers, so turret or head pivots may need engine-side parent transforms.
- “AAA,” “production-ready,” engine-ready, quality, cost, and performance claims remain vendor or
  author claims. No external system was rerun and no benchmark was performed.

## Direct outbound targets

No new pipeline-research target was added to `targets.md`.

The repository's direct outbound links are Thrixel's own product/docs surfaces, tool installation
sources, Claude documentation, the MCP specification, and a README animation asset. They are
supporting references or setup dependencies, not newly discovered candidate pipeline sources. The
Three.js material provides no URL for its unnamed reference project, so there is no auditable child
target to queue. This negative result prevents an invented or search-guessed reference from entering
the recursive graph.

## Verification record

### Commands

| Check | Command | Result |
| --- | --- | --- |
| Complete pipeline Mermaid parse | `for file in docs/pipelines/pipeline-*.md; do npx --yes @mermaid-js/mermaid-cli@11.16.0 -i "$file" -o "/tmp/$(basename "$file")"; done` | Passed: all three pipeline pages contained one chart and rendered without parser errors |
| Complete pipeline link audit | `for file in docs/pipelines/*.md; do npx --yes markdown-link-check@3.15.0 "$file"; done` | Passed: 31 links checked, zero failures; the template intentionally has no links |
| Goal 01 outcome links | `npx --yes markdown-link-check@3.15.0 docs/objectives/skill-process/research/06-thrixel-harvest.md` | Passed: 37 links checked, zero failures |
| Goal and intake links | Run the same pinned link checker on the archived Goal 01 file and `execute-goal-80.md` | Passed: eight links checked in each file, zero failures |
| Page shape | Count unique Mermaid node IDs, evidence-capsule fields, pipeline files, and index rows | Passed: nine main nodes, six required capsule fields, three pipeline files, three index entries |
| Rejected output | `test ! -e docs/pipelines/pipeline-thrixel-deterministic-threejs-build.md` | Passed: rejected page absent and no index entry exists |
| Target queue | Extract URL rows, sort, and run `uniq -d` | Passed: zero duplicate URLs; no new target was supported |
| Prose proxy | Run anti-slop `prose_lint.mjs` over all changed Markdown documents | Passed: zero findings |
| Whitespace | `git diff --check` | Passed with no output |

The prose checker covers named unsupported-claim, estimate, metaphor, and structural-tic patterns. It
does not determine whether a claim is true. A separate judgement audit checked every diagram node
and edge against the mapping above, verified that proprietary and engine-specific claims remain
bounded, and confirmed that the page exposes the trigger, order, feedback path, outputs, evidence
signal, and limit without opening this outcome.

### Completion audit

| Requirement | Evidence | Result |
| --- | --- | --- |
| Complete source inventory and candidate ledger | Forty-eight-file grouped inventory plus every declared, deferred, constituent, and non-candidate disposition above | Pass |
| Every accepted node and edge mapped | Nine-node table and explicit edge paragraph above | Pass; no inferred connector |
| Contradiction visible | Four-location image-input record above and warning on the published page | Pass |
| Proprietary, credit, concurrency, export, and engine constraints separated | Primary service refresh and boundaries above | Pass |
| Deterministic reference named or rejected | Unnamed reference recorded as the exact rejection reason; no page exists | Pass |
| Concise cold-reader page | Evidence capsule, nine-node loop, six run steps, outputs, skills, boundaries, and direct sources | Pass |
| Index and target queue correct | One admitted Goal to Game row; no rejected row; target queue unchanged and duplicate-free | Pass |
| Goal 80 handoff matches outcome | Goal 01 row lists the same four deferred candidates and exclusions as this ledger | Pass |
