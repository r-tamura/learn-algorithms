import test from "ava"
import * as gcd from "./gcd"

test("gcd should be 7", t => {
  t.is(gcd.trialDivition(35, 21), 7)
})

test("gcd should be 1", t => {
  t.is(gcd.trialDivition(3, 35), 1)
})

test("gcd should be 7", t => {
  t.is(gcd.euclid(35, 21), 7)
})

test("case big numbers", t => {
  t.is(gcd.euclid(44461, 135632), 173)
})

test("case one is positive, another is negative", t => {
  t.is(gcd.euclid(-2, 4), 2)
})

test("case EED returns positive number", t => {
  t.deepEqual(gcd.extendedEuclid(2793, 828), { x: 67, y: -226, gcd: 3 })
})

test("case EED returns negative number", t => {
  t.deepEqual(gcd.extendedEuclid(79, 176), { x: -49, y: 22, gcd: 1 })
})
