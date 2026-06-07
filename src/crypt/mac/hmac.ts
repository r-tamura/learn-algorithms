import exclusiveOr from "../util/exclusiveOr";
import { Buffer } from "node:buffer";

type HashFunction = (input: string | Buffer) => string;

const createKey = (
  keySource: string,
  hash: HashFunction,
  blockSize: number,
): Buffer => {
  const temporaryKey = Buffer.from(keySource, "utf8");

  if (temporaryKey.length > blockSize) {
    const hashedKey = Buffer.from(hash(keySource), "hex");
    const zeroPad = Buffer.alloc(blockSize - hashedKey.length, 0x00);
    return Buffer.concat([hashedKey, zeroPad]);
  }

  if (temporaryKey.length < blockSize) {
    const zeroPad = Buffer.alloc(blockSize - temporaryKey.length, 0x00);
    return Buffer.concat([temporaryKey, zeroPad]);
  }

  return temporaryKey;
};

const hmac =
  (hashFn: HashFunction, blockSize: number) =>
  (key: string, input: string): string => {
    const data = Buffer.from(input, "utf8");
    const keyBuffer = createKey(key, hashFn, blockSize);
    const opad = Buffer.alloc(blockSize, 0x5c);
    const ipad = Buffer.alloc(blockSize, 0x36);
    const keyOpad = Buffer.from(exclusiveOr(keyBuffer, opad));
    const keyIpad = Buffer.from(exclusiveOr(keyBuffer, ipad));

    const innerHashInput = Buffer.concat([keyIpad, data]).toString("utf8");
    const outerHashInput = Buffer.concat([
      keyOpad,
      Buffer.from(hashFn(innerHashInput), "hex"),
    ]);

    return hashFn(outerHashInput);
  };

export default hmac;
