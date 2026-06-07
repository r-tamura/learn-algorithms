import { Buffer } from "node:buffer";

const BASE64CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const BLOCK_SIZE = 3;
const LINE_SIZE = 76;

type Base64Method = "buffer" | "js";

type Base64Options = {
  method?: Base64Method;
  eol?: string;
  lineBreak?: boolean;
};

function unicodeToAscii(str: string): string {
  const regex = /%([0-9A-Z]{2})/g;
  return encodeURIComponent(str).replace(regex, (_match, p1: string) =>
    String.fromCharCode(parseInt(p1, 16)),
  );
}

function asciiToUnicode(str: string): string {
  return decodeURIComponent(
    Array.from(
      str,
      (char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`,
    ).join(""),
  );
}

function inverseBase64Chars(iterable: string): Record<string, number> {
  const inverse: Record<string, number> = {};
  for (let i = 0; i < iterable.length; i += 1) {
    inverse[iterable[i]] = i;
  }
  return inverse;
}

function encodeInJS(value: string): string {
  let asciiValue = unicodeToAscii(value);
  const len = asciiValue.length;
  const paddingCount = len % BLOCK_SIZE;
  let padding = "";

  if (paddingCount > 0) {
    for (let i = 0; i < BLOCK_SIZE - paddingCount; i += 1) {
      padding += "=";
      asciiValue += "\0";
    }
  }

  let encoded = "";
  for (let i = 0; i < len; i += BLOCK_SIZE) {
    if (i > 0 && ((i / 3) * 4) % LINE_SIZE === 0) {
      encoded += "\r\n";
    }

    const chunk8Bits =
      (asciiValue.charCodeAt(i) << 16) +
      (asciiValue.charCodeAt(i + 1) << 8) +
      asciiValue.charCodeAt(i + 2);

    const chunk6Bits = [
      (chunk8Bits >>> 18) & 0b111111,
      (chunk8Bits >>> 12) & 0b111111,
      (chunk8Bits >>> 6) & 0b111111,
      chunk8Bits & 0b111111,
    ];

    encoded +=
      BASE64CHARS[chunk6Bits[0]] +
      BASE64CHARS[chunk6Bits[1]] +
      BASE64CHARS[chunk6Bits[2]] +
      BASE64CHARS[chunk6Bits[3]];
  }

  return encoded.substring(0, encoded.length - padding.length) + padding;
}

function decodeInJS(value: string): string {
  const len = value.length;
  const invBase64Chars = inverseBase64Chars(BASE64CHARS);
  let cleanValue = value.replace(new RegExp(`[^${BASE64CHARS}=]`, "g"), "");

  const padding =
    cleanValue.charAt(len - 1) === "="
      ? cleanValue.charAt(len - 2) === "="
        ? "AA"
        : "A"
      : "";
  cleanValue = cleanValue.substring(0, len - padding.length) + padding;

  let decoded = "";
  for (let i = 0; i < len; i += 4) {
    const chunk =
      (invBase64Chars[cleanValue.charAt(i)] << 18) +
      (invBase64Chars[cleanValue.charAt(i + 1)] << 12) +
      (invBase64Chars[cleanValue.charAt(i + 2)] << 6) +
      invBase64Chars[cleanValue.charAt(i + 3)];

    decoded += String.fromCharCode(
      (chunk >> 16) & 0xff,
      (chunk >> 8) & 0xff,
      chunk & 0xff,
    );
  }

  return asciiToUnicode(decoded.substring(0, len - padding.length));
}

function normalizeOptions(
  options: Base64Options = {},
): Required<Base64Options> {
  const { method = "buffer", eol = "\r\n", lineBreak = false } = options;
  return { method, eol, lineBreak };
}

export function encode(value: string, options?: Base64Options): string {
  const { method } = normalizeOptions(options);
  switch (method) {
    case "buffer":
      return Buffer.from(value).toString("base64");
    case "js":
    default:
      return encodeInJS(value);
  }
}

export function decode(value: string, options?: Base64Options): string {
  const { method } = normalizeOptions(options);
  switch (method) {
    case "buffer":
      return Buffer.from(value, "base64").toString();
    case "js":
      return decodeInJS(value);
    default:
      throw new NotSupportedMethod(method);
  }
}

export class NotSupportedMethod extends Error {
  constructor(specifiedMethod: string) {
    super(`not supported method: ${specifiedMethod}`);
  }
}

export default {
  encode,
  decode,
};
