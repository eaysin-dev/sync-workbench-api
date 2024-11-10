import { RolePermission } from "@/model/RolePermission";
import {
  rolePermissionSchema,
  RolePermissionSchemaType,
} from "@/schemas/role-permission";
import { idSchema, IdSchemaType } from "@/schemas/shared/id";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";

const partialUpdate = async (
  identity: IdSchemaType,
  data: RolePermissionSchemaType
) => {
  const id = validateSchemas(identity, idSchema);
  const rolePermissionData = validateSchemas(data, rolePermissionSchema);
  const rolePermission = await RolePermission.findById(id);

  if (!rolePermission) generateErrorResponse(notFoundError);

  rolePermission?.set(rolePermissionData);
  await rolePermission?.save();

  return rolePermission?.toObject();
};

export default partialUpdate;
