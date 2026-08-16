/**
 * Preserve the configured sample count in off-screen passes.
 *
 * drawTo sets passSamples = 1 unconditionally, so a pass rendering into an off-screen target
 * silently drops from 4x MSAA to none.
 *
 * **Upstream: https://github.com/ericdrowell/brometal/pull/4**
 * drawTo: keep the configured sample count for off-screen passes
 *
 * Retire this file when #4 is merged or released. Nothing else needs changing —
 * remove the module, drop it from PATCHES in ../patch-brometal.mjs, and from the
 * scripts/ allowlist in ../repository-policy.test.mjs.
 */
export const name = 'offscreen-multisampling';
export async function apply({ replace }) { /* ... */ }
