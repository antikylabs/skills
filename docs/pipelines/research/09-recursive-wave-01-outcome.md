# Recursive wave 1 harvest outcome

## Result

The frozen four-target wave produced four source-faithful pages:

1. [Pearl Sea Park staged agent build](../pipeline-pearl-sea-park-staged-agent-build.md)
   — Source-documented and Author-practiced.
2. [Unreal package and runtime validation](../pipeline-unreal-package-runtime-validation.md)
   — Source-documented.
3. [itch.io Butler publish and update](../pipeline-itchio-butler-publish-update.md)
   — Source-documented.
4. [Steamworks SteamPipe build and release](../pipeline-steamworks-steampipe-build-release.md)
   — Source-documented.

Every proposed candidate passed the six admission gates. Admission records auditable order,
artifacts, feedback, provenance, concise representation, and direct links; it does not establish
effectiveness or recommendation. Sea Park alone adds Author-practiced because its plan, game tree,
notes, and 61-commit history show Scott applying and revising the staged loop. The three
documentation-led candidates remain Source-documented because neither the frozen agent skills nor
the first-party manuals identify a game released through those checklists.

The harvest also records three coherent Sea Park overflow candidates for Goal 80. No unplanned page
was published. Visual-validation and final-image routes were deduplicated against existing pages,
and isolated command recipes, inventories, setup guides, and non-agent service procedures remain
absent.

## Frozen manifest and method

