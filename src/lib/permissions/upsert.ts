import { Permission } from "@/models/Permission";
import { permissionSchema, PermissionSchemaType } from "@/schemas/permission";
import { idSchema, IdSchemaType } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";

const upsert = async (identity: IdSchemaType, data: PermissionSchemaType) => {
  const id = validateSchemas(identity, idSchema);
  const permissionData = validateSchemas(data, permissionSchema);

  let permission = await Permission.findById(id);

  if (!permission) {
    permission = new Permission(permissionData);
    await permission.save();
    return { permission: permission.toObject(), statusCode: 201 };
  }

  permission.overwrite(permissionData);
  await permission.save();

  return { permission: permission.toObject(), statusCode: 200 };
};

export default upsert;
