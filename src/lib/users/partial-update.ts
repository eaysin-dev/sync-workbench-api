import User from "@/model/User";
import { updateUserSchema, UpdateUserSchemaType } from "@/schemas";
import { idSchema, IdSchemaType } from "@/schemas/shared/id";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";

const partialUpdate = async (
  identity: IdSchemaType,
  data: UpdateUserSchemaType
) => {
  const id = validateSchemas(identity, idSchema);
  const userData = validateSchemas(data, updateUserSchema);

  const user = await User.findById(id).select("-password");
  if (!user) generateErrorResponse(notFoundError);

  user?.set(userData);
  await user?.save();

  return user?.toObject();
};

export default partialUpdate;
