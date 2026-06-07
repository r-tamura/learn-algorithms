import { SBOX } from "./subbytes";
import exclusiveOr from "../util/exclusiveOr";

const RCON = [
  [0x00, 0x00, 0x00, 0x00],
  [0x01, 0x00, 0x00, 0x00],
  [0x02, 0x00, 0x00, 0x00],
  [0x04, 0x00, 0x00, 0x00],
  [0x08, 0x00, 0x00, 0x00],
  [0x10, 0x00, 0x00, 0x00],
  [0x20, 0x00, 0x00, 0x00],
  [0x40, 0x00, 0x00, 0x00],
  [0x80, 0x00, 0x00, 0x00],
  [0x1b, 0x00, 0x00, 0x00],
  [0x36, 0x00, 0x00, 0x00],
];

type Word = number[];

type RoundKey = number[];

const subWord = (word: Word): Word => word.map((value) => SBOX[value]);

const rotWord = (word: Word): Word => {
  const [first, ...rest] = word;
  return [...rest, first];
};

const getWord = (buffer: ArrayLike<number>, i: number): Word =>
  Array.from(buffer).slice(4 * i, 4 * i + 4);

const concat4 = (wordKeys: Word[]): RoundKey[] => {
  const result: RoundKey[] = [];
  for (let i = 0; i < wordKeys.length; i += 4) {
    result[i / 4] = [
      ...wordKeys[i],
      ...wordKeys[i + 1],
      ...wordKeys[i + 2],
      ...wordKeys[i + 3],
    ];
  }
  return result;
};

const keyExpansion = (key: ArrayLike<number>): RoundKey[] => {
  const blockSize = 4;
  const keyLength = key.length / blockSize;
  const roundNum = keyLength + 6;
  const roundKeys: Word[] = [];

  for (let i = 0; i < blockSize; i += 1) {
    roundKeys[i] = getWord(key, i);
  }

  for (let j = blockSize; j < (roundNum + 1) * keyLength; j += 1) {
    if (j % blockSize === 0) {
      const previousWord = roundKeys[j - blockSize];
      const word = roundKeys[j - 1];
      roundKeys[j] = exclusiveOr(
        exclusiveOr(subWord(rotWord(word)), RCON[j / blockSize]),
        previousWord,
      );
    } else {
      roundKeys[j] = exclusiveOr(roundKeys[j - 1], roundKeys[j - blockSize]);
    }
  }

  return concat4(roundKeys);
};

export { keyExpansion };
