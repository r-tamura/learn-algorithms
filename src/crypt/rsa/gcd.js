/**
 * 試行割り算GCD
 * 
 * @param {number} x 
 * @param {number} y 
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
    while(x % n === 0 && y % n === 0) {
      g = n * g
      x = Math.floor(x / n)
      y = Math.floor(y / n)
    }
  }
  return g
}

export {
  trialDivition
}