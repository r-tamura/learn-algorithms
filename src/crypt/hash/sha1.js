import hash from "./hash"

const K = [
  0x5a827999,
  0x6ed9eba1,
  0x8f1bbcdc,
  0xca62c1d6,
]

const H = [
  0x67452301,
  0xefcdab89,
  0x98badcfe,
  0x10325476,
  0xc3d2e1f0,
]

/**
 * SHA1のフェーズの関数f
 * @param {number} phase フェーズ番号 80回のループのうち20回ずつフェーズが切り替わる
 * @param {nmber} b 
 * @param {nmber} c 
 * @param {nmber} d 
 */
const f = (phase, x, y, z) => {
  switch (phase) {
    case 0: return (x & y) ^ (~x & z);          // Ch()
    case 1: return  x ^ y  ^  z;                // Parity()
    case 2: return (x & y) ^ (x & z) ^ (y & z); // Maj()
    case 3: return  x ^ y  ^  z;                // Parity()
  }
}

const rotLeft = (r, x) => {
  // const rot = r % 32
  // return (x >>> (32 - rot)) | (x << rot)
  return (x<<r) | (x>>>(32-r));
}

/**
 * ハッシュステートとデータを入力とし, 新しいハッシュステートを出力します
 * 
 * @param {Array} h 1word * 5個のハッシュステート
 * @param {Buffer} data 512bitのメッセージデータ
 * @return {Buffer} 次ハッシュステータス
 */
const hashBlock = (h, block) => {
  const w = new Uint32Array(80)
  for (let i = 0; i < 16; i++) {
    w[i] = block.readUInt32BE(i*4)
  }

  for (let t = 16; t < 80; t++) {
    w[t] = rotLeft(1, w[t-3] ^ w[t-8] ^ w[t-14] ^ w[t-16])
  }

  let [a, b, c, d, e] = h

  for (let t = 0; t < 80; t++) {
    const s = Math.floor(t/20)
    const tmp = (rotLeft(5, a) + f(s, b, c, d) + e + w[t] + K[s]) >>> 0
    e = d
    d = c
    c = rotLeft(30, b)
    b = a
    a = tmp
  }
  // 4 - compute the new intermediate hash value (note 'addition modulo 2^32' – JavaScript
  // '>>> 0' coerces to unsigned UInt32 which achieves modulo 2^32 addition)
  return [
    h[0] + a >>> 0,
    h[1] + b >>> 0,
    h[2] + c >>> 0,
    h[3] + d >>> 0,
    h[4] + e >>> 0,
  ]
}

const sha1 = hash(hashBlock, H)

export default sha1
