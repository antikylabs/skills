# Archive summary — architecture-life

**Archived:** 2026-08-14
**Objective folder:** `docs/objectives/architecture-life/` (removed)
**Ran without goal documents.** This was a research objective that produced a skill directly. There
were no numbered plans and no `execute-goal-NN.md` files, so this summary is written from the
research document and the shipped work rather than from goal summaries. Recorded here because the
absence is otherwise invisible.

## What this objective was

The owner asked whether an Architecture Decision Record could become a lint, and whether the same
machinery could stop agents leaving a mess: files in the wrong place, one-off tests, throwaway
scripts, and AI phrasing in documentation. The brief is kept verbatim at the end of this document.

It established that the question was the wrong shape, and that the right one is cheap to answer.

## Delivered outcome

**One skill: [`skills/general-anti-slop/`](../../../skills/general-anti-slop/).** Twenty-eight named
rules across four checkers, plus ten editable prose patterns.

| Where | Count | What |
| --- | --- | --- |
| `scripts/oxlint/rules/` | 5 | Ours: tests that cannot fail, tests committed switched off, discarded errors, placeholder bodies, unexplained suppressions |
| `scripts/oxlint/vendor/anti-slop/` | 15 | `dmmulroy/anti-slop` verbatim, MIT, with its licence and its own test suite |
| `scripts/structure_lint.mjs` | 4 | Uncollected tests, orphan scripts, directory shape |
| `scripts/prose_lint.mjs` | 4 + 10 patterns | Claims with no referent, time estimates, empty metaphors, structural tics |

Four commands — `install`, `code`, `prose`, `structure` — routed from `SKILL.md`, with a playbook
each under `reference/`.

**151 unit tests.** Every rule is driven by a fixture that makes it fire and one that keeps it quiet,
and the suite fails if either is missing. The Oxlint rules run through real Oxlint rather than a
hand-built syntax tree. All twelve of the vendored project's own test files execute against our copy.

**A standing research document**, moved out of this objective to
[`docs/architecture-lint-research.md`](../../architecture-lint-research.md). It carries the reasoning,
the measurements, and the rejected alternatives, none of which are in the skill.

## Durable decisions

Each of these outlives the objective. Every one is recorded in the skill itself, not only here.

| Decision | Recorded in |
| --- | --- |
| A rule declares its **oracle**: `derived` from the project's own configuration, or `heuristic`. A heuristic finding prints `(proxy)` and is arguable | `SKILL.md`, and every finding |
| Every rule carries **`Do:`** and **`Never:`** — the correction, and the cheap wrong fix named so it is not taken | `SKILL.md`; a test fails without both |
| **Never edit a rule to make a finding pass.** Fix the code or argue the finding is wrong | `SKILL.md` |
| **Never edit vendored code.** Turn a rule off locally, or send a change upstream | `NOTICE.md`, `VENDORED.md`, `reference/adding-rules.md` |
| Every rule ships a **fires and passes fixture**, or it does not load | `reference/adding-rules.md`; enforced by the suite |
| The prose rules are **not an authorship detector** and must never be described as one | `reference/prose.md`, and the data file's provenance block |
| A pre-write block is guidance, never a boundary. Rules that matter belong at commit and CI | `reference/adopting.md`, `reference/install.md` |
| Vendored code is exempt from our layout rules | `structure_lint.mjs` |

## What was learned

**The framing was the finding.** Asking whether a machine can verify a decision's rationale is a dead
end, and every field that makes decisions stick already knows it — aviation does not verify that a
deferred repair is safe, and DO-178C does not verify that a requirement was wise. They require a
declaration and diff the declaration. The checkable object is the ceremony around the rationale: that
it exists, that it is stamped, that its scope resolves, and that deviations are named, dated, and
counted.

**One asymmetry does the work.** An agent will fabricate a plausible justification for anything. It
cannot fabricate a hash it did not compute, a path that does not exist, or the passage of ninety
days. Build on hashes, paths, and clocks; never on prose quality.

**Make the cheapest passing action the correct one.** A rule whose violation has a mechanical
suppression teaches the suppression. Several plausible rules invert the principle they encode:
capping thrown exception types is satisfied by swallowing errors, and a hard file-length block is
satisfied by splitting one cohesive file into two coupled ones.

### What this objective got wrong

**The first research pass answered "no", and was rejected.** It took the obvious reading of the
question, produced a tool survey with no citations, never opened two of the three tools the brief
linked, and left four of the brief's nine follow-up questions unanswered. It also contained a
fabricated premise: it recommended an ADR linter on the grounds that "our records are pure Markdown,
so this works on what exists today", when `docs/` held exactly one tracked file and the repository
had no ADR corpus at all. It had mistaken a skill's template for a corpus.

