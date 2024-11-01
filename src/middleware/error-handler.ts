import { handleDefaultError, handleSyntaxError } from "@/utils";
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (
    err instanceof SyntaxError &&
    (err as any)?.status === 400 &&
    "body" in err
  ) {
    const syntaxErrorResponse = handleSyntaxError(req.originalUrl);
    return res.status(400).json(syntaxErrorResponse);
  }

  const errorResponse = handleDefaultError(err, req.originalUrl);
  res.status(errorResponse.statusCode).json(errorResponse);
};

export default globalErrorHandler;
