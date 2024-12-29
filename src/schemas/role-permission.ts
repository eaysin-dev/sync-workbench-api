import defaultConfig from "@/config/default";
import { z, ZodSchema } from "zod";
import { createPopulateSchema } from "./shared/expend";
import { getAllQuerySchema } from "./shared/get-all-queries";

export const rolePermissionSchema = z.object({
  role: z.string().min(1, { message: "Role ID is required" }),
  permission: z.string().min(1, { message: "Permission ID is required" }),
});

export type RolePermissionSchemaType = z.infer<typeof rolePermissionSchema>;

export const rolePermissionQuerySchema: ZodSchema = getAllQuerySchema.extend({
  populate: createPopulateSchema(
    defaultConfig.allowedRolePermissionPopulateFields
  ),
});

export type RolePermissionQuerySchemaType = z.infer<
  typeof rolePermissionQuerySchema
>;

export const rolePermissionGetByIdSchema: ZodSchema = z.object({
  populate: createPopulateSchema(
    defaultConfig.allowedRolePermissionPopulateFields
  ).optional(),
});

export type RolePermissionPopulateSchemaType = z.infer<
  typeof rolePermissionGetByIdSchema
>;
