import { Router } from "express";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./auth";
import employeesRoutes from "./employees";
import permissionsRoutes from "./permissions";
import rolePermissionsRoutes from "./rolePermissions";
import rolesRoutes from "./roles";
import usersRoutes from "./users";

const swaggerUiOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
};
const SWAGGER_YAML_FILEPATH = path.join(__dirname, "../../openapi.yml");

const router = Router();

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/employees", employeesRoutes);
router.use("/roles", rolesRoutes);
router.use("/permissions", permissionsRoutes);
router.use("/role-permissions", rolePermissionsRoutes);

// Dev routes
if (process.env.NODE_ENV === "development") {
  const swaggerYaml = yaml.load(
    fs.readFileSync(SWAGGER_YAML_FILEPATH, "utf8")
  ) as Object;
  router.use("/dev/api-docs", swaggerUi.serve as any);
  router.get(
    "/dev/api-docs",
    swaggerUi.setup(swaggerYaml, swaggerUiOptions) as any
  );
}

export default router;
