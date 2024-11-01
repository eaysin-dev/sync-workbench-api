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
    const errorPayload = authenticationError(req.originalUrl);

    return res.status(errorPayload.statusCode).json(
      generateErrorResponse({
        ...errorPayload,
        message: "Access denied. No token provided.",
      })
    );
  }

  try {
    const decoded = verifyToken({ type: "AccessToken", token });
    req.user = decoded;
    next();
  } catch (error) {
    const errorPayload = authenticationError(req.originalUrl);

    return res.status(errorPayload?.statusCode).json(
      generateErrorResponse({
        ...errorPayload,
        message: "Invalid token or token has expired.",
      })
    );
  }
};
