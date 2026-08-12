# update

Bump BroMetal, re-check every patch against the new source, and retire the ones that landed.

This is the command that keeps the patch set from becoming permanent. Run it when upgrading, and run
it periodically even when not — a merged pull request upstream means a patch here is dead weight
that a future version bump will break on.

## Procedure

### 1. Take stock before changing anything

List every patch and its upstream pull request. The URL is in each module's header:

```bash
grep -H "Upstream:" scripts/patch-brometal/*.mjs
```

A module with no upstream URL is a defect in its own right — the patch cannot be retired by anyone
who was not there. Report it, and open the pull request with [pr.md](pr.md) before continuing.

Record the current `EXPECTED_VERSION` from `scripts/patch-brometal.mjs`.

### 2. Check each pull request's status

```bash
gh pr view <NN> --repo ericdrowell/brometal --json state,merged,mergedAt,title
```

Classify each patch:

| Upstream state | Meaning | Action |
| --- | --- | --- |
| Merged **and** in the target release | The fix is in the package | Retire the patch — step 5 |
| Merged, not yet released | Still needed on this version | Keep. Note the release that will retire it |
| Open | Still needed | Keep |
| Closed unmerged | They declined it | Keep, and record why in the module header. Consider whether the change belongs on our side of the render driver instead |

"Merged" is not "released". Check the version you are bumping *to* actually contains the commit —
a patch retired one release early breaks the build for everyone.

### 3. Bump the version

```bash
npm install brometal@<version>
npm dedupe
```

`npm dedupe` matters. A version bump can change dependency placement — ours moved from hoisted to
nested-in-eight-workspaces — which breaks anything assuming hoisting, including tests that import
the package from a non-package directory.

Update `EXPECTED_VERSION` in `scripts/patch-brometal.mjs` to the exact new version.

### 4. Re-apply and see what breaks

```bash
npm run postinstall
```

The runner throws `patch target changed` for any patch whose "before" text has moved. That is the
signal to read, not to force:

- **The upstream code changed shape but the defect remains** — update the module's before/after text
  to match the new source. Say in the header that it was re-targeted at this version.
- **The defect is gone** — the upstream fix landed, possibly from a different pull request than
  yours. Verify by reading the new source, then retire the patch. Say so on your pull request and
  close it if it is now redundant.
- **The surrounding code was restructured enough that the patch no longer makes sense** — stop.
  Report it. This needs a decision, not an edit.

Never weaken a guard to make a patch apply. A version guard removed to get an install working is how
an unverified patch reaches production.

### 5. Retire what landed

For each patch whose fix is in the new version, three deletions in one commit:

1. delete `scripts/patch-brometal/<name>.mjs`;
2. remove it from `PATCHES` in `scripts/patch-brometal.mjs`;
3. remove it from the `scripts/` allowlist in `scripts/repository-policy.test.mjs`.

The module header states these three steps precisely so this is mechanical. If the header says
something different, follow the header — it was written by whoever knew the patch.

Then confirm the behaviour the patch provided still works, from the upstream fix rather than from
our patch. A retirement that silently loses the capability is the worst outcome of this command,
because the tests that covered it were often deleted with the patch.

### 6. Verify

```bash
rm -rf node_modules && npm install     # clean install, patches apply from scratch
npm run postinstall                     # idempotent: no bytes change
npm test
```

Re-capture the demos and commit the metrics sidecars. A renderer dependency bump that has not been
looked at is not verified.

### 7. Report

- the version moved from and to;
- each patch, with its pull request state and what happened to it: kept, re-targeted, or retired;
- any patch with no upstream pull request;
- any patch whose target moved, and how you resolved it;
- what the clean-install and idempotency checks showed;
- anything that needs a human decision, unresolved rather than guessed.

## Do not

- Do not retire a patch on "merged" alone. Confirm the commit is in the version you are installing.
- Do not remove or loosen the version guard to make an install succeed.
- Do not re-target a patch without saying so in its header.
- Do not bump the version and retire patches in the same commit. Bump, see what breaks, then retire
  — so a bisect can tell the two apart.
