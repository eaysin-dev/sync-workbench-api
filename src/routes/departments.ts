import { Router } from "express";
import { departmentsControllers } from "../api";

const departmentsRoutes = Router();

departmentsRoutes
  .route("/")
  .get(departmentsControllers.getAll)
  .post(departmentsControllers.create);

departmentsRoutes
  .route("/:id")
  .get(departmentsControllers.getById)
  .put(departmentsControllers.upsert)
  .patch(departmentsControllers.partialUpdate)
  .delete(departmentsControllers.remove);

export default departmentsRoutes;
