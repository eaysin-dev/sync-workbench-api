import routes from "@/routes";
import express from "express";
import applyMiddleware from "./middleware";
import globalErrorHandler from "./middleware/error-handler";

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

app.use(globalErrorHandler);

export default app;
