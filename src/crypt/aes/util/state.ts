import type { State, Word } from "../types";
import { Buffer } from "node:buffer";

const getState = (buffer: ArrayLike<number>, offset = 0): State => {
  const numRow = 4;
  const numCol = 4;
  const source = Array.from(buffer).slice(offset);
  const state: State = Array.from({ length: 4 }, () => []);

  for (let i = 0; i < numRow; i += 1) {
    for (let j = 0; j < numCol; j += 1) {
      state[j][i] = source[i * numCol + j];
    }
  }

  return state;
};

const getBytes = (state: State): Buffer => {
  const numRow = 4;
  const numCol = 4;
  const buffer = Buffer.alloc(16);

  for (let i = 0; i < numRow; i += 1) {
    for (let j = 0; j < numCol; j += 1) {
      buffer[i * numCol + j] = state[j][i];
    }
  }

  return buffer;
};

const getRow = (state: State, i: number): Word => [...state[i]];

const getColumn = (state: State, j: number): Word =>
  Array.from({ length: 4 }, (_, i) => state[i][j]);

const get = (state: State, i: number, j: number): number => state[i][j];

const set = (state: State, i: number, j: number, value: number): void => {
  state[i][j] = value;
};

export { getState, getBytes, getRow, getColumn, get, set };
