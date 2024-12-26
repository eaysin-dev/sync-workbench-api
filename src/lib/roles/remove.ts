import { Role } from "@/models/Role";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";
import { idSchema, IdSchemaType } from "../../schemas/shared/id";

const remove = async (identity: IdSchemaType) => {
  const id = validateSchemas(identity, idSchema);

  const role = await Role.findById(id);
  if (!role) throw generateErrorResponse(notFoundError);

  return Role.findByIdAndDelete(id);
};

export default remove;
