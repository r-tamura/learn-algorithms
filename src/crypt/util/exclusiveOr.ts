const exclusiveOr = (
  word1: ArrayLike<number>,
  word2: ArrayLike<number>,
): number[] => {
  const length = Math.min(word1.length, word2.length);
  const result: number[] = [];

  for (let i = 0; i < length; i += 1) {
    result[i] = word1[i] ^ word2[i];
  }

  return result;
};

export default exclusiveOr;
