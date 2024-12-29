import User from "@/models/User";
import { IdSchemaType } from "@/schemas/shared/id";
import { UserSchemaType } from "@/schemas/user";

const upsert = async (id: IdSchemaType, data: UserSchemaType) => {
  const { email, role, status, username } = data;

  let user = await User.findById(id).select("-password");

  if (!user) {
    user = new User({ email, role, status, username });
    await user.save();
    return { user: user.toObject(), statusCode: 201 };
  }

  user.overwrite({ email, role, status, username });
  await user.save();

  return { user: user.toObject(), statusCode: 200 };
};

export default upsert;
