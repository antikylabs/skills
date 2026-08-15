import { describe, it, expect } from "vitest";
import { applyDiscount } from "./discount.ts";

describe("applyDiscount", () => {
  it("takes the percentage off", () => {
    expect(applyDiscount(100, 10)).toBe(90);
  });
});
