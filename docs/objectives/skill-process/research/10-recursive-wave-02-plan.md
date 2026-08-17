# Recursive wave 2 selection plan

## Result

The second recursive selection wave is empty. All ten direct children from the completed
[wave-1 outcome](09-recursive-wave-01-outcome.md#direct-child-queue) resolved on 2026-08-17, but
none clears both the AI-scope and distinct-workflow thresholds:

- seven are public artifacts or constituent sources already represented by the admitted Sea Park,
  Unreal, or SteamPipe pages; and
- three repositories document useful setup or build automation without placing AI or an agent
  inside the game-development process.

Goal 06 therefore has zero allowed targets, zero candidate pages, and no execution order beyond a
documented no-op. It must not replace these targets, follow another link layer, or invent a
filename. This negative result follows the recursive-wave stop rule in
[`02-recursive-target-harvest.md`](../02-recursive-target-harvest.md#recursive-wave-bounds) instead
of filling available slots.

## Selection boundary and method

The candidate universe is exactly the ten one-hop URLs recorded by Goal 04. No search result,
dependency, example, or child link was promoted into the graph. Selection used shallow inspection
only:

1. Resolve each recorded URL and record its current canonical identity.
2. Read all earlier reject, defer, duplicate, constituent, and admitted-page records from Goals
   00–04.
3. Inspect only enough current first-party material to establish identity, access, authorship,
   likely order and artifacts, AI or agent scope, distinctness, and harvest cost.
4. Exclude an artifact or constituent already covered by a published page.
5. Exclude a source that does not put AI or agent use inside the game-development flow, even when
   it documents useful automation.
6. Stop with an empty manifest when no remaining target clears the threshold.

The admission and scope tests come from
[`00-library-boundary.md`](../00-library-boundary.md#admission-gate). The filename and per-target
limits come from [`03-flat-pipeline-files.md`](../03-flat-pipeline-files.md#decision) and the
[recursive-wave bounds](../02-recursive-target-harvest.md#recursive-wave-bounds).

## Deduplicated direct-child graph

The ten recorded URLs resolve to ten unique canonical identities. One identity changed location:
`https://github.com/Chaser324/unity-build` now redirects to
[`superunitybuild/buildtool`](https://github.com/superunitybuild/buildtool). This is one redirected
record, not two duplicate queue entries, so [`targets.md`](../targets.md) remains unchanged.

```text
Pearl Sea Park
└── pearl.scottsun.io

Epic Unreal packaging
├── Unreal Automation Tool Overview
└── Project Launcher

itch.io Butler
├── remarkablegames/setup-butler
├── NovaDC/Godot-ButlerExportPlugin
└── Chaser324/unity-build → superunitybuild/buildtool

SteamPipe
├── Testing On Steam
├── Branches (Betas)
├── Release Process
└── Updating Your Game
```

Every parent edge is cited in the complete ledger below. A direct edge establishes eligibility for
inspection; it does not establish that the child is a distinct pipeline.

## Ranked selection

**Selected targets: none.** No target reaches the selection threshold, so there is no selected rank
and no sixth-slot pressure.

The three sources with potentially distinct implementation coverage were compared in the following
order. This is a final rejection comparison, not a queue or a Goal 06 authorization:

| Near-miss order | Canonical target | Observable evidence | Threshold failure |
| ---: | --- | --- | --- |
| 1 | [`NovaDC/Godot-ButlerExportPlugin@c361c56`](https://github.com/NovaDC/Godot-ButlerExportPlugin/tree/c361c5645be1c9bff6954ede5e2b873390917f2f) | Godot export options, finished-export hook, Butler path and metadata checks, export artifact, push, local error reporting, and optional page open | No source artifact places AI or an agent inside the export/upload process. The plugin also says its runner is unaware of Butler error output and return codes, weakening the feedback path; its upload coverage overlaps the published Butler page. |
| 2 | [`superunitybuild/buildtool@3b5cc7f`](https://github.com/superunitybuild/buildtool/tree/3b5cc7f7139f9f200f6371507e4b67bd925d102e) | Configurable Unity versions, platforms, distributions, batch builds, pre/post BuildActions, and CLI support | No AI or agent process is documented, and the shallow source does not add the runtime validation gate required to distinguish it from the deferred Unity build-and-runtime candidate. |
| 3 | [`remarkablegames/setup-butler@3106d52`](https://github.com/remarkablegames/setup-butler/tree/3106d527344052f36a6f0c537fa54ae9d5402563) | A GitHub Action installs a selected Butler version and the README shows a subsequent `butler push` step | The operative action is setup, while the upload repeats the published Butler route. `AGENTS.md` directs maintenance of the GitHub Action itself; it does not put an agent inside game build or delivery. |

The remaining seven children are already-covered artifacts or constituent sources. Their evidence
quality cannot make them distinct targets in this wave.

## Complete disposition ledger

All checks below are current as of 2026-08-17. `200` records a resolving GET at the canonical URL.
GitHub revisions are immutable; Epic and Valve expose mutable first-party pages without public page
revisions or reusable content licenses.

| # | Direct parent edge | Canonical target and resolution | Disposition | Shallow evidence and exact decision |
| ---: | --- | --- | --- | --- |
| C01 | [Sea Park → public outcome](09-recursive-wave-01-outcome.md#direct-outbound-relationships) | [`https://pearl.scottsun.io/`](https://pearl.scottsun.io/) — `200`; GitHub Pages artifact last modified 2026-07-25 | **Duplicate — supporting artifact** | The page is the deployed first-person game produced by the already-harvested Sea Park process. Its HTML exposes product metadata and a compiled application, not a separate development order, agent contract, or feedback gate. It remains evidence for [Pearl Sea Park staged agent build](../../../pipelines/pipeline-pearl-sea-park-staged-agent-build.md), not another target. |
| C02 | [Unreal packaging → Automation Tool](09-recursive-wave-01-outcome.md#direct-outbound-relationships-1) | [Unreal Automation Tool Overview](https://dev.epicgames.com/documentation/unreal-engine/unreal-automation-tool-overview-for-unreal-engine) — `200`; Unreal Engine 5.8 | **Duplicate — constituent branch** | Epic documents Automation Tool discovery and execution, including build, cook, run, test, and build-farm operations. Goal 04 already inspected this source and represented its UAT/`BuildCookRun` path inside [Unreal package and runtime validation](../../../pipelines/pipeline-unreal-package-runtime-validation.md). Separating the command runner would repeat that page and remove its packaged-runtime gate. |
| C03 | [Unreal packaging → Project Launcher](09-recursive-wave-01-outcome.md#direct-outbound-relationships-1) | [Using the Project Launcher](https://dev.epicgames.com/documentation/unreal-engine/using-the-project-launcher-in-unreal-engine) — `200`; Unreal Engine 5.8 | **Duplicate — constituent branch** | Custom Launch Profiles configure build, cook, package, archive, deploy, and launch for testing or release. Goal 04 already classified this as the GUI/profile alternate within the admitted Unreal workflow. It has no distinct outcome or agent loop here. |
| C04 | [Butler → setup-butler](09-recursive-wave-01-outcome.md#direct-outbound-relationships-2) | [`remarkablegames/setup-butler@3106d52`](https://github.com/remarkablegames/setup-butler/tree/3106d527344052f36a6f0c537fa54ae9d5402563) — `200`; MIT; head 2026-08-17 | **Reject — setup and already-covered coverage** | The action downloads/caches Butler and exposes it to a GitHub Actions job. The README's separate push command repeats the existing Butler publish path. The repository's agent instructions govern TypeScript action maintenance, not AI-assisted game delivery, so new evidence does not reopen the prior setup/CI constituent decision. |
| C05 | [Butler → Godot export plugin](09-recursive-wave-01-outcome.md#direct-outbound-relationships-2) | [`NovaDC/Godot-ButlerExportPlugin@c361c56`](https://github.com/NovaDC/Godot-ButlerExportPlugin/tree/c361c5645be1c9bff6954ede5e2b873390917f2f) — `200`; MIT; head 2026-04-03 | **Reject — AI scope and feedback** | The plugin can run after a Godot export, validate local inputs, and invoke Butler with user/game/channel/version metadata. No AI or agent artifact participates. Its runner explicitly does not observe Butler error output or return codes, and its upload half overlaps the published Butler page. This does not upgrade the earlier deferred Godot export-and-runtime candidate. |
| C06 | [Butler → Unity build scripts](09-recursive-wave-01-outcome.md#direct-outbound-relationships-2) | Recorded URL redirects to [`superunitybuild/buildtool@3b5cc7f`](https://github.com/superunitybuild/buildtool/tree/3b5cc7f7139f9f200f6371507e4b67bd925d102e) — `200`; MIT; head 2025-01-07 | **Reject — AI scope and incomplete distinct loop** | The maintained canonical repository is a Unity build-automation utility with configuration, batch builds, BuildActions, and a CLI. It exposes no AI or agent use and no source-level runtime feedback gate. Selecting it would weaken, not strengthen, the existing deferred Unity build-and-runtime candidate. |
| C07 | [SteamPipe → Testing On Steam](09-recursive-wave-01-outcome.md#direct-outbound-relationships-3) | [Testing On Steam](https://partner.steamgames.com/doc/store/testing) — `200` | **Duplicate — constituent gate** | Dev Comp packages, keys, playtests, branches, and update testing are access and test routes. Goal 04 already used this page for the beta-install/runtime-test gate in [SteamPipe build and release](../../../pipelines/pipeline-steamworks-steampipe-build-release.md). The broader player-research route still lacks a parent-agent workflow. |
| C08 | [SteamPipe → Branches](09-recursive-wave-01-outcome.md#direct-outbound-relationships-3) | [Branches (Betas)](https://partner.steamgames.com/doc/store/application/branches) — `200` | **Duplicate — constituent feedback loop** | Valve documents default and beta branches plus Preview Change and Set Build Live Now. The admitted SteamPipe page already uses this as its safe test/update branch. A separate page would split the existing release loop. |
| C09 | [SteamPipe → Release Process](09-recursive-wave-01-outcome.md#direct-outbound-relationships-3) | [Release Process](https://partner.steamgames.com/doc/store/releasing) — `200` | **Duplicate — constituent stop gate** | Store presence review, build review, feedback, Coming Soon, and the manual Release App confirmation are already the terminal approval path in the admitted SteamPipe page. This source does not form a distinct agent workflow. |
| C10 | [SteamPipe → Updating Your Game](09-recursive-wave-01-outcome.md#direct-outbound-relationships-3) | [Updating Your Game](https://partner.steamgames.com/doc/sdk/updating) — `200` | **Duplicate — constituent repeat** | Valve directs developers to upload through SteamPipe, test on a protected branch, move the build to default, and publish update news. That is the existing page's update repeat, not a new outcome. No deeper evidence at selection depth distinguishes it. |

No target is deferred. The three repository failures are based on inspected current evidence rather
than an unresolved access or identity blocker. The seven duplicates retain their existing page or
constituent status. None becomes a pipeline candidate for Goal 80.

## Frozen Goal 06 manifest

The executable manifest is intentionally empty.

| Field | Frozen value |
| --- | --- |
| Selected targets | **None (0)** |
| Allowed canonical targets | **None** |
| Candidate pipelines | **None (0)** |
| Allowed output filenames | **None** |
| Frozen revisions or artifacts | **None required** |
| Expected artifacts | **None** |
| Verification questions | **None; there is no selected candidate to admit** |
| License or provenance risks | **None to carry into Goal 06** |
| Dependency-safe execution order | **No-op: write the required empty-wave outcome and do not harvest a target** |

This table is the complete Goal 06 authorization. It is structurally unambiguous: Goal 06 may write
only its documented no-op outcome and Goal 06 completion bookkeeping. It may not create a pipeline
page, change the pipeline index, change `targets.md`, select a replacement, or follow another
outbound edge.

## Filename and intake checks

There are 11 existing `pipeline-*.md` pages and four wave-1 filenames. Because this manifest
proposes no filename, it cannot collide with either set and satisfies the zero-to-two filename
bound for every selected target vacuously. A future goal must perform a new selection before any
of the rejected or duplicate sources can receive a filename.

The Goal 05 row in [Goal 80's candidate-intake table](../goals/_completed/execute-goal-80.md#candidate-intake)
records `None`. Shallow selection found no deferred pipeline candidate eligible for Goal 80. The
three rejected repositories and seven duplicate/constituent sources remain exclusions; there are
no target-only deferrals to relabel as pipelines.

## Verification record

| Check | Command or evidence | Result |
| --- | --- | --- |
| Failing baseline | Assert this outcome exists and Goal 80 contains a Goal 05 row before editing | Failed as expected with exit 1; both deliverables were absent |
| Parent-edge completeness | Compare the four direct-outbound tables and direct-child queue in `09-recursive-wave-01-outcome.md` | Ten child records enter this graph; all ten appear once in the disposition ledger |
| Current resolution | Follow redirects with `curl -L` for all ten recorded URLs on 2026-08-17 | All returned `200`; the Chaser URL resolved to `superunitybuild/buildtool` |
| Repository identity | GitHub repository, commit, recursive-tree, README, license, and relevant shallow source APIs | Three complete non-truncated trees inspected at immutable heads; MIT recorded for each |
| Mutable first-party pages | Current Epic 5.8 and Valve page titles/body text at the six recorded documentation URLs | All six remained accessible and still exposed the constituent operations recorded above |
| Scope and duplicate audit | Compare every child with the prior candidate ledgers and all 11 accepted pages | Seven artifact/constituent duplicates; three AI-scope/workflow rejections; zero deferrals and zero selections |
| Bounds | Count selected targets and proposed filenames | 0 targets; 0 filenames; within the six-target and two-filenames-per-target caps |
| Filename collision | Compare the empty manifest with all `docs/pipelines/pipeline-*.md` files and the wave-1 manifest | 11 existing pages; no proposed path; no collision possible |
| Goal 06 handoff | Read only the frozen manifest table above | Exact allowed targets, paths, and order are independently recoverable: none, none, documented no-op |
| Goal 80 handoff | Goal 05 intake row links this plan and records `None` | No rejected, duplicate, constituent, or target-only item is relabeled as a deferred pipeline |
| Links | `markdown-link-check@3.15.0` over this plan and Goal 80 | Passed all 24 plan links and all 12 Goal 80 links |
| Repository hygiene | Structural assertions followed by `git diff --check` | Passed: 10 children, 10 dispositions, 7 duplicates, 3 rejections, 0 targets, 0 filenames, 1 Goal 05 row, and no whitespace error |
