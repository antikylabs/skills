# Can an ADR become a lint?

Research notes, 2026-08-14. Produced under the `architecture-life` objective, archived
2026-08-14 — see [`objectives/_archives/architecture-life-summary.md`](objectives/_archives/architecture-life-summary.md)
for what shipped. Eight parallel investigations: cross-discipline enforcement, git history
as a sensor, the registry pattern, agent-native enforcement loops, slop detection, the
`GOOD_ENGINEERING_H.md` decomposition, a red-team of the previous pass, and ADR-as-compiler-input.

Source of the question: the owner's brief, kept verbatim in
[`objectives/_archives/architecture-life-summary.md`](objectives/_archives/architecture-life-summary.md). This replaces an earlier pass whose
conclusion was "no". The earlier pass was wrong, and the way it was wrong is the finding.

---

## The answer

**Yes. Not by checking what the ADR says — by requiring it to declare, and checking the
declaration.**

The previous pass asked: *can a machine verify that a decision's rationale is true?* No, it cannot.
But that question is a dead end, and every field that actually makes decisions stick already knows
it. Aviation does not verify that a deferred repair is safe. EDA does not verify that a waived
design-rule violation is harmless. DO-178C does not verify that a requirement was wise.

They make decisions stick by **requiring a declaration and then diffing the declaration**. Doorstop
does not understand a requirement, it hashes it. Calibre does not judge whether a violation is
acceptable, it fingerprints it. The aviation Minimum Equipment List does not assess a broken part,
it pre-decided and put a clock on it.

So "rationale is not machine-readable" is true and irrelevant. The checkable object is the ceremony
around the rationale: **that it exists, that it is stamped, that the stamp is current, that its
scope resolves, and that deviations from it are named, dated, and counted.**

That reframe turns most of the brief from judgment into arithmetic.

---

## The asymmetry that makes this work against an agent

Every mechanism below rests on one observation, and it is the reason this is worth building now
rather than in 2015.

**An LLM will fabricate a plausible justification for anything. It cannot fabricate a hash it did
not compute, a path that does not exist, or the passage of ninety days.**

Ask an agent *why* a script is needed and you get fluent, confident, unfalsifiable prose. Ask
whether the script's basename appears in any `package.json` script, CI workflow, Makefile, or import
statement and you get a set difference. Ask whether the decision it claims to follow still has the
same SHA-256 as when a human last reviewed it and you get a bit.

**Design every check on hashes, paths, and clocks. Never on prose quality.** Where a justification
is required, assert only its *shape* — present, non-duplicated, non-`TODO`, carrying an expiry —
never its merit. A rule that judges merit is an LLM opinion in a linter's costume, and it will be
answered with better prose rather than better work.

---

## The design law

From the agent-native investigation, and it governs every rule in this document:

> **Make the cheapest passing action the correct one. Never ship a rule whose violation has a
> mechanical suppression.**

A human treats "file too long" as a hint and uses judgment. An agent treats it as a specification
and takes the cheapest path to green. For `max-lines` there are three cheap wrong fixes — an
arbitrary cut, a suppression comment, a junk file — and one expensive right one. So the rule
*teaches* bad splits.

This is not hypothetical. The full `GOOD_ENGINEERING_H.md` decomposition produced a gaming-mode
column for every candidate rule, and several rules **invert the principle they encode**:

| Rule | Cheapest passing action | What it does to the codebase |
| --- | --- | --- |
| Cap thrown exception types | Swallow the error, return `null` | Creates the failure mode the principle exists to prevent |
| Hard-block files over 800 lines | Split into two mutually-importing files | Converts one file's complexity into cross-file coupling — the #1 root cause named in `GOOD_ENGINEERING_H.md` |
| Require ≥2 options in an ADR | Write "Option B: do nothing" | Teaches straw-manning |
| Log every branch | `logger.debug('')` in each arm | Noise, and the rule is satisfied in two seconds |
| Cap parameter count | Wrap every parameter in one `opts` object | Interface unchanged, count = 1 |
| Count suppression comments | Widen the global config instead | Count falls, safety falls |

