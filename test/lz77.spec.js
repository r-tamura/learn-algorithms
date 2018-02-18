import test from 'ava'
import { encode, decode } from '../src/lz77'

/** @test encode */
test('compress#encode', t => {
  t.is(encode('hello hello'), '<0, h> <0, e> <0, l> <0, l> <0, o> <0, > <1, 6, 5>')
})

/** @test encode  */
test('compress#encode error', t => {
  const error = t.throws(() => encode(12345), Error)
  t.regex(error.message, /12345/)
})

