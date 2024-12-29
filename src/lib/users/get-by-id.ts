import User from "@/models/User";
import { IdWithPopulateType } from "@/types/quert";
import { generateErrorResponse, notFoundError } from "@/utils";

const getById = async ({ id, populate }: IdWithPopulateType) => {
  const userQuery = User.findById(id).select("-password");

  if (populate) userQuery.populate(populate);

  const user = await userQuery;
  if (!user) throw generateErrorResponse(notFoundError);

  return { user: user.toObject() };
};

export default getById;
