import { expect, it } from "vitest";
import * as gcd from "./gcd";

it("gcd should be 7", () => {
  expect(gcd.trialDivition(35, 21)).toBe(7);
});

it("gcd should be 1", () => {
  expect(gcd.trialDivition(3, 35)).toBe(1);
});

it("euclid gcd should be 7", () => {
  expect(gcd.euclid(35, 21)).toBe(7);
});

it("case big numbers", () => {
  expect(gcd.euclid(44461, 135632)).toBe(173);
});

it("case one is positive, another is negative", () => {
  expect(gcd.euclid(-2, 4)).toBe(2);
});

it("case EED returns positive number", () => {
  expect(gcd.extendedEuclid(2793, 828)).toEqual({ x: 67, y: -226, gcd: 3 });
});

it("case EED returns negative number", () => {
  expect(gcd.extendedEuclid(79, 176)).toEqual({ x: -49, y: 22, gcd: 1 });
});