**Em-dash density was recommended, then measured, and is inverted here.** This repository runs
11.4 per thousand words against 3.9 in an AI-slop probe. Under the standard rule, 53 of 610
paragraphs fire and the slop document fires none. The human-owned `GOOD_ENGINEERING_H.md` outscores
the skills corpus. It measures house style, not authorship. Dropped.

**Stylometric self-baselining was killed with data, not taste.** Burrows's Delta was implemented and
run leave-one-out over 46 files. The verdict inverts with the free parameter, and the distance
correlates −0.65 with document length, so it substantially measures size.

**The first build was the wrong shape and had a slop name.** It was a bespoke monolithic engine
called `general-lint-conformance` — an abstract noun hiding what the thing did, which is the exact
defect the skill exists to catch. The correct shape was a rule pack on an engine that already exists.

**The TypeScript rules were first written as a weaker regex port.** That was a misreading of the
licence: both projects are MIT, so the real implementation could simply be vendored with its notice.
The port was deleted rather than kept beside the original, because two implementations of the same
rules, one knowingly worse, is the drift `AGENTS.md` warns about.

**Three defects were found by running the tools on themselves.** The structure checker only listed
tracked files, so it could not see the file an agent had just written. It flagged eval fixtures,
which are data shaped like code. The prose checker split sentences per line, which broke on
hard-wrapped prose and both missed claims and double-reported them.

## What was not done

| Not done | Why |
| --- | --- |
| **The eval suite** | Unit tests prove the tools work. They say nothing about whether an agent loads the skill when it should, or follows the playbook once loaded. `AGENTS.md` requires a paired live run for a behaviour change, and this has not had one. **This is the largest outstanding gap.** |
| **The contract and waiver layer** | Deferred deliberately. The checkers derive their expectations from configuration the project already has, and a declaration file is only worth adding where derivation fails |
| **ADR corpus checks** | Supersede chains, numbering, length limits, and the git check for in-place edits of accepted records. All specified in the research; none built, because this repository has no ADR corpus to calibrate against |
| **The stamp** | Hashing a decision at review time so an edit cannot pass silently. The highest-ceremony item, and worth nothing until the items above are running |
| **Anything from git history** | Measured and rejected for now: 32 commits and 13 files with five or more revisions. Every coupling metric here is a random number generator until roughly 500 commits |

## Follow-on work

- **Build the eval suite** at `tests/eval/suites/general-anti-slop/`, with paired live runs. Nothing
  else here is worth extending until the skill's behaviour is measured rather than assumed.
- **Adopt the checkers in CI** for this repository, per `reference/adopting.md`. They currently run by
  hand.
- **The ADR corpus checks** become worth building the day this repository has decision records.
- **`structure_lint.mjs` is 571 lines**, over the 500-line cohesion review threshold in
  `GOOD_ENGINEERING_H.md`. The natural split is oracle detection from rule evaluation.

---

## Appendix: the owner's brief, verbatim

Kept because it is the input this objective ran on, and the folder that held it is gone.

```text
All right, so I've been thinking on this.

We have a skill for linting ASD/STE 100. We have skills for linting code and all that. I ran across
some other lenders that are on PROSE and AI Slop. I think we can build a linter on architecture
decisions and direction. So I wonder if there's a way to turn an ADR into a lint.

resources:

- Our linter: skills/general-simplified-technical-english/scripts/ste_lint.mjs
- AI Slop Linter: https://github.com/seyedehsanhadi/sloptrim
- Another Better AI Slop Linter: https://github.com/dmmulroy/anti-slop
- Prose linter: https://github.com/vale-cli/vale

Do some research on Architecture ... Things I care about...

- Folder structure etc...
- Stuff in @GOOD_ENGINEERING_H.md
- Making a decision and sticking to it
- Preventing things like errant random one off tests that AI likes to do
- Making sure if script is written it is actually needed and not temporary or just thrown in a
  script folder
- Preventing slop
- Keeping AI wording out of docs and architecture etc. The AI tropes of slop phrasing.

===

Some other thoughts

- What rules engines exists, could we use to start writing new rules
- Can we break down good engineering into a set of lintable rules?
- Can we flag any tests in our codebase that are in funky spots?
- Can we flag random scripts that are not under packages or part of a module?
- Can we flag files that should be broken down?
- Can we flag files that should be put into folder hierarchies not flat list of files?
- Can we block ADRs over a certain length? Warn if they hit a soft length?
- Can we block ADRs if the document doesn't follow a strict format?
- Can we build an up to date corpus of AI generated slop words? Slop patterns? etc?

Really think through this, don't take the obvious for an answer...
```

The two-word slop list that accompanied it — `seam` and `load-bearing` — is now encoded as guarded
patterns in `skills/general-anti-slop/scripts/prose-lint.json`, with the technical uses of both
protected.
