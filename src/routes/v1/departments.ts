import { departmentsControllers } from "@/api";
import { Router } from "express";

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