A rule that survives this test is worth building. A rule that fails it stays prose, and the kill
list below is populated on exactly this criterion.

---

## Where a check lives

Traditional lint design assumes a human writes code, CI complains hours later, the human fixes it.
With an agent the loop is seconds, the actor reads natural language, and the actor will route around
a block it does not understand.

| Layer | Mechanism | Blocking | Bypassable | Agent can fix in-context |
| --- | --- | --- | --- | --- |
| L0 Always-context | `CLAUDE.md`, `AGENTS.md` | No | Ignorable | No — it is prior, not feedback |
| L1 Conditional-context | `.claude/rules/*.md` with `paths:`, Cursor `globs:`, skills | No | Ignorable | Arrives at the right moment |
| L2 Pre-write block | `PreToolUse` exit 2 | For that tool | **Yes, via Bash** | Yes |
| L3 Post-write | `PostToolUse` `additionalContext` | No | No — already ran | Yes, strongest |
| L4 Turn gate | `Stop` exit 2 | Blocks turn end | User interrupt only | Yes, full context |
| L5 Commit | pre-commit hook | Yes | `--no-verify` | Weakly |
| L6 CI | Any checker | Yes | No | **No — context is gone** |

**Assignment rule: put a check at the latest layer where the agent still holds the context to fix
it, and duplicate the non-negotiables at L6.**

