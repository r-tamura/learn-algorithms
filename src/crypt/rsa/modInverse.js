import { extendedEuclid } from "./gcd"

/**
 * 公開指数eと最小公倍数Lからed = 1 (mod L)を満たす秘密指数dを計算します
 * 
 * 拡張ユークリッド互除法を利用
 * 
 * @param {*} e 
 * @param {*} l 
 */
const modInverse = (e, l) => {
  const { x } = extendedEuclid(e, l)

  // EcmaScriptでは剰余は割られる数(dividend)の符号と余剰の符号が同じになる仕様なので, xが負の場合はMod L内で合同の値の計算が必要
  // > It always takes the sign of the dividend, not the divisor
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators
  // Mod計算方法 https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers/4467559
  const d = x >= 0 ? x : (x % l) + l
  return d
}

export {
  modInverse
}