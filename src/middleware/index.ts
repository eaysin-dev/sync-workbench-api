import express, { Application } from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDoc = YAML.load("./swagger.yaml");

const applyMiddleware = (app: Application): void => {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
};

export default applyMiddleware;
