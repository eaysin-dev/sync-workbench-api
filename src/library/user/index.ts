import User from "@/model/User";
import { UserData } from "@/schemas";

const findUserByUsername = async (username: string) => {
  const user = await User.findOne({ username });
  return user ? user : false;
};

const userExist = async (username: string) => {
  const user = await findUserByUsername(username);
  return user ? true : false;
};

const createUser = async (data: UserData) => {
  const { email, password, role, status, username } = data;

  const user = new User({ email, username, password, role, status });

  await user.save();
  return user.toObject();
};

export { createUser, findUserByUsername, userExist };
