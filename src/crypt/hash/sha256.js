const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2 
]

// initial hash value
const H = [
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
]

const toHex = (p, v) => v.toString(16).padStart(p, "0")

const sigma0 = x => rotRight(7, x) ^ rotRight(18, x) ^ (x >>> 3)

const sigma1 = x => rotRight(17, x) ^ rotRight(19, x) ^ (x >>> 10)

// Choice
const ch = (x, y, z) => (x & y) ^ (~x & z)

// Majority
const maj = (x, y, z) => (x & y) ^ (x & z) ^ (y & z)

const sum0 = x => rotRight(2, x) ^ rotRight(13, x) ^ rotRight(22, x)

const sum1 = x => rotRight(6, x) ^ rotRight(11, x) ^ rotRight(25, x)

/**
 * 指定されたビット分だけ右方向へビットを回転します
 * @param {number} r 
 * @param {number} x 
 */
const rotRight = (r, x) => {
  const rot = r % 32
  return x << (32 - rot) | x >>> rot 
}

/**
 * ハッシュステートとデータを入力とし, 新しいハッシュステートを出力します
 * 
 * @param {Array} h 1word * 8個のハッシュステート
 * @param {Buffer} data 512bitのメッセージデータ
 * @return {Buffer} 次ハッシュステータス
 */
const hashBlock = (prevHashState, block) => {
  const w = new Uint32Array(64)
  for (let i = 0; i < 16; i++) {
    w[i] = block.readUInt32BE(i*4)
  }
  
  for (let t = 16; t < 64; t++) {
    w[t] = (sigma1(w[t-2]) + w[t-7] + sigma0(w[t-15])+w[t-16]) >>> 0
  }

  let [a, b, c, d, e, f, g, h] = prevHashState
  for (let t = 0; t < 64; t++) {
    const tmp1 = h + sum1(e) + ch(e, f, g) + K[t] + w[t]
    const tmp2 = sum0(a) + maj(a, b, c)
    h = g
    g = f
    f = e
    e = (d + tmp1) >>> 0
    d = c
    c = b
    b = a
    a = (tmp1 + tmp2) >>> 0
  }

  return [
    (prevHashState[0] + a) >>> 0,
    (prevHashState[1] + b) >>> 0,
    (prevHashState[2] + c) >>> 0,
    (prevHashState[3] + d) >>> 0,
    (prevHashState[4] + e) >>> 0,
    (prevHashState[5] + f) >>> 0,
    (prevHashState[6] + g) >>> 0,
    (prevHashState[7] + h) >>> 0,
  ]
}

/**
 * sha256ハッシュを計算します
 * @param {string} input
 */
const sha256 = input => {
  const data = Buffer.from(input, "utf8")
  let h = [...H]
  let i
  for (i = 0; i < data.length - 64; i=i+64) {
    h = hashBlock(h, data.slice(i, i + 64))
  }
  // 512bitになるようにパディング
  const lRemain = data.length - i

  // 余りデータを一時配列へコピー
  const tmp = Buffer.concat([data.slice(i, i + lRemain), new Buffer(64 - lRemain)])
  tmp[lRemain] = 0x80
  if (lRemain > 64 - 8 - 1) {
    tmp.fill(0x00, lRemain + 1, 64)
    h = hashBlock(h, tmp)
    tmp.fill(0x00, 0, 64 - 8)
  } else {
    tmp.fill(0x00, lRemain + 1, 64 - 8)
  }

  const lenU = Math.floor((data.length * 8) / Math.pow(2, 32)) // 上位1バイト
  const lenL = data.length * 8 & 0xffffffff // 下位1バイト
  tmp.writeUInt32BE(lenU, 56)
  tmp.writeUInt32BE(lenL, 60)

  h = hashBlock(h, tmp)
  return h.reduce((acc, v) => acc + toHex(8, v), "")
}

export default sha256