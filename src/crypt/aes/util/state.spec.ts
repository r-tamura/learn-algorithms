import { expect, it } from "vitest";
import { getState, getBytes, getRow, getColumn } from "./state";
import { Buffer } from "node:buffer";

const TEST_STATE = [
  [0x54, 0x73, 0x20, 0x67],
  [0x68, 0x20, 0x4b, 0x20],
  [0x61, 0x6d, 0x75, 0x46],
  [0x74, 0x79, 0x6e, 0x75],
];

it("getState", () => {
  const state = [
    0x54, 0x68, 0x61, 0x74, 0x73, 0x20, 0x6d, 0x79, 0x20, 0x4b, 0x75, 0x6e,
    0x67, 0x20, 0x46, 0x75,
  ];
  const expected = TEST_STATE;
  const actual = getState(state);
  expect(actual[0][0]).toBe(84);
  expect(actual).toEqual(expected);
});

it("getState from offset", () => {
  const state = [
    0x00, 0x00, 0x00, 0x00, 0x54, 0x68, 0x61, 0x74, 0x73, 0x20, 0x6d, 0x79,
    0x20, 0x4b, 0x75, 0x6e, 0x67, 0x20, 0x46, 0x75,
  ];
  const offset = 4;
  const expected = TEST_STATE;
  const actual = getState(state, offset);
  expect(actual).toEqual(expected);
});

it("getBytes", () => {
  const state = [
    [0x54, 0x73, 0x20, 0x67],
    [0x68, 0x20, 0x4b, 0x20],
    [0x61, 0x6d, 0x75, 0x46],
    [0x74, 0x79, 0x6e, 0x75],
  ];
  const expected = Buffer.from([
    0x54, 0x68, 0x61, 0x74, 0x73, 0x20, 0x6d, 0x79, 0x20, 0x4b, 0x75, 0x6e,
    0x67, 0x20, 0x46, 0x75,
  ]);
  const actual = getBytes(state);
  expect(actual).toEqual(expected);
});

it("getRow", () => {
  const state = TEST_STATE;
  const expected1 = [0x54, 0x73, 0x20, 0x67];
  const actual1 = getRow(state, 0);
  const expected2 = [0x61, 0x6d, 0x75, 0x46];
  const actual2 = getRow(state, 2);
  expect(actual1).toEqual(expected1);
  expect(actual1).not.toBe(expected1);
  expect(actual2).toEqual(expected2);
  expect(actual2).not.toBe(expected2);
});

it("getColumn", () => {
  const state = TEST_STATE;
  const expected1 = [0x54, 0x68, 0x61, 0x74];
  const actual1 = getColumn(state, 0);
  const expected2 = [0x20, 0x4b, 0x75, 0x6e];
  const actual2 = getColumn(state, 2);
  expect(actual1).toEqual(expected1);
  expect(actual1).not.toBe(expected1);
  expect(actual2).toEqual(expected2);
  expect(actual2).not.toBe(expected2);
});
