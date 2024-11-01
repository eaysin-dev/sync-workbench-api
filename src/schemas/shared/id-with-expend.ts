// id-with-expend.ts
import { parseCommaSeparatedValues } from "@/utils/parse-comma-separated-values";
import { z } from "zod";
import { idSchema } from "./../shared/id";

const createDynamicEnum = <T extends string>(values: [T, ...T[]]) =>
  z.enum(values);

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
