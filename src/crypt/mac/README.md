# メッセージ認証コード(Message Authentication Code)について
 - 正真性(完全性)の確認と認証を行う技術
 - "鍵に依存した一方高ハッシュ関数"

# メッセージ認証コードの実現方法
 - 一方高ハッシュ関数を利用して実現 -> HMAC
 - ブロック暗号を使って実現 -> AES-CMAC
   CBCモードの最終ブロックをMAC値として使用する


# 認証付き暗号
認証付き暗号(AEやAEAD)は、対象暗号とメッセージ認証コードを組み合わせて機密性・正真性・認証を同時に満たす仕組み。

 - Encrypt-then-MAC 平文 -> 暗号化 -> MAC値計算
 - Encrypt-and-MAC  平文 -> 暗号化 & 平文 -> MAC値計算
 - MAC-then-Encrypt 平文 -> MAC値計算 then (平文+MAC値) -> 暗号化

## GCM / GMAC
GCMは認証付き暗号の一種である。GMACはGCMを認証コード専用として用いたものを差す。


## HMAC
ハッシュ関数を使ったMACの一種。ハッシュ関数はMD5, SHA256等任意の関数を使うことができ、それぞれHMAC-MD5, HMAC-SHA256と呼ばれる。HMACの計算式は以下のようになる。
```
HMAC(K, M) = H((K' ^ opad) || H((K' ^ ipad) || M))
```

K: 共通鍵 (バイト長: Lバイト)
H: ハッシュ関数 (ブロックサイズ長: Bバイト)
K': 
  K || 000...0 (0はB-Lバイト) (L < B))
  H(K)                       (L > B)
opad: 0x5c x Bバイト
ipad: 0x36 x Bバイト

