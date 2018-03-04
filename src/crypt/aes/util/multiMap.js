const multiMap = (xs, fn, dimension = Number.MAX_SAFE_INTEGER, ...indexes) => {
  if (dimension === 0 || !Array.isArray(xs)) {
    return fn(xs, ...indexes)
  }
  return xs.map((e, i) => multiMap(e, fn, dimension - 1, ...indexes, i))
}

export default multiMap