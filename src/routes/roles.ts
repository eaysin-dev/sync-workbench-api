import { Router } from "express";
import { rolesControllers } from "../controllers";

const rolesRoutes = Router();

rolesRoutes
  .route("/")
  .get(rolesControllers.getAll)
  .post(rolesControllers.create);

rolesRoutes
  .route("/:id")
  .get(rolesControllers.getById)
  .put(rolesControllers.upsert)
  .patch(rolesControllers.partialUpdate)
  .delete(rolesControllers.remove);

export default rolesRoutes;
