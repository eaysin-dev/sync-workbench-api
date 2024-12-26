import { Permission } from "@/models/Permission";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";
import { idSchema, IdSchemaType } from "./../../schemas/shared/id";

const remove = async (identity: IdSchemaType) => {
  const id = validateSchemas(identity, idSchema);

  const permission = await Permission.findById(id);
  if (!permission) throw generateErrorResponse(notFoundError);

  return Permission.findByIdAndDelete(id);
};

export default remove;
