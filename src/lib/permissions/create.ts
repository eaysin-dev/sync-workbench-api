import { Permission } from "@/model/Permission";
import { permissionSchema, PermissionSchemaType } from "@/schemas/permission";
import { validateSchemas } from "@/utils";

const create = async (data: PermissionSchemaType) => {
  const { action, resource, description } = validateSchemas(
    data,
    permissionSchema
  );

  const permission = new Permission({
    action,
    resource,
    description,
  });

  await permission.save();
  return permission.toObject();
};

export default create;
