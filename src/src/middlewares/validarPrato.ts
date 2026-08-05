import { Request, Response, NextFunction } from "express";

export function validarPrato(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { nome, preco, descricao } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "O nome do prato é obrigatório."
        });
    }

    if (preco === undefined || isNaN(Number(preco)) || Number(preco) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Informe um preço válido."
        });
    }

    if (!descricao || descricao.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "A descrição é obrigatória."
        });
    }

    next();
}