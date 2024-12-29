import User from "@/models/User";
import { generateErrorResponse, notFoundError } from "@/utils";
import { IdSchemaType } from "../../schemas/shared/id";

const remove = async (id: IdSchemaType) => {
  const user = await User.findById(id);
  if (!user) throw generateErrorResponse(notFoundError);

  return User.findByIdAndDelete(id);
};

export default remove;
