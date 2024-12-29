import { z } from "zod";

export const createPopulateSchema = (
  allowedExpandValues: readonly string[]
) => {
  const PopulateEnum = z.enum(allowedExpandValues as [string, ...string[]]);
  const values = allowedExpandValues.join(", ");

  return z
    .union([z.string(), z.array(z.string())])
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const array = Array.isArray(val)
          ? val
          : val.split(",").map((item) => item.trim());
        return array.every((item) => PopulateEnum.safeParse(item).success);
      },
      {
        message: `Populate can only contain the following values: ${values}`,
      }
    );
};
