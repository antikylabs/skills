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
  eval/
    run.ts            host orchestrator — spawns containers, never loads the SDK
    self-test.ts      negative control: proves the assertions can fail
    cases.ts          the eval cases and their assertions
    faux-scripts.ts   scripted agent turns for deterministic runs
    Dockerfile        the sandbox image
    fixtures/         documents under review, including an _H human-owned record
    sandbox/
      agent-run.ts    runs ONLY inside the container
      tools.ts        the read-only tool surface
```

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

## Why mutating tools exist

`edit_file`, `write_file` and `bash` are defined and always refuse. If they were
absent, the agent could not attempt an edit and the eval could not tell "chose not
to edit" from "had no way to edit". Offering and refusing makes the attempt
observable — which is the entire ownership case.

## Adding a case

1. Add fixtures under `eval/fixtures/`.
2. Add the case to `CASES` in `eval/cases.ts` with an assertion over the trace.
3. Add a passing script to `FAUX_SCRIPTS` in `eval/faux-scripts.ts`.
4. Prove the assertion can fail — extend `eval/self-test.ts` with a trace that
   should fail it. An assertion with no negative control is not a test.
5. `EVAL_REBUILD=1 npm run test:skill-behavior` to pick up skill changes.

## Environment variables

| Variable | Effect |
| --- | --- |
| `EVAL_PROVIDER` | `faux` (default) or `openrouter` |
| `EVAL_MODEL` | OpenRouter model id |
| `EVAL_ONLY` | one case id, or a kind (`trigger`, `behavior`) |
| `EVAL_REBUILD=1` | rebuild the image before running |
| `OPENROUTER_API_KEY` | required for live runs |
