/**
 * ASD-STE100 suite — cases for `general-simplified-technical-english`.
 *
 * Fixtures live in ../fixtures/general-simplified-technical-english/.
 */

import { inSuite } from "../../types.ts";
import { TRIGGER_CASES } from "./trigger.ts";
import { AUDIT_CASES } from "./audit.ts";
import { FIX_CASES } from "./fix.ts";
import { REPORTING_CASES } from "./reporting.ts";

export const ASDSTE100_CASES = inSuite("general-simplified-technical-english", [
  ...TRIGGER_CASES,
  ...AUDIT_CASES,
  ...FIX_CASES,
  ...REPORTING_CASES,
]);
