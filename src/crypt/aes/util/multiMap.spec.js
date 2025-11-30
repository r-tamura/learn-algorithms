import test from "ava";
import multiMap from "./multiMap";

test("multiMap one dimension array", t => {
  const xs = [1, 2, 3, 4, 5];
  const expected = [1, 4, 9, 16, 25];
  const actual = multiMap(xs, a => a * a);
  t.deepEqual(actual, expected);
});

test("multiMap two dimension array", t => {
  const xs = [[1, 2, 3], [4, 5, 6]];
  const expected = [[1, 4, 9], [16, 25, 36]];
  const actual = multiMap(xs, a => a * a);
  t.deepEqual(actual, expected);
});

test("multiMap four dimension array", t => {
  const xs = [[[[1]]], [[[[2]]]]];
  const expected = [[[[1]]], [[[[4]]]]];
  const actual = multiMap(xs, a => a * a);
  t.deepEqual(actual, expected);
});
