import test from "ava"
import { trialDivition } from "./gcd"

test("gcd should be 7", t => {
  t.is(gctrialDivitiond(35, 21), 7)
})

test("gcd should be 1", t => {
  t.is(trialDivition(35, 3), 1)
})