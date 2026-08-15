# Notice

## dmmulroy/anti-slop — vendored

`scripts/oxlint/vendor/anti-slop/` is a verbatim copy of
[`dmmulroy/anti-slop`](https://github.com/dmmulroy/anti-slop) by Dillon Mulroy.

> MIT License
> Copyright (c) 2026 Dillon Mulroy

The full licence text ships with the copy, at
[`scripts/oxlint/vendor/anti-slop/LICENSE`](scripts/oxlint/vendor/anti-slop/LICENSE), and must stay
with it in any redistribution. That is the only condition MIT attaches, and this repository is MIT
too, so the two compose without friction.

[`VENDORED.md`](scripts/oxlint/vendor/anti-slop/VENDORED.md) records the upstream commit, the date it
was taken, and the command to resync. **Nothing under `vendor/` is edited.** A local change turns
every future resync into a merge, and there is no reason to fork rules somebody else is maintaining.
A rule that is wrong for a project gets turned off in that project's config; a rule that is wrong in
general gets a pull request upstream.

**Their tests run in our suite.** All twelve of the author's own test files execute against our copy
on every `npm run test:unit`. That is what makes the copy trustworthy: it is verified by the people
who wrote it, not by us re-deriving what it should do.

The fifteen rules cover low-evidence *type* patterns — chained type assertions, `unknown` returns
and parameters, known-value widening, unsafe dictionary contracts, `Reflect` access, module mocking,
and assertions with no safety comment.

### Running them

They are TypeScript and load through Node's type stripping, which is on by default from Node 22.18.
On older Node 22, set `NODE_OPTIONS=--experimental-strip-types`. The target project supplies
`oxlint` and `@oxlint/plugins`.

### Our own rules are separate

`scripts/oxlint/rules/` holds five rules written here — `no-tautological-assertion`,
`no-disabled-test`, `no-swallowed-error`, `no-placeholder-body`, `require-suppression-reason`. They
address a different failure class from anything upstream and are deliberately kept out of the
vendored tree so the boundary stays obvious. Register both plugins; they do not overlap.

## Oxlint

Both plugins target the ESLint-compatible JS plugin API provided by [Oxlint](https://oxc.rs)
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
