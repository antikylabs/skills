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
