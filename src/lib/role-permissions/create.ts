import { RolePermission } from "@/models/RolePermission";
import {
  rolePermissionSchema,
  RolePermissionSchemaType,
} from "@/schemas/role-permission";
import { validateSchemas } from "@/utils";

const create = async (data: RolePermissionSchemaType) => {
  const { permission, role } = validateSchemas(data, rolePermissionSchema);

  const rolePermission = new RolePermission({
    role,
    permission,
  });

  await rolePermission.save();
  return rolePermission.toObject();
};

export default create;
