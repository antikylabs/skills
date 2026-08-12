# Antiky skills instructions

These instructions apply to this repository and all its child folders.

This repository holds portable agent skills. It holds no Antiky source code. A skill in this
repository must work in any repository that installs it.

## Agent note

- never use coauthored tags for claude or codex or whatever agent you are.
- read @docs/GOOD_ENGINEERING_H.md for good practices

## Skill layout

One skill is one directory under `skills/`. The directory name is the skill name.

| Path | Required | Purpose |
| --- | --- | --- |
| `skills/<name>/SKILL.md` | Yes | The skill. YAML frontmatter, then the instructions. |
| `skills/<name>/agents/openai.yaml` | No | Display metadata for Codex and other OpenAI agents. |
| `skills/<name>/reference/` | No | Playbooks and reference files the skill loads on demand. |
| `skills/<name>/scripts/` | No | Executables and their data files. |
| `skills/<name>/NOTICE.md` | No | Third-party attribution, when the skill carries other people's material. |

## Skills with more than one job

A skill that covers several distinct jobs takes a sub-command instead of splitting into several
skills. One skill means one description for the agent to route on, and one place to keep the shared
rules.

`SKILL.md` stays a router. It holds:

1. the invariants that apply to every command;
2. shared setup, including how to resolve the skill's own directory;
3. a command table, one row for each command, linking to its playbook;
4. routing rules — what to do for an explicit command, for a bare target, and for neither.

Each command owns one file under `reference/`, named for the command. Put the procedure there, not
in `SKILL.md`. The agent loads one playbook, not all of them.

Rules:

- Make the default command the one that cannot damage the target. Route a bare target to the
  read-only command and offer the writing command afterward.
- State in each playbook whether the command writes files.
- Do not let a read-only command apply changes because the changes look obvious.

`general-simplified-technical-english` is the worked example.

## Scripts

A script in `scripts/` must run from a copy of the skill directory with no install step. Resolve
data files relative to the script, not to the working directory. Keep the working directory at the
user's project.

State the interpreter and any version floor in the playbook that calls the script. Say what to do
when the interpreter is absent: report the gap. Do not silently substitute the agent's judgement for
a tool the skill exists to run.

## Frontmatter

`SKILL.md` must start with YAML frontmatter that has a `name` and a `description`.

```markdown
---
name: general-write-adrs
description: What the skill does and when an agent must use it.
---
```

Rules:

- Make `name` lowercase, use hyphens, and match the directory name.
- Start `name` with a domain prefix. See "Name prefixes" below.
- After the prefix, name the task. Start with a verb when a verb reads naturally. Examples:
  `antiky-build-games`, `brometal-write-shaders`, `general-write-adrs`.
- Write `description` for routing. State the task and the trigger. An agent reads this line to
  decide whether to load the skill.
- Set `metadata.internal: true` while a skill is a stub or is not ready to ship.

## Name prefixes

Every skill name starts with one of these prefixes.

| Prefix | Domain |
| --- | --- |
| `antiky-` | **Using** Antiky products — building a game with the CLI, Framework, or Studio. |
| `brometal-` | Building things with BroMetal — shaders, render passes, effects. |
| `repo-` | **Working inside** an Antiky repository — where files go, local tooling, house conventions. |
| `general-` | Working practice not tied to Antiky at all — portable to any repository. |

The prefix names **what the agent is doing**, not what the subject matter is.

**`antiky-` and `repo-` are the pair that gets confused, so be deliberate.** `antiky-` is for a
reader who *uses* Antiky — a game developer with the released CLI and Framework, who neither has nor
wants this repository. `repo-` is for someone *working inside* an Antiky repository, who needs to
know that ADRs are numbered per area or that `docs/user-facing-docs/api/` is generated.

A skill about writing user-facing documentation is `general-` if it teaches Diátaxis, and `repo-` if
it says which folder the page goes in. Neither is `antiky-`, because neither helps anyone *use*
Antiky. A skill that teaches a game developer to light a scene is `antiky-`.

The same test separates `general-` from `brometal-`. `general-brometal-patching` carries our
practice for consuming BroMetal as a patched dependency — that is dependency practice, portable in
shape, so it is `general-`. A skill for writing BroMetal shaders would be `brometal-`. Both are
about BroMetal; only one is about BroMetal work.

After the prefix, name the task. `general-brometal-patching`, not `general-brometal` — the subject
alone does not say what the skill does with it.

Do not add a prefix without a matching row in this table and in [`README.md`](README.md). A skill
that does not fit an existing prefix needs a human owner's decision first.

## `repo-` skills and `AGENTS.md`

A `repo-` skill encodes **how to do something** in a repository. The repository's `AGENTS.md` or
`CLAUDE.md` then *references the skill* rather than restating it:

```markdown
## Architecture Decision Records

Use the `repo-write-adrs` skill when creating or changing an ADR.
```

This is context economy, not tidiness. `AGENTS.md` is loaded on every session for every task; a
skill loads only when it is needed. A procedure inlined into `AGENTS.md` makes every unrelated
session pay for it, and the file grows until nobody reads it — which destroys exactly the
progressive disclosure that makes skills worth having.

| Belongs in `AGENTS.md` | Belongs in a `repo-` skill |
| --- | --- |
| That a convention exists, and which skill carries it | The convention itself |
| Constraints binding *every* task — commit style, what must never be committed | Any multi-step procedure |
| A pointer to the skill | Numbering, naming, placement, retirement steps |

When a `repo-` skill takes over a convention that an `AGENTS.md` states inline, shrink that file to
a pointer in the same change. Two copies of a convention is worse than either home alone.

## Writing rules

- Keep the skill short. Put long reference material in `reference/` and link to it.
- Give the agent a procedure, a boundary, and a verification step.
- Do not embed version-sensitive API details. Tell the agent to read the current documentation and
  the installed types in the target project.
- Do not depend on paths that exist only in one Antiky repository.
- Use active voice and short sentences.

## Verification

Before you commit a skill change:

- Run `npx skills add . --list` and confirm the skill appears with the expected name.
- Confirm the frontmatter is valid YAML.
- Confirm all local links resolve.
- A skill that ships a script must ship tests for it, under `tests/unit/`.
- Run the harness self-test and the deterministic eval:

  ```bash
  cd tests && npm test          # typecheck, self-test, then the eval
  ```

- Run `git diff --check`.

A passing script test says the tool works. It says nothing about whether the agent loads the skill
when it should, or follows the playbook once loaded. That is what `tests/eval/` measures, and a
change to a skill's behaviour should be validated with a paired live run:

```bash
cd tests && npm run test:skill-behavior:paired
```

Run `npm run test:sandbox` before trusting any eval result. A green suite means nothing unless the
assertions have been shown capable of failing.

A skill's eval lives at `tests/eval/suites/<skill-name>/`, holding both its `cases/` and its
`fixtures/`. The directory is named exactly for the skill, so a skill and everything that measures
it stay together.
