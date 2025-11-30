import test from "ava";
import toBytes from "./toBytes";

test("Buffer should be as it is", (t) => {
  const buffer = Buffer.from([1, 2, 3, 4, 5, 6]);
  const expected = Buffer.from(buffer);
  const actual = toBytes(buffer);
  t.deepEqual(actual, expected);
});

test("Type of input is string and encoding is specified", (t) => {
  const str = "QnVmZmVyIA==";
  const expected = Buffer.from("42756666657220", "hex");
  const actual = toBytes(str, "base64");
  t.deepEqual(actual, expected);
});

test("Type of input is string", (t) => {
  const str = "Buffer ";
  const expected = Buffer.from("42756666657220", "hex");
  const actual = toBytes(str);
  t.deepEqual(actual, expected);
});
