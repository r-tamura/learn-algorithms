import test from "ava"
import { mixColumns, mixColumnsInverse } from "./mixcolumns"

test("shiftRows", t => {
  const state    = [
    [0x63, 0xeb, 0x9f, 0xa0],
    [0x2f, 0x93, 0x92, 0xc0],
    [0xaf, 0xc7, 0xab, 0x30],
    [0xa2, 0x20, 0xcb, 0x2b],
  ]
  const expected = [
    [0xba, 0x84, 0xe8, 0x1b],
    [0x75, 0xa4, 0x8d, 0x40],
    [0xf4, 0x8d, 0x06, 0x7d],
    [0x7a, 0x32, 0x0e, 0x5d],
  ]
  const actual   = mixColumns(state)
  t.deepEqual(actual, expected)
})

test("shiftRows Inverse", t => {
  const state    = [
    [0xba, 0x84, 0xe8, 0x1b],
    [0x75, 0xa4, 0x8d, 0x40],
    [0xf4, 0x8d, 0x06, 0x7d],
    [0x7a, 0x32, 0x0e, 0x5d],
  ]
  const expected = [
    [0x63, 0xeb, 0x9f, 0xa0],
    [0x2f, 0x93, 0x92, 0xc0],
    [0xaf, 0xc7, 0xab, 0x30],
    [0xa2, 0x20, 0xcb, 0x2b],
  ]
  const actual   = mixColumnsInverse(state)
  t.deepEqual(actual, expected)
})