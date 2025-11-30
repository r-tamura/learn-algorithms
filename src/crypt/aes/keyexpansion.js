import exclusiveOr from "../util/exclusiveOr";
import { SBOX } from "./subbytes";

// Round Constant
const RCON = [
  [0x00, 0x00, 0x00, 0x00], // 00000000
  [0x01, 0x00, 0x00, 0x00], // 00000001
  [0x02, 0x00, 0x00, 0x00], // 00000010
  [0x04, 0x00, 0x00, 0x00], // 00000100
  [0x08, 0x00, 0x00, 0x00], // 00001000
  [0x10, 0x00, 0x00, 0x00], // 00010000
  [0x20, 0x00, 0x00, 0x00], // 00100000
  [0x40, 0x00, 0x00, 0x00], // 01000000
  [0x80, 0x00, 0x00, 0x00], // 10000000
  [0x1b, 0x00, 0x00, 0x00], // 00011011
  [0x36, 0x00, 0x00, 0x00] // 00110110
];

const subWord = word => {
  return word.map(b => SBOX[b]);
};

const rotWord = word => {
  const [first, ...rest] = word;
  return [...rest, first];
};

/**
 * bufferのiワード目の1ワードを返します
 *
 * @param {*} buffer
 * @param {*} i
 */
const getWord = (buffer, i) => {
  return buffer.slice(4 * i, 4 * i + 4);
};

const concat4 = wordKeys => {
  let res = [];
  for (let i = 0; i < wordKeys.length; i = i + 4) {
    res[i / 4] = [
      ...wordKeys[i],
      ...wordKeys[i + 1],
      ...wordKeys[i + 2],
      ...wordKeys[i + 3]
    ];
  }
  return res;
};

/**
 * 共通鍵から各ラウンドで使用するラウンド鍵を生成します
 *
 * @param {Buffer} key 共通鍵
 * @param {Array<Buffer>} 128bitラウンド鍵のリスト
 */
const keyExpansion = key => {
  const BLOCK_SIZE = 4; // 1ワードのバイト数
  const KEY_LENGTH = key.length / BLOCK_SIZE; // 共通鍵鍵長バイト(218bit/192bit/256bit)
  const ROUND_NUM = KEY_LENGTH + 6; // ラウンド数は鍵数+6

  const roundKeys = [];

  for (let i = 0; i < BLOCK_SIZE; i++) {
    roundKeys[i] = getWord(key, i);
  }

  for (let j = BLOCK_SIZE; j < (ROUND_NUM + 1) * KEY_LENGTH; j++) {
    if (j % BLOCK_SIZE === 0) {
      // 4の倍数ワード目 第4ワード、第8ワード...
      // 一つ前のワード
      const wordPrev = roundKeys[j - BLOCK_SIZE];
      const word = roundKeys[j - 1];
      roundKeys[j] = exclusiveOr(
        exclusiveOr(subWord(rotWord(word)), RCON[j / BLOCK_SIZE]),
        wordPrev
      );
    } else {
      roundKeys[j] = exclusiveOr(roundKeys[j - 1], roundKeys[j - BLOCK_SIZE]);
    }
  }

  return concat4(roundKeys);
};

export { keyExpansion };
