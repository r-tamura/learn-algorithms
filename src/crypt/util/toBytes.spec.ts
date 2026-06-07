import { expect, it } from "vitest";
import toBytes from "./toBytes";
import { Buffer } from "node:buffer";

it("Buffer should be as it is", () => {
  const buffer = Buffer.from([1, 2, 3, 4, 5, 6]);
  const expected = Buffer.from(buffer);
  const actual = toBytes(buffer);
  expect(actual).toEqual(expected);
});

it("Type of input is string and encoding is specified", () => {
  const str = "QnVmZmVyIA==";
  const expected = Buffer.from("42756666657220", "hex");
  const actual = toBytes(str, "base64");
  expect(actual).toEqual(expected);
});

it("Type of input is string", () => {
  const str = "Buffer ";
  const expected = Buffer.from("42756666657220", "hex");
  const actual = toBytes(str);
  expect(actual).toEqual(expected);
});
