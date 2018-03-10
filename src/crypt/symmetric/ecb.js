import pkcs7 from "../util/pad/pkcs7"

const BLOCK_SIZE = 16 // 128bit

/**
 * ECBにより平文データを暗号化します
 * 平文長が128bitの倍数でない場合は0x00でパディングを行い暗号化します
 * 
 * padding -> encrypt 
 * 
 * mode     : ECB
 * padding  : PKCS 7 Padding (パディング長のデータで埋める)
 * 
 * @param {*} encryptBlock 
 */
const encrypt = encryptBlock => (plain, inputKey) => {
  const data    = pkcs7.pad(toBytes(plain, "utf8"), BLOCK_SIZE)
  const key     = toBytes(inputKey, "utf8")
  const encryptedByte = ecb(encryptBlock, data, key)
  return encryptedByte.toString("base64")
}

const decrypt = decryptBlock => (endrypted, inputKey) => {
  const data    = toBytes(endrypted)
  const key     = toBytes(inputKey, "utf8")
  const bytes = ecb(decryptBlock, data, key)
  return pkcs7.unpad(bytes).toString("utf8")
}

/**
 * テキストをBufferへ変換します
 * @param {buffer|string} data 変換対象のデータ
 * @param {string} エンコーディング(["utf8"|"base64"|"hex"] defau;t: utf8)
 */
const toBytes = (data, encoding) => {
  if (Buffer.isBuffer(data)) {
    return data
  }

  if (encoding) {
    return Buffer.from(data, encoding)
  }

  const base64Regex =
    /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/
  if (base64Regex.test(data)) {
    return Buffer.from(data, "base64")
  }

  return Buffer.from(data, "utf8")
}

const ecb = (processBlock, data, key) => {
  let processed = []
  for (let i = 0; i < data.length; i = i + BLOCK_SIZE) {
    const block = data.slice(i, i + 16)
    const processedBlock = processBlock(block, key)
    processed = [ ...processed, ...processedBlock ]
  }

  return Buffer.from(processed)
}

export {
  encrypt,
  decrypt,
}