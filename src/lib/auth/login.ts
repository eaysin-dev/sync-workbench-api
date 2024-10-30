import { LoginData, LoginSchema } from "@/schemas/login";
import { badRequest, hashMatched, validateSchema } from "@/utils";
import { log } from "console";
import { generateAccessToken, generateRefreshToken } from "../token";
import { findUserByUsername } from "../user";

const login = async (payload: LoginData) => {
  const data = validateSchema(LoginSchema, payload);
  const { username, password } = data;

  const user = await findUserByUsername(username);
  if (!user) {
    log("error happning");
    throw badRequest("Invalid Credentials");
  }

  const matched = await hashMatched(password, user.password);
  if (!matched) {
    log("error happning");

    throw badRequest("Invalid Credentials");
  }

  const tokenPayload = {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  return { accessToken, refreshToken };
};

export default login;
