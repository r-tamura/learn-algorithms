
/**
 * 連長圧縮(ランレングス圧縮)で文字列を圧縮します
 *
 * @example
 *   encodeWithrunLength('WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW')
 *   // W12BW12B3W24BW14
 *
 * @param {string} input 圧縮対象の文字列
 * @return {string} エンコード後文字列
 */
export const encodeWithRunLength = input => {
  if (typeof input !== 'string') {
    throw new Error(`It expected first argument is string, passed ${input}`)
  }

  // 空文字の場合は入力値をそのまま出力
  if (input.length === 0) {
    return input
  }

  const output = input
                    .match(/(.)\1*/g)
                    .reduce((acc, v) => (v.length > 1 ? `${acc}${v[0]}${v.length}` : `${acc}${v[0]}`), '')

  return output
}

export default {
  encodeWithRunLength,
}
