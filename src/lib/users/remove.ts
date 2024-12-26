import User from "@/models/User";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";
import { idSchema, IdSchemaType } from "../../schemas/shared/id";

const remove = async (identity: IdSchemaType) => {
  const id = validateSchemas(identity, idSchema);

  const user = await User.findById(id);
  if (!user) throw generateErrorResponse(notFoundError);

  return User.findByIdAndDelete(id);
};

export default remove;
