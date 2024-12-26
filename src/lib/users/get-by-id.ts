import User from "@/models/User";
import { userGetByIdSchema, UserGetByIdSchemaType } from "@/schemas";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";

const getById = async (data: UserGetByIdSchemaType) => {
  const { id, populate } = validateSchemas(data, userGetByIdSchema);
  console.log(populate);

  const userQuery = User.findById(id).select("-password");

  if (populate) userQuery.populate(populate);

  const user = await userQuery;
  if (!user) throw generateErrorResponse(notFoundError);

  return { user: user.toObject() };
};

export default getById;
