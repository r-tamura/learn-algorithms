import { expect, it } from "vitest";
import { signWithCrt } from "./signer";

it("Sign with CRT", () => {
  const c = 52; // 暗号文
  const p = 7;
  const q = 11;
  const dp = 1;
  const dq = 3;
  const v = 8;
  expect(signWithCrt(c, p, q, dp, dq, v)).toBe(17);
});
