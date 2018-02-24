/**
 * 試行割り算GCD
 *
 * @param {number} x
 * @param {number} y
 * @return {number} gcd(x, y)
 */
const trialDivition = (x, y) => {
  if (x < y) {
    y = x + y
    x = y - x
    y = y - x
  }
  let g = 1
  let n = 2
  while (n < y) {
    n++
    while (x % n === 0 && y % n === 0) {
      g = n * g
      x = Math.trunc(x / n)
      y = Math.trunc(y / n)
    }
  }
  return g
}

/**
 * ユークリッド互除法
 *
 * @param {number} x x ≠ 0
 * @param {number} y y ≠ 0
 * @return {number} gcd(x, y)
 */
const euclid = (x, y) => {
  x = Math.abs(x)
  y = Math.abs(y)
  if (x < y) {
    y = x + y
    x = y - x
    y = y - x
  }

  let r
  while ((r = x % y) !== 0) {
    x = y
    y = r
  }
  return y
}

/**
 * 拡張ユークリッド互除法
 *
 * @param {number} a a ≠ 0
 * @param {number} b b ≠ 0
 * @return {number} ax + by = gdc(a,b) のうち { x, y, gcd: gcd(a, b) }
 */
const extendedEuclid = (a, b) => {
  let xPrev = 1, x = 0, xNext
  let yPrev = 0, y = 1, yNext
  let rPrev = a, r = b, rNext
  let qNext
  while (r !== 0) {
    qNext = Math.trunc(rPrev / r)
    rNext = rPrev % r
    xNext = xPrev - qNext * x
    yNext = yPrev - qNext * y

    xPrev = x; x = xNext
    yPrev = y; y = yNext
    rPrev = r; r = rNext
  }
  return { x: xPrev, y: yPrev, gcd: rPrev }
}

export { 
  euclid,
  trialDivition,
  extendedEuclid,
}
