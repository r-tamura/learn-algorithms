/* eslint no-console: 0 */
import { encode, decode } from '../../src/base64'

const value = '✓ à la mode'
let a
let b
console.log(a = encode(value))
console.log(b = encode(value, { method: 'manual' }))

console.log(decode(a))
console.log(decode(b, { method: 'manual' }))
