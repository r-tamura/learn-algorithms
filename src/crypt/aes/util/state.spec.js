import test from "ava"
import { getState } from "./state"

test("getState", t => {
  const state    = [ 0x54, 0x68, 0x61, 0x74, 0x73, 0x20, 0x6D, 0x79, 0x20, 0x4B, 0x75, 0x6E, 0x67, 0x20, 0x46, 0x75 ]
  const expected = [
    [ 0x54, 0x73, 0x20, 0x67],
    [ 0x68, 0x20, 0x4B, 0x20],
    [ 0x61, 0x6D, 0x75, 0x46],
    [ 0x74, 0x79, 0x6E, 0x75],
  ]
  const actual  = getState(state)
  t.is(actual[0][0], 84)
  t.deepEqual(actual, expected)
})

test("getState from offset", t => {
  const state    = [ 0x00, 0x00, 0x00, 0x00, 0x54, 0x68, 0x61, 0x74, 0x73, 0x20, 0x6D, 0x79, 0x20, 0x4B, 0x75, 0x6E, 0x67, 0x20, 0x46, 0x75 ]
  const offset   = 4
  const expected = [
    [ 0x54, 0x73, 0x20, 0x67],
    [ 0x68, 0x20, 0x4B, 0x20],
    [ 0x61, 0x6D, 0x75, 0x46],
    [ 0x74, 0x79, 0x6E, 0x75],
  ]
  const actual   = getState(state, offset)
  t.deepEqual(actual, expected)
})

