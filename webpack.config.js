import path from 'path'

const ENTRY_POINT_NAMES = ['base64', 'compress']
const entryPoints = ENTRY_POINT_NAMES.reduce((acc, v) => (Object.assign(acc, { [v]: `./src/${v}` })), {})

module.exports = {
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: 'mylib',
    // Node JS 形式のcommonjsで出力
    libraryTarget: 'commonjs2',
  },
  // 環境ごとの出力設定
  // nodeの場合、チャンクの読み込みにrequireを使用、"fs", "path"についてはそのまま出力する
  target: 'node',
}
