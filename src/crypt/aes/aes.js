import { getState, getBytes } from "./util/state"
import { addRoundKey } from "./addroundkey"
import { subBytes, subBytesInverse } from "./subbytes"
import { shiftRows, shiftRowsInverse } from "./shiftrows"
import { mixColumns, mixColumnsInverse } from "./mixcolumns"
import { keyExpansion } from "./keyexpansion"

/**
 * AESによる128bitデータの暗号化
 * 
 * @param {Buffer} 平文
 * @param {Buffer} 共通鍵
 * @return {Buffer} 暗号文
 */
const encrypt = (plain, key) => {
  const firstState = getState(plain)
  const roundKeys = keyExpansion(key)
  
  const encrypted = roundKeys.reduce((state, v, i) => {
    const roundKey = getState(v)
    debugger
    if (i===0) {
      return addRoundKey(state, roundKey)
    } else if (i === roundKeys.length - 1) {
      return addRoundKey(shiftRows(subBytes(state)), roundKey)
    } else {
      return addRoundKey(mixColumns(shiftRows(subBytes(state))), roundKey)
    }
  }, firstState)

  return getBytes(encrypted)
}

/**
 * AESによる128bitデータの復号化
 * 
 * @param {Buffer} 暗号文
 * @param {Buffer} 共通鍵
 * @return {Buffer} 平文
 */
const decrypt = (encrypted, key) => {
  const firstState = getState(encrypted)
  const roundKeys = keyExpansion(key)
  
  const plain = roundKeys.reverse().reduce((state, v, i) => {
    const roundKey = getState(v)
    debugger
    if (i===0) {
      return subBytesInverse(shiftRowsInverse(addRoundKey(state, roundKey)))
    } else if (i === roundKeys.length - 1) {
      return addRoundKey(state, roundKey)
    } else {
      return subBytesInverse(shiftRowsInverse(mixColumnsInverse(addRoundKey(state, roundKey))))
    }
  }, firstState)

  return getBytes(plain)
}

export {
  encrypt,
  decrypt,
}


