import { authenticateService } from "@/lib";
import { badRequest, generateErrorResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    next(
      generateErrorResponse({
        ...badRequest,
        message: "Access denied. No token provided.",
      })
    );
  }

  try {
    const accessToken = await authenticateService.refreshToken(refreshToken);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Token refreshed successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default refreshToken;
