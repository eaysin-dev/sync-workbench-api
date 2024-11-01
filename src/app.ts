import routes from "@/routes";
import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import { globalErrorHandler } from "./middleware";
import { generateErrorResponse, notFoundError } from "./utils";

// Initialize express app
const app = express();

// Apply middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json(), cors(), morgan("dev"));

// Swagger docs setup
const swaggerDoc = YAML.load("./swagger.yaml");
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Health check route
app.get("/health", (_req, res) => {
  res
    .status(200)
    .json({ status: `${process.env.APPLICATION_NAME} service is up` });
});

// API routes
app.use("/api/v1", routes);

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json(generateErrorResponse(notFoundError(req.originalUrl)));
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next);
});

export default app;
