import { LoginSchema, LoginSchemaType } from "@/schemas/auth";
import {
  badRequest,
  generateErrorResponse,
  hashMatched,
  validateSchemas,
} from "@/utils";
import { generateToken } from "../token";
import { findUserByUsername } from "../user";

const login = async (payload: LoginSchemaType) => {
  const data = validateSchemas(payload, LoginSchema);

  const { username, password } = data;

  const user = await findUserByUsername(username);
  if (!user) throw generateErrorResponse(badRequest);

  const matched = await hashMatched(password, user.password);
  if (!matched) throw generateErrorResponse(badRequest);

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
    payload: tokenPayload,
  });

  return { accessToken, refreshToken };
};

export default login;
