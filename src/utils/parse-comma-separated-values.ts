export const parseCommaSeparatedValues = (val: unknown) => {
  if (typeof val === "string") {
    return val.split(",").map((item) => item.trim());
  }
  return undefined;
};
