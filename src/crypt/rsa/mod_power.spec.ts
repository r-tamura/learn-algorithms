import { expect, it } from "vitest";
import * as mp from "./mod_power";

it("Case: small number", () => {
  expect(mp.modPower(3, 5, 4)).toBe(3);
});

it("Case: big number", () => {
  expect(mp.modPower(24, 2015, 1000)).toBe(624);
});

it("modPowerBinary: Case: small number", () => {
  expect(mp.modPowerBinary(3, 5, 4)).toBe(3);
});

it("modPowerBinary: Case: big number", () => {
  expect(mp.modPowerBinary(24, 2015, 1000)).toBe(624);
});
