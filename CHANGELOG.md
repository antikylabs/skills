# Changelog

All notable changes to this repository are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html). A skill's behaviour is its public
interface: a change that alters what an agent does when it loads a skill is a minor or major
version, not a patch.

## [Unreleased]

Nothing yet.

## [0.1.0] — 2026-08-11

First release. Three `team-` skills, a deterministic linter, and a sandboxed evaluation harness that
measures whether the skills change agent behaviour.

Every skill was validated live against `openai/gpt-5.6-luna` through the paired eval. See
[LATEST-EVAL-REPORT.md](LATEST-EVAL-REPORT.md) for the numbers behind the claims below.

### Added — skills

**`team-simplified-technical-english`** — write, audit, and fix documentation against ASD-STE100
Simplified Technical English, Issue 9.

- Three commands: `write` (draft to the standard), `audit` (report only, changes nothing),
  `fix` (audit then apply).
- Ships `scripts/ste_lint.mjs`, a deterministic checker covering 14 of the 53 rules, with the
  controlled vocabulary (2,197 entries), the 61 rule statements, and the numeric limits.
- Ships `ste100.json`, the same vocabulary plus an original STE and non-STE example for every entry.
- `reference/ste-guide.md` condenses the rules to under 400 lines.
- Enforces the rule that matters most: never report text as STE compliant on the strength of a
  linter run. The linter decides 14 checks; roughly half the rules need human judgement, and the two
  results are reported separately.
- Refuses to rewrite a human-owned `_H` document without an explicit owner instruction.
- Carries [NOTICE.md](skills/team-simplified-technical-english/NOTICE.md): ASD-STE100 is the
  property of ASD, and the skill ships the controlled vocabulary and a rule summary, not the
  standard.

**`team-write-adrs`** — write and propose Architecture Decision Records.

- Two commands: `write` (record a decision the owner has made) and `suggest` (draft a record that
  does not exist yet, with why it should and what adopting it would change).
- Follows the conventions already established in `antikySite/docs/adr`: the five-part Nygard format,
  the three status values, `NNNN-title_H.md` naming, and **per-area numbering** — each of
  `framework/`, `cli/`, and `studio/` carries its own sequence.
- Never edits an accepted decision in place. A changed decision is a new record plus a
  `Superseded by` status on the old one.
- `suggest` files nothing into `docs/adr/`, takes no number, and never writes an `Accepted` status.
  A reserved-then-rejected number is a permanent hole in a sequence that can never be reused, and a
  fabricated record corrupts the thing the team holds AI accountable to.

**`team-write-objectives`** — run objectives end to end.

- Eight commands: `init`, `create-research`, `create-plan`, `create-goals`, `execute`, `audit`,
  `complete-goal`, `complete-objective`.
- One lifecycle, two scales. Work too small for a full objective runs the same phases under
  `objectives/goals/<goal-name>/` with fewer artifacts; every command detects which scale it is at.
- Goal format follows the established `demo-refining` provenance: prerequisites, `/goal` objective,
  required outcome, in scope, required tests and evidence, explicit non-goals, engineering
  constraints, and a completion definition with a stop condition.
- Every goal states what the human must supply before it can start, and every summary leads with
  what needs the owner.
- `audit` convenes a 2–3 reviewer panel of specialists, briefed adversarially and run
  independently; the main agent verifies findings before remediating.
- Four templates under `reference/templates/`.

### Added — evaluation harness

- `tests/` — TypeScript, Node 22+, no bun.
- **Sandboxed by default and by requirement.** Every agent run happens inside a rootless podman
  container. The pi agent SDK has no permission model, and
  [its own documentation](https://pi.dev/docs/latest/security) says an in-process sandbox is not a
  security boundary — so there is no host fallback under any flag, and `agent-run.ts` refuses to
  execute unless it detects a container.
- Container posture: `--read-only` rootfs, `--network=none` on deterministic runs, `--cap-drop=ALL`,
  `--security-opt=no-new-privileges`, non-root user, resource caps, read-only mounts. Each control
  is asserted empirically by the self-test rather than assumed.
- **Writable `/workspace`** seeded from the read-only fixtures, so cases assert on the files the
  agent produced rather than on what it said it would do. Writes outside it are refused.
- **Paired with/without-skill arms.** The baseline gets the identical tool surface and prompt minus
  the skill catalog, so a delta is attributable to the skill.
- Skill discovery uses pi's own `loadSkills()`, and the catalog is the `<available_skills>` XML from
  the Agent Skills specification. Activation is a file read of the SKILL.md — matching pi's real
  mechanism, not a dedicated tool.
- **Harness self-test** (`npm run test:sandbox`) is the negative control. Every case declares a
  required `negativeControl`, and the self-test feeds each one to its own assertion and fails the
  suite if the assertion accepts it. An assertion with no counter-example is not a test.
- Full cost and token reporting: input, output, cache read/write, reasoning, per-arm cost, and an
  assessment separating cases the skill carried from regressions, from cases the baseline already
  satisfied.
- Run artifacts in gitignored `tests/eval/runs/<id>/`: `run.log`, per-case pi event JSONL for both
  arms, `report.md`, `report.txt`, `report.json`. `EVAL_TAIL=1` streams the event log live.

### Added — repository

- `AGENTS.md` — skill layout, the sub-command router pattern, name prefixes, and verification.
- Name prefixes: `antiky-`, `brometal-`, `team-`.
- `tests/.env.example` template; `.env` is gitignored.

### Notes

- `ste_lint.mjs` was ported from a Python original and proven byte-identical to it across 186
  differential cases (31 files × 3 modes × 2 strict settings), plus matching exit codes and stderr.
- The eval harness went through three revisions before its numbers could be trusted. The first
  overstated the skills' effect by offering a dedicated `invoke_skill` tool; the second still leaked
  `/skills` to the baseline through a tool description. Both are fixed. Treat any single run of a
  small case set as a weak estimate.

[Unreleased]: https://github.com/antikylabs/skills/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/antikylabs/skills/releases/tag/v0.1.0
