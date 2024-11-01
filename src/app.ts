import routes from "@/routes";
import express from "express";
import applyMiddleware from "./middleware";
import { authenticateJWT } from "./middleware/authenticate-jwt";
import globalErrorHandler from "./middleware/error-handler";
import { generateErrorResponse, notFoundError } from "./utils";

// initialize express
const app = express();

// Apply middleware (assuming applyMiddleware is defined elsewhere)
applyMiddleware(app);

// health check
app.get("/health", (_req, res) => {
  res
    .status(200)
    .json({ status: `${process.env.APPLICATION_NAME} service is up` });
});

// Routes
app.use("/api/v1", routes);

const publicRoutes = [
  "/api/v1/auth/login",
  "/api/v1/auth/register",
  "/api/v1/auth/refresh-token",
];
app.use((req, res, next) => {
  if (publicRoutes.includes(req.path)) return next();

  authenticateJWT(req, res, next);
});

app.use((req, res) => {
  const notFoundResponse = notFoundError(req.originalUrl);

  res.status(404).json(generateErrorResponse(notFoundResponse));
});

app.use(globalErrorHandler);

export default app;
