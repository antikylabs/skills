# Antiky agent skills

Skills used by the Antiky Framework, BroMetal, Antiky Studio, and the Antiky team.

Each directory under [`skills/`](skills/) is an independently installable agent skill. Skills follow
the [Agent Skills specification](https://agentskills.io) and install with the open
[`skills` CLI](https://github.com/vercel-labs/skills).

## Install

```bash
# List the skills in this repository
npx skills add antikylabs/skills --list

# Install one skill
npx skills add antikylabs/skills --skill general-write-adrs

# Install several skills for a specific agent
npx skills add antikylabs/skills -a claude-code --skill general-write-adrs --skill general-write-objectives

# Install everything
npx skills add antikylabs/skills --all
```

Add `-g` to install to your user directory instead of the current project.

## Use without installing

```bash
npx skills use antikylabs/skills@general-write-adrs | claude
```

## Name prefixes

Every skill name starts with a prefix. The prefix states which surface the skill belongs to, so you
can install one domain at a time and read a skill list without opening it.

| Prefix | Domain |
| --- | --- |
| `antiky-` | **Using** Antiky products — building a game with the CLI, Framework, or Studio. |
| `brometal-` | Building things with BroMetal — shaders, render passes, effects. |
| `repo-` | **Working inside** an Antiky repository — where files go, local tooling, house conventions. |
| `general-` | Working practice not tied to Antiky at all — portable to any repository. |

`antiky-` and `repo-` are easy to confuse. `antiky-` helps someone **use** Antiky — a game developer
with the released CLI who does not have this repository. `repo-` helps someone **work inside** an
Antiky repository — where a file goes, which script generates it, what the house conventions are.

## Skills

| Skill | Status | Purpose |
| --- | --- | --- |
| [`general-write-adrs`](skills/general-write-adrs/) | Ready | Write and propose Architecture Decision Records. |
| [`general-write-objectives`](skills/general-write-objectives/) | Ready | Run objectives end to end: scaffold, research, plan, goals, execute, audit, archive. |
| [`general-brometal-patching`](skills/general-brometal-patching/) | Ready | Consume BroMetal as a patched dependency and upstream the fixes. |
| [`general-simplified-technical-english`](skills/general-simplified-technical-english/) | Ready | Write, audit, and fix text against ASD-STE100 Issue 9. Carries a deterministic linter and the controlled vocabulary. |
| [`general-write-docs`](skills/general-write-docs/) | Ready | Write and audit user-facing documentation with Diátaxis. Covers each page type and the way it fails. |
| [`general-engineering`](skills/general-engineering/) | Ready | A principal-engineer sidekick for judgement. Gut-check, talk out, plan, or grill. Read-only. |
| [`general-wait-what`](skills/general-wait-what/) | Ready | Re-pitch something that did not land. Human-invoked only — it stays out of the model's catalog. |
| [`repo-write-adrs`](skills/repo-write-adrs/) | Ready | Antiky ADR conventions: areas, per-area numbering, the index, the AIP link, the writing standard. |
| [`repo-write-objectives`](skills/repo-write-objectives/) | Ready | Antiky objective conventions: the layout, file naming, required reading, archiving. |
| [`repo-write-docs`](skills/repo-write-docs/) | Ready | Antiky documentation standards: where pages live, what is generated, ownership suffixes, the contract test. |

The `general-` and `repo-` pairs are meant to be used together. The `general-` skill carries the
craft, which is portable to any repository; the `repo-` skill carries only what is true here. A
repository's `AGENTS.md` points at the `repo-` skill rather than restating the convention, so an
unrelated session does not pay for it.

Stub skills contain frontmatter only. They are placeholders and do not yet give an agent useful
instructions.

### Sub-commands

A skill that covers more than one job routes through a sub-command. `SKILL.md` holds the command
table; each command has its own playbook under `reference/`.

```
/general-simplified-technical-english audit docs/adr/framework/0021-*.md
/general-simplified-technical-english fix README.md
/general-simplified-technical-english write
```

| Skill | Commands |
| --- | --- |
| `general-simplified-technical-english` | `write`, `audit`, `fix` |
| `general-write-adrs` | `write`, `suggest` |
| `general-brometal-patching` | `update`, `patch`, `pr` |
| `general-write-objectives` | `init`, `create-research`, `create-plan`, `create-goals`, `execute`, `audit`, `complete-goal`, `complete-objective` |
| `general-write-docs` | `classify`, `write`, `audit`, `split` |
| `general-engineering` | `gut-check`, `talk-it-out`, `plan-it`, `grill-it` |
| `general-wait-what` | *(bare)*, `init` |

## Repository layout

```
skills/
  <prefix>-<skill-name>/
    SKILL.md            # required: YAML frontmatter with name + description, then instructions
    agents/
      openai.yaml       # optional: Codex/OpenAI display metadata
```

The CLI discovers skills in `skills/` up to three directory levels deep, so category folders such as
`skills/general/general-write-adrs/SKILL.md` also work. This repository keeps them flat.

## Add a skill

```bash
npx skills init skills/<prefix>-<skill-name>
```

Then fill in the frontmatter and the body. See [`AGENTS.md`](AGENTS.md) for the authoring rules.

## Hide a work-in-progress skill

Set `metadata.internal: true` in the frontmatter. The CLI then hides the skill unless the installer
sets `INSTALL_INTERNAL_SKILLS=1`.

## Third-party notices

`general-simplified-technical-english` carries the ASD-STE100 controlled vocabulary and a summary of
its rules. ASD-STE100 is the property of ASD and its name is an EU registered trade mark. See
[the skill's notice](skills/general-simplified-technical-english/NOTICE.md) for what is and is not
included, and get the standard itself, free, from <https://www.asd-ste100.org>.
