import {
  defaultError,
  duplicateKeyError,
  generateErrorResponse,
  syntaxError,
} from "@/utils";
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Log the error details in the console
  console.error("Error occurred:", err);

  // Handle SyntaxError specifically
  if (
    err instanceof SyntaxError &&
    (err as any)?.status === 400 &&
    "body" in err
  ) {
    return res.status(400).json(generateErrorResponse(syntaxError));
  }

  // Handle specific known error types
  if (err.code === 11000) {
    // Duplicate key error
    const keys = Object.keys(err.keyValue || {}).join(", ");
    const resource = err.collection || "Resource";
    return res
      .status(409)
      .json(generateErrorResponse(duplicateKeyError(resource, keys)));
  }

  // General error handling
  const errorResponse = defaultError(err);
  res
    .status(errorResponse.statusCode)
    .json(generateErrorResponse(errorResponse));
};

export default globalErrorHandler;
