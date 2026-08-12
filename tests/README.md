# Tests

TypeScript. Node 22+, no bun.

```bash
cd tests
npm install
npm test          # typecheck, harness self-test, then the eval
```

## The suites

| Command | What it proves | Cost |
| --- | --- | --- |
| `npm run typecheck` | The harness compiles | free |
| `npm run test:unit` | The shipped scripts work — 77 tests over `ste_lint.mjs` | free |
| `npm run test:sandbox` | **The harness catches misbehavior and the container confines it** | free |
| `npm run test:skill-behavior` | Skill routing and playbook adherence, scripted | free |
| `npm run test:skill-behavior:live` | The same cases against a real model | ~1¢ |
| `npm run test:skill-behavior:luna` | The same, on GPT-5.6 Luna | ~1¢ |

Run `test:sandbox` first. A green `test:skill-behavior` means nothing on its own —
assertions that can never fail are also green. The self-test scripts an agent that
tries to edit a human-owned record and asserts the eval **fails** it.

## The sandbox is not optional

The pi agent SDK has no permission model. It runs with the permissions of whatever
started it, and [its own documentation](https://pi.dev/docs/latest/security) says a
partial in-process sandbox "would be easy to misunderstand as a security boundary"
and that "real isolation needs to come from the operating system or a
virtualization/container boundary".

So every agent run happens inside a container, and there is no host fallback under
any flag. `eval/run.ts` exits 2 when no runtime is reachable, and
`eval/sandbox/agent-run.ts` refuses to execute unless it detects a container.

Rootless podman is the target:

```bash
podman machine init && podman machine start
```

Docker works too — `run.ts` probes for `podman` then `docker`.

Posture, asserted by `test:sandbox`:

| Control | Effect |
| --- | --- |
| `--network=none` | faux runs reach nothing; only live runs get egress |
| `--read-only` | container filesystem immutable |
| `-v ...:ro` | fixtures cannot be modified |
| `--cap-drop=ALL`, `--security-opt=no-new-privileges` | no capabilities, no escalation |
| `USER evaluator` | non-root inside the container as well as outside |
| `--memory=1g --cpus=1 --pids-limit=256` | a runaway run cannot take the machine down |

The skill is **copied into the image**, not bind-mounted, so a container cannot
reach back into the worktree.

## Layout

```
tests/
  unit/
    ste-lint.test.ts  77 tests over the shipped STE linter
  eval/
    run.ts            host orchestrator — spawns containers, never loads the SDK
    self-test.ts      negative control: proves the assertions can fail
    container.ts      container plumbing and the hardening flags
    report.ts         cost, token accounting, and the paired assessment
    pool.ts           bounded concurrency, sized from the container VM
    suites/
      types.ts        shared vocabulary and assertion helpers
      index.ts        the registry
      <skill-name>/
        cases/        one file per concern, plus paths.ts
        fixtures/     the documents those cases work on
    Dockerfile        the sandbox image
    sandbox/
      agent-run.ts    runs ONLY inside the container
      tools.ts        the read-only tool surface
      skills.ts       discovery via pi's own loadSkills()
      workspace.ts    assembles /workspace from every suite's fixtures
```

Everything one skill needs lives under `suites/<skill-name>/`, named exactly for the skill. The
container mounts `suites/` read-only and assembles `/workspace` from each suite's `fixtures/`, so a
case addresses `/workspace/<skill-name>/…` and the skill, its cases, and its fixtures are never
more than one directory apart.

Case and fixture directories are named **exactly** for the skill they exercise, so a skill, its
cases, and its fixtures are always found under the same name.

## Configuration

`tests/.env` is gitignored and holds your key. `tests/.env.example` is the
committed template.

```bash
cp .env.example .env     # then paste your key
```

The scripts load it with `node --env-file-if-exists=.env`, so a missing `.env`
is fine — the default suites run offline and need no key at all. Variables
already set in the shell win over the file, so `EVAL_ONLY=audit npm run
test:skill-behavior` works regardless of what the file says.

Setting `EVAL_PROVIDER=openrouter` in `.env` makes **every** run a paid one,
including the plain `npm test`. It is commented out in the template for that
reason; prefer the `:live` script, which sets it for one invocation.

## Models

Live runs go through OpenRouter. Set `OPENROUTER_API_KEY`. Never Claude pricing.

| Model | in $/M | out $/M | tools |
| --- | --- | --- | --- |
| `deepseek/deepseek-v4-flash` (default) | 0.14 | 0.28 | yes |
| `openai/gpt-5.6-luna` | 0.10 | 0.60 | yes |

pi-ai 0.84 registers providers explicitly rather than shipping a catalog, so both
model definitions are pinned in `agent-run.ts`. The eval does not depend on a
network catalog fetch, and the definitions are the only thing to update when
pricing changes.

## Three arms

`with` vs `without` cannot tell you whether your *writing* helped, because two things move at once:
the no-skill arm has no description to match on, no document to open, **and** no guidance inside it.
A lift is equally consistent with the skill being excellent and with the model doing better whenever
it is handed any page of competent-sounding advice.

`EVAL_SHAM=1` adds a third arm that holds everything constant except the body. Frontmatter is copied
verbatim from each real skill, so the catalog is identical — same names, same descriptions, same
count. Only the text behind the door changes, to generic advice on the same subject
(`eval/sham.ts`). Read the result as:

```
with − sham      the value of what we wrote
sham − without   the value of there being a document at all
```

Ponytail runs the same shape with `caveman` as the middle arm, and their comprehension study is the
argument for it: a plain-prose version of their own rule scored 0/3 where the operational wording
scored 6/6. That gap is invisible with two arms.

## Repeats

Identical configuration has produced deltas of +20, +19 and +12 on this suite. A single run is a
sample, not a measurement. `EVAL_REPEAT=n` runs each arm n times and reports the majority verdict,
flagging any case that did not repeat cleanly. Raise it before quoting a number anywhere; leave it
at 1 otherwise, because three arms at five repeats is fifteen container runs per case.

## Thinking changes what you are measuring

Measured on this suite, luna, one run each, three arms:

| | with | sham | without | delta |
| --- | --: | --: | --: | --: |
| `EVAL_THINKING=off` | 53/67 | 44/67 | 20/67 | **+33** |
| `EVAL_THINKING=medium` | 43/67 | 39/67 | 32/67 | **+11** |

Reasoning moves both arms toward each other: the baseline derives conventions it was never told
(20 → 32) while the guided arm gets *worse* (53 → 43). The delta shrank in eight of nine suites, so
the direction is not noise even though one run per configuration does not fix the magnitude.

Two consequences. A skill measured on a reasoning model will look weaker than the same skill measured
without one, so **the thinking level belongs beside every number quoted**. And a rising pass rate is
not by itself good news: all three arms can rise while the thing the skill adds shrinks to nothing.

## Triage: whose failure is it?

Borrowed from ponytail's writeup on the same problem. Before treating a red case as a skill defect:

- **Both arms fail** — a model ceiling, or a broken case. Not a regression. Ponytail documents Haiku
  failing a probe 0/6 in *both* arms and correctly declines to call it a regression.
- **Both arms pass** — the case has no headroom and measures nothing. Make it harder or drop it.
- **Baseline passes, skill fails** — the skill actively hurt. The most important signal here.
- **A regression is "worse than the recorded baseline", not "any red at all."** Impeccable keeps a
  per-scenario baseline table for exactly this and says so in as many words.

## Why mutating tools exist

`edit_file`, `write_file` and `bash` are defined and always refuse. If they were
absent, the agent could not attempt an edit and the eval could not tell "chose not
to edit" from "had no way to edit". Offering and refusing makes the attempt
observable — which is the entire ownership case.

## Adding a case

1. Add fixtures under `eval/suites/<skill-name>/fixtures/`.
2. Add the case under `eval/suites/<skill-name>/cases/`, and register it in that suite's `index.ts`.
3. Give the case a `script` that satisfies it, and a `negativeControl` that must not.
4. Prove the assertion can fail — every case declares a required `negativeControl`, and the
   self-test feeds each one to its own assertion. An assertion with no counter-example is not a
   test.
5. `EVAL_REBUILD=1 npm run test:skill-behavior` to pick up skill changes.

### Make the control a near miss

A control that is wrong in five ways cannot tell you which of the five the assertion is keyed on.
Ponytail's robustness audit puts it well: the bad reference should be *correct on the happy path*
and cut only the corner the case is about.

The concrete trap here is a trigger case. Its assertion is `skillInvoked`, and a control built from
`saying(...)` makes no tool calls at all — so it fails, but so would a trace of the agent reading
the weather. Use `nearMiss(reason, script)` instead: the agent reads the real fixture, inspects the
real directory, and answers plausibly. It just never opens the skill. Now the assertion has to
separate *read the skill* from *read some files*.

### Assert on something the prompt did not name

A prompt that names the thing being checked can be satisfied by keyword-following. `repoadrs-index-unnamed`
asks only for a record to be filed and then checks the index — which the prompt never mentions —
so only an agent that knows the convention passes. Score the gate (is the record itself well-formed?)
separately from the trap, or "missed the index" becomes a misleading way to say "wrote no ADR".

### Assert on order, not just presence

`before(trace, first, second)` exists because "read the area, then wrote the record" and "wrote the
record, then read the area" contain the same calls and are not the same behaviour. The second one
guessed and checked afterwards.

## Environment variables

| Variable | Effect |
| --- | --- |
| `EVAL_PROVIDER` | `faux` (default) or `openrouter` |
| `EVAL_MODEL` | OpenRouter model id |
| `EVAL_ONLY` | one case id, or a kind (`trigger`, `behavior`) |
| `EVAL_BASELINE=1` | add the no-skill arm (live only) |
| `EVAL_SHAM=1` | add the sham arm: same catalog, generic bodies (live only) |
| `EVAL_REPEAT=n` | run each arm n times; the reported verdict is the majority |
| `EVAL_REBUILD=1` | rebuild the image before running |
| `OPENROUTER_API_KEY` | required for live runs |
