import { extendedEuclid } from "./gcd";

const modInverse = (e: number, l: number): number => {
  const { x } = extendedEuclid(e, l);
  return x >= 0 ? x : (x % l) + l;
};

export { modInverse };
