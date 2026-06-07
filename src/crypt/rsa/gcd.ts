type ExtendedEuclidResult = {
  x: number;
  y: number;
  gcd: number;
};

const trialDivition = (x: number, y: number): number => {
  let left = x;
  let right = y;

  if (left < right) {
    right = left + right;
    left = right - left;
    right = right - left;
  }

  let gcd = 1;
  let n = 2;
  while (n < right) {
    n += 1;
    while (left % n === 0 && right % n === 0) {
      gcd *= n;
      left = Math.trunc(left / n);
      right = Math.trunc(right / n);
    }
  }

  return gcd;
};

const euclid = (x: number, y: number): number => {
  let left = Math.abs(x);
  let right = Math.abs(y);

  if (left < right) {
    right = left + right;
    left = right - left;
    right = right - left;
  }

  let remainder: number;
  while ((remainder = left % right) !== 0) {
    left = right;
    right = remainder;
  }

  return right;
};

const extendedEuclid = (a: number, b: number): ExtendedEuclidResult => {
  let xPrev = 1;
  let x = 0;
  let xNext = 0;
  let yPrev = 0;
  let y = 1;
  let yNext = 0;
  let rPrev = a;
  let r = b;
  let rNext = 0;
  let qNext = 0;

  while (r !== 0) {
    qNext = Math.trunc(rPrev / r);
    rNext = rPrev % r;
    xNext = xPrev - qNext * x;
    yNext = yPrev - qNext * y;

    xPrev = x;
    x = xNext;
    yPrev = y;
    y = yNext;
    rPrev = r;
    r = rNext;
  }

  return { x: xPrev, y: yPrev, gcd: rPrev };
};

export { euclid, trialDivition, extendedEuclid };
export type { ExtendedEuclidResult };
