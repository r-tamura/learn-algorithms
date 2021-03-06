const getState = (buffer, offset = 0) => {
  const NUM_ROW = 4
  const NUM_COL = 4
  
  // Array.prototype.fillはオブジェクトの参照を各要素へ渡してしまう
  // const state = (new Array(4)).fill([])
  const source = buffer.slice(offset)
  const state = (new Array(4)).fill(null).map(_ => [])

  for (let i=0; i<NUM_ROW; i++) {
    for (let j=0; j<NUM_COL; j++) {
      state[j][i] = source[i * NUM_COL + j]
    }
  }
  return state
}

const getBytes = state => {
  const NUM_ROW = 4
  const NUM_COL = 4
  const buffer = new Buffer(16)
  for (let i=0; i<NUM_ROW; i++) {
    for (let j=0; j<NUM_COL; j++) {
      buffer[i * NUM_COL + j] = state[j][i]
    }
  }
  return buffer
}

const getRow = (state, i) => {
  return [...state[i]]
}

const getColumn = (state, j) => {
  return [...Array(4)].map((_, i) => state[i][j])
}

const get = (state, i, j) => {
  return state[i][j]
}

const set = (state, i, j, value) => {
  state[i][j] = value
}

export {
  getState,
  getBytes,
  getRow,
  getColumn,
  get,
  set,
}
