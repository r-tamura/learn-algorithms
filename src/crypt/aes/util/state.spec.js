import test from "ava"
import { getState, getRow, getColumn } from "./state"

const TEST_STATE = [
  [0x54, 0x73, 0x20, 0x67],
  [0x68, 0x20, 0x4B, 0x20],
  [0x61, 0x6D, 0x75, 0x46],
  [0x74, 0x79, 0x6E, 0x75],
]

test("getState", t => {
  const state    = [ 0x54, 0x68, 0x61, 0x74, 0x73, 0x20, 0x6D, 0x79, 0x20, 0x4B, 0x75, 0x6E, 0x67, 0x20, 0x46, 0x75 ]
  const expected = TEST_STATE
  const actual  = getState(state)
  t.is(actual[0][0], 84)
  t.deepEqual(actual, expected)
})

test("getState from offset", t => {
  const state    = [ 0x00, 0x00, 0x00, 0x00, 0x54, 0x68, 0x61, 0x74, 0x73, 0x20, 0x6D, 0x79, 0x20, 0x4B, 0x75, 0x6E, 0x67, 0x20, 0x46, 0x75 ]
  const offset   = 4
  const expected = TEST_STATE
  const actual   = getState(state, offset)
  t.deepEqual(actual, expected)
})


test("getRow", t => {
  const state = TEST_STATE
  const expected1 = [0x54, 0x73, 0x20, 0x67]
  const actual1   = getRow(state, 0)
  const expected2 = [0x61, 0x6D, 0x75, 0x46]
  const actual2   = getRow(state, 2)
  t.deepEqual(actual1, expected1)
  t.not(actual1, expected1)
  t.deepEqual(actual2, expected2)
  t.not(actual2, expected2)
})

test("getColumn", t => {
  const state = TEST_STATE
  const expected1 = [0x54, 0x68, 0x61, 0x74]
  const actual1   = getColumn(state, 0)
  const expected2 = [0x20, 0x4b, 0x75, 0x6e]
  const actual2   = getColumn(state, 2)
  t.deepEqual(actual1, expected1)
  t.not(actual1, expected1)
  t.deepEqual(actual2, expected2)
  t.not(actual2, expected2)
})
