/** Antiky ADR-conventions suite. Fixtures in ../fixtures/. */
import { inSuite } from "../../types.ts";
import { CONVENTION_CASES } from "./conventions.ts";
export const REPO_WRITE_ADRS_CASES = inSuite("repo-write-adrs", [...CONVENTION_CASES]);
