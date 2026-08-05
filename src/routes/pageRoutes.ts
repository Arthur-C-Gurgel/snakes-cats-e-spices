import { Router } from "express";
import { PageController } from "../controllers/pageController";

export const pageRoutes = Router();
const pageController = new PageController();

pageRoutes.get("/", pageController.renderHome);
pageRoutes.get("/cardapio", pageController.renderCatalogo);
pageRoutes.get("/login", pageController.renderLogin);
pageRoutes.get("/cadastro", pageController.renderCadastro);
pageRoutes.get("/perfil", pageController.renderPerfil);
pageRoutes.get("/pedido", pageController.renderPedido);
pageRoutes.get("/admin", pageController.renderAdmin);
