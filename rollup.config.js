/**
 * rollup.jsのビルド設定ファイル
 */
import babel from 'rollup-plugin-babel';

let config = {
  entry: 'base64/main.js',
  format: 'cjs',
  plugins: [babel({
    presets: [ 'es2015-rollup' ],
    babelrc: false,
  })],
  dest: 'base64/dest/bundle.js',
  sourceMap: true,
};

export default config;
