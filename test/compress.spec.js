import test from 'ava'
import { encodeWithRunLength } from '../src/compress'

test('compress#encodeWithRunLength', t => {
  t.is(encodeWithRunLength(''), '')
  t.is(encodeWithRunLength('AAAAAAA'), 'A7')
  t.is(encodeWithRunLength('WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW'), 'W12BW12B3W24BW14')
})

/** @test encode  */
test('compress#encodeWithRunLength error', t => {
  const error = t.throws(() => encodeWithRunLength(12345), Error)
  t.regex(error.message, /12345/)
})

