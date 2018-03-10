# AESについて
 - 共通鍵暗号方式の一つ
 - DESに変わる暗号方式として2000年に策定された暗号アルゴリズム
 - コンペ形式による標準化の末、Rijndealというアルゴリズムが採用された
 - 暗号強度、暗号処理の速さ(ICカードやワークテーションなど幅広い環境を想定)を追及している

# 処理の概要
 - ある一定の処理を128bit単位のデータへ複数回繰り返し暗号化するデータと暗号鍵を混ぜ合わせるイメージ
 - 繰り替えす処理をラウンドと呼び、一回の処理は`SubstitutionBytes`, `ShiftRows`, `MixColmuns`,`AddRoundkey`の4つで構成される
 - 鍵の大きさは128bit, 192bit, 256bitが使用可能(今回は128bit版のみ実装)

# AESにひつようなもの
 - ラウンド処理
  - [x] AddRoundkey (鍵とデータを混ぜ合わせる)
  - [x] SubBytes (重要：非線形性により線形解読を防ぐ)
  - [x] SubBytes Inverse
  - [x] ShiftRows
  - [x] ShiftRows Inverse
  - [x] MixColumns
  - [x] MixColumns Inverse
  - [x] 鍵拡張(Rijndael key schedule)
 - (128bit) x (1 block) のAES
  - [x] 暗号化
  - [x] 復号化
 - ブロック処理 (CFB, OFBは実装しない)
  - [x] ECB (Electric Code Block)
  - [ ] CBC (Cipher Block Chaining)
  - [ ] CTR (Counter)

# 参考
 - [AES Example](https://kavaliro.com/wp-content/uploads/2014/03/AES.pdf)
 - [Advanced Encryption Standard](http://www.cs.siue.edu/~tgamage/S17/CS490/L/WK05.pdf)