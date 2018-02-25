# RSA暗号
 - 公開鍵暗号の一つ
 - Rivest, Shamir, Adleman

# RSA暗号に必要なもの
 - [ ] 乱数の生成
 - [ ] 大きな素数p, qの生成
  - [ ] フェルマーテスト
  - [ ] ミラー・ロビンテスト
 - [x] 最大公約数・最小公倍数の計算
 - [x] 公開指数、秘密指数の計算
 - [ ] 冪剰余計算

# RSA暗号を理解するために知る必要があること
- [ ] オイラーの定理      (公開指数/秘密指数が存在すること)
- [ ] フェルマーの小定理  (暗号化された文が復号化できること)

# RSAまでの道のり
## 最大公約数と最小公倍数を求める
### 最小公倍数は最大公約数から計算可能
最小公倍数は最大公約数から計算することができるので、最大公約数のみを求めればよい

```
lcm(a, b) = a * b / gcd(a, b)
```

### 試行割り算法
割り切れなくなるまで割り切れる数でどんどん割っていく
小さい数で割り切れない場合は計算量がとても多くなる

### ユークリッド互除法

```
if a > b then swap(a, b)
while r ≠ 0
  r = a % b
  a = b; b = r
return b
```

(a), (b)によりユークリッドの互除法で最大公約数が計算できることがわかる。
#### 最大公約数の性質
0. gcd(a, 0) = a 
0. gcd(a, b) = gcd(a-b, b)
0. gcd(a, b) = gcd(a mod b, b) <-- (a)

####  剰余(Remainder)の定義から
a = qb + r, 0 < r <= |b|       
常に |b| > rなので b > r0 > r1 > ... > rn >= 0 <-- (b)




### バイナリーユークリッド互除法
TBI

### バイナリーユークリッド互除法
TBI

## 公開指数と秘密指数の作成

### 拡張ユークリッドの互除法
入力: 整数$`a, b`$  
出力: 整数$`x, y, gcb(a, b)`$
ここで、$`ax + by = gcb(a, b)`$を満たす。

ユークリッド互除法では剰余計算の商については特に使用していないが、 
拡張ユークリッド法では商も利用することで不当方程式の解を一意に決定する。

### 公開指数、秘密指数と拡張ユークリッド互除法

```math
ed \equiv 1 (mod\ L)
```

を満たすe, dを計算する。このe, dを求めるには以下の不定方程式を計算する

```math
ed = 1 + Lk
```
kは整数

公開指数eを先に計算し、$`a = e, b = L`$とすると

```math
\begin{aligned}
ax + by & = gcb(a, b) \\
ex + Ly & = gcb(e, L) \\
ex + Ly & = 1
\end{aligned}
```
を計算して得られたxが秘密指数dとなる。(yはkとなるが秘密指数計算上は必要ない)

```
# 指数計算(逆数計算)アルゴリズム (拡張ユークリッド互除法のxのみを求めるバージョン)
# Input: e, L( L = lcm(p-1, q-1) (gcd(e, L) = 1))
# Output: d (dはeの逆数)
xPrev = 1, x = 0, rPrev = e, r = L, j = 0
while r != 0
  qNext = rPrev / r
  rNext = rPrev % r
  xNext = xPrev - qNext * x
end while

if x < 0 then
  while (x < 0)
    x = L
  end while
end if
return x
```

[number theory - Calculating RSA private exponent when given public exponent and the modulus factors using extended euclid - Cryptography Stack Exchange](https://crypto.stackexchange.com/questions/5889/calculating-rsa-private-exponent-when-given-public-exponent-and-the-modulus-fact)

### 公開指数eの選び方
 - 暗号ライブラリごとに決まった値の中から選ぶ(?)
 - 公開指数が小さいことはセキュリティ上の問題にはならない
 - むしろ指数のパディングが重要

[cryptography - Should RSA public exponent be only in {3, 5, 17, 257 or 65537} due to security considerations? - Information Security Stack Exchange](https://security.stackexchange.com/questions/2335/should-rsa-public-exponent-be-only-in-3-5-17-257-or-65537-due-to-security-c)

### 公開指数/秘密指数の存在について
**オイラーの定理**で証明される


正整数 a,m に対して，a,m が互いに素であるとき，以下が成り立つ．
```math
a * φ(m) ≡ (mod\ m)
```
ただし，φ(m)は*オイラー関数*を表す．
オイラー関数 φ(m) は「m より小さい正の整数のうち，m と互いに素な数の個数」を表す関数

## 冪剰余計算 (Modular exponentiation)
 
```math
 b^e mod m
```

 - べき乗の余剰
 - 公開鍵暗号の分野で必要とされる

### Memory-efficient method
 - eの値が大きくなっても計算途中の桁数が大きくならない計算方法
 - $`c\ mod\ m\ =\ (a\ *\ b)\ mod\ m`$と$`c mod\ m\ =\ (a\ mod\ m) * (b\ mod\ m)\ mod\ m`$を利用

### Right-to-left binary method
 - 計算量・メモリ消費量をともに抑えた計算方法

```math
\begin{aligned}
x^n & = x \, ( x^{2})^{\frac{n - 1}{2}} (if\ n\ is\ odd)\\
x^n & = (x^{2})^{\frac{n}{2}} (if\ n\ is\ even )
\end{aligned}
```
上式の性質を利用する。上式は$`n = 1, 0`$の場合
```math
\begin{aligned}
x^n & = x * x^{2} (if\ n\ is\ 1)\\
x^n & = x^{2} (if\ n\ is\ 0 )
\end{aligned}
```
となる。
指数eを2進数とした場合の各ビットに対し、この式を当てはめることで$`b^e`$を計算する


## RSA復号(署名)アルゴリズム

### 中国人剰余定理(Chinese Remainder Theorem, CRT)
 - 高速にRSA復号(署名)を行うアルゴリズム
 - Prime p, qを知っていることで成り立つアルゴリズムのため、秘密鍵を利用した複合(署名)の場合のみ使える
 - 「3で割ると2余り、5で割ると3余り、7で割ると2余る数は何か」という問題を一般化したもの
 - 証明： [中国剰余定理の証明と例題（二元の場合） | 高校数学の美しい物語](https://mathtrain.jp/chinese)


# その他

 - `PKCS #1 v2.2`のASN.1フォーマット  
 `exponent1`, `exponent2`, `coefficient`をCRTで複合(署名)する際に利用する  

```
RSAPublicKey ::= SEQUENCE {
    modulus           INTEGER,  -- n
    publicExponent    INTEGER   -- e
}

RSAPrivateKey ::= SEQUENCE {
    version           Version,
    modulus           INTEGER,  -- n
    publicExponent    INTEGER,  -- e
    privateExponent   INTEGER,  -- d
    prime1            INTEGER,  -- p
    prime2            INTEGER,  -- q
    exponent1         INTEGER,  -- d mod (p-1)
    exponent2         INTEGER,  -- d mod (q-1)
    coefficient       INTEGER,  -- (inverse of q) mod p
    otherPrimeInfos   OtherPrimeInfos OPTIONAL
}
```
 - [RSA 秘密鍵/公開鍵ファイルのフォーマット - bearmini's blog](http://bearmini.hatenablog.com/entry/2014/02/05/143510)
 - [RFC 8017 - PKCS #1: RSA Cryptography Specifications Version 2.2](https://tools.ietf.org/html/rfc8017#appendix-C)