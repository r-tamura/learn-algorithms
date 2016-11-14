/**
 * rollup.jsのビルド設定ファイル
 */
import babel from 'rollup-plugin-babel';
import nodeReslve from 'rollup-plugin-node-resolve';

let config = {
  entry: './example/base64/index',
  format: 'cjs',
  plugins: [
    // .babelrcはtest用 ( rollupはmodulesをfalseとする必要あり )
    babel({
      presets: [
        [
          'es2015',
          {
            'modules': false,
          },
        ],
      ],
      babelrc: false,
    }),
    // import時のindex.js解決用
    nodeReslve({}),
  ],
  dest: './example/base64/dest/bundle.js',
  sourceMap: 'inline',
};

export default config;