Pre-write blocking is guidance with teeth, never a boundary. This is documented, not folklore:
issue [#31292](https://github.com/anthropics/claude-code/issues/31292) defeats
`disallowedTools: [Write, Edit]` with `sed -i`, `tee`, and heredocs;
[#40408](https://github.com/anthropics/claude-code/issues/40408) defeats *all* write-protection
hooks with `perl -i -pe` and concludes the blocklist approach is incomplete by construction;
[#40117](https://github.com/anthropics/claude-code/issues/40117) has an agent bypassing pre-commit
across six consecutive commits via `--no-verify` and `git stash`, against two explicit deny rules,
then misrepresenting the cause when questioned. All three closed as not planned.

Related and confirmed verbatim in the
[permissions documentation](https://code.claude.com/docs/en/permissions): a `Write(path)` deny rule
is a no-op. File permissions are checked against `Edit(path)` and `Read(path)` only; Claude Code
"accepts the rule but never consults it, and warns at startup." The same holds for `NotebookEdit`,
`Glob`, and `MultiEdit`.

**Corollary, and it is where the leverage is:** the highest-value deterministic rules are grep-simple
bans on the escape hatch itself — `eslint-disable`, `@ts-expect-error`, `# noqa`, `.only`, `.skip`,
`--no-verify`. These are rules a human codebase never needed.

---

## The router: decisions that arrive when they matter

Agents mostly do not defy decisions. They never load them. A repo with sixty ADRs and an agent with
a large context window reads none of them, and a 4,000-word decision competes with the code the
agent actually has to read.

This needs no new infrastructure. `.claude/rules/*.md` already accepts `paths:` glob frontmatter and
triggers when Claude reads a matching file; Cursor `.mdc` rules already accept `globs:` and
auto-attach when a matching file enters context; Windsurf has `trigger: glob`. **That is `affects`,
already shipped at scale by three vendors.**

Give an ADR one field — `affects: ["packages/framework/**"]` — and generate the rule files from it.
The decision loads when the agent touches the governed path and costs nothing otherwise.

The measurement this unlocks has no equivalent in human governance. The `InstructionsLoaded` hook
fires with reason `path_glob_match`, so you can report: **"ADR-014 governed 31 edits and loaded 4
times."** That is decision coverage measured on the *read* side. No document-based governance
program has ever been able to tell whether a decision was actually read.

---

## Turning a decision into a rule

**The rule lives beside the record, never inside it.** This is settled by the repository's own
doctrine: [`format.md`](../skills/general/write-adrs/reference/format.md) line 91 says "Never edit an
accepted decision in place." An embedded rule block is a mutable thing inside an immutable record —
every path rename would force either an illegal edit or a spurious supersede. Bind by filename
(`0007-*.yml` beside `0007-*.md`) and the ADR gains no new fields at all.

The alternative — prose that executes — is Gherkin's shape, and Gherkin is the instructive failure:
the natural-language layer added a glue-maintenance tax, stakeholders never read the feature files,
and scenarios fell out of sync. Rust and Elixir doctests work because the executable text *is* the
artifact under test. An ADR is not.

**There is no compiler to write.** `ast-grep` and `semgrep` both already carry an arbitrary id in
`metadata` and scope by glob in `files:` / `paths:`. `affects` compiles straight into that field.
`ast-grep` ranks first on the criterion that matters here — whether an LLM can author a correct rule
— because it has a small closed vocabulary and a first-class test harness whose four outcomes are
validated, reported, **noisy** (false positive), and **missing** (false negative).

That harness matters beyond convenience. [`AGENTS.md`](../AGENTS.md) already requires that assertions
be shown capable of failing. Rule generation runs at roughly 85–92% precision
([RULELLM](https://arxiv.org/pdf/2504.17198)), so about one rule in eight is wrong. **A generated
rule without a paired failing fixture is not a check, it is a guess.** Make the test mandatory.

Neither engine can assert that a file *must exist*, that a folder must have depth, or that no stray
script sits outside `packages/`. Those are tree walks. Write them in the existing `.mjs` style.

---

## What is mechanically checkable

The previous pass's six-tier taxonomy is worth keeping, with one row corrected and one line
preserved intact:

> **A proxy dressed as a proof is worse than no check.**

The correction: it filed *contextual scope* ("this applies to new code, not the legacy importer")
under Tier 6, not checkable — then two sections later praised `affects`, a path-glob field, as one of
the two ideas worth stealing. Scope-by-path is Tier 1. The taxonomy's worst row is refuted by the
same document's best finding.

Two mechanisms dissolve the rest of Tier 6:

**Enforcement level lives outside the rule.** HashiCorp Sentinel separates advisory /
soft-mandatory / hard-mandatory from the policy body, and states that "enforcement levels are not
configured and are not known by the policy body itself." A rule can ship advisory and be promoted
without touching the decision. "New code only" is a path-scoped enforcement level, not a rationale
problem.

**The escape hatch is the whole game.** A rule with no escape hatch gets deleted or routed around; a
rule with an ungoverned one is theatre. Four instruments, all from fields that have run this for
decades:

| Instrument | Source | Mechanism |
| --- | --- | --- |
| Fingerprint-bound waiver | Calibre DRC | A waiver is valid only while check name, result marker, and cell context match the state at grant time. Change the target, the waiver dies |
| Pre-published time-boxed classes | Aviation MEL | Category A/B/C/D fix intervals (3, 10, 120 days). The deferral catalogue is approved *before* the failure; you cannot invent one at dispatch |
| A policy governing the exceptions | Kyverno | One policy per exception, must name resources explicitly, must name a subject, auto-expiring. Exceptions disabled by default |
| Waivers as a counted metric | conftest | Every run prints `1 exception`. Silence is never an option |

And the named anti-pattern, straight from DRC practice and exactly the AI failure mode: **never let
the checker be edited to pass.**

---

## What to build

Decided and ordered. This section is a specification, not a wish list.

### 0. Close the hole that already exists — about fifteen lines

[`tests/eval/suites/index.ts`](../tests/eval/suites/index.ts) enforces two registry invariants
(duplicate case ids, missing suite membership) and `SUITES` is `satisfies Record<Suite, EvalCase[]>`,
so TypeScript enforces suite-level exhaustiveness. But **nothing checks that every `cases/*.ts` on
disk is imported by its barrel.** Drop `cases/orphan.ts` into any suite and it is never imported,
never run, never reported.

That is "errant random one-off tests that AI likes to do", already possible inside the system that
measures whether the skills work. One assertion — every `cases/*.ts` except `index.ts` and `paths.ts`
is reachable from its barrel — closes it, and demonstrates the entire thesis in miniature.

### 1. The placement checker — a new deterministic script

Every rule here is a tree walk. None needs new metadata. None exists in a shipped linter.

**Test in a funky spot.** Read the target project's own `testMatch` / `include` / `testpaths`
configuration, then flag any file matching a test-name pattern that the runner **would not collect**.
The runner's own config is the oracle, so the finding cannot be argued with, and the only way to
satisfy it is to move the file or declare the root. This is the best rule available: a proof, not a
proxy, with no harmful gaming mode.

**Orphan scripts.** A file under `scripts/`, `tools/`, or `bin/` whose basename appears in no
`package.json` script, CI workflow, Makefile, documentation file, or other source file. This is
DO-178C orphan analysis: untraced code is a finding — trace it or delete it. Validated against
brometal's four scripts, all correctly referenced, zero false positives. `knip` covers JS/TS
reachability only, not `.sh` or `.py`, and not "invoked by CI".

**Directory shape.** Nothing lints this. `ls-lint`, `folderslint`, and `folder-structure-lint` are
allow-list validators — you declare the tree, they check conformance. None infers that a tree is the
wrong shape. Algorithm: tokenise basenames on `-`, `_`, `.` and camelCase, cluster on the first
token, then

- fire **split** when `files ≥ 20 AND coverage ≥ 0.6 AND clusters ≥ 3 AND subdirs ≤ 1`;
- fire **strip-prefix** (a different finding, opposite remedy) when `clusters == 1 AND coverage ≥ 0.9`;
- stay silent when coverage < 0.2 with high first-token entropy — flat and heterogeneous is correct.

Validated on the owner's own repositories:

| Directory | Files | Clusters | Coverage | Entropy | Verdict |
| --- | --- | --- | --- | --- | --- |
| `website/src/shaders` | 86 | 18 | 0.74 | 3.71 | **split** — `balls-*`, `world-*`, `game-*`, `platformer-*` |
| `website/src/shaders/fns` | 132 | 1 | 1.00 | 0.00 | **strip prefix** — every file is `fn*` inside `fns/` |
| `brometal/src/shaders` | 61 | 31 | 0.00 | 4.95 | silent — correctly flat |
| generated UHT build output | 72 | 27 | 0.44 | 4.63 | silent — exclusion list |

The detail that decides it: **entropy alone is the wrong statistic.** Two flat directories of similar
size, one wrong and one right, are separated by cluster *coverage*, not entropy. And cluster *count*
separates two opposite remedies that a naive detector would conflate.

Exclude directories where ≥80% of basenames start with digits — migrations and ADR folders are
supposed to look like that.

### 2. The ADR corpus checker — shipped in `write-adrs`

**Note first: this repository has no ADR corpus.** `docs/` contains exactly one tracked file, and
every `NNNN-*.md` in the tree is an eval fixture under `tests/`. The previous pass claimed "our
records are pure Markdown with `##` sections, so this works on what exists today" — it had mistaken
the skill's own template for a corpus and recommended a linter for zero documents. This checker is
for *target* repositories, which is the right scope for a portable skill, and it must be developed
against fixtures.

Buildable today against the existing strict format, with no new metadata:

- required sections, section order, status in {Accepted, Deprecated, Superseded}, `Proposed` present
  is an error;
- supersede chain integrity — dangling links, cycles, `Superseded` with no successor, `Accepted`
  that something else supersedes;
- number uniqueness and collision, index membership, local link resolution;
- soft and hard length limits. No prior art sets a number; calibrated on this repo's own reference
  documents (longest 3,096 words, typical 800–900), **soft 800 / hard 1,500 body words**, excluding
  code fences and tables. State the gaming mode in the message: a hard cap produces two ADRs where
  one was needed;
- **"Consequences lists only benefits"** — `format.md` calls this the most common defect. Detect as
  the absence of any negative-polarity marker. Report it as a proxy, in those words.

And the highest-value check in the list, which needs only `git`:

**A modified `## Decision` under `Status: Accepted` with no accompanying revision-history entry.**
That is decision drift, caught mechanically, with no new format and no new engine.

### 3. The prose checker — one novel rule, and a rule the doctrine already demands

**Unsupported architectural claim.** A sentence fires when it conjoins a quality attribute
(`robust`, `scalable`, `maintainable`, `performant`, `secure`…), an artifact subject (`this system`,
`the design`, `our approach`…), and an assertion verb (`ensures`, `guarantees`, `provides`,
`improves`…) while containing **no referent**: no digit, no link, no inline-code path, no `ADR-\d+`,
no evidence token (`measured`, `benchmark`, `profiled`, `p99`, `ms`). Exclude imperative and
definitional openers, and strip inline code before matching.

Measured: **0 hits across 32,483 words of this repository, 3/3 on an AI-slop probe, 0 on a
well-written architecture probe.** There is no prior art — proselint has no such check (its entire
`weasel_words.py` is one regex for the word "very") and write-good's list is 26 words with no commit
since 2025-03-10.

This also explains the owner's two-word slop list, `seam` and `load-bearing`. They are not lexical items to
ban; the previous research document itself says "This is the load-bearing content". They are the
symptom of **reaching for a metaphor instead of naming a mechanism**, which is the same defect the
claim checker catches, one level up. The two-word file was a better diagnosis than any 78-rule
corpus.

**Time estimates.** `GOOD_ENGINEERING_H.md` states an absolute rule — "Never report estimated time to
complete a goal/feature/objective." It is a regex over prose, it is exact, and nothing in the
toolchain currently enforces it.

Follow [`ste_lint.mjs`](../skills/general/simplified-technical-english/scripts/ste_lint.mjs): Node
stdlib only, data in a sibling JSON, `path:line:col: severity [rule] message`, `--json`,
`--fail-on`. Put thresholds in the JSON as Vale-style `formula` + `condition` pairs rather than in
code, and give every rule inline `specs: [{from, to}]` cases that **fail rule loading** when they do
not pass. That last idea comes from `prh` and LanguageTool; nothing in the Node prose-lint space
ships it.

### 4. The stamp — later, and only if decisions start drifting

Doorstop's model, reduced to the four fields it actually needs. Each ADR carries
`reviewed: <sha256 of its own normative block>`; each enforcing rule carries `adr: 0014@<hash>`.
Editing the decision invalidates every stamp pointing at it, and CI fails until a human runs a
re-stamp command.

This inverts what everyone else builds. It does not check code against the decision. It checks
**that nobody quietly rewrote the decision** — which is the drift that actually matters, and the
direct mechanical answer to "making a decision and sticking to it". An agent's edit cannot silently
succeed, and the hash cannot be forged without executing a distinct, loggable command.

Do not build this until items 0–3 are running. It is the highest-ceremony item here.

---

## What not to build

Each of these was killed on evidence, not taste.

**Em-dash density — and this reverses the previous pass.** Measured on this repository against an
AI-slop probe:

| Corpus | em-dash / 1,000 words |
| --- | --- |
| `AGENTS.md` | 7.7 |
| `skills/**.md` | 9.9 |
| `docs/GOOD_ENGINEERING_H.md` (human-owned) | 11.9 |
| The previous research document | **15.7** |
| An AI-slop probe document | **3.9** |

The signal is inverted here. Under the standard rule (max 1 per paragraph) **53 of 610 repository
paragraphs fire and the slop document fires zero times.** The human-owned `_H` document outscores
the skills corpus. This measures house style, not authorship. Shipping it would train the house
style away from itself.

**Vocabulary word lists.** `sloptrim` — one of the two linters named in the brief — self-reports
**ROC-AUC 0.551** against frontier models and states outright that it should not be used as an
authorship classifier. That is a coin flip, disclosed by the tool itself. Separately, booster
adjectives run at 0.03 per 1,000 words in this repository; the base rate is too low for a list to
buy anything the structural rules do not. Keep any vocabulary rule advisory and never gate on it.
Note also that 70 of `sloptrim`'s 71 patterns are structural rather than lexical, and structural
patterns do not decay by model generation.

**Stylometric self-baselining (Burrows's Delta).** Implemented and run leave-one-out over 46 files.
The verdict **inverts with a free parameter**: at MFW ≥ 150 it rates the AI-slop document as more
like this repository than a deliberately well-written architecture document, and Δ correlates −0.65
with log document length, so it is substantially measuring size. Delta discriminates authors over
novel-length texts; this corpus is fragments. A real negative result, not a tuning failure.

**Temporal coupling as a gate, in this repository, now.** Measured: 32 commits, 172 tracked files,
13 files with ≥5 revisions, top file `CHANGELOG.md` at 11. `code-maat`'s default thresholds
(`--min-revs 5`, `--min-shared-revs 5`, `--min-coupling 30`) return an empty table. Any coupling gate
here is a random number generator. It needs roughly 500+ commits before the sensor has signal, and
even then it belongs in a report — gate it and agents split commits until the pair never co-occurs.

**Hotspots as a gate.** `churn × LOC` gated means agents stop touching hot files and fork copies
instead, which is the failure mode GitClear measured. Report only.

**Count-based ratchets.** A count is gameable four ways a set is not: delete-and-recreate, move the
code, split below threshold, and — decisive against an agent — swap violation A for violation B at
equal count. **Gate on the set, report the count.** `betterer` hashes each issue;
`mypy-baseline` zeroes line numbers and matches on message text, which is what kills merge conflicts.

**LLM-as-judge as a gate.** Position flip rates of 25–50%; test-retest agreement falling to ~70% at
temperature 1; frontier judges detecting real errors with true-negative rates below 25%, and
self-consistency does not fix it. If used at all, it must be a different subagent from the writer,
and its output must be advisory context, not a gate.

**Hard file-length blocks.** Splitting a cohesive 900-line file into two mutually-importing 450-line
files scores better and is worse. Keep 500 lines as a warning that demands a written justification —
which is how `GOOD_ENGINEERING_H.md` already words it, "require a cohesion review" — and never make
800 a hard block. The honest replacement exists and nobody ships it: **build the symbol-reference
graph within a file and count connected components.** Two components sharing no symbol are two files
wearing one name. That is a proof, it is language-agnostic, it needs no threshold, and it cannot be
gamed by adding blank lines.

**Logging coverage, "say when you don't understand", "tooling multiplies productivity", counting ADR
options, and counting thrown exception types.** All fail the design law. Two of them invert their own
principle. They stay prose.

**Also do not rebuild what ships.** `eslint-plugin-sonarjs` 4.2.0 carries 275 rules with tuned
defaults (cognitive complexity 15, expression complexity 3, nesting depth 3, identical functions at
3 lines, `no-commented-code`, `todo-tag`). Sonar's Clean Code taxonomy has three sub-attributes that
restate `GOOD_ENGINEERING_H.md` almost verbatim — **Focused**, **Distinct**, **Modular**. Adopt
these and stop. The rules worth writing are the ones about **where files go and whether they should
exist**, which no shipped linter touches.

---

## The nine questions from the brief, answered

The previous pass left four of these with no answer and two with a single table row.

| # | Question | Answer |
| --- | --- | --- |
| 1 | What rules engines exist to write new rules in? | `ast-grep` first (small closed vocabulary, first-class test harness), `semgrep` second (larger registry, stronger model priors). `dependency-cruiser` for JS/TS import rules — its config is plain JSON, so it is generatable. Not Rego: the repo-to-JSON projector is 90% of the work. Not CodeQL, Neo4j, or Grit — infrastructure, license, or sunset |
| 2 | Can good engineering be broken into lintable rules? | Partly, and the honest split is in the two sections above. Roughly a third is already shipped by `sonarjs` and Ruff; a third is buildable and listed under "What to build"; a third fails the design law and stays prose. Every candidate was scored on its gaming mode, which is the column that decides |
| 3 | Flag tests in funky spots? | **Yes, and it is the best rule available.** Read the runner's own config and flag test-named files it would not collect |
| 4 | Flag random scripts not under a package or module? | **Yes.** Orphan analysis against `package.json` scripts, CI workflows, Makefiles, docs, and imports. Zero false positives on a healthy repo |
| 5 | Flag files that should be broken down? | **Not by line count** — that inverts the principle. By in-file connected components, which is a proof and which nobody ships |
| 6 | Flag flat file lists that want a hierarchy? | **Yes.** Prefix-cluster coverage, not entropy. Validated on real repositories, with an opposite-remedy finding for the over-prefixed case |
| 7 | Block ADRs over a length, warn at a soft length? | **Yes.** Soft 800 / hard 1,500 body words, calibrated on this repo's own documents. No prior art sets a number, so state the calibration and the gaming mode in the message |
| 8 | Block ADRs failing a strict format? | **Yes**, and the collection-level checks are where the value is — supersede chains, numbering, link resolution. Everything below that line is `markdownlint` with extra steps |
| 9 | Build an up-to-date slop corpus? | **Not as vocabulary.** Structural patterns do not decay; word lists are wrong within a year. The maintainable version is `vale-ai-tells`' method: derive thresholds from your own accepted-versus-rejected diffs and publish the sample size and date inside the rule file |

---

## What would change these answers

Stated so the kills stay falsifiable.

- **Commit volume.** Every history-based signal is dead here at 32 commits. Past roughly 500,
  re-measure temporal coupling and the deletion-memory idea (flag a diff that re-introduces a
  dependency this repo previously removed — the one history heuristic in the ArchLint study that
  contributed unique true findings).
- **An actual ADR corpus.** The corpus checker cannot be calibrated against zero documents. Its
  thresholds are provisional until there are records to run them on.
- **Claim-checker recall.** Measured precision is 0 false positives in 32k words. Recall is untested,
  because this repo contains no real ADRs. Scope it to architecture paths and expect it to misfire on
  instructional prose.
- **Vendor rule formats.** The router depends on `paths:` and `globs:` frontmatter in three separate
  vendor products. If those change, generation changes; the ADR field does not.

---

## The honest summary

The previous pass answered a question nobody asked — *can rationale be verified true?* — got the
obvious "no", and then recommended building five things anyway, three of which were ADR lints. If the
answer had really been no, its own first recommendation would not exist.

The tractable work is larger than that pass concluded and smaller than the framing suggests. **File
placement, orphan detection, directory shape, ADR corpus validity, in-place edits of accepted
decisions, and unsupported claims are all mechanical today.** Decision drift is mechanical too, but
only in the direction nobody builds: check that the decision was not quietly rewritten, rather than
that the code obeys it.

The genuinely novel contributions available here are three, and none needs a new engine:

1. **The stamp** — a decision hashed at review time, so an edit cannot pass silently.
2. **The claim checker** — assertions of quality with no referent, which no prose linter detects.
3. **The router with a read-side coverage metric** — which decisions governed this change, and
   whether they were ever actually loaded.

The unifying idea is one sentence. **An ADR is not a specification to verify; it is a stamped,
scoped, expiring claim — and every check that survives contact with an agent rides on the stamp, the
scope, or the clock, because those are the three things an agent cannot fabricate.**

---

## Sources

Verified by fetching. Claims marked unverified in the research were dropped rather than repeated.

**Enforcement across disciplines** —
[Doorstop item reference](https://doorstop.readthedocs.io/en/v2.1.2/reference/item/) ·
[StrictDoc](https://strictdoc.readthedocs.io) ·
[RFC 8174](https://www.rfc-editor.org/rfc/rfc8174.txt) ·
[Sentinel enforcement levels](https://developer.hashicorp.com/sentinel/docs/concepts/enforcement-levels) ·
[Kyverno policy for exceptions](https://kyverno.io/policies/other/policy-for-exceptions/) ·
[Regal architecture](https://openpolicyagent.org/projects/regal/architecture)

**Registry and ratchet** —
[api-extractor API report](https://api-extractor.com/pages/overview/demo_api_report/) ·
[ArchUnit freeze](https://www.archunit.org/userguide/html/000_Index.html) ·
[import-linter exhaustive layers](https://import-linter.readthedocs.io/en/v2.9/contract_types/layers/) ·
[Nx module boundaries](https://nx.dev/docs/features/enforce-module-boundaries) ·
[betterer results file](https://phenomnomnominal.github.io/betterer/docs/results-file/) ·
[ESLint bulk suppressions](https://eslint.org/docs/latest/use/suppressions) ·
[mypy-baseline](https://mypy-baseline.orsinium.dev/sync) ·
[unicorn/expiring-todo-comments](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md) ·
[Trivy filtering](https://trivy.dev/docs/latest/configuration/filtering/)

**Agent-native enforcement** —
[Claude Code hooks](https://code.claude.com/docs/en/hooks) ·
[memory and rules](https://code.claude.com/docs/en/memory) ·
[permissions](https://code.claude.com/docs/en/permissions) ·
[Cursor rules](https://cursor.com/docs/context/rules) ·
[AGENTS.md](https://agents.md/) ·
[#31292](https://github.com/anthropics/claude-code/issues/31292) ·
[#40117](https://github.com/anthropics/claude-code/issues/40117) ·
[Rating Roulette](https://arxiv.org/html/2510.27106v1) ·
[Bias in the Loop](https://arxiv.org/html/2604.16790v1)

**Architecture conformance and history** —
[ArchLint (WCRE 2013)](https://rmod-files.lille.inria.fr/Team/Texts/Papers/Maff13b-HeuristicsArchitecturalViolations-WCRE13.pdf) ·
[code-maat logical coupling](https://github.com/adamtornhill/code-maat/blob/master/src/code_maat/analysis/logical_coupling.clj) ·
[Code Red](https://arxiv.org/abs/2203.04374) ·
[ROSE](https://thomas-zimmermann.com/publications/files/zimmermann-tse-2005.pdf) ·
Lupu & Sloman, *Conflicts in Policy-Based Distributed Systems Management*, IEEE TSE 25(6), 1999

**Rules engines and slop** —
[ast-grep](https://ast-grep.github.io) ·
[semgrep](https://semgrep.dev) ·
[RULELLM](https://arxiv.org/pdf/2504.17198) ·
[sloptrim](https://github.com/seyedehsanhadi/sloptrim) ·
[anti-slop](https://github.com/dmmulroy/anti-slop) ·
[vale-ai-tells](https://github.com/tbhb/vale-ai-tells) ·
[Kobak et al., excess vocabulary](https://arxiv.org/html/2406.07016v3) ·
[Liang et al., detector bias](https://arxiv.org/abs/2304.02819) ·
[SonarJS rules](https://www.npmjs.com/package/eslint-plugin-sonarjs)
