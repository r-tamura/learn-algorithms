import test from "ava";
import { signWithCrt } from "./signer";

test("Sign with CRT", (t) => {
  const c = 52; // 暗号文
  const p = 7;
  const q = 11;
  const dp = 1;
  const dq = 3;
  const v = 8;
  t.is(signWithCrt(c, p, q, dp, dq, v), 17);
});
