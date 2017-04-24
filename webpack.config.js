const path = require('path')
// const webpack = require('webpack')

const ENTRY_POINTS = {
  base64: './src/base64',
}

module.exports = {
  entry: ENTRY_POINTS,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: 'mylib',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
}