The ordered manifest in
[`08-recursive-wave-01-plan.md`](08-recursive-wave-01-plan.md#frozen-goal-04-manifest) was structurally
unambiguous and was confirmed before drafting:

| Order | Target | Frozen evidence | Authorized page | Result |
| --- | --- | --- | --- | --- |
| 1 | `scottstts/Pearl-Sea-Park` | `888fc57b817514049b5fb33b0a3e115b585de067` | `pipeline-pearl-sea-park-staged-agent-build.md` | Admit |
| 2 | Epic Unreal packaging | Live UE 5.8 page plus parent skill `9ca5296b219049c5b68494e1f3c274ead6d727b3` | `pipeline-unreal-package-runtime-validation.md` | Admit |
| 3 | itch.io Butler | `itchio/butler@0c9a730a9305fc9d23724e28ce0e4a5b01d048ee` plus parent skill `9ca5296…` | `pipeline-itchio-butler-publish-update.md` | Admit |
| 4 | Valve SteamPipe | Live Steamworks pages plus parent skill `9ca5296b219049c5b68494e1f3c274ead6d727b3` | `pipeline-steamworks-steampipe-build-release.md` | Admit |

The retrieval date for every target is 2026-08-17. Repository targets were cloned at the exact
revision, their commit/tree identity and history were inspected, and their complete Git trees were
counted through the GitHub tree API. Mutable pages were read in full at the current documentation
version. Only direct references needed for the selected workflow were opened; their children were
not recursively harvested.

A failing baseline asserted that this outcome, the four authorized pages, and the Goal 04 intake row
already existed. It failed with exit 1 before any owned file was written.

## Target 1 — Pearl Sea Park

### Freeze, authorship, and license

| Field | Observation |
| --- | --- |
| Revision | [`888fc57b817514049b5fb33b0a3e115b585de067`](https://github.com/scottstts/Pearl-Sea-Park/tree/888fc57b817514049b5fb33b0a3e115b585de067) |
| Tree | `058853fca677089a8cf1fdca507d9729af5f77fe` |
| Revision state | Frozen revision equaled the repository default branch head on retrieval |
| Last change | Scott, `fix walkway darkening issue dependent on cam`, 2026-07-25T22:39:22Z |
| History | 61 commits, all attributed to `scott <st.scott0612@gmail.com>`, from 2026-07-09 through 2026-07-25 |
| License | No `LICENSE`, `COPYING`, or `NOTICE` file exists in the frozen tree; no reuse grant is inferred |

The first commit records the design exploration and plan. The next seven substantive commits land
S0–S14 in dependency order: foundation through park assembly, four ride/wildlife stages, then
opening-day work. The remaining history records owner walkthroughs, performance recovery, feature
removals, fauna replacement, optical correction, and regression fixes. Commit subjects and the
2,583-line notes ledger agree on the overall build-then-inspect-then-correct direction.

### Complete source inventory

The recursive tree API returned `truncated: false`: 197 entries, 169 blobs, and 11,697,310 blob bytes.
The complete top-level distribution is:

| Group | Entries or blobs |
| --- | ---: |
| `.claude/` | 2 |
| `.codex/` | 1 |
| `dev_docs/` | 20 |
| `public/` | 10 |
| `scripts/` | 2 |
| `src/` | 123 |
| Root source/configuration/artifact files | 11 |
| Tree-only directory entries | 28 |

The complete relevant text surface was inspected: `.codex/AGENTS.md`, `.claude/CLAUDE.md`, the
preview launch file, README, `package.json`, both audit scripts, the confirmed design, the
dependency plan, all 17 system records, and the notes ledger — 5,339 lines in total. The 123 source
files and ten public entries were inventoried by path; implementation files were opened where a
documented gate or audit required confirmation.

| Artifact family | What it establishes |
| --- | --- |
| [Agent contract](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/.codex/AGENTS.md) and Claude mirror | Clarification boundary, quality floor, required checks, docs/notes memory, WebGPU constraint, and agent role |
| [Confirmed design](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/design.md) | Owner-confirmed canon and observable ten-postcard intent |
| [Implementation plan](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/plan.md) | Ultimate-state architecture, S0–S14 dependency order, acceptance gates, validation, owner inputs, and risks |
| [Notes ledger](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md) | Agent self-tests, owner rulings, failed alternatives, repairs, removals, measured observations, and new regressions |
| Seventeen [`dev_docs/systems/`](https://github.com/scottstts/Pearl-Sea-Park/tree/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems) records | System-specific artifacts, diagnostics, contracts, and later standing updates |
| [`package.json`](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/package.json) | Build, lint, type-check, preview, and geometry-audit commands |
| [`audit-geometry.mjs`](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/scripts/audit-geometry.mjs) and [`audit-fauna-assets.mjs`](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/scripts/audit-fauna-assets.mjs) | Non-zero structural gates for routes, geometry, budgets, animation, compression, extensions, and textures |
| 123 `src/` files | The runnable systems the plan and records describe |
| Eight `public/fauna/*.glb` files plus public image/audio assets | Produced runtime assets; their presence is not a license grant |

No conventional unit-test suite is declared. The source instead uses compile/lint/build gates,
browser runtime inspection, deterministic debug datasets and cameras, long simulated rides, and
custom numeric audits. The [live game](https://pearl.scottsun.io) is a direct public outcome, but a
live artifact alone does not prove the method caused its quality.

### Practiced feedback evidence

- The notes begin with a draft design that cannot become canon until Scott confirms it, followed by
  a same-day confirmation and amendments.
- The plan gives every S0–S14 stage an acceptance condition and requires lint, type checking, system
  documentation, and lesson capture at every stage.
- The preview browser is explicitly available to the agent. `?debug`, `window.__pearl`, synthetic
  keyboard events, screenshots, fixed cameras, state datasets, and `?pass=` effect isolation create
  an observable agent loop.
- Owner walkthroughs repeatedly reject visible artifacts and features. The source removes the player
  hand, schooling fish, Grotto, benches, and several render techniques rather than preserving the
  initial plan as a false completion record.
- When Scott reports that the Torrent track tied a knot, the correction adds tangent-turn-rate and
  self-distance metrics to catch the entire failure class, then records measured passing values.
- The final opening-day record names strict TypeScript, ESLint, production build, deterministic
  scans, schedule and clipmap audits, a WebGPU smoke test, and the ten-postcard runtime audit.

These are public author-practice signals. They are not independent validation and do not establish
that an equivalent loop transfers to another agent, engine, team, or game.

### Candidate ledger

| Candidate | Disposition | Reason |
| --- | --- | --- |
| Sea Park staged agent build | **Admit** at the authorized filename | Confirmed design → dependency stages → implementation/docs → structural/runtime checks → owner ruling → correction/audit → advance/stop is explicit and practiced |
| Postcard and render-pass visual validation | **Duplicate** | Its source-specific use is a constituent of the admitted page and materially repeats [Three.js visual-system validation](../pipeline-threejs-visual-system-validation.md) |
| Final-image signal chain | **Duplicate** | The system record is project-specific evidence for the existing [Three.js final-image pipeline](../pipeline-threejs-final-image.md), not a second parallel page |
| Sea Park GLB fauna replacement and audit | **Defer to Goal 80** | The source gives a coherent authored-asset → normalize/compress → load/scale → behavioral-parity → offline-audit → runtime-inspect loop, but it was not declared in this wave's frozen page manifest |
| Sea Park measured performance recovery | **Defer to Goal 80** | Notes and opening-day records repeatedly measure, isolate, remove or bound one cause, and remeasure. It is distinct enough for later admission testing but was not declared here |
| Sea Park simulation-first ride geometry correction | **Defer to Goal 80** | The shared integrator, long fixed-tick simulations, numeric route scans, owner sightings, correction, and regression-audit pattern is coherent but outside the frozen filename set |
| Individual geometry, route, asset, schedule, and boot audits | **Constituent** | Each is a gate inside the admitted stage loop or one of the deferred candidate families; isolated assertions are not separate project pipelines |
| Owner craft walkthrough as a standalone process | **Constituent** | It is the principal feedback edge of the staged build, not an independently ordered flow |
| Removed Grotto, schooling-fish, reflector, and UI approaches | **Reject** | Historical alternatives and negative evidence, not standing workflows |

### Admission decision

1. **Observable order:** confirmed design and plan, S0–S14 table, history, and notes expose the same
   dependency-stage order.
2. **Artifacts and feedback:** design, plan, runnable systems, system records, audits, debug views,
   owner rulings, corrections, lessons, and final handoff are named.
3. **Authorship and date:** the frozen revision, tree, commit author, 61-commit history, and retrieval
   date are traceable.
4. **Concise diagram:** nine nodes preserve the source direction and principal failure edge. The last
   node combines next-stage selection and the final gate without inventing a stage.
5. **Boundaries:** project facts, changing owner rulings, evidence level, duplicates, portability,
   and missing license remain explicit.
6. **Auditability:** every node and edge maps to frozen primary artifacts below.

### Direct outbound relationships

| URL | Wave-2 disposition here |
| --- | --- |
| https://pearl.scottsun.io | Queued as the direct public outcome child; Goal 05 must decide whether an artifact without source process is harvestable |

No other HTTP URL appears in the inspected relevant source. Package dependencies, skill names, and
asset descriptions are not silently converted into outbound URLs.

## Target 2 — Epic Unreal packaging

### Freeze, authorship, license, and inventory

The canonical [Packaging Your Project](https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project)
page exposed no immutable revision or publication date. On 2026-08-17 it identified itself as
Unreal Engine 5.8 and returned a complete 442-line page. Epic Games is the organizational author.
No reusable page-content license was exposed; paraphrase and direct links are used.

The AI relationship remains frozen in
[`awesome-gamedev-agent-skills@9ca5296`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/9ca5296b219049c5b68494e1f3c274ead6d727b3),
tree `bc9b20a3109f9c00d945f741643d8dd79aca6247`: 76 commits and 323 tree entries/172 blobs. The selected
[`unreal-packaging/SKILL.md`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unreal/unreal-packaging/SKILL.md)
was introduced by Abhishek Barali on 2026-06-24 and last changed by Ishan Gautam on 2026-08-08. The
parent repository is Apache-2.0 with a NOTICE; that license does not extend to Epic's page, engine,
SDKs, game projects, or assets.

Complete current page surface inspected:

| Section family | Artifacts and gates found |
| --- | --- |
| Purpose and targets | Testing/distribution/update purposes; desktop/mobile/console/XR targets; SDK and source-access stops |
| Build operations | Build → cook → stage → package, with optional deploy/run; staging directory, executable/application, and Pak files |
| Cooking | By-the-book versus on-the-fly branch, progress, completion/failure state, cooked assets, and content exclusions |
| Configurations/settings | Debug, DebugGame, Development, Test, Shipping; packaging, cooking, executable, compression, and archive settings |
| Windows tutorial | Game Default Map → Development configuration → package to staging → completion/failure → run and interact with executable |
| Failure evidence | Output Log, Message Log, Packaging Results, warnings/errors, missing default-map black screen |
| Automation | UAT/`BuildCookRun` and Project Launcher custom profiles for build, cook, package, deploy, and run |
| Distribution boundary | Storefronts have separate workflows, requirements, and agreements |

Two direct references required to audit the automation branch were inspected without beginning a
second-hop harvest: the current [Automation Tool Overview](https://dev.epicgames.com/documentation/unreal-engine/unreal-automation-tool-overview-for-unreal-engine)
and [Project Launcher](https://dev.epicgames.com/documentation/unreal-engine/using-the-project-launcher-in-unreal-engine).
The former exposes command sequencing; the latter exposes named custom-profile artifacts across
build, cook, package, archive, deploy, and launch.

### Candidate ledger

| Candidate | Disposition | Reason |
| --- | --- | --- |
| Unreal package and runtime validation | **Admit** at the authorized filename | The parent agent skill and Epic tutorial jointly expose configuration → package operations → logs → staged artifacts → target-runtime interaction → repair |
| Cook-only content preparation | **Constituent** | Epic calls it an independently useful operation, but the selected agent workflow treats cook scope as an input to the larger packaged-runtime gate |
| UAT unattended packaging | **Constituent branch** | Repeatable execution of the same build/cook/stage/package order, not a distinct outcome in this target |
| Project Launcher multi-platform profile | **Constituent branch** | A GUI/profile alternate for the same build operations; its release/DLC options are not separately admission-tested here |
| Platform sharing/releasing catalog | **Reject under Gate 1** | A routing inventory of platform guides, not one operative loop |

### Admission decision

1. **Observable order:** Epic literally defines build, cook, stage, package, optional deploy/run and
   gives a map → configuration → package → run/test tutorial; the frozen agent skill preserves it.
2. **Artifacts and feedback:** default map, configuration, cooked content, staging directory,
   executable/Paks, completion/failure status, two logs, and runtime interaction are named. The agent
   skill's pitfalls route black maps, missing content, and SDK failures back to configuration.
3. **Authorship and date:** Epic organizational authorship, live 5.8 retrieval, and both frozen skill
   authors/path dates are recorded.
4. **Concise diagram:** nine nodes preserve editor/automation branching and two literal failure gates.
5. **Boundaries:** live/frozen sources, tutorial-specific Windows/Development details, mutable SDK
   requirements, Apache wrapper, and Epic rights remain separate.
6. **Auditability:** all operations and edges map to Epic or the frozen agent source below.

### Direct outbound relationships

| URL | Wave-2 disposition here |
| --- | --- |
| https://dev.epicgames.com/documentation/unreal-engine/unreal-automation-tool-overview-for-unreal-engine | Queued: direct automation source with an ordered tool flow; Goal 05 must re-test agent scope and distinctness |
| https://dev.epicgames.com/documentation/unreal-engine/using-the-project-launcher-in-unreal-engine | Queued: direct profile/build/deploy source; currently a constituent of the admitted page |

The broad Sharing and Releasing catalog, packaging settings, build-configuration reference, console
commands, platform installers, and per-platform pages support facts or route onward. They were not
queued as distinct wave-2 process candidates.

## Target 3 — itch.io Butler

### Freeze, authorship, license, and inventory

| Field | Observation |
| --- | --- |
| Revision | [`0c9a730a9305fc9d23724e28ce0e4a5b01d048ee`](https://github.com/itchio/butler/tree/0c9a730a9305fc9d23724e28ce0e4a5b01d048ee) |
| Tree | `e3a9e088e3c6b10bd697f92fca917069ae448b08` |
| Revision state | Frozen revision equaled the default branch head on retrieval |
| Last change | leaf corcoran, 2026-08-16T18:14:46Z |
| History | 2,022 commits; principal contributors Amos Wenger and leaf corcoran |
| License | MIT, copyright 2018 Leaf Corcoran and Amos Wenger/itch.io |

The recursive tree API returned `truncated: false`: 490 entries, 386 blobs, and 31,705,322 blob
bytes. Complete major groups include 33 `docs/` source files, 92 `cmd/` files, 107 `endpoints/`
files, 61 `butlerd/` files, 28 `database/` files, four `.github/` workflow files, and the remaining
Go packages, tests, schemas, configuration, README, and license.

The full relevant surface was inspected: all documentation paths, `cmd/push/`, login/status/version
commands, `endpoints/publish/`, repository workflows, README, and license. Key path history is
traceable: leaf corcoran last changed `docs/pushing.md` on 2026-06-17, `docs/login.md` on 2026-02-26,
`docs/offline.md` on 2026-07-06, `cmd/push/preview.go` on 2026-05-02, and `cmd/push/push.go` on
2026-06-09. The live [Pushing builds](https://itch.io/docs/butler/pushing.html) page matched the
frozen push, preview, status, version, processing, hidden-channel, and 30 GB limit descriptions on
retrieval.

The frozen agent relationship uses the same `gamedev-skills@9ca5296` tree described under Target 2.
[`itch-publish/SKILL.md`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/itch-publish/SKILL.md)
was introduced by Abhishek Barali on 2026-06-24 and last changed by Ishan Gautam on 2026-08-08; its
deeper CI reference was introduced with the skill. The wrapper is Apache-2.0; Butler source and docs
are MIT; neither license governs the hosted service or uploaded game.

### Candidate ledger

| Candidate | Disposition | Reason |
| --- | --- | --- |
| itch.io Butler publish and update | **Admit** at the authorized filename | Exact release folder/channel → optional preview → push → error routing or live/processing state → same-channel update is observable, and the parent skill makes the agent operative |
| Butler CI upload | **Constituent branch** | `BUTLER_API_KEY`, permanent Broth install, and CI commands change identity/bootstrap, not the publish/update outcome |
| Offline diff, rediff, apply, and verify | **Reject under scope policy for this wave** | A coherent technical manual exists, but the selected parent agent skill does not route the agent through this infrastructure workflow; admission here would add AI only by assumption |
| Player update-check endpoint | **Reject under Gate 1** | One API lookup and response shape, not an ordered artifact-and-feedback pipeline |
| Third-party integrations page | **Reject under Gate 1** | An integration inventory. Its outbound repositories are separate targets, not a pipeline in Butler |
| Installing, upgrading, login, and status | **Constituent setup** | Preconditions and diagnostics inside the admitted loop |
| Launcher integration and prerequisites | **Reject/constituent** | Tool integration and platform prerequisite features, not the selected publish/update flow |
| Single-file/auto-wrap/auto-unzip and filtering flags | **Constituent** | Input-shaping branches and failure risks inside the release-folder gate |

The diagram uses one inference: it promotes the optional `push-preview` diagnostic into a
pre-upload review gate. The manual says what the comparison reports and that it occurs before
pushing; it does not require an approval decision or retry timing. Both the page and mapping label
that editorial connection.

### Admission decision

1. **Observable order:** the frozen parent skill and manual support release folder/page → identity
   and channel → preview → push → live/processing state → same-channel update.
2. **Artifacts and feedback:** release folder, target/channel, tags, version, preview classes, push
   result, live build, processing status, and troubleshooting paths are named. The preview approval
   timing is labeled inference rather than source fact.
3. **Authorship and date:** frozen Butler revision/tree/history, documentation path authors, MIT
   license, live retrieval date, and parent skill authors are traceable.
4. **Concise diagram:** nine nodes preserve failure return and update repeat without implying runtime
   validation.
5. **Boundaries:** source/live behavior, wrapper role, inference, hosted-service limits, secret
   handling, and two licenses remain separate.
6. **Auditability:** every command, artifact, and edge maps to frozen or current first-party material.

### Direct outbound relationships

| URL | Wave-2 disposition here |
| --- | --- |
| https://github.com/remarkablegames/setup-butler | Queued: direct CI integration with an ordered install/configure action; agent scope and distinctness remain untested |
| https://github.com/NovaDC/Godot-ButlerExportPlugin | Queued: direct Godot export/upload integration; may overlap the deferred Godot export candidate |
| https://github.com/Chaser324/unity-build | Queued: direct Unity build/upload scripts; may overlap deferred Unity build validation |

The Wharf specification, itch app, Broth downloads, API-key settings, server API, God pathname
reference, issue tracker, and other installers are supporting specifications or setup endpoints.
They were not queued as separate game-development pipeline targets. No outbound child was harvested
beyond the direct page/repository relationship.

## Target 4 — SteamPipe

### Freeze, authorship, license, and inventory

Valve's [Uploading to Steam](https://partner.steamgames.com/doc/sdk/uploading) page exposed no public
revision or publication date. On 2026-08-17 the complete current page contained 688 lines. Valve and
Steamworks are the organizational source. The page exposed no reusable content license and assumes
partner access, a Steamworks account, SDK, app permissions, agreements, and security confirmation.

The current source surface inspected in full includes:

| Section family | Artifacts and gates found |
| --- | --- |
| Build account | Dedicated least-privilege account, Edit App Metadata and Publish App Changes permissions, phone/mobile confirmation, three-day security-change wait |
| App setup | AppID, launch options, depots, packages, published configuration, and ownership for testing |
| ContentBuilder | Platform builders, `content/`, `output/`, `scripts/`, chunk cache, manifests, and logs |
| VDF build scripts | App/depot IDs, content/output roots, mappings, exclusions, properties, Preview, Local, and SetLive |
| Upload | `steamcmd`, privilege check, file list, ~1 MB chunks, depot manifest IDs, global BuildID, app builds page |
| CI | Preserved `config.vdf` token after interactive Steam Guard login; no password on later runs |
| Update/debug | Test-before-default guidance, output `*.log`, client state/config commands, `content_log.txt`, app manifest |
| Special routes | Retail installer, local server, preloading, DLC, and troubleshooting; classified below rather than promoted |

Three direct current Valve pages required by the selected release loop were inspected at relevant
depth: [Testing On Steam](https://partner.steamgames.com/doc/store/testing),
[Branches](https://partner.steamgames.com/doc/store/application/branches), and
[Release Process](https://partner.steamgames.com/doc/store/releasing). They establish Dev Comp
ownership, beta installation, Preview Change and Set Build Live Now, store/build review order,
review feedback, Coming Soon, permissions, and the manual Release App confirmation.

The frozen agent relationship again uses `gamedev-skills@9ca5296` and its Apache-2.0/NOTICE boundary.
[`steam-publish/SKILL.md`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/steam-publish/SKILL.md)
was introduced by Abhishek Barali on 2026-06-24 and last changed by Ishan Gautam on 2026-08-08; its
advanced VDF/beta/CI reference was introduced with the skill.

### Candidate ledger

| Candidate | Disposition | Reason |
| --- | --- | --- |
| SteamPipe build and release | **Admit** at the authorized filename | Parent and Valve sources jointly expose account/app setup → parallel presence/build tracks → VDF/preview → upload identity → beta install/test → ordered reviews → manual release → update |
| Multi-depot/multi-platform VDF authoring | **Constituent branch** | A deeper input form for the admitted build; same manifest/BuildID and release gates |
| CI token-based SteamPipe upload | **Constituent branch** | Changes credential/bootstrap handling, not the release outcome |
| Beta-branch update testing | **Constituent feedback loop** | It is the admitted page's required safe update path, not a second pipeline |
| Store-presence review | **Constituent parallel track** | A literal prerequisite of the selected release page; separating it would hide the dual approval gate |
| SteamPipe Local Content Server | **Reject as optional constituent** | An alternate local build destination for installation testing; no distinct parent-agent outcome was declared |
| External Steam Playtest/release-override access | **Reject under scope policy for this wave** | A distinct testing procedure exists, but the parent agent skill does not place its agent inside that player-research flow |
| Retail disc installer | **Reject under scope policy for this wave** | Ordered special-delivery instructions exist, but no operative AI wrapper connects them to this objective |
| Preload and DLC routes | **Reject under Gates 1/2 for this wave** | The selected page exposes only short special-case routing, not a complete agent artifact-and-feedback loop |
| Patch-size hygiene | **Constituent guidance** | Build-content constraint inside the update route, not a separate process |
| Troubleshooting command inventory | **Constituent** | Failure evidence for the VDF/upload/install gate |

### Admission decision

1. **Observable order:** the parent skill supplies the parallel presence/build sequence and Valve
   supplies literal setup, preview, upload, beta, review, and release order.
2. **Artifacts and feedback:** permissions, AppID, depots/packages, content, VDF, preview manifest,
   logs, manifest IDs, BuildID, branch install, runtime result, two checklists, review feedback, and
   manual confirmation are named.
3. **Authorship and date:** Valve organizational authorship, current retrieval, frozen wrapper tree,
   authors, path dates, and Apache boundary are recorded.
4. **Concise diagram:** nine nodes preserve parallelism, two failure returns, review feedback, manual
   release, and the update repeat.
5. **Boundaries:** mutable first-party rules, proprietary access, secrets, wrapper license, tested
   versus default branches, and commercial exclusions remain explicit.
6. **Auditability:** every node and edge maps to Valve or the frozen parent artifacts below.

### Direct outbound relationships

| URL | Wave-2 disposition here |
| --- | --- |
| https://partner.steamgames.com/doc/store/testing | Queued: direct testing source; currently supplies a constituent gate |
| https://partner.steamgames.com/doc/store/application/branches | Queued: direct branch/update source; currently supplies a constituent feedback loop |
| https://partner.steamgames.com/doc/store/releasing | Queued: direct dual-review/manual-release source; currently supplies the selected stop gate |
| https://partner.steamgames.com/doc/sdk/updating | Queued: direct build-update source; may be distinct only if deeper evidence exceeds the admitted update repeat |

The local content server, depots/packages/builds references, install scripts, DLC, retail media,
preload, dedicated server, Steamworks API, client support, videos, and account-management pages are
supporting or special-case children. They were not queued as separate wave-2 pipeline targets.

## Cross-target admission summary

| Candidate | Order | Artifacts/feedback | Author/date | Concise | Boundaries | Direct audit | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Sea Park staged build | Pass | Pass | Pass | 9 nodes | Pass | Pass | Source-documented; Author-practiced |
| Unreal package/runtime | Pass | Pass | Pass | 9 nodes | Pass | Pass | Source-documented |
| Butler publish/update | Pass | Pass; one labeled inference | Pass | 9 nodes | Pass | Pass | Source-documented |
| SteamPipe build/release | Pass | Pass | Pass | 9 nodes | Pass | Pass | Source-documented |

The delivery pages remain distinct. Unreal ends with a validated standalone build before a store.
Butler publishes one portable folder to a channel and stops short of runtime proof. SteamPipe adds
proprietary app/depot configuration, beta installation, two ordered reviews, and a manual release
authority gate. Game-jam delivery begins with rules, theme, scope, and a deadline; it is not a
parallel page for any one of these post-build platform flows.

## Pearl Sea Park diagram mapping

### Nodes

| Node | Primary source mapping |
| --- | --- |
| A — confirmed design and ultimate-state plan | [Design draft/confirmation and amendments](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L3-L5); [plan status](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/plan.md#L1-L15) |
| B — stage selection and owner inputs | [Dependency build table and needs from Scott](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/plan.md#L201-L228) |
| C — runnable implementation and system record | [Modular architecture, system docs, and debug harness](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/plan.md#L44-L73); [runnable stage rule](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/plan.md#L201-L221) |
| D — structural checks and audits | [Every-stage checks](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/plan.md#L193-L200); [geometry audit entry](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/scripts/audit-geometry.mjs) |
| E — agent runtime self-inspection | [Preview screenshots and self-test controls](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L12-L58); [fixed views and pass isolation](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/plan.md#L193-L199) |
| F — owner visual/craft rulings | [First quality walkthrough](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L164-L230); [later ruling/removal record](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L726-L775) |
| G — stage acceptance gate | [Per-stage acceptance column](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/plan.md#L205-L221) |
| H — lesson, causal correction, stronger audit | [Torrent defect diagnosis and new failure-class metrics](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/notes.md#L825-L843); [notes requirement](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/plan.md#L197-L200) |
| I — next dependency or final stop | [S0–S14 dependency order](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/plan.md#L201-L221); [final postcard gate and verification](https://github.com/scottstts/Pearl-Sea-Park/blob/888fc57b817514049b5fb33b0a3e115b585de067/dev_docs/systems/opening-day.md#L112-L141) |

### Edges

`A→B→C` follows design confirmation, plan creation, dependency selection, and runnable
implementation. `C→D→E→F→G` combines the plan's every-stage checks with the practiced agent and
owner review sequence. `G→H→C` is demonstrated throughout the notes; the Torrent example makes the
correction-plus-regression edge explicit. `G→I→B` follows dependency order until S14. The stop
inside I maps the final postcard/runtime handoff. No connector is editorial inference.

## Unreal package and runtime validation diagram mapping

### Nodes

| Node | Primary source mapping |
| --- | --- |
| A — target and purpose | [Epic packaging purposes, targets, and prerequisite software](https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project); [agent trigger/boundary](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unreal/unreal-packaging/SKILL.md#L17-L26) |
| B — map, configuration, cook scope | [Epic tutorial and settings](https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project); [agent workflow steps 1–3 and 6](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unreal/unreal-packaging/SKILL.md#L28-L45) |
| C — editor or automation branch | [Epic UAT and Project Launcher sections](https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project); [agent editor/UAT branches](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unreal/unreal-packaging/SKILL.md#L40-L45) |
| D — build/cook/stage/package | [Epic How Does Packaging Work](https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project) |
| E — completion gate | [Epic progress, completion/failure, and cancel states](https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project) |
| F — logs and correction | [Epic Output/Message Log sections](https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project); [agent pitfalls](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unreal/unreal-packaging/SKILL.md#L82-L96) |
| G — staged executable/content | [Epic staging and packaged-project artifacts](https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project) |
| H — target runtime gate | [Epic Run, Test, and Exit task](https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project); [agent verify step](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unreal/unreal-packaging/SKILL.md#L46-L47) |
| I — validated standalone build | [Epic tutorial output](https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project); [store handoff boundary](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/unreal/unreal-packaging/SKILL.md#L25-L26) |

### Edges

`A→B→C→D→E` preserves the Epic and agent order. `E→G→H→I` follows the first-party tutorial.
`E→F→B` maps packaging failure to the two logs and the agent's named configuration repairs.
`H→F` maps black/default-map and missing-cooked-content runtime failures to those same source-stated
repairs. No connector is editorial inference.

## itch.io Butler publish and update diagram mapping

### Nodes

| Node | Primary source mapping |
| --- | --- |
| A — portable folder and project page | [Agent workflow steps 1 and 3](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/itch-publish/SKILL.md#L29-L39); [manual exact-folder guidance](https://github.com/itchio/butler/blob/0c9a730a9305fc9d23724e28ce0e4a5b01d048ee/docs/pushing.md#L278-L306) |
| B — identity, channel, tags, version | [Agent setup/channel/version steps](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/itch-publish/SKILL.md#L34-L48); [manual channel/version sections](https://github.com/itchio/butler/blob/0c9a730a9305fc9d23724e28ce0e4a5b01d048ee/docs/pushing.md#L79-L136) |
| C — inferred pre-upload preview | [Manual says preview before pushing and names classifications](https://github.com/itchio/butler/blob/0c9a730a9305fc9d23724e28ce0e4a5b01d048ee/docs/pushing.md#L186-L229); [agent names preview for updates](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/itch-publish/SKILL.md#L49-L51) |
| D — inferred release-content approval | Same preview evidence as C. The approval decision and retry timing are Antiky inference, not a Butler requirement |
| E — push | [Frozen manual command and target form](https://github.com/itchio/butler/blob/0c9a730a9305fc9d23724e28ce0e4a5b01d048ee/docs/pushing.md#L2-L20); [agent step 4](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/itch-publish/SKILL.md#L40-L42) |
| F — push success gate | [Manual upload/live and processing behavior](https://github.com/itchio/butler/blob/0c9a730a9305fc9d23724e28ce0e4a5b01d048ee/docs/pushing.md#L41-L77); [troubleshooting error paths](https://github.com/itchio/butler/blob/0c9a730a9305fc9d23724e28ce0e4a5b01d048ee/docs/troubleshooting.md) |
| G — troubleshoot | [Frozen troubleshooting page](https://github.com/itchio/butler/blob/0c9a730a9305fc9d23724e28ce0e4a5b01d048ee/docs/troubleshooting.md); [agent pitfalls](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/itch-publish/SKILL.md#L104-L124) |
| H — live build and processing status | [Manual live/default/optimized patch states](https://github.com/itchio/butler/blob/0c9a730a9305fc9d23724e28ce0e4a5b01d048ee/docs/pushing.md#L50-L77); [manual channel build status](https://github.com/itchio/butler/blob/0c9a730a9305fc9d23724e28ce0e4a5b01d048ee/docs/pushing.md#L101-L104) |
| I — same-channel update | [Manual same-channel update](https://github.com/itchio/butler/blob/0c9a730a9305fc9d23724e28ce0e4a5b01d048ee/docs/pushing.md#L41-L45); [agent update step](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/itch-publish/SKILL.md#L49-L51) |

### Edges

`A→B→E→F→H→I` and `I→E` are the literal parent/manual publish-update order. The page inserts
`C→D` before E as an explicitly labeled inference from the optional pre-push comparison. `D→A` is
the inferred response to an unexpected diff. `F→G→B` maps manual error categories to corrected
identity/channel/setup and retry. `I→C` applies the same labeled preview inference to later updates.

## Steamworks SteamPipe build and release diagram mapping

### Nodes

| Node | Primary source mapping |
| --- | --- |
| A — app, permissions, depots/packages, security | [Valve build-account and security requirements](https://partner.steamgames.com/doc/sdk/uploading); [agent prerequisites and app setup](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/steam-publish/SKILL.md#L30-L56) |
| B — parallel presence/build tracks | [Agent's explicit parallel tracks](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/steam-publish/SKILL.md#L10-L15); [Valve two checklists](https://partner.steamgames.com/doc/store/releasing) |
| C — content and VDF | [Valve ContentBuilder and build-script sections](https://partner.steamgames.com/doc/sdk/uploading); [agent script step and patterns](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/steam-publish/SKILL.md#L61-L66) |
| D — preview/mapping/log gate | [Valve Preview and BuildOutput parameters](https://partner.steamgames.com/doc/sdk/uploading); [agent preview pattern](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/steam-publish/SKILL.md#L136-L143) |
| E — manifests and BuildID | [Valve upload sequence and identities](https://partner.steamgames.com/doc/sdk/uploading); [agent upload result](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/steam-publish/SKILL.md#L64-L66) |
| F — beta install/runtime gate | [Valve branch promotion steps](https://partner.steamgames.com/doc/store/application/branches); [Valve test requirement](https://partner.steamgames.com/doc/store/testing); [agent test-beta instruction](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/steam-publish/SKILL.md#L67-L69) |
| G — ordered checklists and feedback | [Valve review order and feedback](https://partner.steamgames.com/doc/store/releasing); [agent workflow steps 2 and 6](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/steam-publish/SKILL.md#L57-L71) |
| H — approval/time/authority gate | [Valve permissions, both approvals, Coming Soon, and release controls](https://partner.steamgames.com/doc/store/releasing); [agent release prerequisites](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/steam-publish/SKILL.md#L70-L74) |
| I — manual release/default and update repeat | [Valve manual release controls](https://partner.steamgames.com/doc/store/releasing); [default branch manual rule](https://partner.steamgames.com/doc/store/application/branches); [agent release/update steps](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/9ca5296b219049c5b68494e1f3c274ead6d727b3/skills/workflows/steam-publish/SKILL.md#L72-L76) |

### Edges

`A→B` is the parent skill's setup followed by two explicit parallel tracks. `B→C→D→E→F` maps
the parent and Valve build order. `D→C` maps Preview iteration over mappings, filters, properties,
permissions, and logs. `F→C` maps failed beta install/runtime evidence through Valve's build/client
logs to build correction. `F→G→H` preserves store-before-build review and Valve feedback. `H→B`
routes missing approval or feedback to the relevant track. `H→I→C` maps manual release/default
promotion and the documented test-before-customer-update repeat. No connector is editorial inference.

## Supporting skills

| Page | Observed in the source | Potential, inferred by this research |
| --- | --- | --- |
| Sea Park staged build | Named Three.js skills; WebGPU/TSL; Vite; TypeScript; ESLint; Rapier; browser preview; debug views; synthetic input; build and custom audits | Design confirmation; stage-gate tracking; owner-feedback capture; simulation; regression authoring; implementation memory |
| Unreal package/runtime | Unreal Editor; Maps & Modes; Packaging Settings; build/cook/stage/package; UAT; Project Launcher; Output/Message logs; store-publish handoffs | Prerequisite audit; cook inventory; packaged-runtime smoke test; log triage; build identity |
| Butler publish/update | Butler identity, preview, push, status, page/channel tags, user versions, CI key, game-jam and Steam handoffs | Release-folder inspection; diff approval; channel registry; post-upload smoke test; release record |
| SteamPipe build/release | Steamworks/App Admin; ContentBuilder; steamcmd; VDF; Preview/Local/SetLive; beta branches; client diagnostics; CI token; checklists | Depot plan; VDF validation; secret custody; install smoke test; review routing; release authority; rollback plan |

Observed labels mean the target names or uses the capability. Potential labels are Antiky's
decomposition and may not correspond to an installed skill.

## License, reuse, and evidence boundaries

- Sea Park has no source license at the frozen revision. Its code, docs, GLBs, audio, images, and
  live artifact are cited but not treated as reusable.
- Butler's frozen repository and documentation source are MIT. Uploaded games, third-party assets,
  and the hosted itch.io service retain their own rights and terms.
- The parent `awesome-gamedev-agent-skills` repository is Apache-2.0 with NOTICE obligations. That
  license covers its contributions, not Unreal, Epic or Valve documentation, SDKs, store services,
  projects, credentials, or uploaded content.
- Epic and Valve pages exposed no immutable public revision or reusable content license. Page
  versions, fees, permissions, limits, security delays, platform SDKs, review rules, and service
  controls are mutable.
- A repository build, live game, upload status, BuildID, or runtime smoke test proves only the named
  observation. None establishes broad effectiveness, production readiness, fun, accessibility,
  certification, legal compliance, or independent validation.

## Direct child queue

Ten new direct, relevant URLs were appended to `targets.md`, with no research prose there:

- https://pearl.scottsun.io
- https://dev.epicgames.com/documentation/unreal-engine/unreal-automation-tool-overview-for-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/using-the-project-launcher-in-unreal-engine
- https://github.com/remarkablegames/setup-butler
- https://github.com/NovaDC/Godot-ButlerExportPlugin
- https://github.com/Chaser324/unity-build
- https://partner.steamgames.com/doc/store/testing
- https://partner.steamgames.com/doc/store/application/branches
- https://partner.steamgames.com/doc/store/releasing
- https://partner.steamgames.com/doc/sdk/updating

Each is a one-hop relationship from a selected target. Goal 05 must deduplicate and apply its own
selection gate; constituent or artifact status here is not pre-admission. Direct links used only for
setup, API syntax, platform reference, download, license, issue tracking, commercial special cases,
or second-hop navigation were recorded in the target sections but not queued.

## Verification record

### Commands and results

| Check | Command | Result |
| --- | --- | --- |
| Failing baseline | Assert the outcome, four authorized pages, and Goal 04 intake row existed before editing | Failed as expected with exit 1; all six required artifacts were absent |
| Frozen revisions | `git rev-parse`, `git rev-list --count`, `git log`, `git shortlog`, and GitHub recursive tree API for all three repositories | Revisions, trees, counts, histories, path authors, and complete non-truncated inventories recorded above |
| Mutable source refresh | Open complete current Epic, itch.io, and Valve pages and only required direct references | UE page remained 5.8; live Butler matched frozen behavior; Steam build/test/branch/release gates remained available |
| Candidate completeness | Enumerate every ordered route in relevant docs, source paths, histories, scripts, tests, and direct references | Four proposed decisions plus every additional candidate disposition recorded above |
| Mermaid | `set -e; for file in docs/pipelines/pipeline-*.md; do npx --yes @mermaid-js/mermaid-cli@11.16.0 -i "$file" -o "/tmp/$(basename "$file")"; done` | Passed: all 11 library pages rendered without a parser failure |
| Links | `set -e;` run `markdown-link-check@3.15.0` over every pipeline/library file, this outcome, Goal 04, and Goal 80 | Passed with zero failed local or remote links |
| Page contract and cold reader | Count capsule fields, charts, unique main nodes, required headings; review trigger, order, feedback, outputs, evidence | Passed: each new page has six fields, one chart, nine nodes, six headings, and all five cold-reader answers |
| Intake and queue | Reconcile Goal 04 row with all deferred candidates; compare pipeline files to index rows; sort URL queue | Passed: three eligible names match, 11 files equal 11 index rows, 79 target URLs have zero duplicates |
| Repository hygiene | `git diff --check`; assert rejected/deferred page paths are absent | Passed with no whitespace error and no unsupported output page; unrelated `brometal-patching` deletion remains untouched |

### Completion audit

| Requirement | Evidence | Status before final checks |
| --- | --- | --- |
| Every selected target frozen and inventoried | Four target sections; repository trees or mutable-page snapshots, authorship, date, license, relevant artifacts | Pass |
| Every candidate traceable | Four candidate ledgers, including duplicates, constituents, deferrals, and exact rejection gates | Pass |
| At most two pages per target | One page per target | Pass |
| Accepted loops reconstructable | Four node/edge mapping sections | Pass |
| Inference and portability visible | Butler preview inference plus page/outcome evidence boundaries | Pass |
| Observed/potential support separated | Page sections and consolidated table | Pass |
| Duplicates avoided | Sea Park visual validation and final image cross-reference existing pages | Pass |
| Deferred handoff complete | Three stable Sea Park candidates named for the Goal 04 intake row | Pass |
| Direct children queued only one hop | Ten URL-only additions identified above | Pass |
| Mechanical, link, and cold-reader checks | Commands and results above | Pass |
