import { Request, Response } from "express";
import path from "path";

export class PageController {
    renderHome(req: Request, res: Response) {
        try {
            return res.sendFile(
                path.join(__dirname, "..", "..", "public", "pages", "index.html")
            );
        } catch {
            return res.status(500).json({
                success: false,
                mensagem: "Falhou ao carregar a página inicial"
            });
        }
    }

    renderCatalogo(req: Request, res: Response) {
        try {
            return res.sendFile(
                path.join(__dirname, "..", "..", "public", "pages", "cardapio.html")
            );
        } catch {
            return res.status(500).json({
                success: false,
                mensagem: "Falhou ao carregar o catálogo"
            });
        }
    }

    renderLogin(req: Request, res: Response) {
        try {
            return res.sendFile(
                path.join(__dirname, "..", "..", "public", "pages", "login.html")
            );
        } catch {
            return res.status(500).json({
                success: false,
                mensagem: "Falhou ao carregar a página de login"
            });
        }
    }

    renderCadastro(req: Request, res: Response) {
        try {
            return res.sendFile(
                path.join(__dirname, "..", "..", "public", "pages", "cadastro.html")
            );
        } catch {
            return res.status(500).json({
                success: false,
                mensagem: "Falhou ao carregar a página de cadastro"
            });
        }
    }

    renderPerfil(req: Request, res: Response) {
        try {
            return res.sendFile(
                path.join(__dirname, "..", "..", "public", "pages", "perfil.html")
            );
        } catch {
            return res.status(500).json({
                success: false,
                mensagem: "Falhou ao carregar a página de perfil"
            });
        }
    }

    renderPedido(req: Request, res: Response) {
        try {
            return res.sendFile(
                path.join(__dirname, "..", "..", "public", "pages", "pedido.html")
            );
        } catch {
            return res.status(500).json({
                success: false,
                mensagem: "Falhou ao carregar a página de pedido"
            });
        }
    }

    renderAdmin(req: Request, res: Response) {
        try {
            return res.sendFile(
                path.join(__dirname, "..", "..", "public", "pages", "admin.html")
            );
        } catch {
            return res.status(500).json({
                success: false,
                mensagem: "Falhou ao carregar a página de admin"
            });
        }
    }
}
