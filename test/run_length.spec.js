import test from 'ava'
import { encode } from '../src/runLength'

/** @test encode */
test('compress#encode', t => {
  t.is(encode(''), '')
  t.is(encode('AAAAAAA'), 'A7')
  t.is(encode('WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW'), 'W12BW12B3W24BW14')
})

/** @test encode  */
test('compress#encode error', t => {
  const error = t.throws(() => encode(12345), Error)
  t.regex(error.message, /12345/)
})

