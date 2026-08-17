# Summary — goal 04: Harvest recursive wave 1

**Completed:** 2026-08-17
**Commit:** `57b8c5a`; completion bookkeeping follows in the commit that archives this summary
**Goal file:** [`execute-goal-04.md`](execute-goal-04.md)

## Action needed from the owner

Nothing in this summary needs you. All four targets remained accessible, the frozen manifest supplied
the filenames and rejection boundaries, and no licensing, product, or risk decision required owner
authority.

## What was delivered

1. A complete [wave-1 outcome](../../research/09-recursive-wave-01-outcome.md) with frozen revisions
   or live-page snapshots, authorship and dates, licenses, full relevant source inventories,
   histories, candidate ledgers, six-gate decisions, one-hop outbound relationships, and every
   accepted node/edge mapping.
2. Four admitted pages at the exact authorized filenames:
   [Pearl Sea Park staged agent build](../../../pipelines/pipeline-pearl-sea-park-staged-agent-build.md),
   [Unreal package and runtime validation](../../../pipelines/pipeline-unreal-package-runtime-validation.md),
   [itch.io Butler publish and update](../../../pipelines/pipeline-itchio-butler-publish-update.md), and
   [Steamworks SteamPipe build and release](../../../pipelines/pipeline-steamworks-steampipe-build-release.md).
3. Evidence labels bounded to what the harvest observed: Sea Park is Source-documented and
   Author-practiced; the three agent-manual workflows are Source-documented only.
4. A complete negative and overflow record. Existing visual-validation and final-image pages absorb
   two Sea Park duplicates; three coherent Sea Park overflow candidates remain explicit for Goal 80;
   command recipes, setup, inventories, special-case service procedures, and non-agent flows have no
   page.
5. A catalog with 11 pipeline files and 11 matching index rows, plus ten unique direct-child URLs in
   the terse target queue for Goal 05.
6. A matching [Goal 04 intake row](../execute-goal-80.md#candidate-intake) naming Sea Park GLB fauna
   replacement and audit, measured performance recovery, and simulation-first ride geometry
   correction as the only eligible deferred candidates from this wave.

## What I got wrong

The first Butler diagram draft risked presenting `push-preview` as a required source gate. The
manual says the comparison is optional and explains what it reports; it does not require an approval
decision. I retained the useful pre-upload review position but labeled the node, gate, prose, and
mapping as editorial inference. Without that correction, the page would have converted an optional
diagnostic into false first-party policy.

The first Mermaid and link loops did not enable shell fail-fast behavior, so a failure in an early
file could have been hidden by a later successful file. I reran both complete sweeps with `set -e`.
The fail-fast runs passed all 11 charts and every selected Markdown file.

## Traps worth knowing

- The machine's global Git configuration rewrites HTTPS GitHub remotes to SSH. Filtered clones then
  tried to fetch missing promisor objects over unavailable SSH. Setting `GIT_CONFIG_GLOBAL=/dev/null`
  for fetches and running `fetch --refetch --filter=blob:none` restored the intended transport.
- Partial-clone history commands such as `git log --follow` may fetch older blobs even when the
  visible commit graph exists. Ordinary path history was sufficient for the selected parent skills;
  the GitHub recursive tree API supplied authoritative full-tree counts with `truncated: false`.
- Epic and Valve pages still expose no immutable public revision. The outcome freezes the parent
  agent skills and records the live documentation version/date; later work must refresh the pages.
- Sea Park contains no source license. Its live game, GLBs, audio, code, and documentation are
  evidence artifacts, not reusable inputs.
- Store delivery workflows can look interchangeable at shallow depth. The stopping artifacts keep
  them distinct: Unreal ends at a standalone runtime-tested build, Butler at a live channel upload,
  and SteamPipe at beta testing, ordered reviews, and manual release authority.

## Evidence

| Check | Result |
| --- | --- |
| Failing baseline | Required outcome, four pages, and Goal 04 row were absent; assertion failed with exit 1 before editing |
| Frozen repositories | Sea Park `888fc57`/tree `058853f`, Butler `0c9a730`/tree `e3a9e08`, and parent skills `9ca5296`/tree `bc9b20a` confirmed; complete recursive API inventories were non-truncated |
| Mutable pages | UE remained 5.8; live Butler matched its frozen push behavior; Valve build, testing, branch, and release gates were current on 2026-08-17 |
| Candidate completeness | Four proposed candidates admitted; every additional route has an admit, duplicate, defer, constituent, or exact rejection result |
| Page bounds | One page per target; each new page has six capsule fields, one chart, nine unique main nodes, and six required sections |
| Cold reader | Trigger, ordered loop, feedback gate, outputs, and evidence level are identifiable on all four pages without opening the outcome |
| Mermaid | Fail-fast Mermaid CLI 11.16.0 run rendered all 11 pipeline pages without a parser error |
| Links | Fail-fast markdown-link-check 3.15.0 run passed every pipeline/library file, the outcome, Goal 04, and Goal 80 |
| Index and queue | 11 pipeline files equal 11 index rows; 79 URL-only targets contain zero duplicates; the ten new URLs exactly match the outcome |
| Goal 80 handoff | Exactly one Goal 04 row names all three eligible Sea Park deferrals and summarizes all ineligible records |
| Repository hygiene | Rejected/deferred output paths are absent; `git diff --check` passed; unrelated `brometal-patching` deletion remained untouched |

## What this unblocks

- [Goal 05](execute-goal-05.md) can select recursive wave 2 from exactly ten recorded one-hop
  children without inventing or rediscovering relationships.
- Goal 07 and Goal 80 now have three stable Sea Park overflow names to reconcile against the existing
  deferred performance and asset candidates.
- The library audit can compare four post-build targets whose outputs and evidence levels are now
  explicitly distinct.

## What remains blocked

Nothing in the objective is blocked. The three Sea Park overflow candidates are intentionally
unpublished until Goal 07 reconciles the corpus and Goal 80 refreshes any selected candidate. The
ten direct children remain unselected until Goal 05 applies its shallow selection gate.
