import { z, ZodSchema } from "zod";
import { createExpandSchema } from "../shared/expend";
import { getAllQuerySchema } from "../shared/get-all-queries";
import { employeeExpendEnum } from "./get-by-id-queries";

export const employeeQuerySchema: ZodSchema = getAllQuerySchema.extend({
  expand: createExpandSchema(employeeExpendEnum),
});

export type EmployeeQueryType = z.infer<typeof employeeQuerySchema>;
