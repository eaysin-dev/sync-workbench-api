import { Router } from "express";
import { rolesControllers } from "../api";

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
