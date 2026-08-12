/**
 * Objectives suite — cases for `general-write-objectives`.
 *
 * Fixtures live in ../fixtures/general-write-objectives/.
 */

import { inSuite } from "../../types.ts";
import { TRIGGER_CASES } from "./trigger.ts";
import { LIFECYCLE_CASES } from "./lifecycle.ts";
import { SIMPLE_GOAL_CASES } from "./simple-goals.ts";

export const OBJECTIVES_CASES = inSuite("general-write-objectives", [...TRIGGER_CASES, ...LIFECYCLE_CASES, ...SIMPLE_GOAL_CASES]);
