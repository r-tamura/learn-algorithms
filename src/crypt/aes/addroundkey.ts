import type { State } from "./types";
import multiMap from "./util/multiMap";

const addRoundKey = (state: State, key: State): State => {
  return multiMap(state, (value, i, j) => value ^ key[i][j]) as State;
};

export { addRoundKey };
