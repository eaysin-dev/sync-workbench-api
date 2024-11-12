import { z, ZodSchema } from "zod";
import { createPopulateSchema } from "../shared/expend";
import { getAllQuerySchema } from "../shared/get-all-queries";
import { idSchema } from "../shared/id";

export const allowedUserPopulateFields = ["role"];

export const userSchema = z.object({
  // employee: z.string().min(1, { message: "Employee ID is required" }),
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

  status: z
    .enum(["Active", "Inactive", "Suspended", "OnLeave", "Pending"])
    .default("Pending"),
});

export type UserSchemaType = z.infer<typeof userSchema>;

export const updateUserSchema = userSchema.partial().omit({ password: true });
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;

export const userSchemaWithoutPassword = userSchema.omit({ password: true });
export type UserSchemaWithoutPasswordType = z.infer<
  typeof userSchemaWithoutPassword
>;

export const usersGetAllQuerySchema: ZodSchema = getAllQuerySchema.extend({
  populate: createPopulateSchema(allowedUserPopulateFields),
});
export type UsersGetAllQuerySchemaType = z.infer<typeof usersGetAllQuerySchema>;

export const userGetByIdSchema: ZodSchema = z.object({
  id: idSchema,
  populate: createPopulateSchema(allowedUserPopulateFields).optional(),
});
export type UserGetByIdSchemaType = z.infer<typeof userGetByIdSchema>;
