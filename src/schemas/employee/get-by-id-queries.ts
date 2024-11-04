import { z, ZodSchema } from "zod";
import { createExpandSchema } from "../shared/expend";
import { zodIdObject } from "../shared/id";

export const validExpendValues = ["author", "comment"];

export const employeeGetByIdSchema: ZodSchema = z.object({
  id: zodIdObject,
  expand: createExpandSchema(validExpendValues).optional(),
});

export type EmployeeGetByIdSchemaType = z.infer<typeof employeeGetByIdSchema>;
