/**
 * A per-target filter option on render targets.
 *
 * The sampler is hard-coded to nearest. The comment above it blames rgba32float, which is not
 * filterable without a device feature — but TARGET_FORMAT is rgba16float, which IS filterable in
 * core WebGPU. That half of the comment is stale. The other half is real and preserved: a target
 * holding simulation state must not interpolate.
 *
 * **Upstream: https://github.com/ericdrowell/brometal/pull/3**
 * render target: allow linear filtering, keep nearest as the default
 *
 * Retire this file when #3 is merged or released. Nothing else needs changing —
 * remove the module, drop it from PATCHES in ../patch-brometal.mjs, and from the
 * scripts/ allowlist in ../repository-policy.test.mjs.
 */
export const name = 'render-target-filtering';
export async function apply({ replace }) { /* ... */ }
