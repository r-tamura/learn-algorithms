const modPower = (b: number, e: number, m: number): number => {
  let c = 1;
  for (let i = 0; i < e; i += 1) {
    c = (b * c) % m;
  }
  return c;
};

const modPowerWindow = (
  _b: number,
  _e: number,
  _m: number,
  _w: number,
): number => {
  throw new Error("Not implemented");
};

const modPowerBinary = (b: number, e: number, m: number): number => {
  const bits = e.toString(2).split("");
  let c = 1;

  for (let i = 0; i < bits.length; i += 1) {
    c = (c * c) % m;
    if (bits[i] === "1") {
      c = (c * b) % m;
    }
  }

  return c;
};

export { modPower, modPowerBinary, modPowerWindow };
