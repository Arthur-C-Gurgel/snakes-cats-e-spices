import { Router } from "express";
import { PratoController } from "../controllers/pratoController";
import { validarId } from "../middlewares/validarId";
import { validarPrato } from "../middlewares/validarPrato";

export const apiRoutes = Router();
const pratoController = new PratoController();

apiRoutes.get("/pratos", pratoController.listarPratos);
apiRoutes.post("/pratos", validarPrato, pratoController.cadastrarPrato);
apiRoutes.delete("/pratos/:id", validarId, pratoController.removerPrato);
