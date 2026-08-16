import { describe, it, expect } from "vitest";
import { render } from "../src/invoice.ts";

describe("render", () => {
  it("includes the invoice number", () => {
    expect(render({ number: "INV-9" })).toContain("INV-9");
  });
});
