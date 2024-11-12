import { Router } from "express";
import authRoutes from "./v1/auth";
import employeesRoutes from "./v1/employees";
import permissionsRoutes from "./v1/permissions";
import rolePermissionsRoutes from "./v1/rolePermissions";
import rolesRoutes from "./v1/roles";
import usersRoutes from "./v1/users";

const router = Router();

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/employees", employeesRoutes);
router.use("/roles", rolesRoutes);
router.use("/permissions", permissionsRoutes);
router.use("/role-permissions", rolePermissionsRoutes);

export default router;
