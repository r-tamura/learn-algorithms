import test from "ava"
import { subBytes, subBytesInverse } from "./subbytes"

test("Substitution Bytes", t => {
  const state    = [
    [0x00, 0x3C, 0x6E, 0x47],
    [0x1F, 0x4E, 0x22, 0x74],
    [0x0E, 0x08, 0x1B, 0x31],
    [0x54, 0x59, 0x0B, 0x1A],
  ]
  const expected = [
    [0x63, 0xeb, 0x9f, 0xa0],
    [0xc0, 0x2f, 0x93, 0x92],
    [0xab, 0x30, 0xaf, 0xc7],
    [0x20, 0xcb, 0x2b, 0xa2],
  ]
  const actual   = subBytes(state)
  t.deepEqual(actual, expected)
})

test("Substitution Bytes Inverse", t => {
  const state    = [
    [0x63, 0xeb, 0x9f, 0xa0],
    [0xc0, 0x2f, 0x93, 0x92],
    [0xab, 0x30, 0xaf, 0xc7],
    [0x20, 0xcb, 0x2b, 0xa2],
  ]
  const expected = [
    [0x00, 0x3C, 0x6E, 0x47],
    [0x1F, 0x4E, 0x22, 0x74],
    [0x0E, 0x08, 0x1B, 0x31],
    [0x54, 0x59, 0x0B, 0x1A],
  ]
  const actual   = subBytesInverse(state)
  t.deepEqual(actual, expected)
})