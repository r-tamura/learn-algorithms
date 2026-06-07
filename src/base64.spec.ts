import { expect, it } from "vitest";
import { decode, encode } from "./base64";

/** @test encode  */
it("base64#encode", () => {
  expect(encode("M")).toBe("TQ==");
  expect(encode("✓ à la mode")).toBe("4pyTIMOgIGxhIG1vZGU=");

  expect(encode("", { method: "js" })).toBe("");
});

/** @test decode  */
it("base64#decode", () => {
  expect(decode("4pyTIMOgIGxhIG1vZGU=")).toBe("✓ à la mode");
  expect(decode("", { method: "js" })).toBe("");
});
