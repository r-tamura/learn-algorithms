import { modPowerBinary } from "./mod_power";
/**
 * 中国人剰余定理を利用した高速な署名(復号)を計算
 *
 * @param {number} c  暗号文
 * @param {number} p  大きな素数1
 * @param {number} q  大きな素数1
 * @param {number} dp 秘密鍵d mod (p-1)
 * @param {number} dq 秘密鍵d mod (q-1)
 * @param {number} v  p^-1 mod q
 * @return {number} 平文
 */
const signWithCrt = (c, p, q, dp, dq, v) => {
  const cp = c % p;
  const cq = c % q;
  const mp = modPowerBinary(cp, dp, p);
  const mq = modPowerBinary(cq, dq, q);
  let vv = (v * (mq - mp)) % q;

  if (vv < 0) {
    vv = vv + q;
  }

  return vv * p + mp;
};

export { signWithCrt };
