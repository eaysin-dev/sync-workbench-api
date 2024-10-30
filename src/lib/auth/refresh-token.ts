import { authenticationError } from "@/utils";
import { generateToken, verifyToken } from "../token";
import { findUserByUsername } from "../user";

const refreshToken = async (refreshToken: string) => {
  console.log({ refreshToken });
  const payload = verifyToken({ type: "RefreshToken", token: refreshToken });

  if (!payload) throw authenticationError("Invalid refresh token");

  if (!payload || !payload.username)
    throw authenticationError("Invalid refresh token");

  const user = await findUserByUsername(payload.username);

  if (!user) throw authenticationError("Invalid refresh token");

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
