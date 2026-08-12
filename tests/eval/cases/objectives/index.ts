/**
 * Objectives suite — cases for `team-write-objectives`.
 *
 * Fixtures live in ../../fixtures/objectives/.
 */

import { inSuite } from "../types.ts";
import { TRIGGER_CASES } from "./trigger.ts";
import { LIFECYCLE_CASES } from "./lifecycle.ts";
import { SIMPLE_GOAL_CASES } from "./simple-goals.ts";

export const OBJECTIVES_CASES = inSuite("objectives", [...TRIGGER_CASES, ...LIFECYCLE_CASES, ...SIMPLE_GOAL_CASES]);
