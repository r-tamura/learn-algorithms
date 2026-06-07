# Learn Algorithms
TypeScriptでいろいろなアルゴリズムを実装していくレポジトリ

# Stack

```
Language:  TypeScript
Type check: tsgo (@typescript/native-preview)
Build:     tsup (CJS + ESM)
Document:  TypeDoc
Lint:      oxlint
Format:    Prettier
Unit test: Vitest
Coverage:  @vitest/coverage-v8
CI:        GitHub Actions
```

# Usage

- install
```
yarn install
```

- build
```
yarn build
```

- test
```
yarn test
```

- type check
```
yarn typecheck
```

- lint
```
yarn lint
```

- coverage
```
yarn cover
```

- docs
```
yarn doc
```

# モジュールと用途

### tsup
- TypeScript ソースを CJS / ESM 形式にビルドする

### Vitest
- TypeScript ネイティブな高速テストフレームワーク
- `@vitest/coverage-v8` でカバレッジを出力する

### tsgo (`@typescript/native-preview`)
- Go 製の高速 TypeScript 型チェッカー (実験的)

### oxlint
- Rust ベースの高速 TypeScript/JavaScript Linter (実験的)
