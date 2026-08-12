# Pull request body format

Nine sections, in this order. Each earns its place. Drop one only when it genuinely does not apply,
and never drop section 9.

This format came out of BroMetal pull requests
[#3](https://github.com/ericdrowell/brometal/pull/3)–[#7](https://github.com/ericdrowell/brometal/pull/7).

---

## 1. Lead with the current behaviour, quoted from their code

Not your diagnosis — their code. The maintainer should recognise it immediately.

````markdown
`createRenderTarget` hard-codes its sampler to nearest:

```ts
const sampler = device.createSampler({ magFilter: 'nearest', minFilter: 'nearest' });
```
````

## 2. Take their existing comment seriously — Chesterton's fence, in public

If a comment explains why the code is as it is, say which part still holds and which no longer
matches the code. It shows you read it, and it is usually half-right.

> The second half of that is right and this PR keeps it. The first half no longer matches the code:
> `TARGET_FORMAT` is `rgba16float`, which **is** filterable in core WebGPU…

## 3. Say plainly if their code was not wrong

The strongest thing you can write when it applies. One of ours looked like an obvious one-line bug
and was not:

> **That line is not wrong on its own**, and it took me a while to see why. The target texture is
> single-sampled, and a pipeline must match its attachment, so `1` was the only valid value.

## 4. Why it matters, in user terms

What a developer using the library actually experiences, and why they would misattribute it. Not
internal mechanics — the symptom.

## 5. What changed

The change itself, with the default called out explicitly:

> …defaulting to `nearest` so nothing changes for existing callers.

A maintainer's first question is "what breaks". Answer it before they ask.

## 6. Tests

The test you added, in their harness. The before/after evidence:

```
WITHOUT   ✗ two batches in one frame keep their own attribute data
WITH      ✓ two batches in one frame keep their own attribute data
```

And anything that did **not** run, said plainly — "WebKit is not installed locally, so I could not
run that suite" is better than silence.

## 7. Notes for the maintainer

Decisions you deliberately did not take, and why. This is where you show the edges of what you know:

> `samples` is a number rather than a `1 | 4` union because supported counts are a device
> capability. Validating against the device would be reasonable; I left it out rather than guess at
> the API you would want.

## 8. Provenance and scope

Only when the change was extracted from something larger. What it carries, what it **deliberately
excludes**, and what needed porting.

## 9. Over to you

Never drop this. It converts the pull request from "merge my code" into "here is a problem and one
solution", which is the honest framing when you are a stranger to the codebase.

```markdown
## Over to you

Genuine questions, not politeness:

- **Is this applicable at all?** If it does not fit where the project is going, say so and close it
  — no offence taken. We carry it as a local patch today, so nothing of ours is blocked.
- **Is there a better approach?** We arrived at this from the outside, without the context you have
  on the design. If you would solve it differently, we would rather write your version than have
  you merge ours.
- **Anything you want changed** — naming, comment style, test placement, scope — tell us.
```

The "nothing of ours is blocked" line matters: it removes any pressure from the request, which is
true, because the local patch is already carrying us.
