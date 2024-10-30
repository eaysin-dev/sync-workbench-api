import { LoginData, LoginSchema } from "@/schemas/login";
import { badRequest, hashMatched, validateSchema } from "@/utils";
import { generateToken } from "../token";
import { findUserByUsername } from "../user";

const login = async (payload: LoginData) => {
  const data = validateSchema(LoginSchema, payload);
  const { username, password } = data;

  const user = await findUserByUsername(username);
  if (!user) throw badRequest("Invalid Credentials");

  const matched = await hashMatched(password, user.password);
  if (!matched) throw badRequest("Invalid Credentials");

  const tokenPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
  };

  const accessToken = generateToken({
    payload: tokenPayload,
    type: "AccessToken",
  });
  const refreshToken = generateToken({
    payload: tokenPayload,
    type: "RefreshToken",
  });

  return { accessToken, refreshToken };
};

export default login;
