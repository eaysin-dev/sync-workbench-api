import defaultConfig from "@/config/default";
import { z, ZodSchema } from "zod";
import { createPopulateSchema } from "../shared/expend";
import { getAllQuerySchema } from "../shared/get-all-queries";

export const employeeQuerySchema: ZodSchema = getAllQuerySchema.extend({
  populate: createPopulateSchema(defaultConfig?.employeeExpendEnum),
});

export type EmployeeQueryType = z.infer<typeof employeeQuerySchema>;
