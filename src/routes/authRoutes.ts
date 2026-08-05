import { Router } from "express";
import { AuthController } from "../controllers/authController";

export const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", authController.login);
authRoutes.post("/logout", authController.logout);
authRoutes.post("/cadastrar", authController.cadastrar);
authRoutes.get("/perfil", authController.getPerfil);
