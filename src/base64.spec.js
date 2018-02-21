import test from "ava"
import { encode, decode } from "./base64"

/** @test encode  */
test("base64#encode", t => {
  t.is(encode("M"), "TQ==")
  t.is(encode("✓ à la mode"), "4pyTIMOgIGxhIG1vZGU=")

  t.is(encode("", { method: "" }), "")
  t.is(encode("", { method: "manual" }), "")
})

/** @test decode  */
test("base64#decode", t => {
  t.is(decode("4pyTIMOgIGxhIG1vZGU="), "✓ à la mode")
  t.is(decode("", { method: "" }), "")
  t.is(decode("", { method: "manual" }), "")
})
