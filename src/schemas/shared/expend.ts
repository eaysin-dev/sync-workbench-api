import { z } from "zod";

export const createPopulateSchema = (
  allowedExpandValues: readonly string[]
) => {
  const PopulateEnum = z.enum(allowedExpandValues as [string, ...string[]]);
  const values = allowedExpandValues.join(", ");

  return z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      if (Array.isArray(val)) return val.map((item) => item.trim());
      return val ? val.split(",").map((item) => item.trim()) : [];
    })
    .refine(
      (array) => array.every((item) => PopulateEnum.safeParse(item).success),
      {
        message: `Populate can only contain the following values: ${values}`,
      }
    );
};
