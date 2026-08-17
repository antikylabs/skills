# Summary — goal 05: Select recursive harvest wave 2

**Completed:** 2026-08-17
**Commit:** `c91fa78`; completion bookkeeping follows in the commit that archives this summary
**Goal file:** [`execute-goal-05.md`](execute-goal-05.md)

## Action needed from the owner

Nothing in this summary needs you. All ten direct children resolved, the selection boundary supplied
an unambiguous empty-wave result, and no licensing, product, or risk decision required owner
authority.

## What was delivered

1. A complete [wave-2 selection plan](../../research/10-recursive-wave-02-plan.md) with the
   deduplicated four-parent/ten-child graph, current canonical identities, immutable heads for the
   three repository children, selection rationale, and a disposition for every child.
2. A final split of seven artifact or constituent duplicates and three AI-scope or distinct-loop
   rejections. No source was deferred, retried without evidence, or promoted merely to fill a slot.
3. An explicit empty Goal 06 manifest with zero targets, zero candidates, zero filenames, and a
   dependency-safe no-op order. Goal 06 cannot infer a replacement or follow a second-hop edge.
4. A matching [Goal 05 intake row](../execute-goal-80.md#candidate-intake) that records `None` and
   keeps every rejected or duplicate target out of Goal 80's deferred-pipeline queue.
5. No pipeline page, pipeline-index entry, or target-queue change. The public library remains at 11
   accepted pages.

## What I got wrong

The recorded `Chaser324/unity-build` name initially looked like the target's current identity.
Resolution showed that it now redirects to `superunitybuild/buildtool`. I froze the maintained
canonical repository and its current head while retaining the recorded parent edge. Leaving the old
identity unexamined would have made Goal 06's source reference stale.

`remarkablegames/setup-butler` also contains an `AGENTS.md`, which could look like new AI-scope
evidence from a filename alone. Reading it showed that it instructs agents maintaining the GitHub
Action; it does not place an agent inside game build or delivery. The target remains a setup and
already-covered rejection rather than a selected AI-assisted pipeline.

## Traps worth knowing

- A direct-child URL can remain a valid graph edge after its repository is renamed or transferred.
  Record both the original edge and the resolving canonical identity; do not create a second target.
- Agent instructions in a tooling repository establish AI scope only for the activity they govern.
  Repository maintenance does not automatically make the tool's downstream game workflow
  AI-assisted.
- First-party subpages can contain strong ordered evidence and still be duplicates. The two Epic
  pages and four Valve pages are already constituent branches, gates, or repeats in admitted pages.
- An empty wave is the required stop when distinct evidence decays with graph distance. It is not
  permission for the next goal to search for replacements.

## Evidence

| Check | Result |
| --- | --- |
| Failing baseline | The plan and Goal 05 intake row were both absent; the assertion failed with exit 1 before editing |
| Direct graph | The ten Goal 04 child URLs reconcile one-to-one with ten Goal 05 ledger rows and ten unique canonical identities |
| Current access | All ten recorded URLs returned `200` on 2026-08-17; the Chaser URL resolved to `superunitybuild/buildtool` |
| Repository freeze | Three non-truncated GitHub trees, READMEs, licenses, and relevant shallow sources were inspected at `3106d52`, `c361c56`, and `3b5cc7f` |
| Mutable sources | Both Epic 5.8 pages and all four Valve pages remained accessible and retained the constituent operations used by existing pages |
| Complete disposition | Seven duplicates, three rejections, zero deferrals, zero selections; every known child appears exactly once |
| Manifest bounds | Zero selected targets and zero filenames satisfy the six-target and two-filenames-per-target caps; no collision is possible |
| Goal 06 handoff | The manifest alone yields exact allowed targets `None`, paths `None`, and order `documented no-op` |
| Goal 80 handoff | One Goal 05 row links the plan, records `None`, and explicitly excludes target-only relabeling |
| Links | `markdown-link-check@3.15.0` passed all 24 plan links and all 12 Goal 80 links |
| Repository hygiene | Structural assertions and `git diff --check` passed; no pipeline, index, or target file changed |

## What this unblocks

- [Goal 06](../execute-goal-06.md) can write its required empty-wave outcome without inspecting a
  target or changing pipelines, the index, or the target queue.
- Goal 07 can later audit a corpus whose second recursive wave stopped for recorded evidence reasons
  rather than an arbitrary quota.

## What remains blocked

Nothing in the objective is blocked. Goal 07 still waits for Goal 06 to record and complete its
documented no-op outcome.
