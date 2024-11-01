import { employeeControllers } from "@/api";
import { Router } from "express";

const employeeRoutes = Router();

employeeRoutes
  .route("/")
  .get(employeeControllers.getAll)
  .post(employeeControllers.create);

employeeRoutes
  .route("/:id")
  .get(employeeControllers.getById)
  .put(employeeControllers.update)
  .patch(employeeControllers.updatePatch)
  .delete(employeeControllers.remove);

export default employeeRoutes;
