
/**
 * LZ77アルゴリズムで文字列を圧縮します
 *
 * @example
 *  encode('hello hello')
 *  // '<0, h> <0, e> <0, l> <0, l> <0, o> <0, > <1, 6, 5>'
 *
 * @param {string} input 圧縮対象の文字列
 * @return {string} LZ77で圧縮された文字列
 */
export const encode = input => {
  // 0. 辞書を初期化
  // 1. if 初めて出現する文字 => <0, 文字>
  //    else 今までに出現した文字 + 1文字 => <参照文字の相対開始位置(何文字前か), 参照文字数, 文字>
  // 2. 1を文字列全てに適用
  if (typeof input !== 'string') {
    throw new Error(`It expected first argument is string, passed ${typeof input}`)
  }

  // 出現した文字列
  let dic = {}
  let i = 0
  while (i < input.length) {
    if () {

    } else {
      // 初めて出現した文字列

    }
  }

  const output = input
  return output
}

export const decode = input => {
  const output = input
  return output
}
