import { getRandomInt } from "../util/random";
import { euclid } from "./gcd";
import { modPowerBinary } from "./mod_power";

const felmatTest = (r: number, t: number): boolean => {
  if (r < 4) {
    return true;
  }

  let j = 0;
  while (j < t) {
    const a = getRandomInt(2, r - 2);
    const s = modPowerBinary(a, r - 1, r);

    if (s !== 1) {
      return false;
    }
    j += 1;
  }

  return true;
};

const millerRabinTest = (r: number, t: number): boolean => {
  if (r < 4) {
    return true;
  }
  if (r % 2 === 0) {
    return false;
  }

  let s = 0;
  let k = r - 1;
  while (k % 2 === 0) {
    k /= 2;
    s += 1;
  }

  let i = 0;
  while (i !== t) {
    const a = getRandomInt(2, r - 1);
    let b = modPowerBinary(a, k, r);
    let j = 0;

    while (j < s && b % r !== 1 && (b + 1) % r !== 0) {
      b = (b * b) % r;
      j += 1;
    }

    if (j === s || (j > 0 && b === 1)) {
      return false;
    }

    i += 1;
  }

  return true;
};

const isPrime = (r: number): boolean => {
  if (r === 2) {
    return true;
  }
  if (r % 2 === 0) {
    return false;
  }
  if (euclid(r, 6469693230) !== 1) {
    return false;
  }

  return millerRabinTest(r, 1);
};

const getPrime = (min = 1, max = 1000): number => {
  let value = min;
  do {
    value = getRandomInt(min, max);
  } while (!isPrime(value));
  return value;
};

export { felmatTest, millerRabinTest, isPrime, getPrime };
