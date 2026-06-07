import { Buffer } from "node:buffer";

type HashState = number[];
type HashBlock = (state: HashState, block: Buffer) => HashState;

const toHex = (padding: number, value: number): string =>
  value.toString(16).padStart(padding, "0");

const hash =
  (hashBlock: HashBlock, initialState: HashState) =>
  (input: string | Buffer): string => {
    const data = Buffer.isBuffer(input)
      ? Buffer.from(input)
      : Buffer.from(input, "utf8");
    let hashState = [...initialState];
    let i = 0;

    for (; i < data.length - 64; i += 64) {
      hashState = hashBlock(hashState, data.slice(i, i + 64));
    }

    const remainingLength = data.length - i;
    const tmp = Buffer.concat([
      data.slice(i, i + remainingLength),
      Buffer.alloc(64 - remainingLength),
    ]);
    tmp[remainingLength] = 0x80;

    if (remainingLength > 64 - 8 - 1) {
      tmp.fill(0x00, remainingLength + 1, 64);
      hashState = hashBlock(hashState, tmp);
      tmp.fill(0x00, 0, 64 - 8);
    } else {
      tmp.fill(0x00, remainingLength + 1, 64 - 8);
    }

    const lengthUpper = Math.floor((data.length * 8) / 2 ** 32);
    const lengthLower = (data.length * 8) & 0xffffffff;
    tmp.writeUInt32BE(lengthUpper, 56);
    tmp.writeUInt32BE(lengthLower, 60);

    hashState = hashBlock(hashState, tmp);
    return hashState.reduce(
      (accumulator, value) => accumulator + toHex(8, value),
      "",
    );
  };

export default hash;
