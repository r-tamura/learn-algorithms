import { getColumn } from "./util/state"

const CONS_MATRIX = [
  0x02, 0x03, 0x01, 0x01,
  0x01, 0x02, 0x03, 0x01,
  0x01, 0x01, 0x02, 0x03,
  0x03, 0x01, 0x01, 0x02,  
]

const INV_CONS_MATRIX = [
  0x0e, 0x0b, 0x0d, 0x09,
  0x09, 0x0e, 0x0b, 0x0d,
  0x0d, 0x09, 0x0e, 0x0b,
  0x0b, 0x0d, 0x09, 0x0e,
]

const exclusiveSum = xs => {
  return xs.reduce((acc, v) => acc ^ v)
}

const mixColumn = column => {
  const a = [] // x 0x01
  const b = [] // x 0x02
  const nextColumn = []
  for (let r=0; r<4; r++) {
      a[r] = column[r]
      b[r] = column[r]&0x80 ? column[r]<<1 ^ 0x011b : column[r]<<1
  }
  // a[n] ^ b[n] is a•{03} in GF(2^8)
  nextColumn[0] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3]; // {02}•a0 + {03}•a1 + a2 + a3
  nextColumn[1] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3]; // a0 • {02}•a1 + {03}•a2 + a3
  nextColumn[2] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3]; // a0 + a1 + {02}•a2 + {03}•a3
  nextColumn[3] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3]; // {03}•a0 + a1 + a2 + {02}•a3
  return nextColumn
}

/**
 * 列単位で定数行列との積で変換を行う
 *
 * @param {Array} state
 */
const mixColumns = state => {
  let nextState = [[], [], [], []]
  for (let i = 0; i < 4; i++) {
    // 列単位で新しい配列を作成
    const column     = getColumn(state, i)
    const nextColumn = mixColumn(column)
    // 計算後の列を結果配列へ代入
    nextState[0][i] = nextColumn[0]
    nextState[1][i] = nextColumn[1]
    nextState[2][i] = nextColumn[2]
    nextState[3][i] = nextColumn[3]
  }
  return nextState
}

export {
  mixColumns,
}