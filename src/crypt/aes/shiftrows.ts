import type { State, Word } from "./types";

const shiftLeft = (xs: Word, n: number): Word => {
  if (n === 0) {
    return [...xs];
  }

  const left = xs.slice(0, n);
  const right = xs.slice(n);
  return [...right, ...left];
};

const shiftRows = (state: State): State => {
  return state.map((row, i) => shiftLeft(row, i));
};

const shiftRowsInverse = (state: State): State => {
  return state.map((row, i) => shiftLeft(row, 4 - i));
};

export { shiftRows, shiftRowsInverse };
