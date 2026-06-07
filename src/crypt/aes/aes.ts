import type { State } from "./types";
import { addRoundKey } from "./addroundkey";
import { keyExpansion } from "./keyexpansion";
import { mixColumns, mixColumnsInverse } from "./mixcolumns";
import { shiftRows, shiftRowsInverse } from "./shiftrows";
import { subBytes, subBytesInverse } from "./subbytes";
import { getBytes, getState } from "./util/state";
import { Buffer } from "node:buffer";

const encrypt = (plain: Buffer, key: Buffer): Buffer => {
  const firstState = getState(plain);
  const roundKeys = keyExpansion(key);

  const encrypted = roundKeys.reduce<State>((state, value, index) => {
    const roundKey = getState(value);
    if (index === 0) {
      return addRoundKey(state, roundKey);
    }
    if (index === roundKeys.length - 1) {
      return addRoundKey(shiftRows(subBytes(state)), roundKey);
    }
    return addRoundKey(mixColumns(shiftRows(subBytes(state))), roundKey);
  }, firstState);

  return getBytes(encrypted);
};

const decrypt = (encrypted: Buffer, key: Buffer): Buffer => {
  const firstState = getState(encrypted);
  const roundKeys = keyExpansion(key);

  const plain = [...roundKeys]
    .reverse()
    .reduce<State>((state, value, index) => {
      const roundKey = getState(value);
      if (index === 0) {
        return subBytesInverse(shiftRowsInverse(addRoundKey(state, roundKey)));
      }
      if (index === roundKeys.length - 1) {
        return addRoundKey(state, roundKey);
      }
      return subBytesInverse(
        shiftRowsInverse(mixColumnsInverse(addRoundKey(state, roundKey))),
      );
    }, firstState);

  return getBytes(plain);
};

export { encrypt, decrypt };
