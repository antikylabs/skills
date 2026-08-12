/** Antiky objective-conventions suite. Fixtures in ../fixtures/. */
import { inSuite } from "../../types.ts";
import { CONVENTION_CASES } from "./conventions.ts";
export const REPO_WRITE_OBJECTIVES_CASES = inSuite("repo-write-objectives", [...CONVENTION_CASES]);
