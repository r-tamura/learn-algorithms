import { Buffer } from "node:buffer";

const pad = (data: Buffer, blockSize: number): Buffer => {
  const padLength = blockSize - (data.length % blockSize);
  return Buffer.concat([data, Buffer.alloc(padLength, padLength)]);
};

const unpad = (data: Buffer): Buffer => {
  const dataLength = data.length;
  const padLength = data[dataLength - 1];
  return data.slice(0, dataLength - padLength);
};

export default {
  pad,
  unpad,
};
