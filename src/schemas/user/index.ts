import defaultConfig from "@/config/default";
import { z, ZodSchema } from "zod";
import { createPopulateSchema } from "../shared/expend";
import { getAllQuerySchema } from "../shared/get-all-queries";
import { idSchema } from "../shared/id";

/**
 * Base schema for user data validation.
 * This schema ensures all user-related fields conform to expected types and constraints.
 */
export const userSchema = z.object({
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

/**
 * Schema for updating user data.
 * Allows partial updates, excluding the password field.
 */
export const updateUserSchema = userSchema.partial().omit({ password: true });
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;

/**
 * Schema for user data excluding the password field.
 * Useful for public-facing data or secure responses.
 */
export const userSchemaWithoutPassword = userSchema.omit({ password: true });
export type UserSchemaWithoutPasswordType = z.infer<
  typeof userSchemaWithoutPassword
>;

/**
 * Query schema for fetching all users.
 * Extends the base query schema and allows population of specific fields.
 */
export const usersGetAllQuerySchema: ZodSchema = getAllQuerySchema.extend({
  populate: createPopulateSchema(defaultConfig.allowedUserPopulateFields),
  role: z.string().optional(),
});
export type UsersGetAllQuerySchemaType = z.infer<typeof usersGetAllQuerySchema>;

/**
 * Query schema for fetching a user by ID.
 * Requires a valid user ID and optionally allows population of specific fields.
 */
export const userGetByIdSchema: ZodSchema = z.object({
  id: idSchema,
  populate: createPopulateSchema(
    defaultConfig.allowedUserPopulateFields
  ).optional(),
});
export type UserGetByIdSchemaType = z.infer<typeof userGetByIdSchema>;
