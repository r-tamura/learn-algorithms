/**
 * b^e mod m を計算する
 */

/**
 * メモリ効率の良い方法
 * 愚直にb^eを計算する方法と比べて、メモリ消費量が少ない計算方法
 * 
 * @param {number} b ベース
 * @param {number} e 指数
 * @param {number} m modulus
 */
const modPower = (b, e, m) => {
  let c = 1
  for (let i = 0; i < e; i++) {
    c = b * c % m
  }
  return c
}

/**
 * ウィンドウ法(バイナリ法)
 * 指数e
 * 指数eをバイナリ表現に変換し、各ビットに対して掛け算を行う
 * 計算量・メモリ消費量をともに抑えた計算方法
 * 
 * @param {number} b ベース
 * @param {number} e 指数
 * @param {number} m modulus
 * @param {number} w ウィンドウサイズ
 */
const modPowerWindow = (b, e, m, w) => {
  // TBI
}

/**
 * ウィンドウ法(バイナリ法)
 * ウィンドウ法の2進数の場合
 * 
 * @param {number} b 
 * @param {number} e 
 * @param {number} m 
 */
const modPowerBinary = (b, e, m) => {
  // mを2進数の配列に分解
  const a = e.toString(2).split("")

  let c = 1
  for (let i = 0; i < a.length; i++) {
    c = (c * c) % m
    if (a[i] === "1") {
      c = (c * b) % m
    }
  }
  return c
}

export {
  modPower,
  modPowerBinary,
}