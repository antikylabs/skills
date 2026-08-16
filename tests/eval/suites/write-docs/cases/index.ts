/**
 * Documentation-craft suite — cases for `write-docs`.
 *
 * Fixtures live in ../fixtures/.
 */

import { inSuite } from "../../types.ts";
import { CLASSIFY_CASES } from "./classify.ts";

export const GENERAL_WRITE_DOCS_CASES = inSuite("write-docs", [...CLASSIFY_CASES]);
