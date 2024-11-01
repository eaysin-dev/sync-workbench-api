import { z } from "zod";

export const EmployeeSchema = z.object({
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
  profile_picture: z.string().url().optional(),
});

export type EmployeeSchemaType = z.infer<typeof EmployeeSchema>;
