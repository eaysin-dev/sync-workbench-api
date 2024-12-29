import { authenticateService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { z } from "zod";

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, { message: "Refresh token is required" }),
});

type RefreshTokenReqBody = z.infer<typeof refreshTokenSchema>;

const refreshToken: RequestHandler = async (
  req: Request<{}, {}, RefreshTokenReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken: token } = req.body;

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

export default requestMiddleware(refreshToken, {
  validation: { body: refreshTokenSchema },
});
