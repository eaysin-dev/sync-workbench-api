import { RolePermission } from "@/models/RolePermission";
import {
  rolePermissionSchema,
  RolePermissionSchemaType,
} from "@/schemas/role-permission";
import { idSchema, IdSchemaType } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";

const upsert = async (
  identity: IdSchemaType,
  data: RolePermissionSchemaType
) => {
  const id = validateSchemas(identity, idSchema);
  const rolePermissionData = validateSchemas(data, rolePermissionSchema);

  let rolePermission = await RolePermission.findById(id);

  if (!rolePermission) {
    rolePermission = new RolePermission(rolePermissionData);
    await rolePermission.save();
    return { rolePermission: rolePermission.toObject(), statusCode: 201 };
  }

  rolePermission.overwrite(rolePermissionData);
  await rolePermission.save();

  return { rolePermission: rolePermission.toObject(), statusCode: 200 };
};

export default upsert;
