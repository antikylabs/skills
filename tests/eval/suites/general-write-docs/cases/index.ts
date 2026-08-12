/**
 * Documentation-craft suite — cases for `general-write-docs`.
 *
 * Fixtures live in ../fixtures/.
 */

import { inSuite } from "../../types.ts";
import { CLASSIFY_CASES } from "./classify.ts";

export const GENERAL_WRITE_DOCS_CASES = inSuite("general-write-docs", [...CLASSIFY_CASES]);
