import { z, ZodSchema } from "zod";
import { createExpandSchema } from "../shared/expend";
import { idSchema } from "../shared/id";

export const employeeExpendEnum = ["author", "comment"];

export const employeeGetByIdSchema: ZodSchema = z.object({
  id: idSchema,
  expand: createExpandSchema(employeeExpendEnum).optional(),
});

export type EmployeeGetByIdSchemaType = z.infer<typeof employeeGetByIdSchema>;
