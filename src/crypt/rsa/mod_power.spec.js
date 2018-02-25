import test from "ava"
import * as mp from "./mod_power"

test("Case: small number", t => {
  t.is(mp.modPower(3, 5, 4), 3)
})

test("Case: big number", t => {
  t.is(mp.modPower(24, 2015, 1000), 624)
})

test("Case: small number", t => {
  t.is(mp.modPowerBinary(3, 5, 4), 3)
})

test("Case: big number", t => {
  t.is(mp.modPowerBinary(24, 2015, 1000), 624)
})