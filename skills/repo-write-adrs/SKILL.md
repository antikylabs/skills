---
name: repo-write-adrs
description: House conventions for Architecture Decision Records in Antiky repositories — the areas and their separate numbering sequences, the ownership suffix, the index, the AIP link, the in-place clarification procedure, and the writing standard. Use alongside general-write-adrs when creating or changing an ADR under docs/adr/.
---

# Antiky ADR conventions

**This skill is the convention.** It is not a summary of a file kept somewhere else — the rules live
here, so every Antiky repository gets the same ones from one place, and changing them is one edit
rather than one per repository.

A repository's `docs/adr/AGENTS.md` points at this skill. It does not restate what is below.

## First: the craft is elsewhere

Load **`general-write-adrs`** for what an ADR *is*: the five-part format, the statuses, the
supersede-never-edit rule, what a Consequences section must contain, and the difference between
recording a decision and proposing one.

This skill says only what is true *here*. If you find yourself explaining the Nygard format, you are
in the wrong file.

## Numbering is per area

Three areas, each with **its own sequence starting at 0001**:

| Area | Governs |
| --- | --- |
| `docs/adr/framework/` | Antiky Framework: world data, simulation, the rendering boundary, sessions |
| `docs/adr/cli/` | The Antiky CLI and its project services |
| `docs/adr/studio/` | Antiky Studio: the editor, workspace, and project model |

Read the area before choosing a number. A global maximum is the wrong answer and will collide:

```bash
ls docs/adr/<area>/*.md | sed 's|.*/||' | grep -oE '^[0-9]{4}' | sort -n | tail -1
```

Numbers are never reused, including after a record is superseded. A gap is information.

Do not invent an area. A new one is a decision for a human owner.

## Naming and ownership

Files are named `NNNN-short-title_H.md`. Four digits, lowercase hyphenated title, and the `_H`
suffix.

Antiky marks ownership with a suffix:

| Suffix | Owner | An agent may |
| --- | --- | --- |
| `_H` | Human | Read it. Change it only on the owner's explicit instruction |
| `_A` | Agent | Maintain it as part of normal work |
| `_S` | Script | Never edit. Change what generates it |

**Every ADR is `_H`.** Core Contributors write, approve, and own them. That is the constraint that
matters most here: an agent does not create or change an ADR unasked, however obvious the change.

## The index

`docs/adr/README.md` lists every record under its area heading:

```markdown
- [0021: Own BroMetal in a BroMetal render driver](framework/0021-brometal-render-driver-ownership_H.md)
```

Add the entry in the same change as the record. A record missing from the index does not exist to a
reader.

## The AIP link

Antiky proposals live as AIPs. Where a decision came from one, link it in the Context.

The options analysis usually stays in the AIP rather than the ADR — include it in the record only
when a reader cannot follow the decision without it. There is no `Proposed` status: proposal and
review belong in the AIP or the pull request.

## Changing an accepted record in place

`general-write-adrs` covers the rule — a changed decision is a new record, never an edit. For an
owner-approved *clarification* that must happen in place, preserve the committed text first:

```bash
./docs/adr/tag-hash.sh docs/adr/framework/0001-example_H.md "Clarified the boundary of the decision."
```

Run it while `HEAD` still contains the prior wording. The script appends a revision-history entry
holding the current full commit hash and the note. Then make the edit.

## Writing standard

Every ADR must use ASD-STE100 Simplified Technical English, current issue. Use
`general-simplified-technical-english` rather than judging the vocabulary from memory, and report the
machine result and the judgement result separately.

Never report an ADR as STE compliant on the strength of a linter run.

## Verification

Before committing ADR work:

- Title, Status, Context, Decision, and Consequences all present.
- The status is one of the three permitted values.
- The number is the next unused one **in that area**, four digits.
- The filename ends `_H.md`.
- The record appears in the index under the right area.
- Every local link resolves.
- `git diff --check` is clean.
- The STE audit is reported separately from the format and link checks.
