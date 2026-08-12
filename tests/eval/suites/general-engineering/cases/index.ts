/**
 * Engineering-sidekick suite — cases for `general-engineering`.
 *
 * Fixtures live in ../fixtures/.
 */

import { inSuite } from "../../types.ts";
import { JUDGEMENT_CASES } from "./judgement.ts";

export const GENERAL_ENGINEERING_CASES = inSuite("general-engineering", [...JUDGEMENT_CASES]);
