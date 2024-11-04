import { z } from "zod";

export const createExpandSchema = (allowedExpandValues: readonly string[]) => {
  const ExpandEnum = z.enum(allowedExpandValues as [string, ...string[]]);

  return z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",").map((item) => item.trim()) : []))
    .refine(
      (array) => array.every((item) => ExpandEnum.safeParse(item).success),
      {
        message: `Expand can only contain the following values: ${allowedExpandValues.join(
          ", "
        )}`,
      }
    );
};
