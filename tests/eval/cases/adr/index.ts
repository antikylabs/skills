/**
 * ADR suite — cases for `team-write-adrs`.
 *
 * Fixtures live in ../../fixtures/adr/.
 */

import { inSuite } from "../types.ts";
import { TRIGGER_CASES } from "./trigger.ts";
import { WRITE_CASES } from "./write.ts";
import { SUGGEST_CASES } from "./suggest.ts";

export const ADR_CASES = inSuite("adr", [...TRIGGER_CASES, ...WRITE_CASES, ...SUGGEST_CASES]);
