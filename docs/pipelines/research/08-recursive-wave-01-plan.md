# Recursive wave 1 selection plan

## Result

Recursive wave 1 contains four targets. Goal 04 must inspect them in the execution order frozen
below and may write only the four proposed pipeline files named in this plan. Selection does not
admit any page. A target or candidate that fails deep inspection produces a recorded rejection and
no substitute target or filename.

| Selection rank | Target | Why it survived shallow selection | Goal 04 execution order |
| ---: | --- | --- | ---: |
| 1 | [`scottstts/Pearl-Sea-Park`](#target-1-sea-park) | Public Codex and Claude instructions govern a real game repository; a dependency-ordered plan, agent memory, runtime checks, and human feedback provide distinct end-to-end evidence | 1 |
| 2 | [itch.io Butler documentation](#target-3-itchio-butler) | A frozen AI-agent publishing skill points to first-party documentation with preview, channel, version, upload, status, and update artifacts; the documentation also has an immutable source revision | 3 |
| 3 | [SteamPipe uploading documentation](#target-4-steampipe) | A frozen AI-agent release skill points to Valve's ordered depot/build procedure, preview and beta gates, manifests, BuildIDs, logs, testing, and release controls | 4 |
| 4 | [Unreal Engine packaging documentation](#target-2-unreal-engine-packaging) | A frozen AI-agent packaging skill points to Epic's build→cook→stage→package→run procedure, with logs, failure states, packaged artifacts, and a runtime gate | 2 |

**Retrieval date:** 2026-08-17.

The wave does not select six targets merely because six are allowed. The remaining candidates are
examples, technical implementations, capability documentation, out-of-scope non-game work, or
inaccessible surfaces. None exposes a stronger distinct AI-assisted game-development loop at
selection depth.

## Selection boundary and method

The complete input is the direct outbound candidate record from the three completed harvests:

- [Scott Three.js direct outbound targets](05-scott-threejs-harvest.md#direct-outbound-targets);
- [Thrixel's negative outbound result](06-thrixel-harvest.md#direct-outbound-targets); and
- [`gamedev-skills` direct outbound targets](07-gamedev-skills-harvest.md#direct-outbound-targets).

No URL from the broader queue was promoted without one of those edges. The inspection remained
shallow: HTTP resolution, repository identity and default branch, top-level README, license signal,
and files whose names indicate agent instructions, plans, process, notes, tests, or validation.
Selected surfaces received only enough additional reading to state expected artifacts and
verification questions. This is not a full harvest and makes no admission claim.

Candidates were ranked in this order:

1. explicit AI or agent participation in a game-development process;
2. observable order plus named artifacts, gates, feedback, branches, or stops;
3. direct provenance, an immutable source where available, and auditable authorship;
4. distinct workflow coverage rather than another implementation of an existing page; and
5. bounded deep-harvest cost.

Two alternatives were checked. An empty manifest was rejected because four candidates have direct
edges and concrete expected evidence. Selecting every apparently useful graphics repository was
also rejected because an implementation, demo, or API guide is not an operative AI-assisted
development loop.

## One-hop source graph and complete disposition ledger

All 35 recorded URLs are unique. Canonicalization found no duplicate identities. The itch.io URL
resolves to the same path with a trailing slash; that normalized form is used below. No change to
[`targets.md`](../TARGETS.md) is needed.

### Scott Three.js target

Every edge in this table comes directly from the completed
[Scott harvest](05-scott-threejs-harvest.md#direct-outbound-targets). A `200` result means the URL
resolved during a GET check on 2026-08-17. Repository names are the canonical identities returned
by the hosting service.

| # | Canonical target | URL check | Disposition | Shallow evidence and exact decision |
| ---: | --- | --- | --- | --- |
| S01 | [`perplexdotgg/mecs-tower-defense-example`](https://codeberg.org/perplexdotgg/mecs-tower-defense-example) | `200` | Reject | A runnable MECS/Three.js tower-defense example with code and assets. The README says it is easy for AI tools to understand, but gives no AI development order, artifact gate, or feedback loop. |
| S02 | [`sabosugi/RNKpmQj`](https://codepen.io/sabosugi/pen/RNKpmQj) | `403` | Defer — target only | The recorded CodePen URL returned `403` on 2026-08-17, so identity and workflow evidence could not be inspected reproducibly. This is an inaccessible target lead, not a deferred pipeline candidate. |
| S03 | [`Faraz-Portfolio/demo-2023-rain-puddle`](https://github.com/Faraz-Portfolio/demo-2023-rain-puddle) | `200` | Reject | GPL-3.0 rain/puddle implementation and deploy workflow. No agent instruction or project-level development loop was found. |
| S04 | [`N8python/diamonds`](https://github.com/N8python/diamonds) | `200` | Reject | MIT source example with no README at the common paths and no named agent/process artifact in the shallow tree. The parent edge establishes mechanism provenance, not a pipeline. |
| S05 | [`SkyeShark/threejs-silhouette-pom`](https://github.com/SkyeShark/threejs-silhouette-pom) | `200` | Reject | MIT technical addon and procedural demo. Its README explains use and rendering constraints, not an AI-assisted project workflow. |
| S06 | [`YasirAwan4831/holographic-shader-visualizer-three.Js`](https://github.com/YasirAwan4831/holographic-shader-visualizer-three.Js) | `200` | Reject | Feature, architecture, setup, and live-demo inventory. No repository license or operative agent loop was observed. |
| S07 | [`achrefelouafi/GrassSystemThreeJS`](https://github.com/achrefelouafi/GrassSystemThreeJS) | `200` | Reject | MIT grass-system demo with setup and usage instructions. It does not place AI or an agent inside a development process. |
| S08 | [`achrefelouafi/OceanThreejs`](https://github.com/achrefelouafi/OceanThreejs) | `200` | Reject | MIT renderer whose README explains architecture, algorithms, and controls. It is an implementation source, not a workflow source. |
| S09 | [`achrefelouafi/SnowSystemThreeJS`](https://github.com/achrefelouafi/SnowSystemThreeJS) | `200` | Reject | MIT effect demo with a short inventory and run instruction; no development order or feedback gate was found. |
| S10 | [`achrefelouafi/VegetationGeneratorThreeJS`](https://github.com/achrefelouafi/VegetationGeneratorThreeJS) | `200` | Reject | MIT generator demo with controls and implementation explanation; no agent workflow was found. |
| S11 | [`bandinopla/threejs-easyfire`](https://github.com/bandinopla/threejs-easyfire) | `200` | Reject | MIT library/API instructions for setup, colliders, pipeline integration, and rendering. Trial-and-error tuning alone does not make this a project-level AI workflow. |
| S12 | [`dedekpo/stylized-scene`](https://github.com/dedekpo/stylized-scene) | `200` | Reject | MIT scene implementation. It bundles capability skills and a generic `grill-me` interview skill, but the repository exposes no evidence-led operative flow connecting those skills to this build. A skill inventory is insufficient. |
| S13 | [`dgreenheck/ez-tree`](https://github.com/dgreenheck/ez-tree) | `200` | Reject | MIT procedural-tree library and parameter/API reference. Build and publish automation is repository maintenance, not an AI-assisted game-development loop. |
| S14 | [`gioeledallapozza/FFTOCEAN`](https://github.com/gioeledallapozza/FFTOCEAN) | `200` | Reject | FFT ocean feature demo with setup and technology inventory. No license or agent process was observed. |
| S15 | [`jeantimex/geospatial`](https://github.com/jeantimex/geospatial) | `200` | Reject | MIT atmosphere demo with build instructions and source credits. It has no ordered AI-assisted development process. |
| S16 | [`jeantimex/threejs-water`](https://github.com/jeantimex/threejs-water) | `200` | Reject | Water simulation implementation with technical concepts and pitfalls but no observed license or agent workflow. |
| S17 | [`momentchan/r3f-gist`](https://github.com/momentchan/r3f-gist) | `200` | Reject | Source example with no README at common paths, no license signal, and no named agent/process artifact in the shallow tree. |
| S18 | [`momentchan/r3f-procedural-grass`](https://github.com/momentchan/r3f-procedural-grass) | `200` | Reject | MIT procedural-grass demo with component documentation and build setup; no agent or feedback-led project process was found. |
| S19 | [`owenyuwono/poseidon`](https://github.com/owenyuwono/poseidon) | `200` | Reject | Real-time FFT-ocean implementation with run and feature documentation. It has no license signal or AI workflow surface. |
| S20 | [`playdeadgames/temporal`](https://github.com/playdeadgames/temporal) | `200` | Reject | MIT Unity temporal anti-aliasing implementation and integration instructions. It is a technical capability source, not a development pipeline. |
| S21 | [`rocksdanister/rain`](https://github.com/rocksdanister/rain) | `200` | Reject | Rainy-window wallpaper implementation with no repository license signal or agent-development contract. |
| S22 | [`scottstts/Elysium-Mars-Park`](https://github.com/scottstts/Elysium-Mars-Park) | `200` | Defer — target only | Detailed plans, system documents, build notes, headless checks, and a first-person experience make it strong implementation evidence. Shallow inspection found no direct agent instruction, and its validation/graphics coverage overlaps the two existing Three.js pages. Reconsider only if a direct AI-use artifact supplies distinct order. |
| S23 | [`scottstts/Friends-Apartment`](https://github.com/scottstts/Friends-Apartment) | `200` | Reject | Procedural scene plus architecture/system documentation, but no named agent instruction or distinct feedback-led development process was found. |
| S24 | [`scottstts/Interstellar.three.js`](https://github.com/scottstts/Interstellar.three.js) | `200` | Reject — scope | Its Codex instructions and per-scene checklist are explicit, but the source calls the product a “cinematic, non-game” application. The library scope is game development. |
| S25 | [`scottstts/MyCraft`](https://github.com/scottstts/MyCraft) | `200` | Reject | The README documents a game codebase and general development workflow, but the shallow tree exposes no agent contract tying that order to AI-assisted practice. |
| S26 | [`scottstts/Pearl-Sea-Park`](https://github.com/scottstts/Pearl-Sea-Park) | `200` | **Select as Target 1** | Public Codex/Claude rules, a staged game plan, persistent agent notes, automated checks, runtime inspection, and owner screenshot feedback expose a distinct auditable candidate. |
| S27 | [`scottstts/Stellar`](https://github.com/scottstts/Stellar) | `404` | Defer — target only | The recorded repository returned `404` on 2026-08-17. No replacement URL was guessed. This is an inaccessible target lead, not a pipeline candidate. |
| S28 | [`scottstts/mysite_React`](https://github.com/scottstts/mysite_React) | `200` | Reject — scope | The repository has Codex instructions, but it is a personal website rather than game development. |
| S29 | [`siliconjungle/inkwell-webgpu-flowers`](https://github.com/siliconjungle/inkwell-webgpu-flowers) | `200` | Reject — already-covered coverage | MIT renderer with a reproducible benchmark and validation artifacts, but no agent process. Its visual/performance verification would repeat existing validation coverage without satisfying the AI scope rule. |
| S30 | [`takram-design-engineering/three-geospatial`](https://github.com/takram-design-engineering/three-geospatial) | `200` | Reject | MIT geospatial-rendering libraries and development commands. Tests and CI establish library behavior, not an AI-assisted game workflow. |
| S31 | [`takuma-hmng8/frozen`](https://github.com/takuma-hmng8/frozen) | `200` | Reject | Visual-effect project with setup and customization instructions but no license signal, agent contract, or project feedback loop. |
| S32 | [`vibe-stack/procedural-bank`](https://github.com/vibe-stack/procedural-bank) | `200` | Reject | The public surface is a Vite template and deploy workflow; it does not expose an AI-assisted game-development process. |

### Thrixel target

The completed [Thrixel harvest](06-thrixel-harvest.md#direct-outbound-targets) records **no direct
pipeline-research child**. Its outbound URLs are product documentation, setup dependencies, and
supporting references. The claimed deterministic Three.js reference project remains unnamed, so
this plan does not invent a provenance edge or substitute a search result. This negative parent
node has zero candidate edges.

### `gamedev-skills` target

Every edge below comes directly from the completed
[`gamedev-skills` harvest](07-gamedev-skills-harvest.md#direct-outbound-targets). All three URLs
resolved on 2026-08-17. The AI-agent context remains frozen in the parent repository at revision
[`9ca5296b219049c5b68494e1f3c274ead6d727b3`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/9ca5296b219049c5b68494e1f3c274ead6d727b3).

| # | Canonical target | URL check | Disposition | Shallow evidence and exact decision |
| ---: | --- | --- | --- | --- |
| G01 | [itch.io Butler manual](https://itch.io/docs/butler/) | `200`; normalized trailing slash | **Select as Target 3** | The parent `itch-publish` agent workflow and first-party manual jointly expose preview→push→status→update artifacts and an immutable documentation source. |
| G02 | [Valve SteamPipe uploading guide](https://partner.steamgames.com/doc/sdk/uploading) | `200` | **Select as Target 4** | The parent `steam-publish` workflow and Valve guide jointly expose account/permission gates, depots, VDF scripts, preview/test paths, manifests, BuildID, logs, branches, and release controls. |
| G03 | [Epic packaging guide](https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project) | `200` | **Select as Target 2** | The parent `unreal-packaging` workflow and Epic's Unreal Engine 5.8 guide jointly expose build configuration, cook/stage/package operations, logs, failure states, packaged files, and runtime testing. |

## Frozen Goal 04 manifest

This section is the complete authority for Goal 04. The allowed target set is exactly T1–T4, and
the allowed output set is exactly the four paths in the table. The filenames follow
`pipeline-<group-name>-<name>.md` and do not collide with any file under `docs/pipelines/` as of
2026-08-17.

| Execution order | ID | Exact allowed target | Frozen revision or artifact | Proposed candidate | Exact allowed output filename |
| ---: | --- | --- | --- | --- | --- |
| 1 | T1 | `https://github.com/scottstts/Pearl-Sea-Park` | `888fc57b817514049b5fb33b0a3e115b585de067` | Sea Park dependency-ordered agent build | `docs/pipelines/pipeline-pearl-sea-park-staged-agent-build.md` |
| 2 | T2 | `https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project` | Live Unreal Engine 5.8 page; no immutable page revision exposed. AI wrapper frozen at parent revision `9ca5296…` | Unreal package and runtime validation | `docs/pipelines/pipeline-unreal-package-runtime-validation.md` |
| 3 | T3 | `https://itch.io/docs/butler/` | Manual source at `itchio/butler@0c9a730a9305fc9d23724e28ce0e4a5b01d048ee` | itch.io Butler publish and update | `docs/pipelines/pipeline-itchio-butler-publish-update.md` |
| 4 | T4 | `https://partner.steamgames.com/doc/sdk/uploading` | Live Steamworks page; no immutable page revision exposed. AI wrapper frozen at parent revision `9ca5296…` | SteamPipe build and release | `docs/pipelines/pipeline-steamworks-steampipe-build-release.md` |

Every target has one proposed page, below the two-page per-target cap. If deep inspection renames a
candidate, Goal 04 may record the renamed or rejected candidate but may not invent a different
filename. Any coherent overflow candidate is deferred in the wave outcome; it receives no page in
this wave.

## Target 1: Sea Park

| Field | Frozen selection value |
| --- | --- |
| Canonical target | [`scottstts/Pearl-Sea-Park`](https://github.com/scottstts/Pearl-Sea-Park) |
| Parent relationship | Direct author-project edge in the [Scott harvest](05-scott-threejs-harvest.md#direct-outbound-targets); the parent source ledger maps author projects to the Three.js skill family |
| Frozen revision | [`888fc57b817514049b5fb33b0a3e115b585de067`](https://github.com/scottstts/Pearl-Sea-Park/tree/888fc57b817514049b5fb33b0a3e115b585de067), authored and committed by `scott` on 2026-07-25T22:39:22Z |
| Shallow inspected surface | [Codex rules](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/.codex/AGENTS.md), [Claude rules](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/.claude/CLAUDE.md), [implementation plan](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/plan.md), [agent notes](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md), and [opening-day verification record](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/opening-day.md) |
| Expected artifacts | Owner-approved design and package decisions; S0–S14 dependency stages and their checkpoints; modular code and system documents; append-oriented agent memory; lint/typecheck/build results; deterministic postcard/pass views; runtime inspection state; automated interaction/ride checks; owner screenshot feedback and recorded corrections |
| License and provenance risk | GitHub metadata and the complete shallow tree expose no repository license. Goal 04 must treat code, text, and assets as all-rights-reserved unless a deeper artifact states otherwise; cite and paraphrase only. Source claims such as “production-quality” or “AAA” are not outcome evidence. |
| Proposed page | `docs/pipelines/pipeline-pearl-sea-park-staged-agent-build.md` — one end-to-end page; no second candidate |

### Candidate T1-C1: Sea Park dependency-ordered agent build

| Admission criterion | Observable evidence Goal 04 must find |
| --- | --- |
| 1. Observable order | The frozen agent rules must actually route work through the plan, and history/notes must show the dependency stages or task loop being followed rather than only listed aspirationally. Grouping S0–S14 into at most nine diagram nodes must preserve their direction. |
| 2. Artifacts, gates, feedback, branches, or stops | Stage checkpoints, modular code/docs, agent memory, lint/typecheck/build results, deterministic runtime views, inspection output, ambiguity stop, and owner visual feedback must be directly evidenced. |
| 3. Traceable author and date | Revision, file histories, Scott's authorship, and dated notes/feedback must be attributable. Agent-generated text must not be silently presented as owner authorship. |
| 4. Concise diagram without invention | A cold reader must be able to see request/plan→dependency stage→implementation/docs→mechanical checks→runtime inspection→owner feedback→recorded correction/next stage in no more than nine main nodes. If the source does not support that connector order, reject. |
| 5. Facts, contradictions, and inference stay distinct | Owner rules, plan intent, observed agent practice, automated results, human visual judgments, changed decisions, and Antiky grouping must remain separate. The notes must be checked for superseded plan statements. |
| 6. Direct audit links | Every node and feedback edge must link to the frozen agent rules, plan, notes, system record, code, check, or commit that states or demonstrates it. |

Verification questions:

1. Did agents actually execute the staged process, or did the plan become a retrospective inventory?
2. Which checkpoint failures caused a retry, escalation, design change, or owner correction?
3. Do lint/typecheck/build, preview screenshots, synthetic input, and postcard/pass checks prove only
   their narrow artifact, or are any results being overstated?
4. Does one end-to-end loop remain source-faithful after S0–S14 are grouped to the page node cap?
5. Is this distinct from the existing Three.js visual-system validation page and Scott's deferred
   procedural-scene orchestration candidate?
6. Can Goal 04 describe the workflow without copying unlicensed prose, code, film references, or
   assets?

Reject T1-C1 if the plan was not practiced, if AI participation cannot be traced, if the order
cannot survive concise grouping, or if the only reconstructable flow duplicates an existing page.

## Target 2: Unreal Engine packaging

| Field | Frozen selection value |
| --- | --- |
| Canonical target | [Packaging Your Project — Unreal Engine 5.8 documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project) |
| Parent relationship | The frozen [`unreal-packaging` agent skill](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unreal/unreal-packaging/SKILL.md#L28-L47) names this direct primary-documentation target; the completed harvest records the edge |
| Frozen artifact | No immutable page revision or publication date was exposed. The live page identified itself as Unreal Engine 5.8 on 2026-08-17. The AI wrapper and edge remain immutable at `gamedev-skills@9ca5296…`. Goal 04 must record any version drift. |
| Shallow inspected surface | Packaging purpose and build operations; cooking modes; build configurations; packaging settings; the ordered package tutorial; completion/failure state; Output and Message logs; staged executable/Pak files; runtime test; UAT and Project Launcher automation |
| Expected artifacts | Game Default Map, build configuration, cooked content, staging directory, executable/application, Pak files, packaging status, Output/Message logs, target-platform run, runtime interaction result, and parent-skill report/checklist |
| License and provenance risk | Epic is the organizational author. The documentation and engine are governed by Epic terms, and target SDKs or console source access can add separate restrictions. No reusable content license was observed on the page; Goal 04 must paraphrase and link. Version-specific engine/API details are mutable. |
| Proposed page | `docs/pipelines/pipeline-unreal-package-runtime-validation.md` — one engine-specific page; no second candidate |

### Candidate T2-C1: Unreal package and runtime validation

| Admission criterion | Observable evidence Goal 04 must find |
| --- | --- |
| 1. Observable order | The frozen agent skill and current first-party guide must jointly support map/configuration→build/cook/stage/package→inspect result→run/test in one direction. |
| 2. Artifacts, gates, feedback, branches, or stops | Configuration choice, staging artifacts, completion/failure state, logs, editor/CLI or UAT branch, target-platform requirements, and runtime smoke gate must be named. A failure return must be literal or labeled inference. |
| 3. Traceable author and date | Epic/Unreal organizational authorship, retrieval date, documentation version, and frozen parent-skill authorship/history must be recorded. |
| 4. Concise diagram without invention | The engine operations and runtime gate must fit at most nine main nodes without merging a test build into a shipping build or inventing a repair loop. |
| 5. Facts, contradictions, and inference stay distinct | Live 5.8 documentation, frozen skill instructions, platform-specific constraints, and editorial connections must remain separate. |
| 6. Direct audit links | Every operation, artifact, branch, failure gate, and runtime check must cite the live first-party page or the frozen parent skill. |

Verification questions:

1. Does the parent skill add an actual agent failure/repair loop, or only wrap Epic's linear tutorial?
2. Are cook, stage, package, deploy, and run kept distinct where the source distinguishes them?
3. Which platform and configuration does the candidate actually support, and what stops when the
   required SDK or source access is absent?
4. Do the logs and packaged-runtime test provide a source-stated return path after failure?
5. Is the result distinct from game-jam delivery and the two selected store-upload targets?
6. Can the page avoid mutable API claims that are not true for the frozen parent revision?

Reject T2-C1 if AI participation exists only as a citation wrapper, if the feedback path must be
invented, or if the live documentation no longer supports the parent workflow.

## Target 3: itch.io Butler

| Field | Frozen selection value |
| --- | --- |
| Canonical target | [The Butler manual](https://itch.io/docs/butler/) |
| Parent relationship | The frozen [`itch-publish` agent skill](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/itch-publish/SKILL.md#L29-L51) names the direct first-party target; the completed harvest records the edge |
| Frozen revision | [`itchio/butler@0c9a730a9305fc9d23724e28ce0e4a5b01d048ee`](https://github.com/itchio/butler/tree/0c9a730a9305fc9d23724e28ce0e4a5b01d048ee), authored and committed by leaf corcoran on 2026-08-16T18:14:46Z |
| Immutable documentation | [`docs/pushing.md`](https://github.com/itchio/butler/blob/0c9a730a9305fc9d23724e28ce0e4a5b01d048ee/docs/pushing.md); compare it with the live [Pushing builds](https://itch.io/docs/butler/pushing.html) page before using either as current behavior |
| Shallow inspected surface | Manual entry, build pushing, channel naming, version identifiers, change preview, default/optimized patch status, hidden first-channel behavior, update lookup, troubleshooting edge, and the frozen parent agent skill |
| Expected artifacts | Final release directory/archive, `user/game:channel`, preview diff and counts, version/build identifier, push output, live channel build, processing status, update result, and failure report |
| License and provenance risk | The frozen Butler repository, including its documentation source, declares MIT. That does not license uploaded games, third-party assets, itch.io accounts, or the hosted service. Live limits and channel behavior can change. |
| Proposed page | `docs/pipelines/pipeline-itchio-butler-publish-update.md` — one delivery page; no second candidate |

### Candidate T3-C1: itch.io Butler publish and update

| Admission criterion | Observable evidence Goal 04 must find |
| --- | --- |
| 1. Observable order | The parent skill and manual must support release directory/channel/version→preview→push→status/live build→repeat update. |
| 2. Artifacts, gates, feedback, branches, or stops | Preview classifications, channel tags, version, push result, backend processing state, troubleshooting, hidden-channel limit, and update path must supply real gates or stops. |
| 3. Traceable author and date | Frozen Butler revision, contributor/date, MIT license, itch.io organizational authorship, retrieval date, and frozen parent-skill provenance must be recorded. |
| 4. Concise diagram without invention | Preview, publish, processing, failure, and later-update branches must fit at most nine nodes. Do not imply that a successful upload proves the game works. |
| 5. Facts, contradictions, and inference stay distinct | Frozen manual source, live hosted behavior, parent agent instructions, service limits, and Antiky grouping must remain separate. |
| 6. Direct audit links | Every command, artifact, branch, and retry must cite the immutable manual, live manual, frozen parent skill, or frozen source implementation. |

Verification questions:

1. Does the parent skill require testing the portable build before Butler, and should that gate be
   inside this page or remain an input boundary?
2. Is `push-preview` a source-stated approval gate or only an optional diagnostic?
3. What exact failure evidence routes the agent back to release contents, channel metadata, or
   authentication?
4. Does the live page still match the frozen `docs/pushing.md` behavior and limits?
5. Is the update loop distinct from the already-published game-jam delivery pipeline?
6. Which outcomes are service-observed versus merely described by the parent agent skill?

Reject T3-C1 if preview/status/update do not form a source-supported feedback loop, if the parent
skill's AI role is not operative, or if the candidate only restates a CLI command reference.

## Target 4: SteamPipe

| Field | Frozen selection value |
| --- | --- |
| Canonical target | [Uploading to Steam — Steamworks Documentation](https://partner.steamgames.com/doc/sdk/uploading) |
| Parent relationship | The frozen [`steam-publish` agent skill](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/steam-publish/SKILL.md#L30-L76) names the direct Valve source; the completed harvest records the edge |
| Frozen artifact | No immutable public page revision or page date was exposed. The AI wrapper and edge remain immutable at `gamedev-skills@9ca5296…`; the Valve page must be refreshed at execution. |
| Shallow inspected surface | Build-account permissions and security delay; AppID/launch option/depot setup; ContentBuilder directories; VDF build scripts; preview/local/beta branches; manifest IDs and BuildID; testing recommendation; logs and client debug state; set-live control |
| Expected artifacts | Dedicated build account/permissions, AppID, launch options, depots/packages, content and output directories, app/depot VDF scripts, preview manifest/logs, uploaded depot manifests, BuildID, beta/default branch assignment, test result, live build, and update/debug record |
| License and provenance risk | Valve/Steamworks is the organizational source. The page exposes no reusable content license and requires a Steamworks account, SDK, permissions, security confirmation, and platform agreements. Credentials and VDF secrets must never enter research or page examples. Commercial rules and tooling are mutable. |
| Proposed page | `docs/pipelines/pipeline-steamworks-steampipe-build-release.md` — one delivery page; no second candidate |

### Candidate T4-C1: SteamPipe build and release

| Admission criterion | Observable evidence Goal 04 must find |
| --- | --- |
| 1. Observable order | The parent skill and Valve guide must support account/app/depot setup→content/VDF configuration→preview or beta build→upload→test→set live→update. The parent skill's parallel store-presence track must be included only if first-party evidence preserves it concisely. |
| 2. Artifacts, gates, feedback, branches, or stops | Permissions, launch options, depots, VDF, logs, manifests, BuildID, preview/local branch, beta test, dual approval or set-live gate, security wait, and update failure paths must be observable. |
| 3. Traceable author and date | Valve/Steamworks organizational authorship, retrieval date, and frozen parent-skill revision/history must be recorded; the absence of a page revision must remain explicit. |
| 4. Concise diagram without invention | Account/setup, build, preview/test, approval, release, and update must fit at most nine main nodes without hiding the store/build parallelism or combining preview with live release. |
| 5. Facts, contradictions, and inference stay distinct | Valve instructions, frozen parent-agent instructions, commercial/access constraints, security delays, and Antiky grouping must remain separate. |
| 6. Direct audit links | Every setup dependency, artifact, branch, log, approval gate, release step, and feedback edge must cite Valve or the frozen parent skill. |

Verification questions:

1. Does the candidate remain one coherent build-release loop if the parent skill's store-presence
   track is separated from SteamPipe's upload procedure?
2. Which preview, local-server, beta-branch, and test steps are required versus optional?
3. What exact log or manifest evidence causes a VDF/content correction and rebuild?
4. Does setting a build live require a separately verified owner/phone/security decision that the
   page must model as a stop?
5. Is the candidate materially distinct from itch.io publishing and game-jam delivery?
6. Can all examples avoid credentials, private AppIDs, proprietary SDK content, and unsupported
   claims about update efficiency?

Reject T4-C1 if the source only documents content upload mechanics, if the operative AI-agent loop
cannot be reconstructed without inventing the store/build coordination, or if access restrictions
prevent an auditable source inventory.

## Dependency-safe execution order

1. **T1 Sea Park.** It is the only selected repository with a frozen, author-practiced game build
   and can be harvested without live service or SDK access. It calibrates the distinction between a
   practiced agent loop and a plan that merely reads like one.
2. **T2 Unreal packaging.** Packaging produces the release artifact that distribution workflows
   consume. Harvest its engine-specific build and runtime gate before either store-upload target.
3. **T3 itch.io Butler.** Its immutable manual source and low-complexity channel model provide the
   narrower delivery case after the build boundary is clear.
4. **T4 SteamPipe.** Harvest the most access-constrained and commercially coupled target last. Keep
   its account, depot, beta, store, and release gates distinct from the simpler Butler flow.

The order controls Goal 04's inspection sequence, not a claim that all four sources form one house
pipeline. Each target remains independent and source-specific.

## Rejection, deferral, duplicate, and stop record

- **Selected:** 4 targets and 4 proposed pages.
- **Rejected at selection:** 27 targets. Each row above states the failed scope, order, artifact,
  feedback, provenance, or distinctness condition.
- **Deferred target-only:** CodePen `RNKpmQj`, `Elysium-Mars-Park`, and `scottstts/Stellar`. They are
  unresolved target leads, not pipeline candidates and not Goal 80 intake.
- **Duplicate identities:** none. All 35 recorded URLs and their resolved identities are unique.
- **Already-covered coverage:** `inkwell-webgpu-flowers` was not selected because its non-agent
  verification evidence repeats existing Three.js validation coverage; Elysium also overlaps that
  coverage while lacking a direct agent contract.
- **Inaccessible checks:** CodePen returned `403` and `scottstts/Stellar` returned `404` on
  2026-08-17. No canonical replacement was inferred.
- **License-limited surfaces:** missing public licenses are recorded in the affected rows and block
  copying, not factual citation. None was promoted merely because its implementation is public.

The zero-candidate stop was not reached: four candidates are strong enough for full harvest. Goal
04 must nevertheless stop a target early and record a rejection when its expected evidence is not
present. It must not replace a failed target, broaden a filename, or promote one of the target-only
deferrals. If all four proposed candidates fail admission, a zero-page wave is a valid outcome.

## Verification record

| Check | Result |
| --- | --- |
| Source graph completeness | 32 Scott edges, zero Thrixel candidate edges, and three `gamedev-skills` edges are represented; every recorded one-hop URL has one disposition |
| Direct selected edges | Each selected target links its completed parent harvest and, for all three documentation targets, the exact frozen parent agent skill that names the workflow |
| URL resolution | 33 candidates returned `200`; CodePen returned `403`; `scottstts/Stellar` returned `404`; checks ran 2026-08-17 and effective URLs are recorded |
| Identity and duplicate audit | Hosting metadata and effective URLs produced 35 unique identities; only the itch.io trailing slash was normalized; `targets.md` needed no edit |
| Selected bound | Four targets; one proposed page per target; no target exceeds two pages |
| Admission observability | Each proposed candidate has criterion-by-criterion expected evidence, six explicit verification questions, and target-specific rejection conditions |
| Filename contract | Four complete `pipeline-<group-name>-<name>.md` paths are frozen; none exists in the current pipeline directory |
| Goal 04 authority | The manifest gives exact target URLs, frozen state, inspection order, candidate identity, and output filename without requiring scope rediscovery |
| Goal 80 boundary | Selection found no new deferred pipeline candidate. Three unresolved records remain target-only deferrals, and selected candidates belong to Goal 04 |
| Link audit | Pinned `markdown-link-check` checked 56 plan links and ten Goal 80 links. The normal run reproduced only the recorded CodePen `403` and Stellar `404`; a second run accepting those two intentional status records passed every link. |
| Deterministic manifest audit | Source/plan URL-set comparison passed at 35 each; row counts passed at 32 Scott plus three `gamedev-skills`; four selected rows, four absent output paths, one Goal 03 intake row, and complete disposition fields all passed |
| Repository whitespace | `git diff --check` passed; the untracked plan also has no trailing whitespace |
