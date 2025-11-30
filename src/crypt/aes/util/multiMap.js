/**
 * Map多次元配列版
 *
 * @param {Array} xs 多次元配列
 * @param {Function} fn
 * @param {number} dimension 次元数
 * @param {Array} indexes 添え字
 * @return {Array}
 */
const multiMap = (xs, fn, dimension = Number.MAX_SAFE_INTEGER, ...indexes) => {
  if (dimension === 0 || !Array.isArray(xs)) {
    return fn(xs, ...indexes);
  }
  return xs.map((e, i) => multiMap(e, fn, dimension - 1, ...indexes, i));
};

export default multiMap;
