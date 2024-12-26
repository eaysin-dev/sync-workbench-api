import authorization from "@/middleware/authorization";
import { Router } from "express";
import { usersControllers } from "../api";

const usersRoutes = Router();

usersRoutes
  .route("/")
  .get(authorization(), usersControllers.getAll)
  .post(usersControllers.create);

usersRoutes
  .route("/:id")
  .get(usersControllers.getById)
  .put(usersControllers.upsert)
  .patch(usersControllers.partialUpdate)
  .delete(usersControllers.remove);

export default usersRoutes;
