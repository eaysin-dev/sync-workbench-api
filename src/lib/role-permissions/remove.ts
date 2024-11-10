import { RolePermission } from "@/model/RolePermission";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";
import { idSchema, IdSchemaType } from "./../../schemas/shared/id";

const remove = async (identity: IdSchemaType) => {
  const id = validateSchemas(identity, idSchema);

  const rolePermission = await RolePermission.findById(id);
  if (!rolePermission) throw generateErrorResponse(notFoundError);

  return RolePermission.findByIdAndDelete(id);
};

export default remove;
