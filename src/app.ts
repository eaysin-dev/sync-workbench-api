import { errorHandler } from "@/middleware/error-handler";
import bodyParser from "body-parser";
import compression from "compression";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import logger from "./logger";
import routes from "./routes";

const app = express();

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

app.use(logResponseTime);
app.use(compression() as any);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);
app.get("/health", (_req, res) => {
  res
    .status(200)
    .json({ status: `${process.env.APPLICATION_NAME} service is up` });
});

app.use(routes);
app.use(errorHandler);

export default app;
