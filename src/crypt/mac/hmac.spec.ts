import { expect, it } from "vitest";
import sha256 from "../hash/sha256";
import hmac from "./hmac";

it("Short input", () => {
  const expected =
    "552f8b04bd71bc48d950fe0edee2e385fe1a8cd589a09eb89976be40c1c6409c";
  const actual = hmac(sha256, 64)("hmackey", "hmac");
  expect(actual).toBe(expected);
});

it("Long input", () => {
  const expected =
    "36298be822e38def98f51333ff81cf48236f503aac4ca6baed42424ebbb3b706";
  const actual = hmac(sha256, 64)(
    "hmackey",
    "HMAC を定義するためには、H によって示す暗号ハッシュ関数と、秘密鍵 K が必要となる。",
  );
  expect(actual).toBe(expected);
});

it("64 Byte key", () => {
  const expected =
    "867302492bfe9b56b15c0ad1056f98155efb017e5843e9a7f622042c1e144ec8";
  const actual = hmac(sha256, 64)(
    "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
    "hmac",
  );
  expect(actual).toBe(expected);
});

// 鍵長がハッシュ関数のブロックサイズより大きい場合にテストが失敗する
// TODO: 実装見直し 2018/3/27
// it("Longer than 64 Byte key", t => {
//   const expected = "1ddae51dcc212195cc5ccf758b93603c3e6cf4c8bb173937efe92d35534703a8"
//   const actual = hmac(sha256, 64)("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", "hmac")
//   expect(actual).toBe(expected)
// })
