import { Permission } from "@/models/Permission";
import { permissionSchema, PermissionSchemaType } from "@/schemas/permission";
import { idSchema, IdSchemaType } from "@/schemas/shared/id";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";

const partialUpdate = async (
  identity: IdSchemaType,
  data: PermissionSchemaType
) => {
  const id = validateSchemas(identity, idSchema);
  const permissionData = validateSchemas(data, permissionSchema);
  const permission = await Permission.findById(id);

  if (!permission) generateErrorResponse(notFoundError);

  permission?.set(permissionData);
  await permission?.save();

  return permission?.toObject();
};

export default partialUpdate;
