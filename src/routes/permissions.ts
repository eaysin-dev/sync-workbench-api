import { Router } from "express";
import { permissionsControllers } from "../controllers";

const permissionsRoutes = Router();

permissionsRoutes
  .route("/")
  .get(permissionsControllers.getAll)
  .post(permissionsControllers.create);

permissionsRoutes
  .route("/:id")
  .get(permissionsControllers.getById)
  .put(permissionsControllers.upsert)
  .patch(permissionsControllers.partialUpdate)
  .delete(permissionsControllers.remove);

export default permissionsRoutes;
