import test from "ava";
import * as Aes from "../aes";
import { encrypt, decrypt } from "./ecb";

const key = `aaaaaaaaaaaaaaaa`;

test("Encrypt with ECB using AES", (t) => {
  const plainText = `aaaaaaaaaaaaaaaa`;
  const expected = `UYjGR0sijL3SQukSXr4dU8kFauqkVxpbMJGODZoZe5c=`;
  const actual = encrypt(Aes.encrypt)(plainText, key);
  t.is(actual, expected);
});

test("Length of input isn't multiple 16", (t) => {
  const plainTextLengthNotMultiple16 = `AES is a ‘symmetric block cipher’ for encrypting texts which can be decrypted with the original encryption key.`;
  const expected = `ZEJEYgD/MWqRp/tqYk1VFldNZXWj3pL53hlYtgxeQGGGivFbxQ6j2g3t6etPzoURf15i8CIxapyG10pmuPO+gE9h97lluexfbKPqLpqsHIwxVwEyQFjhYE8xl16J12jFxpnOp2CSXhzavHU1snCcR7FEprwABU6JEcZ/TvCFnL0=`;
  const actual = encrypt(Aes.encrypt)(plainTextLengthNotMultiple16, key);
  t.is(actual, expected);
});

test("Decrypted data and Plain text should be equal.", (t) => {
  const plainText = `0123456789abcdef`;
  const expected = `0123456789abcdef`;
  const encrypted = encrypt(Aes.encrypt)(plainText, key);
  const actual = decrypt(Aes.decrypt)(Buffer.from(encrypted, "base64"), key);
  t.deepEqual(Buffer.from(actual), Buffer.from(expected));
});
