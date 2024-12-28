import { authenticateService } from "@/lib";
import { badRequest, generateErrorResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken: token } = req.body;

  if (!refreshToken) {
    const errorResponse = {
      ...badRequest,
      message: "Access denied. No token provided.",
    };
    throw generateErrorResponse(errorResponse);
  }

  try {
    const { accessToken, refreshToken } =
      await authenticateService.refreshToken(token);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Token refreshed successfully",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default refreshToken;
