import { authControllers } from "@/api";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/register", authControllers.register);
authRoutes.post("/login", authControllers.login);

authRoutes.post("/forgot-password", () => {});
authRoutes.post("/reset-password", () => {});
authRoutes.patch("/change-password", () => {});

authRoutes.patch("/update-profile", () => {});
authRoutes.get("/me", () => {});
authRoutes.delete("/delete-account", () => {});
authRoutes.post("/verify-token", () => {});

export default authRoutes;
