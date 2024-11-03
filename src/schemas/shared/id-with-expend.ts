// id-with-expend.ts
import { parseCommaSeparatedValues } from "@/utils/parse-comma-separated-values";
import { z } from "zod";

const createDynamicEnum = <T extends string>(values: [T, ...T[]]) =>
  z.enum(values);

export const idSchema = z.object({
  id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ID format"),
});
export const createIdWithExpendSchema = <T extends string>(
  validExpendValues: readonly T[]
) => {
  const ExpendEnum = createDynamicEnum(validExpendValues as [T, ...T[]]);

  const expendSchema = z.object({
    expend: z.preprocess(
      parseCommaSeparatedValues,
      z.array(ExpendEnum).optional()
    ),
  });

  return z.intersection(idSchema, expendSchema);
};

export type IdWithExpendSchemaType<T extends readonly string[]> = z.infer<
  ReturnType<typeof createIdWithExpendSchema>
>;
