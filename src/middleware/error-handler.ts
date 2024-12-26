import ApplicationError from "@/errors/application-error";
import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) return next(err);

  const applicationError =
    err instanceof ApplicationError
      ? err
      : new ApplicationError({ message: err.message });

  const errorResponse = applicationError.toErrorResponse();

  res.status(applicationError.statusCode).json(errorResponse);
};
