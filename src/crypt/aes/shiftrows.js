
const shiftLeft = (xs, n) => {
  if (n === 0) {
    return [...xs]
  }
  const left  = xs.slice(0, n)
  const right = xs.slice(n, xs.length)
  return [...right, ...left]
}

/**
 * AES Shift Rows処理
 * 第i行目の要素をi-1列文左へシフトする
 * 
 * @param {Array} state
 * @return {Array} Shift Rows
 */
const shiftRows = state => {
  return state.map((row, i) => shiftLeft(row, i))
}

const shiftRowsInverse = state => {
  return state.map((row, i) => shiftLeft(row, 4-i))
}

export {
  shiftRows,
  shiftRowsInverse,
}