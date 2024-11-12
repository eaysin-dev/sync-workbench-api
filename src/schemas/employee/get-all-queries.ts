import { z, ZodSchema } from "zod";
import { createPopulateSchema } from "../shared/expend";
import { getAllQuerySchema } from "../shared/get-all-queries";
import { employeeExpendEnum } from "./get-by-id-queries";

export const employeeQuerySchema: ZodSchema = getAllQuerySchema.extend({
  populate: createPopulateSchema(employeeExpendEnum),
});

export type EmployeeQueryType = z.infer<typeof employeeQuerySchema>;
