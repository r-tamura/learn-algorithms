import { Buffer } from "node:buffer";

type SupportedEncoding = "utf8" | "base64" | "hex";

const base64Regex =
  /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;

const toBytes = (
  data: Buffer | string,
  encoding?: SupportedEncoding,
): Buffer => {
  if (Buffer.isBuffer(data)) {
    return data;
  }

  if (encoding) {
    return Buffer.from(data, encoding);
  }

  if (base64Regex.test(data)) {
    return Buffer.from(data, "base64");
  }

  return Buffer.from(data, "utf8");
};

export default toBytes;
