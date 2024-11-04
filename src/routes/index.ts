import { Router } from "express";
import authRoutes from "./v1/auth";
import employeesRoutes from "./v1/employees";

const router = Router();

router.use("/auth", authRoutes);
router.use("/employees", employeesRoutes);

export default router;
