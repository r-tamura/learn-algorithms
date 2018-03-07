import { getColumn } from "./util/state"

const CONST_MATRIX = [
  0x02, 0x03, 0x01, 0x01,
  0x01, 0x02, 0x03, 0x01,
  0x01, 0x01, 0x02, 0x03,
  0x03, 0x01, 0x01, 0x02,
]

const INV_CONST_MATRIX = [
  0x0e, 0x0b, 0x0d, 0x09,
  0x09, 0x0e, 0x0b, 0x0d,
  0x0d, 0x09, 0x0e, 0x0b,
  0x0b, 0x0d, 0x09, 0x0e,
]

const exclusiveSum = xs => {
  return xs.reduce((acc, v) => acc ^ v)
}

const mul_F2 = (a, b) => {
  let x = 0
  for (let i = 0; i < 8; i++) {
    if ((b & 1) !== 0) {
      x = x ^ a
    }
    a = mul2_F2(a)
    b = b >> 1
  }
  return x
}

/*
 * aを2倍する
 */
const mul2_F2 = a => {
  return a & 0x80 ? a << 1 ^ 0x011b : a << 1
}

const mulMatVec = (m, v) => {
  debugger
  const res = [1, 1, 1, 1]
  for (let i = 0; i < 4; i++) {
    const t = []
    for (let j = 0; j < 4; j++) {
      t[j] = mul_F2(v[j], m[i * 4 + j])
    }
    res[i] = exclusiveSum(t)
  }
  return res
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
    const nextColumn = mulMatVec(CONST_MATRIX, column)
    // 計算後の列を結果配列へ代入
    nextState[0][i] = nextColumn[0]
    nextState[1][i] = nextColumn[1]
    nextState[2][i] = nextColumn[2]
    nextState[3][i] = nextColumn[3]
  }
  return nextState
}

const mixColumnsInverse = state => {
  let nextState = [[], [], [], []]
  for (let i = 0; i < 4; i++) {
    // 列単位で新しい配列を作成
    const column     = getColumn(state, i)
    const nextColumn = mulMatVec(INV_CONST_MATRIX, column)
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
  mixColumnsInverse,
}