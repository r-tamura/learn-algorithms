import { expect, it } from "vitest";
import { modInverse } from "./mod_inverse";

it("case EED returns positive number", () => {
  expect(modInverse(2793, 828)).toBe(67);
});

it("case EED returns negative number", () => {
  expect(modInverse(79, 176)).toBe(127);
});
