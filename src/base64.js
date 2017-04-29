/**
 * Base64のエンコード・デコードアプリケーション
 */

const BASE64CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
// Base64のBlock Byte Size
const BLOCK_SIZE = 3
// MIMEの仕様による改行を挿入するサイズ
const LINE_SIZE = 76

/**
 * Unicodeを含む文字列をURIエンコードし、ASCIIのみを含む文字列へ変換します
 *
 * @param {string} str (Unicodeを含む)文字列
 * @return {string} URLエンコードによりASCIIコード変換された文字列
 */
function unicodeToAscii(str) {
  // URLエンコードされた文字(%から始まる'数字','アルファベット'の長さ2の文字列)の正規表現
  const regex = /%([0-9A-Z]{2})/g
  return encodeURIComponent(str).replace(regex, (match, p1) => String.fromCharCode(`0x${p1}`))
}

/**
 * Unicodeを含む文字列をURIエンコードし、ASCIIのみを含む文字列へ変換します
 *
 * @param {string} str (ASCII)文字列
 * @return {string} URIデコードにより変換された文字列
 */
function asciiToUnicode(str) {
  const tag = ([prefix], char) => (prefix + char.charCodeAt(0).toString(16)).slice(-2)

  return decodeURIComponent([].map.call(str, char => `%${tag`00${char}`}`).join(''))
}

/**
 * Iterableオブジェクトのkeyとvalueを入れ替えたオブジェクトを取得します
 *
 * @param {iterable} iterable
 * @return {object} iterableオブジェクトのkeyとvalueを入れ替えたオブジェクト
 */
function inverseBase64Chars(iterable) {
  const inv = {}
  for (let i = 0; i < iterable.length; i += 1) {
    const k = i
    const v = iterable[i]
    inv[v] = k
  }
  return inv
}

/**
 * 指定された値をBase64エンコードします
 *
 * Base64エンコードアルゴリズム
 * 1. 値のサイズを求め、3の倍数Byte出ない場合はPaddingを行う
 * 2. 値を24bit(3Byte)ずつのブロックに区切る
 * 3. 8 bit * 3 => 6 bit * 4 のブロックへ変換
 * 4. 6bitのデータを変換表により文字(8bit)に変換
 *
 * @param {string} value
 * @return {string} Encoded string
 */
function encodeWithManual(value) {
  // Unicode => ASCII
  let asciiValue = unicodeToAscii(value)

  const len = asciiValue.length
  const paddingCount = len % BLOCK_SIZE
  let padding = ''


  if (paddingCount > 0) {
    for (let i = 0; i < BLOCK_SIZE - paddingCount; i += 1) {
      padding += '=' // パディング調整
      asciiValue += '\0'  // 文字列の長さ調整
    }
  }

  // 24bitずつBase64エンコード処理
  let encoded = ''
  for (let i = 0; i < len; i += BLOCK_SIZE) {
    // MIMEの仕様による76Byte毎の改行
    // 1. i > 0 である
    // 2. 8bitのブロック単位から6bit単位に変換後のバイト数を計算し、
    //    LIEN_SIZEの倍数である場合は改行を挿入
    if (i > 0 && (i / 3 * 4) % LINE_SIZE === 0) {
      encoded += '\r\n'
    }

    // 3 Byte 切り取り
    let chunk = (asciiValue.charCodeAt(i) << 16) + (asciiValue.charCodeAt(i + 1) << 8) + asciiValue.charCodeAt(i + 2)

    // 8 bit * 3 => 6 bit * 4 のブロックへ変換
    chunk = [(chunk >>> 18) & 0b111111, (chunk >>> 12) & 0b111111, (chunk >>> 6) & 0b111111, chunk & 0b111111]

    // 6 bit データを変換表に対応した文字に変換
    const encodedChunk = BASE64CHARS[chunk[0]] + BASE64CHARS[chunk[1]] + BASE64CHARS[chunk[2]] + BASE64CHARS[chunk[3]]
    encoded += encodedChunk
  }

  // パディング付与
  return encoded.substring(0, encoded.length - padding.length) + padding
}

/**
 * 指定された値をBase64デコードします
 *
 * @param {string} value
 * @return {string} Decoded string
 */
function decodeWithManual(value) {
  // 1. 対応表+'='に該当しない文字を削除
  // 2. padding文字列を探索
  // 3. 対応表にした以外4Byte毎に変換
  // 4. ASCII => Unicode

  const len = value.length

  // 対応表のインデックス(key)と文字(value)を入れ替えたもの
  const invBase64Chars = inverseBase64Chars(BASE64CHARS)

  // 対応表に存在しない文字を削除
  let cleanValue = value.replace(new RegExp(`${BASE64CHARS}=`), '')

  // padding探索 => パディング数分'A'
  const padding = cleanValue.charAt(len - 1) === '=' ? (cleanValue.charAt(len - 2) === '=' ? 'AA' : 'A') : ''
  cleanValue = cleanValue.substr(0, len - padding.length) + padding

  let decoded = ''
  for (let i = 0; i < len; i += 4) {
    const chunk = (invBase64Chars[cleanValue.charAt(i)] << 18) + (invBase64Chars[cleanValue.charAt(i + 1)] << 12) +
                (invBase64Chars[cleanValue.charAt(i + 2)] << 6) + invBase64Chars[cleanValue.charAt(i + 3)]

    const decodedChunk = String.fromCharCode((chunk >> 16) & 0xFF, (chunk >> 8) & 0xFF, chunk & 0xFF)
    decoded += decodedChunk
  }

  // ASCII => Unicode
  decoded = asciiToUnicode(decoded.substr(0, len - padding.length))
  return decoded
}

/**
 * 指定された値をBase64エンコードします
 *
 * @param {string} value - エンコード対象
 * @param {object} opts - オプション
 * @param {string} opts.method - エンコードアルゴリズム
 * @param {string} opts.eol - 改行コード
 * @param {boolean} opts.lineBreak - MIMEの仕様による改行を挿入するか
 * @return {string} Encoded string
 */
export function encode(value, {
  method = 'buffer',
  eol = '\r\n',
  lineBreak = false,
} = {}) {
  switch (method) {
    case 'buffer':
      return new Buffer(value).toString('base64')
    case 'manual':
      return encodeWithManual(value)
    default:
      return encodeWithManual(value)
  }
}

/**
 * 指定された値をBase64エンコードします
 *
 * @param {string} value - Base64エンコードされた文字列
 * @param {object} opts - エンコード方式オプション
 * @return {string} デコードされた文字列
 */
export function decode(value, {
  method = 'buffer',
  eol = '\r\n',
  lineBreak = false,
} = {}) {
  switch (method) {
    case 'buffer':
      return new Buffer(value, 'base64').toString()
    case 'manual':
      return decodeWithManual(value)
    default:
      return decodeWithManual(value)
  }
}

export default {
  encode, decode,
}

