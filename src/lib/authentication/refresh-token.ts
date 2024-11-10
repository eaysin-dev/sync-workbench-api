import { authenticationError, generateErrorResponse } from "@/utils";
import { generateToken, verifyToken } from "../token";
import { findUserById } from "../user";

const refreshToken = async (refreshToken: string) => {
  const payload = verifyToken({ type: "RefreshToken", token: refreshToken });

  if (!payload) throw generateErrorResponse(authenticationError);

  if (!payload || !payload?.id)
    throw generateErrorResponse(authenticationError);

  const user = await findUserById(payload.id);

  if (!user) throw generateErrorResponse(authenticationError);

  const tokenPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
  };

  const newAccessToken = generateToken({
    type: "AccessToken",
    payload: tokenPayload,
  });

  return newAccessToken;
};

export default refreshToken;
