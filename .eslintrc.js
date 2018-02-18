module.exports = {
  "extends": "airbnb-base",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "rules": {
    "max-len": [2, 120],
    "semi": [2, "never"],
    "no-unused-vars": 1,
    // 引数が1つの場合は括弧省略可
    "arrow-parens": [2, "as-needed"],
    // ビット演算子で"<<", ">>"のみ使用可
    "no-bitwise": { "allow": ["<<", ">>"] },
  }
}
