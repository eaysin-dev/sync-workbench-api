import { verifyToken } from "@/lib/token";
import { AuthenticatedRequest } from "@/types/types";
import { authenticationError, generateErrorResponse } from "@/utils";
import { NextFunction, Response } from "express";

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(authenticationError.statusCode).json(
      generateErrorResponse({
        ...authenticationError,
        message: "Access denied. No token provided.",
      })
    );
  }

  try {
    const decoded = verifyToken({ type: "AccessToken", token });
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(authenticationError.statusCode).json(
      generateErrorResponse({
        ...authenticationError,
        message: "Invalid token or token has expired.",
      })
    );
  }
};
