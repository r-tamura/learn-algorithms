function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getRandomArbitrary, getRandomInt };
