/**
 * Engineering-sidekick suite — cases for `engineering`.
 *
 * Fixtures live in ../fixtures/.
 */

import { inSuite } from "../../types.ts";
import { JUDGEMENT_CASES } from "./judgement.ts";

export const GENERAL_ENGINEERING_CASES = inSuite("engineering", [...JUDGEMENT_CASES]);
