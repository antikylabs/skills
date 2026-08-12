// Runner: applies every module in PATCHES to every installed copy of BroMetal.
import renderTargetFiltering from './patch-brometal/render-target-filtering.mjs';
import offscreenMultisampling from './patch-brometal/offscreen-multisampling.mjs';
import legacyHack from './patch-brometal/legacy-hack.mjs';

const EXPECTED_VERSION = '0.17.2';

export const PATCHES = Object.freeze([
  renderTargetFiltering,
  offscreenMultisampling,
  legacyHack,
]);
