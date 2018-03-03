/**
 * AES - Add Round Keyフェーズ
 * 
 * @param {Array[4][4]} state AES State 4 x 4 Byte(128bit)二次元配列
 * @param {Array[4][4]} key ラウンド鍵 Stateと混ぜ合わせる 4 x 4 Byte(128bit)二次元配列
 * @return {Array[4][4]} 鍵と混ぜ合わせた新しいState
 */
const addRoundKey = (state, key) => {
  return state.map((row, i) => row.map((e, j) => e ^ key[i][j]))
}

export {
  addRoundKey,
}