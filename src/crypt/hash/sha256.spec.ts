import { expect, it } from "vitest";
import sha256 from "./sha256";

it("data whose length is less than 512bit", () => {
  const expected =
    "5d5b09f6dcb2d53a5fffc60c4ac0d55fabdf556069d6631545f42aa6e3500f2e";
  const actual = sha256("sha256");
  expect(actual).toBe(expected);
});

it("Input: A string which includes UTF8 multibyte characters.", () => {
  const expected =
    "72a3a0dbf08628ff19ba70693742c964c16a0914ac876278f442720a517914d0";
  const actual = sha256("シャーニゴロ");
  expect(actual).toBe(expected);
});

it("Input: A string whose length is more than 512bit ", () => {
  const expected =
    "cc87bead85513f832ce1efe819a514864ecd47533308f3cb1b84a3083cb94658";
  const actual = sha256(
    "A hash is not ‘encryption’ – it cannot be decrypted back to the original text",
  );
  expect(actual).toBe(expected);
});
