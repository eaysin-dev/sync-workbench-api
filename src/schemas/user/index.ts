import { z } from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username cannot exceed 30 characters" })
    .trim(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),

  email: z
    .string()
    .email({ message: "Please provide a valid email address" })
    .trim()
    .toLowerCase(),

  role: z.string().min(1, { message: "Role is required" }),

  permissions: z.array(z.string()).optional(),

  status: z
    .enum(["Active", "Inactive", "Suspended", "OnLeave", "Pending"])
    .default("Pending"),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
