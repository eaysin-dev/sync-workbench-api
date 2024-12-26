import { Permission } from "@/models/Permission";
import { PermissionSchemaType } from "@/schemas/permission";

const create = async (data: PermissionSchemaType) => {
  const { action, resource, description } = data;

  const permission = new Permission({
    action,
    resource,
    description,
  });

  await permission.save();
  return permission.toObject();
};

export default create;
