import { modPowerBinary } from "./mod_power";

const signWithCrt = (
  c: number,
  p: number,
  q: number,
  dp: number,
  dq: number,
  v: number,
): number => {
  const cp = c % p;
  const cq = c % q;
  const mp = modPowerBinary(cp, dp, p);
  const mq = modPowerBinary(cq, dq, q);
  let vv = (v * (mq - mp)) % q;

  if (vv < 0) {
    vv += q;
  }

  return vv * p + mp;
};

export { signWithCrt };
