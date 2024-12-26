import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodError } from "zod";
import logger from "../logger";
import { ErrorDetails, ErrorResponse } from "../types/error";

/**
 * Helper to get message from Zod errors
 * @param error Error from Zod
 * @returns Structured message for error
 */
const getMessageFromZodError = (error: ZodError): string | undefined => {
  if (error.issues && error.issues.length > 0) {
    return error.issues
      .map((issue) => {
        return `PATH: [${issue.path}] ;; MESSAGE: ${issue.message}`;
      })
      .join(", ");
  }
  return error.message;
};

interface HandlerOptions {
  validation?: {
    body?: any; // Zod schema
  };
}

/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 * @param handler Request handler to check for error
 */
export const requestMiddleware =
  (handler: RequestHandler, options?: HandlerOptions): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (options?.validation?.body) {
      try {
        options.validation.body.parse(req.body); // Zod validation
      } catch (error) {
        if (error instanceof ZodError) {
          const errorDetails: ErrorDetails = {
            code: "VALIDATION_ERROR",
            message: error.message,
            details: error.issues,
            suggestion: "Please check your input data and try again.",
          };

          const errorResponse: ErrorResponse = {
            status: "error",
            statusCode: 400,
            error: errorDetails,
            timestamp: new Date().toISOString(),
          };

          res.status(400).json(errorResponse);
          return;
        }
        next(error); // For other types of errors
      }
    }

    try {
      await handler(req, res, next);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        logger.log({
          level: "error",
          message: "Error in request handler",
          error: err,
        });
      }
      next(err);
    }
  };

export default requestMiddleware;
