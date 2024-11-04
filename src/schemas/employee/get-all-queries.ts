import { z, ZodSchema } from "zod";
import { createExpandSchema } from "../shared/expend";
import { validExpendValues } from "./get-by-id-queries";

export const employeeQuerySchema: ZodSchema = z.object({
  page: z
    .preprocess(
      (val) => parseInt(val as string, 10),
      z.number().int().nonnegative().default(1)
    )
    .optional(),
  limit: z
    .preprocess(
      (val) => parseInt(val as string, 10),
      z.number().int().nonnegative().max(100).default(10).optional()
    )
    .optional(),
  sortBy: z.string().optional().default("updatedAt"),
  sortType: z.enum(["asc", "dsc"]).optional().default("asc"),
  search: z.string().optional(),
  expand: createExpandSchema(validExpendValues),
});

export type EmployeeQueryType = z.infer<typeof employeeQuerySchema>;
