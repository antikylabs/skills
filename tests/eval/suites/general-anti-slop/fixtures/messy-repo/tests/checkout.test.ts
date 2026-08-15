import { describe, it, expect } from "vitest";
import { total } from "../src/checkout.ts";

describe("total", () => {
  it("sums the line items", () => {
    expect(total([{ price: 2 }, { price: 3 }])).toBe(5);
  });
});
