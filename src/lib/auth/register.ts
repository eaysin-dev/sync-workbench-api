import { UserData, UserSchema } from "@/schemas";
import { validateSchema } from "@/utils";
import { badRequest } from "@/utils/errors";
import { generateHash } from "@/utils/hashing";
import { generateAccessToken, generateRefreshToken } from "../token";
import { createUser, userExist } from "../user";

const register = async (data: UserData) => {
  const payload = validateSchema(UserSchema, data) as UserData;
  const { email, password, role, status, username } = payload;

  const hasUser = await userExist(username);
  if (hasUser)
    throw badRequest("Username already exists. Please choose another one.");

  const hashedPassword = await generateHash(password);
  const user = await createUser({
    email,
    password: hashedPassword,
    role,
    status,
    username,
  });

  const tokenPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  return { accessToken, refreshToken };
};

export default register;
