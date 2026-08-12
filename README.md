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
| `antiky-` | Working with the Antiky CLI, Framework, and Studio. |
| `brometal-` | Building things with BroMetal — shaders, render passes, effects. |
| `general-` | Working practice not tied to one Antiky system — documentation, records, planning, dependencies. |

## Skills

| Skill | Status | Purpose |
| --- | --- | --- |
| [`general-write-adrs`](skills/general-write-adrs/) | Ready | Write and propose Architecture Decision Records. |
| [`general-write-objectives`](skills/general-write-objectives/) | Ready | Run objectives end to end: scaffold, research, plan, goals, execute, audit, archive. |
| [`general-brometal-patching`](skills/general-brometal-patching/) | Ready | Consume BroMetal as a patched dependency and upstream the fixes. |
| [`general-simplified-technical-english`](skills/general-simplified-technical-english/) | Ready | Write, audit, and fix text against ASD-STE100 Issue 9. Carries a deterministic linter and the controlled vocabulary. |

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

## Repository layout

```
skills/
  <prefix>-<skill-name>/
    SKILL.md            # required: YAML frontmatter with name + description, then instructions
    agents/
      openai.yaml       # optional: Codex/OpenAI display metadata
```

The CLI discovers skills in `skills/` up to three directory levels deep, so category folders such as
`skills/team/general-write-adrs/SKILL.md` also work.

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
