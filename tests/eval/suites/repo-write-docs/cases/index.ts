/**
 * Antiky documentation-standards suite — cases for `repo-write-docs`.
 *
 * Fixtures live in ../fixtures/ and mirror the real docs/user-facing-docs tree.
 */

import { inSuite } from "../../types.ts";
import { STANDARDS_CASES } from "./standards.ts";

export const REPO_WRITE_DOCS_CASES = inSuite("repo-write-docs", [...STANDARDS_CASES]);
