import test from "ava"
import { modInverse } from "./mod_inverse"

test("case EED returns positive number", t => {
  t.is(modInverse(2793, 828), 67)
})

test("case EED returns negative number", t => {
  t.is(modInverse(79, 176), 127)
})