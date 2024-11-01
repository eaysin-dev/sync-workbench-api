import { parseCommaSeparatedValues } from "@/utils/parse-comma-separated-values";
import { z } from "zod";
import {
  createIdWithExpendSchema,
  IdWithExpendSchemaType,
} from "../shared/id-with-expend";

const validExpendValues = ["author", "comment"] as const;

export const employeeQuerySchema = z.object({
  page: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().int().nonnegative().default(1)
  ),
  limit: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().int().nonnegative().max(100).default(10)
  ),
  sortBy: z.string().optional().default("updatedAt"),
  sortType: z.enum(["asc", "dsc"]).optional().default("asc"),
  search: z.string().optional(),
  expend: z.preprocess(
    parseCommaSeparatedValues,
    z.array(z.enum(validExpendValues)).optional()
  ),
});

export type EmployeeQueryType = z.infer<typeof employeeQuerySchema>;

export const employeeIdWithExpendSchema =
  createIdWithExpendSchema(validExpendValues);

export type EmployeeIdWithExpendSchemaType = IdWithExpendSchemaType<
  typeof validExpendValues
>;
