import User from "@/models/User";
import { IdSchemaType } from "@/schemas/shared/id";
import { UpdateUserSchemaType } from "@/schemas/user";
import { generateErrorResponse, notFoundError } from "@/utils";

const partialUpdate = async (id: IdSchemaType, data: UpdateUserSchemaType) => {
  const { email, role, status, username } = data;

  const user = await User.findById(id).select("-password");
  if (!user) generateErrorResponse(notFoundError);

  user?.set({ email, role, status, username });
  await user?.save();

  return user?.toObject();
};

export default partialUpdate;
