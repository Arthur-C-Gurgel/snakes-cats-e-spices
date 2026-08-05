import { Request, Response } from "express";

export class PageController {
    renderHome(req: Request, res: Response) {
        try {
            return res.render("index", { flash: null });
        } catch {
            return res.status(500).json({
                success: false,
                mensagem: "Falhou ao carregar a página inicial"
            });
        }
    }

    renderCatalogo(req: Request, res: Response) {
        try {
            return res.render("catalogo", { flash: null });
        } catch {
            return res.status(500).json({
                success: false,
                mensagem: "Falhou ao carregar o catálogo"
            });
        }
    }
}
