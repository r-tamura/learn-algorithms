# RSA暗号
 - 公開鍵暗号の一つ
 - Rivest, Shamir, Adleman

# RSA暗号に必要なもの
 - 乱数の生成
 - 大きな素数p, qの算出
 - 最大公約数の計算
 - 最小公倍数の計算
 - 公開指数、秘密指数の計算
 - 冪剰余計算

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
(1) if a > b then swap(a, b)
(2) while r ≠ 0
(3)   r = a % b
(4)   a = b; b = r
(5) return b
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
**TBI**

## 冪剰余計算
**TBI**