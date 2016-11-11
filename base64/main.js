/**
 * Base64のエンコード・デコードアプリケーション
 */

const BASE64CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const BLOCK_LENGTH = 3;

/**
 * 指定された値をBase64エンコードします
 *
 * @param {string} value - エンコード対象
 * @param {string} method - エンコード手法
 * @return {string} Encoded string
 */
function encode(value, method='buffer') {
  return new Buffer(value).toString('base64');
}

function decode(value, method='buffer') {
  switch(method) {
  case 'buffer':
    return new Buffer(value, 'base64').toString();
  case 'manual':

  }
}

/**
 * 指定された値をBase64エンコードします
 *
 * @param {string} value
 * @return {string} Encoded string
 */
function encodeWithManual(value) {
  // Base64エンコードアルゴリズム
  // 1. 値のサイズを求め、3の倍数Byte出ない場合はPaddingを行う
  // 2. 値を24bit(3Byte)ずつのブロックに区切る
  const blockCount = value.length % BLOCK_LENGTH;
  let padding = '';

  if ( blockCount > 0 ) {
    for (let i=0; i < BLOCK_LENGTH; i++) {
      padding += '='; // パディング調整
      value += '\0';  // 文字列の長さ調整
    }
  }

  // 24bitずつBase64エンコード処理
  let encoded = '';
  for ( let i = 0; i < blockCount; i+=BLOCK_LENGTH ) {
    // MIMEの仕様による76Byte毎の改行

    // 3 Byte 切り取り

    // 8 bit * 3 => 6 bit * 4 のブロックへ変換

    // 6 bit データを変換表に対応した文字に変換

  }

  // パディング付与
  return encoded.substring(0, encoded.length - padding.length) + padding;
}

/**
 * 指定された値をBase64デコードします
 *
 * @param {string} value
 * @return {string} Decoded string
 */
function decodeWithManual(value) {}

console.log(encode('Man'));
