import SafeMongooseConnection from "@/lib/safe-mongoose-connection";
import logger from "@/logger";
import { errorHandler } from "@/middleware/error-handler";
import routes from "@/routes";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import util from "util";

// Load environment variables
const result = dotenv.config();
if (result.error) dotenv.config({ path: ".env.default" });

const app = express();

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware to log response time
function logResponseTime(req: Request, res: Response, next: NextFunction) {
  const startHrTime = process.hrtime();

  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    const message = `${req.method} ${res.statusCode} ${elapsedTimeInMs}ms\t${req.path}`;
    logger.log({
      level: "debug",
      message,
      consoleLoggerOptions: { label: "API" },
    });
  });

  next();
}

// Middleware setup
app.use(logResponseTime);
app.use(cors(corsOptions));
app.use(compression() as any);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static file serving
app.use(express.static(path.join(__dirname, "..", "public")));

// Root endpoint to serve HTML file
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Health check endpoint
app.get("/health", (_req, res) => {
  res
    .status(200)
    .json({ status: `${process.env.APPLICATION_NAME} service is up` });
});

// API routes
app.use(routes);

// Error handler middleware
app.use(errorHandler);

// Mongoose connection and app start logic
const PORT = process.env.PORT || 3000;

let debugCallback;
if (process.env.NODE_ENV === "development") {
  debugCallback = (
    collectionName: string,
    method: string,
    query: any,
    _doc: string
  ): void => {
    const message = `${collectionName}.${method}(${util.inspect(query, {
      colors: true,
      depth: null,
    })})`;
    logger.log({
      level: "verbose",
      message,
      consoleLoggerOptions: { label: "MONGO" },
    });
  };
}

const safeMongooseConnection = new SafeMongooseConnection({
  mongoUrl: process.env.DB_CONNECTION_URL ?? "",
  debugCallback,
  onStartConnection: (mongoUrl) =>
    logger.info(`Connecting to MongoDB at ${mongoUrl}`),
  onConnectionError: (error, mongoUrl) =>
    logger.log({
      level: "error",
      message: `Could not connect to MongoDB at ${mongoUrl}`,
      error,
    }),
  onConnectionRetry: (mongoUrl) =>
    logger.info(`Retrying to MongoDB at ${mongoUrl}`),
});

// Start server after DB connection
const serve = () =>
  app.listen(PORT, () => {
    logger.info(`🌏 Express server started at http://localhost:${PORT}`);
    if (process.env.NODE_ENV === "development") {
      logger.info(
        `⚙️  Swagger UI hosted at http://localhost:${PORT}/dev/api-docs`
      );
    }
  });

// Check for DB connection URL and start the app
if (process.env.DB_CONNECTION_URL == null) {
  logger.error(
    "DB_CONNECTION_URL not specified in environment",
    new Error("DB_CONNECTION_URL not specified in environment")
  );
  process.exit(1);
} else {
  safeMongooseConnection.connect((mongoUrl) => {
    logger.info(`Connected to MongoDB at ${mongoUrl}`);
    serve();
  });
}

// Graceful shutdown on SIGINT
process.on("SIGINT", async () => {
  console.log("\n");
  logger.info("Gracefully shutting down");
  logger.info("Closing the MongoDB connection");
  try {
    await safeMongooseConnection.close(true);
    logger.info("Mongo connection closed successfully");
  } catch (err) {
    logger.log({
      level: "error",
      message: "Error shutting closing mongo connection",
      error: err,
    });
  }
  process.exit(0);
});
