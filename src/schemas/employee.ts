import defaultConfig from "@/config/default";
import { z, ZodSchema } from "zod";
import { createPopulateSchema } from "./shared/expend";
import { getAllQuerySchema } from "./shared/get-all-queries";

export const employeeSchema = z.object({
  user: z.string().min(1, { message: "User ID is required" }),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string().regex(/^\+\d{1,15}$/),
  date_of_birth: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zip_code: z.string(),
  date_of_hire: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
  job_title: z.string().optional(),
  department: z
    .object({
      department_id: z.string(),
    })
    .optional(),
  manager: z
    .object({
      manager_id: z.string(),
    })
    .optional(),
  position: z.object({
    position_id: z.string(),
  }),
  salary: z.number().positive(),
  employment_status: z.enum(["Active", "Inactive", "Suspended", "Terminated"]),
  skills: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  // profile_picture: z.string().url().optional(),
});

export const employeePartialSchema = employeeSchema.partial();

export type EmployeeSchemaType = z.infer<typeof employeeSchema>;
export type EmployeePartialSchemaType = z.infer<typeof employeePartialSchema>;

export const employeeQuerySchema: ZodSchema = getAllQuerySchema.extend({
  populate: createPopulateSchema(defaultConfig?.allowEmployeePopulateFields),
});

export type EmployeeQueryType = z.infer<typeof employeeQuerySchema>;

export const employeePopulateSchema: ZodSchema = z.object({
  populate: createPopulateSchema(
    defaultConfig.allowEmployeePopulateFields
  ).optional(),
});

export type EmployeePopulateSchemaType = z.infer<typeof employeePopulateSchema>;
