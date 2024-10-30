import routes from "@/routes";
import express, { NextFunction, Request, Response } from "express";
import applyMiddleware from "./middleware";

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
app.use("/api", routes);

// 404 error handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Resource not found" });
});

// global error handler
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }

  res.status(500).json({
    code: 500,
    status: "error",
    message: "Internal Server Error. Please try again later.",
  });
});

export default app;
