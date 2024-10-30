export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Function for Not Found errors
const notFound = (msg = "Resource not found") => {
  return new CustomError(msg, 404);
};

// Function for Bad Request errors
const badRequest = (msg = "Bad Request") => {
  return new CustomError(msg, 400);
};

// Function for Internal Server errors
const serverError = (msg = "Internal Server Error") => {
  return new CustomError(msg, 500);
};

// Function for Authentication errors
const authenticationError = (msg = "Authentication Failed") => {
  return new CustomError(msg, 401);
};

// Function for Authorization errors
const authorizationError = (msg = "Permission Denied") => {
  return new CustomError(msg, 403);
};

// Function for Conflict errors
const conflictError = (msg = "Conflict occurred") => {
  return new CustomError(msg, 409);
};

// Function for Unprocessable Entity errors
const unprocessableEntity = (msg = "Unprocessable Entity") => {
  return new CustomError(msg, 422);
};

// Function for Method Not Allowed errors
const methodNotAllowed = (msg = "Method Not Allowed") => {
  return new CustomError(msg, 405);
};

// Function for Too Many Requests errors
const tooManyRequests = (msg = "Too Many Requests") => {
  return new CustomError(msg, 429);
};

// Exporting all error functions
export {
  authenticationError,
  authorizationError,
  badRequest,
  conflictError,
  methodNotAllowed,
  notFound,
  serverError,
  tooManyRequests,
  unprocessableEntity,
};
