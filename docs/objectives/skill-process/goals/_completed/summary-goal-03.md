# Summary — goal 03: Select recursive harvest wave 1

**Completed:** 2026-08-17
**Commit:** `9ff4319`; completion bookkeeping follows in the commit that archives this summary
**Goal file:** [`execute-goal-03.md`](execute-goal-03.md)

## Action needed from the owner

Nothing in this summary needs you. Four targets passed the existing shallow selection rules, the
goal supplied all naming and evidence boundaries needed to freeze them, and no product or licensing
decision was delegated to the executor.

## What was delivered

1. A complete [recursive-wave selection plan](../../research/08-recursive-wave-01-plan.md) with
   every direct child from the first three harvests represented once: 32 Scott targets, a precise
   zero-edge Thrixel result, and three `gamedev-skills` targets.
2. A four-target [Goal 04 manifest](../../research/08-recursive-wave-01-plan.md#frozen-goal-04-manifest)
   covering Sea Park, Unreal packaging, itch.io Butler, and SteamPipe in dependency-safe execution
   order.
3. One exact non-colliding pipeline filename, expected artifacts, source relationship, frozen state,
   provenance/license risk, six admission-evidence requirements, six verification questions, and
   rejection conditions for each selected target.
4. Specific rejections for 27 candidates and three target-only deferrals. The two inaccessible
   URLs retain their observed `403` and `404` results and dates instead of guessed replacements.
5. A matching Goal 03 [Goal 80 intake row](../execute-goal-80.md#candidate-intake) that records no
   eligible deferred pipeline candidate. Selected targets belong to Goal 04; unresolved target
   leads remain exclusions.

## What I got wrong

The first file-tree filter treated any path containing `workflow` as potential development-process
evidence. It surfaced deploy CI and bundled capability skills that were not used as a project-level
loop. I read the strongest false positive, `dedekpo/stylized-scene`, and corrected its disposition:
its `.agents` inventory and generic planning interview do not connect to an evidenced game-build
process.

The first deterministic Goal 03 row assertion over-escaped the Markdown pipe and matched all 152
lines in Goal 80. I replaced it with a fixed-string count. The corrected assertion proves exactly
one Goal 03 row; no content changed to accommodate the test.

## Traps worth knowing

- `?recursive=1` must be quoted in zsh when querying hosting tree APIs. Two initial tree requests
  were treated as glob patterns and were rerun with quoted URLs before their evidence was used.
- A normal link check must fail on this plan: CodePen returns `403` and `scottstts/Stellar` returns
  `404`, and preserving those failed links is a goal requirement. The audit first reproduced only
  those two failures, then accepted exactly those status records to prove the other 64 plan/intake
  links.
- Live Valve and Epic documentation exposes no immutable public page revision. The manifest freezes
  the parent AI-agent instructions and records the live-page version gap; Goal 04 must refresh the
  pages rather than pretending they are immutable.
- A public implementation, build command, CI workflow, or confident “AI-friendly” claim is not an
  AI-assisted development process. The selected Sea Park repository is different because it ships
  agent rules, a dependency plan, persistent agent memory, runtime checks, and owner feedback.

## Evidence

| Check | Result |
| --- | --- |
| Complete one-hop graph | Deterministic URL-set comparison matched all 35 completed-harvest candidates to 35 plan rows; 32 Scott plus three `gamedev-skills` rows; Thrixel's zero-edge result remains explicit |
| Direct and canonical selected edges | Every selected section links its parent harvest; the three documentation targets also link the exact frozen parent skill; hosting metadata and effective URLs establish canonical identity |
| Availability | 33 URLs returned `200` on 2026-08-17; CodePen returned `403`; Stellar returned `404`; selected URLs all returned `200` |
| Bounds and exact outputs | Four selected targets, one proposed page each, four exact flat filenames, and zero collisions with the current pipeline directory |
| Admission observability | Every proposed candidate has observable expected evidence for all six admission gates plus target-specific verification and rejection questions |
| Negative results | 27 candidate-specific rejections, three target-only deferrals, zero duplicate identities, and explicit license/access/already-covered records |
| Goal 04 authority | Target URLs, frozen state, proposed identity, filename, and execution order are all recoverable from the manifest alone |
| Goal 80 handoff | Exactly one Goal 03 row links the manifest, says `None`, and keeps target-only deferrals out of deferred pipeline work |
| Links | Pinned `markdown-link-check` checked 56 plan links and ten Goal 80 links; only the recorded `403`/`404` failed normally, and the intentional-status run passed all links |
| Repository hygiene | Deterministic row/count/collision checks passed; changed files have no trailing whitespace; `git diff --check` passed; unrelated `brometal-patching` deletion remained untouched |

## What this unblocks

- [Goal 04](../execute-goal-04.md) can harvest exactly four targets without rediscovering scope,
  choosing filenames, or substituting a more convenient target after a rejection.
- Goal 04 can also complete with zero pages if deep inspection rejects all four candidates; the
  manifest supplies explicit rejection boundaries and forbids ad hoc replacements.

## What remains blocked

Nothing in the objective is blocked. The four proposed pages remain unadmitted until Goal 04
performs full source inventories, history and license refreshes, node/edge mappings, and admission
tests.
