/** Fixtures and skill name for the BroMetal dependency suite. */

import { fixture, SKILLS } from "../../types.ts";

export const SKILL = SKILLS.brometal;

/** The patch runner: EXPECTED_VERSION and the PATCHES registry. */
export const RUNNER = fixture("brometal-patching", "scripts/patch-brometal.mjs");

/** A patch whose upstream PR (#3) is merged and released — retirable. */
export const RETIRABLE = fixture("brometal-patching", "scripts/patch-brometal/render-target-filtering.mjs");

/** A patch whose upstream PR (#4) is merged but not yet released — keep. */
export const UNRELEASED = fixture("brometal-patching", "scripts/patch-brometal/offscreen-multisampling.mjs");

/** A patch with no upstream PR at all — nobody can retire it. */
export const UNTAGGED = fixture("brometal-patching", "scripts/patch-brometal/legacy-hack.mjs");

/** The scripts/ allowlist, the third place a retirement must touch. */
export const ALLOWLIST = fixture("brometal-patching", "scripts/repository-policy.test.mjs");

export const PATCH_DIR = fixture("brometal-patching", "scripts/patch-brometal");
