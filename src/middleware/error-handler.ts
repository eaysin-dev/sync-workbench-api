import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errorResponse = {
    status: "error",
    statusCode: err.statusCode || 500,
    error: {
      code: err.error?.code || "INTERNAL_SERVER_ERROR",
      message: err.error?.message || "An unexpected error occurred.",
      details: err.error?.details || "No additional details available.",
      timestamp: new Date().toISOString(),
      path: err.error?.originalUrl,
      suggestion: err.error?.suggestion || undefined,
    },
    requestId: (req.headers["x-request-id"] as string) || "unknown",
    documentation_url: "http://localhost:4000/docs/",
  };

  res.status(errorResponse.statusCode).json(errorResponse);
};

export default globalErrorHandler;
