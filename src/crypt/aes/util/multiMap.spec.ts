import { expect, it } from "vitest";
import multiMap from "./multiMap";

it("multiMap one dimension array", () => {
  const xs = [1, 2, 3, 4, 5];
  const expected = [1, 4, 9, 16, 25];
  const actual = multiMap(xs, (a) => a * a);
  expect(actual).toEqual(expected);
});

it("multiMap two dimension array", () => {
  const xs = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  const expected = [
    [1, 4, 9],
    [16, 25, 36],
  ];
  const actual = multiMap(xs, (a) => a * a);
  expect(actual).toEqual(expected);
});

it("multiMap four dimension array", () => {
  const xs = [[[[1]]], [[[[2]]]]];
  const expected = [[[[1]]], [[[[4]]]]];
  const actual = multiMap(xs, (a) => a * a);
  expect(actual).toEqual(expected);
});
