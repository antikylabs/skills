/**
 * BroMetal suite — cases for `team-brometal`.
 *
 * Fixtures live in ../../fixtures/team-brometal/, mirroring the real
 * scripts/patch-brometal tree.
 */

import { inSuite } from "../types.ts";
import { TRIGGER_CASES } from "./trigger.ts";
import { PATCH_CASES } from "./patch.ts";
import { PR_CASES } from "./pr.ts";
import { UPDATE_CASES } from "./update.ts";

export const BROMETAL_CASES = inSuite("team-brometal", [
  ...TRIGGER_CASES,
  ...PATCH_CASES,
  ...PR_CASES,
  ...UPDATE_CASES,
]);
