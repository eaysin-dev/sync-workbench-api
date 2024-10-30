import authController from "@/api/v1/auth";
import { Router } from "express";

const v1Routes = Router();

v1Routes.post("/auth/register", authController.register);
v1Routes.post("/auth/login", authController.login);

v1Routes.post("/forgot-password", () => {});
v1Routes.post("/reset-password", () => {});
v1Routes.patch("/change-password", () => {});

v1Routes.patch("/update-profile", () => {});
v1Routes.get("/me", () => {});
v1Routes.delete("/delete-account", () => {});
v1Routes.post("/verify-token", () => {});

export default v1Routes;
