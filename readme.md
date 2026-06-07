# Learn Algorithms
TypeScriptでいろいろなアルゴリズムを実装していくレポジトリ

# Stack

```
Language:      TypeScript
Type check:    tsgo (@typescript/native-preview)
Build:         tsup (CJS + ESM)
Document:      TypeDoc
Lint:          oxlint
Format:        Prettier
Unit test:     Vitest
Coverage:      @vitest/coverage-v8
CI:            GitHub Actions
Package manager: aube (version pinned via mise.toml)
```

# Setup

mise を使ってパッケージマネージャーのバージョンを管理しています。

```sh
# mise がなければインストール
curl https://mise.run | sh

# aube をインストール (mise.toml のバージョンが使われる)
mise install
```

# Usage

- install
```sh
aube install
```

- build
```sh
aube build
```

- test
```sh
aube test
```

- type check
```sh
aube typecheck
```

- lint
```sh
aube lint
```

- coverage
```sh
aube cover
```

- docs
```sh
aube doc
```

# モジュールと用途

### aube
- Node.js パッケージマネージャー。スクリプト実行時に自動インストール、高速なウォームインストールが特徴
- バージョンは `mise.toml` でピン留め

### tsup
- TypeScript ソースを CJS / ESM 形式にビルドする

### Vitest
- TypeScript ネイティブな高速テストフレームワーク
- `@vitest/coverage-v8` でカバレッジを出力する

### tsgo (`@typescript/native-preview`)
- Go 製の高速 TypeScript 型チェッカー (実験的)

### oxlint
- Rust ベースの高速 TypeScript/JavaScript Linter (実験的)
