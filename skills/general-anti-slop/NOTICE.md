# Notice

## dmmulroy/anti-slop

Fifteen of this skill's twenty Oxlint rules take their **names and their intent** from
[`dmmulroy/anti-slop`](https://github.com/dmmulroy/anti-slop) by Dillon Mulroy — MIT, Copyright (c)
2026 — which is where the idea of linting for low-evidence TypeScript came from, and which is worth
reading and installing in its own right.

**The implementations here are ours.** They were written against the
[Oxlint JS plugin API](https://oxc.rs/docs/guide/usage/linter/writing-js-plugins.html) directly,
against the semantics of each rule rather than against its source. The names are kept deliberately
identical so a project can move between the two, or run both, without relearning anything.

That project is MIT and so is this one, so a verbatim copy would have been permitted. We took the
rule set rather than the code for two practical reasons:

- **One fewer dependency.** Upstream needs `@oxlint/plugins` at runtime for `defineRule` and
  `eslintCompatPlugin`, and its TypeScript sources need Node type stripping. These are plain `.mjs`
  against the ESLint-compatible API, so a target project installs `oxlint` and nothing else.
- **One house style.** Every rule here carries a `Do:` and a `Never:` clause, and ships a fixture
  pair proving it can fire and can stay quiet. A vendored tree would have sat outside both rules and
  drifted from them.

Where the two disagree in a corner case, upstream is the reference implementation and this is the
reimplementation. Report the disagreement there, not here.

The five rules that are entirely ours — `no-tautological-assertion`, `no-disabled-test`,
`no-swallowed-error`, `no-placeholder-body`, `require-suppression-reason` — cover a failure class
that project does not address.

## Oxlint

The plugin targets the ESLint-compatible JS plugin API provided by [Oxlint](https://oxc.rs)
(`oxc-project/oxc`, MIT). Oxlint is not vendored here and is not a dependency of this skill; the
target project supplies it.

## Prior art the other rules draw on

No code taken, but the reasoning is not original and the sources are worth naming:

- **Orphan analysis** — tracing every artifact to a declared intent, and treating untraced artifacts
  as findings, is the practice DO-178C requires for certified software.
- **The oracle discipline** — deriving a rule's expectation from the project's own configuration
  rather than from a preference — follows the EDA distinction between checking a layout against the
  rule deck and checking it against the schematic that declared the intent.
- **Fixture-per-rule falsifiability** follows `ast-grep`'s rule-test model, whose four outcomes
  (validated, reported, noisy, missing) name false positives and false negatives as first-class
  results rather than as accidents.
