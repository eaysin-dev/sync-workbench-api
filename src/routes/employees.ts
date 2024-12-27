import { Router } from "express";
import { employeeControllers } from "../controllers";

const employeesRoutes = Router();

employeesRoutes
  .route("/")
  .get(employeeControllers.getAll)
  .post(employeeControllers.create);

employeesRoutes
  .route("/:id")
  .get(employeeControllers.getById)
  .put(employeeControllers.upsert)
  .patch(employeeControllers.partialUpdate)
  .delete(employeeControllers.remove);

employeesRoutes.route("/user/:id").get(employeeControllers.getByUserId);

export default employeesRoutes;
