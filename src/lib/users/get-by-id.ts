import User from "@/model/User";
import { userGetByIdSchema, UserGetByIdSchemaType } from "@/schemas";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";

const getById = async (data: UserGetByIdSchemaType) => {
  const payload = validateSchemas(data, userGetByIdSchema);

  const userQuery = User.findById(payload.id).select("-password");

  if (payload.expend) {
    userQuery.populate(payload.expend);
  }

  const user = await userQuery;
  if (!user) throw generateErrorResponse(notFoundError);

  return { user: user.toObject() };
};

export default getById;
