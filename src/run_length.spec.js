import test from "ava";
import { encode } from "./run_length";

/** @test encode */
test("compress#encode", t => {
  t.is(encode(""), "");
  t.is(encode("AAAAAAA"), "A7");
  t.is(
    encode(
      "WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW"
    ),
    "W12BW12B3W24BW14"
  );
});

/** @test encode  */
test("compress#encode error", t => {
  const expected = new Error(
    "It expected first argument is string, passed number"
  );
  const error = t.throws(() => encode(12345));
});
