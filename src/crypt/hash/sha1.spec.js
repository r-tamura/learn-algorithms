import test from "ava"
import sha1 from "./sha1"

test("data whose length is less than 512bit", t => {
  const expected = "415ab40ae9b7cc4e66d6769cb2c08106e8293b48"
  const actual = sha1("sha1")
  t.is(actual, expected)
})

test("Input: A string which includes UTF8 multibyte characters.", t => {
  const expected = "dc05d05b435107fd23a76fbf00c5f862d57d9f1c"
  const actual = sha1("シャーワン")
  t.is(actual, expected)
})

test("Input: A string whose length is more than 512bit ", t => {
  const expected = "104ded505367ec1698c562651c065473b9f6c7f6"
  const actual = sha1("A hash is not ‘encryption’ – it cannot be decrypted back to the original text")
  t.is(actual, expected)
})