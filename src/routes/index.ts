import { Router } from "express";
import authRoutes from "./auth";
import employeeRoutes from "./employee";

const router = Router();

router.use("/auth", authRoutes);
router.use("/employees", employeeRoutes);

export default router;
