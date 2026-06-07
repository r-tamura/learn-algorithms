import type { State, Word } from "./types";
import { getColumn } from "./util/state";

const CONST_MATRIX = [
  0x02, 0x03, 0x01, 0x01, 0x01, 0x02, 0x03, 0x01, 0x01, 0x01, 0x02, 0x03, 0x03,
  0x01, 0x01, 0x02,
];

const INV_CONST_MATRIX = [
  0x0e, 0x0b, 0x0d, 0x09, 0x09, 0x0e, 0x0b, 0x0d, 0x0d, 0x09, 0x0e, 0x0b, 0x0b,
  0x0d, 0x09, 0x0e,
];

const exclusiveSum = (xs: number[]): number =>
  xs.reduce((acc, value) => acc ^ value);

const mul2_F2 = (a: number): number => (a & 0x80 ? (a << 1) ^ 0x011b : a << 1);

const mul_F2 = (a: number, b: number): number => {
  let nextA = a;
  let nextB = b;
  let x = 0;

  for (let i = 0; i < 8; i += 1) {
    if ((nextB & 1) !== 0) {
      x ^= nextA;
    }
    nextA = mul2_F2(nextA);
    nextB >>= 1;
  }

  return x;
};

const mulMatVec = (matrix: number[], vector: Word): Word => {
  const result = [1, 1, 1, 1];

  for (let i = 0; i < 4; i += 1) {
    const values: number[] = [];
    for (let j = 0; j < 4; j += 1) {
      values[j] = mul_F2(vector[j], matrix[i * 4 + j]);
    }
    result[i] = exclusiveSum(values);
  }

  return result;
};

const mixColumnsBase = (state: State, matrix: number[]): State => {
  const nextState: State = [[], [], [], []];

  for (let i = 0; i < 4; i += 1) {
    const column = getColumn(state, i);
    const nextColumn = mulMatVec(matrix, column);
    nextState[0][i] = nextColumn[0];
    nextState[1][i] = nextColumn[1];
    nextState[2][i] = nextColumn[2];
    nextState[3][i] = nextColumn[3];
  }

  return nextState;
};

const mixColumns = (state: State): State => mixColumnsBase(state, CONST_MATRIX);
const mixColumnsInverse = (state: State): State =>
  mixColumnsBase(state, INV_CONST_MATRIX);

export { mixColumns, mixColumnsInverse };
