import { Permission } from "@/models/Permission";
import { PermissionSchemaType } from "@/schemas/permission";
import { IdSchemaType } from "@/schemas/shared/id";

const upsert = async (id: IdSchemaType, payload: PermissionSchemaType) => {
  const { action, resource, description } = payload;

  let permission = await Permission.findById(id);

  if (!permission) {
    permission = new Permission({ action, resource, description });
    await permission.save();
    return { permission: permission.toObject(), statusCode: 201 };
  }

  permission.overwrite({ action, resource, description });
  await permission.save();

  return { permission: permission.toObject(), statusCode: 200 };
};

export default upsert;
