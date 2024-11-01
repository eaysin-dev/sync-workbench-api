import { z } from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username cannot exceed 30 characters" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),

  email: z.string().email({ message: "Please provide a valid email address" }),

  role: z
    .enum(["Admin", "Manager", "Employee", "HR", "Guest"])
    .default("Employee"),

  status: z
    .enum(["Active", "Inactive", "Suspended", "OnLeave", "Pending"])
    .default("Pending"),
});

export type UserData = z.infer<typeof UserSchema>;
