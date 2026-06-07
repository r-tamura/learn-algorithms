import { expect, it } from "vitest";
import * as Aes from "../aes";
import { encrypt, decrypt } from "./ecb";
import { Buffer } from "node:buffer";

const key = `aaaaaaaaaaaaaaaa`;

it("Encrypt with ECB using AES", () => {
  const plainText = `aaaaaaaaaaaaaaaa`;
  const expected = `UYjGR0sijL3SQukSXr4dU8kFauqkVxpbMJGODZoZe5c=`;
  const actual = encrypt(Aes.encrypt)(plainText, key);
  expect(actual).toBe(expected);
});

it("Length of input isn't multiple 16", () => {
  const plainTextLengthNotMultiple16 = `AES is a ‘symmetric block cipher’ for encrypting texts which can be decrypted with the original encryption key.`;
  const expected = `ZEJEYgD/MWqRp/tqYk1VFldNZXWj3pL53hlYtgxeQGGGivFbxQ6j2g3t6etPzoURf15i8CIxapyG10pmuPO+gE9h97lluexfbKPqLpqsHIwxVwEyQFjhYE8xl16J12jFxpnOp2CSXhzavHU1snCcR7FEprwABU6JEcZ/TvCFnL0=`;
  const actual = encrypt(Aes.encrypt)(plainTextLengthNotMultiple16, key);
  expect(actual).toBe(expected);
});

it("Decrypted data and Plain text should be equal.", () => {
  const plainText = `0123456789abcdef`;
  const expected = `0123456789abcdef`;
  const encrypted = encrypt(Aes.encrypt)(plainText, key);
  const actual = decrypt(Aes.decrypt)(Buffer.from(encrypted, "base64"), key);
  expect(Buffer.from(actual)).toEqual(Buffer.from(expected));
});
