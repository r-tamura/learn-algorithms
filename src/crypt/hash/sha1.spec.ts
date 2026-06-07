import { expect, it } from "vitest";
import sha1 from "./sha1";

it("data whose length is less than 512bit", () => {
  const expected = "415ab40ae9b7cc4e66d6769cb2c08106e8293b48";
  const actual = sha1("sha1");
  expect(actual).toBe(expected);
});

it("Input: A string which includes UTF8 multibyte characters.", () => {
  const expected = "dc05d05b435107fd23a76fbf00c5f862d57d9f1c";
  const actual = sha1("シャーワン");
  expect(actual).toBe(expected);
});

it("Input: A string whose length is more than 512bit ", () => {
  const expected = "104ded505367ec1698c562651c065473b9f6c7f6";
  const actual = sha1(
    "A hash is not ‘encryption’ – it cannot be decrypted back to the original text",
  );
  expect(actual).toBe(expected);
});
