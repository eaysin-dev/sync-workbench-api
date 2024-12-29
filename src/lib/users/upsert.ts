import User from "@/models/User";
import { updateUserSchema, UserSchemaType } from "@/schemas";
import { idSchema, IdSchemaType } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";

const upsert = async (identity: IdSchemaType, data: UserSchemaType) => {
  const id = validateSchemas(identity, idSchema);
  const userData = validateSchemas(data, updateUserSchema);

  let user = await User.findById(id).select("-password");

  if (!user) {
    user = new User(userData);
    await user.save();
    return { user: user.toObject(), statusCode: 201 };
  }

  user.overwrite(userData);
  await user.save();

  return { user: user.toObject(), statusCode: 200 };
};

export default upsert;
