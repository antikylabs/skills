# Changelog

All notable changes to this repository are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html). A skill's behaviour is its public
interface: a change that alters what an agent does when it loads a skill is a minor or major
version, not a patch.

## [Unreleased]

Nothing yet.

## [0.2.0] — 2026-08-11

Adds a fourth skill, makes the eval harness measure behaviour rather than prose, and turns cutting
a release into one command.

### Added

**`team-brometal`** — consume BroMetal as a patched dependency and upstream the fixes.

- Three commands: `update` (bump, re-check every patch, retire what landed), `patch` (add a local
  patch), `pr` (fork, implement against source, open the pull request, tag the patch with it).
- Encodes the practice from BroMetal PRs #3–#7: one patch module per upstream contribution, every
  module naming its pull request and its retirement steps, and the runner's four guarantees —
  patch every installed copy, guard the version, throw on a moved target, stay idempotent.
- `reference/pr-template.md` carries the nine-section pull request body, including the closing
  hand-over that invites the maintainer to decline.
- The rule that makes `update` possible at all: a patch with no upstream URL cannot be retired by
  anyone who was not there, so `update` reports it as a defect in its own right.
- ADR `framework/0021` is the authority. A contribution must help renderers in general or correct
  an error; an Antiky preference does not go upstream, and therefore does not become a patch.

**Release tooling**

- `scripts/release.mjs`, run as `npm run release v0.2.0`. Preflight, free verification, paired live
  eval, report generation, commit, annotated tag, push — in that order, each gated on the last.
  `--dry-run`, `--skip-eval`, and `--no-push` for rehearsal. The harness self-test runs before the
  live eval, because a measurement whose assertions cannot fail is not worth paying for.
- A root `package.json` with `release`, `test`, `eval`, `eval:paired`, and `sandbox`.

### Changed

- **The eval agent now works in a writable `/workspace`** seeded from the read-only fixtures, so
  cases assert on the files produced rather than on what the agent said it would do.
  `edit_file`, `write_file`, and `move_file` really run; writes outside the workspace refuse.
  Every run is diffed against the pristine fixtures.
- **Skill discovery uses pi's own `loadSkills()`**, and the catalog is the `<available_skills>` XML
  from the Agent Skills specification. Activation is a file read of the SKILL.md, matching pi's
  real mechanism.
- **Case and fixture directories are named exactly for the skill they exercise**
  (`tests/eval/cases/team-write-adrs/`, `tests/eval/fixtures/team-write-adrs/`), so a skill, its
  cases, and its fixtures are always found under one name.
- Reasoning effort is configurable with `EVAL_THINKING`, defaulting to `low`.
- Run artifacts now include `report.md` alongside `report.txt` and `report.json`.
- `AGENTS.md` states that a name prefix describes what the agent is *doing*, not the subject
  matter — `team-brometal` is our practice for consuming BroMetal, while a `brometal-` skill would
  be for building things with it.

### Fixed

- **The eval overstated the skills' effect.** Two harness defects, both corrected: a dedicated
  `invoke_skill` tool made activation far more salient than in production, and the baseline arm was
  told about `/skills` through a tool description, letting it find skills by exploring. The
  measured delta moved substantially at each fix. Numbers before v0.2.0 should not be compared with
  numbers after it.
- `objectives/reference/init.md` explained instead of acting — the eval caught 12 reads and zero
  writes. Front-loading the action into a "Do this" block fixed it, and the trace dropped to 5 tool
  calls.
- Two ADR assertions were coupled to a directory name and became vacuous when the suites were
  renamed. The harness self-test caught it. Both now key on the `NNNN-title_H.md` filename.

### Known defects

Recorded in [LATEST-EVAL-REPORT.md](LATEST-EVAL-REPORT.md) rather than hidden. The recurring one:
in several playbooks the model reads the instructions and *describes* the right action instead of
taking it. The `init.md` fix is the proven remedy and has not yet been applied elsewhere.

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

[Unreleased]: https://github.com/antikylabs/skills/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/antikylabs/skills/releases/tag/v0.2.0
[0.1.0]: https://github.com/antikylabs/skills/releases/tag/v0.1.0
