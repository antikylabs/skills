/**
 * ADR suite — cases for `write-adrs`.
 *
 * Fixtures live in ../fixtures/write-adrs/.
 */

import { inSuite } from "../../types.ts";
import { TRIGGER_CASES } from "./trigger.ts";
import { WRITE_CASES } from "./write.ts";
import { SUGGEST_CASES } from "./suggest.ts";

export const ADR_CASES = inSuite("write-adrs", [...TRIGGER_CASES, ...WRITE_CASES, ...SUGGEST_CASES]);
