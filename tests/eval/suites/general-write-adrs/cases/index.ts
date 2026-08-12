/**
 * ADR suite — cases for `general-write-adrs`.
 *
 * Fixtures live in ../fixtures/general-write-adrs/.
 */

import { inSuite } from "../../types.ts";
import { TRIGGER_CASES } from "./trigger.ts";
import { WRITE_CASES } from "./write.ts";
import { SUGGEST_CASES } from "./suggest.ts";

export const ADR_CASES = inSuite("general-write-adrs", [...TRIGGER_CASES, ...WRITE_CASES, ...SUGGEST_CASES]);
