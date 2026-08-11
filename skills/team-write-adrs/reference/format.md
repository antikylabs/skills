# ADR format and placement

The shared conventions. `write.md` and `suggest.md` both depend on this file.

## The five parts

Based on Michael Nygard's original format. Every ADR has exactly these, in this order:

```markdown
# NNNN: Short decision title

## Status

Accepted

## Context

Describe the facts, limits, and needs that make the decision necessary.

## Decision

State the decision in active voice. For example, write "We will..."

## Consequences

Describe the benefits, costs, and other results of the decision.
```

Keep it small. Add links, or a short list of options, only when the Context or the AIP does not
already carry what a reader needs.

Antiky usually keeps the options analysis in the related AIP rather than the ADR. Include it only
when a reader cannot follow the decision without it.

## What belongs in each part

| Part | Holds | Does not hold |
| --- | --- | --- |
| Title | One decision, stated as an outcome | A topic area, a question, a ticket id |
| Status | One of the three values below | A date, an author, a review note |
| Context | Facts, limits, requirements, the conflict being resolved | The decision itself, or advocacy |
| Decision | What we will do, in active voice, present or future | Justification — that is Context |
| Consequences | Benefits, costs, follow-on obligations, accepted losses | Only the benefits |

Consequences that list only benefits are the most common defect. A decision with no cost was not a
decision. State what gets worse, and what the team is accepting.

## Status values

| Status | Meaning |
| --- | --- |
| `Accepted` | The decision controls new work |
| `Deprecated` | Kept for history. Does not control new work |
| `Superseded` | A newer ADR replaces it. Name and link that ADR in the status |

New records are usually `Accepted`: the owner decides before the record is written. There is no
`Proposed` status — proposal and review live in the AIP or the pull request.

When a record supersedes another, say so under its own status too:

```markdown
## Status

Accepted

Supersedes [0006: Keep BroMetal inside the Antiky render driver](0006-brometal-render-driver_H.md).
```

## Naming and numbering

Files are named `NNNN-short-title_H.md`:

- `NNNN` is four digits, the next unused number **in that area**.
- The title is lowercase and hyphenated, and describes the decision.
- `_H` marks the record as human-owned. Every ADR carries it.

**Numbering is per area, not global.** Each area has its own sequence starting at 0001. Read the
area's directory before choosing a number:

```bash
ls docs/adr/framework/*.md | sed 's|.*/||' | grep -oE '^[0-9]{4}' | sort -n | tail -1
```

Numbers are never reused, including for a deleted or superseded record.

## Areas

Place the record in the area whose architecture it governs:

| Area | Governs |
| --- | --- |
| `docs/adr/framework/` | Antiky Framework: world data, simulation, rendering boundary, sessions |
| `docs/adr/cli/` | The Antiky CLI and its project services |
| `docs/adr/studio/` | Antiky Studio: the editor, workspace, and project model |

If a decision spans two areas, it usually is two decisions, or it belongs to the area that owns the
boundary. Ask the owner rather than filing it twice.

Do not invent an area. A new area is a decision for a human owner.

## The index

`docs/adr/README.md` lists every record under its area heading:

```markdown
- [0021: Own BroMetal in a BroMetal render driver](framework/0021-brometal-render-driver-ownership_H.md)
```

The entry text is the record's title, including its number. A record missing from the index is
invisible. Add the entry in the same change that adds the record.

## Changing a decision

**Never edit an accepted decision in place.** An accepted ADR is a historical record.

When a decision changes:

1. Write a new ADR with the next number in that area.
2. Under the new record's status, add `Supersedes [NNNN: title](link)`.
3. Change the old record's status to `Superseded by` and link the new record.
4. Do not delete the old record. Do not reuse its number.

For an owner-approved clarification that must happen in place, preserve the committed text first.
Run this while `HEAD` still contains the prior wording:

```bash
./docs/adr/tag-hash.sh docs/adr/framework/0001-example_H.md "Clarified the boundary of the decision."
```

The script appends a revision-history entry holding the current full commit hash and the note. Then
make the edit.

Do not rewrite an existing `_H` ADR only because its language does not conform to the writing
standard. That needs an explicit instruction from the owner.

## Writing standard

Every ADR must use ASD-STE100 Simplified Technical English, current issue. Use the
`team-simplified-technical-english` skill rather than judging the vocabulary from memory.

The rules that matter most here:

- Use approved words and established technical terms.
- Give one meaning to each term, and use the same term every time.
- Explain an uncommon Antiky or software term where it first occurs.
- Use active voice, one topic per sentence, no more than 25 words in a descriptive sentence.
- Use a vertical list when it makes complex text easier to follow.
- Do not use a semicolon.
- Use an `-ing` word only where the standard approves it or it is a technical term.
- Put a condition before its result when the reader needs the condition first.

Do not drop a necessary technical detail to shorten a sentence. Explain it with short sentences and
consistent terms instead.

## Verification

Before delivering ADR work:

- The record has Title, Status, Context, Decision, and Consequences.
- The status is one of the three permitted values.
- The number is the next unused one in that area, and four digits.
- The filename ends `_H.md`.
- The record appears in the ADR index under the right area.
- Every local link resolves.
- `git diff --check` is clean.
- The STE audit is reported separately from the format and link checks.

Never report an ADR as STE compliant when you ran only format, link, sentence-length, or automated
checks.
