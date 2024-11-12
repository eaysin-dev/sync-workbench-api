import { authenticationError, generateErrorResponse } from "@/utils";
import { generateToken, verifyToken } from "../tokens";
import { findUserById } from "../users";

const refreshToken = async (refreshToken: string) => {
  const payload = verifyToken({ type: "RefreshToken", token: refreshToken });

  if (!payload) throw generateErrorResponse(authenticationError);
  if (!payload || !payload?.id)
    throw generateErrorResponse(authenticationError);

  const user = await findUserById(payload.id);
  if (!user) throw generateErrorResponse(authenticationError);

  const newAccessToken = generateToken({
    type: "AccessToken",
    payload: user.id,
  });

  return newAccessToken;
};

export default refreshToken;
