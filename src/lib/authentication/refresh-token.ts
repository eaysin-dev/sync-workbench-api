import { authenticationError, generateErrorResponse } from "@/utils";
import { generateToken, verifyToken } from "../tokens";
import { findUserById } from "../users";

const refreshToken = async (refreshToken: string) => {
  const payload = verifyToken({ type: "RefreshToken", token: refreshToken });

  if (!payload || !payload.id) throw generateErrorResponse(authenticationError);

  const user = await findUserById(payload.id);
  if (!user) throw generateErrorResponse(authenticationError);

  const { id, email, username, status, role } = user;

  const newAccessToken = generateToken({
    type: "AccessToken",
    payload: { email, id, role, status, username },
  });

  return { accessToken: newAccessToken, refreshToken };
};

export default refreshToken;
