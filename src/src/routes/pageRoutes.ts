import { Router } from "express";
import { PageController } from "../controllers/pageController";

export const pageRoutes = Router();
const pageController = new PageController();

pageRoutes.get("/", pageController.renderHome);
pageRoutes.get("/catalogo", pageController.renderCatalogo);
