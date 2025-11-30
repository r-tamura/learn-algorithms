const exclusiveOr = (word1, word2) => {
  const zipWith = fn => (xs, ys) => {
    const res = [];
    for (let i = 0; i < xs.length; i++) {
      res[i] = fn(xs[i], ys[i], i);
    }
    return res;
  };
  return zipWith((w1, w2) => w1 ^ w2)(word1, word2);
};

export default exclusiveOr;
