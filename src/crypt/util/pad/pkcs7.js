/**
 * pkcs7 padding
 * @param {buffer} data パディング対象データ
 * @param {} align
 */
const pad = (data, blockSize) => {
  const padLength = blockSize - (data.length % blockSize);
  return Buffer.concat([data, new Buffer(padLength).fill(padLength)]);
};

/**
 * pkcs7形式のパディングを削除します
 * @param {*} data
 */
const unpad = (data) => {
  const dataLength = data.length;
  // Get number of padding bytes from last byte
  const padLength = data[dataLength - 1];
  return data.slice(0, dataLength - padLength);
};

export default {
  pad,
  unpad,
};
