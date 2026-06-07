import { expect, it } from "vitest";
import { encode } from "./run_length";

/** @test encode */
it("compress#encode", () => {
  expect(encode("")).toBe("");
  expect(encode("AAAAAAA")).toBe("A7");
  expect(
    encode(
      "WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW",
    ),
  ).toBe("W12BW12B3W24BW14");
});

/** @test encode  */
it("compress#encode error", () => {
  expect(() => encode(12345)).toThrow(
    "It expected first argument is string, passed number",
  );
});
