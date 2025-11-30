/**
 * テキストをBufferへ変換します
 * @param {buffer|string} data 変換対象のデータ
 * @param {string} エンコーディング(["utf8"|"base64"|"hex"] defau;t: utf8)
 */
const toBytes = (data, encoding) => {
  if (Buffer.isBuffer(data)) {
    return data;
  }

  if (encoding) {
    return Buffer.from(data, encoding);
  }

  const base64Regex =
    /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
  if (base64Regex.test(data)) {
    return Buffer.from(data, "base64");
  }

  return Buffer.from(data, "utf8");
};

export default toBytes;
