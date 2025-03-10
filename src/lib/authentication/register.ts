import { UserSchemaType } from "@/schemas/user";
import { conflictError, generateErrorResponse } from "@/utils/errors";
import { generateHash } from "@/utils/hashing";
import { generateToken } from "../tokens";
import { userExist } from "../users";
import { createUserWithEmployee } from "../users/utils";

const register = async (data: UserSchemaType) => {
  const { email, password, role, status, username } = data;

  const hasUser = await userExist(username);
  if (hasUser)
    throw generateErrorResponse({
      ...conflictError("username", username),
    });

  const hashedPassword = await generateHash(password);
  const { user } = await createUserWithEmployee({
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

  const accessToken = generateToken({
    type: "AccessToken",
    payload: tokenPayload,
  });
  const refreshToken = generateToken({
    type: "RefreshToken",
    payload: { id: user.id },
  });

  return { accessToken, refreshToken };
};

export default register;
