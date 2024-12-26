import { Role } from "@/models/Role";
import { roleSchema, RoleSchemaType } from "@/schemas/role";
import { idSchema, IdSchemaType } from "@/schemas/shared/id";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";

const partialUpdate = async (identity: IdSchemaType, data: RoleSchemaType) => {
  const id = validateSchemas(identity, idSchema);
  const roleData = validateSchemas(data, roleSchema);
  const role = await Role.findById(id);

  if (!role) generateErrorResponse(notFoundError);

  role?.set(roleData);
  await role?.save();

  return role?.toObject();
};

export default partialUpdate;
