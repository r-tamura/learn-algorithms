import exclusiveOr from "../util/exclusiveOr";

const createKey = (keySrc, hash, blockSize) => {
  const tmpKey = Buffer.from(keySrc, "utf8");

  if (tmpKey.length > blockSize) {
    const tmpKey2 = Buffer.from(hash(keySrc), "hex");
    const zeroPad = new Buffer(blockSize - tmpKey2.length).fill(0x00);
    return Buffer.concat([tmpKey2, zeroPad]);
  }

  if (tmpKey.length < blockSize) {
    const zeroPad = new Buffer(blockSize - tmpKey.length).fill(0x00);
    return Buffer.concat([tmpKey, zeroPad]);
  }

  return tmpKey;
};

const hmac = (hashFn, blockSize) => (key, input) => {
  const data = Buffer.from(input, "utf8");

  const keyBuf = createKey(key, hashFn, blockSize);

  const opad = new Buffer(blockSize).fill(0x5c);
  const ipad = new Buffer(blockSize).fill(0x36);

  const key_opad = exclusiveOr(keyBuf, opad);
  const key_ipad = exclusiveOr(keyBuf, ipad);

  const ihashinput = Buffer.concat([Buffer.from(key_ipad), data]).toString(
    "utf8",
  );
  const ohashinput = Buffer.concat([
    Buffer.from(key_opad),
    Buffer.from(hashFn(ihashinput), "hex"),
  ]);
  return hashFn(ohashinput);
};

export default hmac;
