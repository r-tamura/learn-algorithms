import { euclid } from "./gcd"
import { modPowerBinary } from "./mod_power"
import { getRandomInt } from "../util/random"

/**
 * フェルマーテストによる素数判定
 *  - 経験的にはt=1の場合でフェルマーテストが素数と判定すればほとんど間違いない
 *  - しかし、定量的にどの程度の確率で素数なのかが評価できない
 * 
 * @param {number} r 
 * @param {number} t
 * @return true: おそらく素数である, false: 素数ではない 
 */
const felmatTest = (r, t) => {

  if (r < 4) {
    return true
  }

  let j = 0
  while (j < t) {
    const a = getRandomInt(2, r-2)
    const s = modPowerBinary(a, r-1, r)

    if (s !== 1) {
      return false
    }
    j = j + 1
  }
  return true
}

/**
 * ミラーラビンテストによる素数判定
 *  - フェルマーテストと異なり、偽陽性の確率が1/4^tとして定義できる
 * 
 * [ミラーの定理]
 * rが素数 b≡1(mod r) もしくは b^2j ≡ -1(mod r)となるj(0<=j<s)が存在する
 * 
 * @param {number} r 
 * @param {number} t
 * @return true: おそらく素数である, false: 素数ではない 
 */
const millerRabinTest = (r, t) => {

  if (r < 4) {
    return true
  }

  if (r % 2 === 0) {
    return false
  }

  let s = 0
  let n = 1
  let k = r - 1
  while (k % 2 === 0) {
    k = k / 2
    n  = n * 2
    s = s + 1
  }

  let i = 0

  while (i !== t) {
    // 3
    const a = getRandomInt(2, r-1)

    // 4
    let b = modPowerBinary(a, k, r)

    // 5
    let j = 0
    // 6
    while (j < s && b % r !== 1 && (b + 1) % r !== 0) {
      b = (b * b) % r
      j = j + 1
    }

    // 7
    if (j === s || (j > 0 && b === 1)) {
      return false
    }

    // 8
    i = i + 1
  }

  return true
}

const isPrime = r => {

  if (r === 2) {
    return true
  }

  if (r % 2 === 0) {
    return false
  }

  if (euclid(r, 6469693230) !== 1) {
    return false
  }

  return millerRabinTest(r, 1)
}

const getPrime = (min = 1, max = 1000) => {
  let r
  do {
    r = getRandomInt(min, max)
  } while (!isPrime(r))
  return r
}

export {
  felmatTest,
  millerRabinTest,
  isPrime,
  getPrime,
}