import hash from "./hash";
import { Buffer } from "node:buffer";

const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

const f = (phase: number, x: number, y: number, z: number): number => {
  switch (phase) {
    case 0:
      return (x & y) ^ (~x & z);
    case 1:
      return x ^ y ^ z;
    case 2:
      return (x & y) ^ (x & z) ^ (y & z);
    default:
      return x ^ y ^ z;
  }
};

const rotLeft = (r: number, x: number): number => (x << r) | (x >>> (32 - r));

const hashBlock = (state: number[], block: Buffer): number[] => {
  const w = new Uint32Array(80);
  for (let i = 0; i < 16; i += 1) {
    w[i] = block.readUInt32BE(i * 4);
  }

  for (let t = 16; t < 80; t += 1) {
    w[t] = rotLeft(1, w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16]);
  }

  let [a, b, c, d, e] = state;

  for (let t = 0; t < 80; t += 1) {
    const phase = Math.floor(t / 20);
    const tmp = (rotLeft(5, a) + f(phase, b, c, d) + e + w[t] + K[phase]) >>> 0;
    e = d;
    d = c;
    c = rotLeft(30, b);
    b = a;
    a = tmp;
  }

  return [
    (state[0] + a) >>> 0,
    (state[1] + b) >>> 0,
    (state[2] + c) >>> 0,
    (state[3] + d) >>> 0,
    (state[4] + e) >>> 0,
  ];
};

const sha1 = hash(hashBlock, H);

export default sha1;
