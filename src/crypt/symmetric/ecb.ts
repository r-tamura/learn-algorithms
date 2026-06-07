import pkcs7 from "../util/pad/pkcs7";
import toBytes from "../util/toBytes";
import { Buffer } from "node:buffer";

type BlockCipher = (block: Buffer, key: Buffer) => Buffer;

const BLOCK_SIZE = 16;

const ecb = (processBlock: BlockCipher, data: Buffer, key: Buffer): Buffer => {
  let processed: number[] = [];

  for (let i = 0; i < data.length; i += BLOCK_SIZE) {
    const block = data.slice(i, i + BLOCK_SIZE);
    const processedBlock = processBlock(block, key);
    processed = [...processed, ...processedBlock];
  }

  return Buffer.from(processed);
};

const encrypt =
  (encryptBlock: BlockCipher) =>
  (plain: string, inputKey: string): string => {
    const data = pkcs7.pad(toBytes(plain, "utf8"), BLOCK_SIZE);
    const key = toBytes(inputKey, "utf8");
    const encryptedBytes = ecb(encryptBlock, data, key);
    return encryptedBytes.toString("base64");
  };

const decrypt =
  (decryptBlock: BlockCipher) =>
  (encrypted: Buffer | string, inputKey: string): string => {
    const data = toBytes(encrypted);
    const key = toBytes(inputKey, "utf8");
    const bytes = ecb(decryptBlock, data, key);
    return pkcs7.unpad(bytes).toString("utf8");
  };

export { encrypt, decrypt };
