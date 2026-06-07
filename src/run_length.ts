export const encode = (input: unknown): string => {
  if (typeof input !== "string") {
    throw new Error(
      `It expected first argument is string, passed ${typeof input}`,
    );
  }

  if (input.length === 0) {
    return input;
  }

  return (
    input
      .match(/(.)\1*/g)
      ?.reduce(
        (acc, value) =>
          value.length > 1
            ? `${acc}${value[0]}${value.length}`
            : `${acc}${value[0]}`,
        "",
      ) ?? ""
  );
};

export const decode = (input: unknown): string => {
  if (typeof input !== "string") {
    throw new Error(
      `It expected first argument is string, passed ${typeof input}`,
    );
  }

  return input;
};

export default {
  encode,
  decode,
};
