import { Router } from "express";
import { departmentsControllers } from "../controllers";

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
