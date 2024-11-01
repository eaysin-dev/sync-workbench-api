import { employeeControllers } from "@/api";
import { Router } from "express";

const employeesRoutes = Router();

employeesRoutes
  .route("/")
  .get(employeeControllers.getAll)
  .post(employeeControllers.create);

employeesRoutes
  .route("/:id")
  .get(employeeControllers.getById)
  .put(employeeControllers.update)
  .patch(employeeControllers.updatePatch)
  .delete(employeeControllers.remove);

export default employeesRoutes;
