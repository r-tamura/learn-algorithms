type NestedArray<T> = Array<T | NestedArray<T>>;

const multiMap = <T, U>(
  xs: NestedArray<T> | T,
  fn: (value: T, ...indexes: number[]) => U,
  dimension = Number.MAX_SAFE_INTEGER,
  ...indexes: number[]
): NestedArray<U> | U => {
  if (dimension === 0 || !Array.isArray(xs)) {
    return fn(xs as T, ...indexes);
  }

  return xs.map((element, index) =>
    multiMap(
      element as NestedArray<T> | T,
      fn,
      dimension - 1,
      ...indexes,
      index,
    ),
  ) as NestedArray<U>;
};

export default multiMap;
