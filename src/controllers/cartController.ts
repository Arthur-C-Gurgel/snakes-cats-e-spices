import { Request, Response } from "express";

export const listarPratos = (req: Request, res: Response): void => {
    res.status(200).json({
        mensagem: "Listando os pratos do restaurante"
    });
};

export const cadastrarPrato = (req: Request, res: Response): void => {
    const prato = req.body;

    res.status(201).json({
        mensagem: "Prato cadastrado meu rei",
        prato
    });
};

export const buscarPrato = (req: Request, res: Response): void => {
    const { id } = req.params;

    res.status(200).json({
        mensagem: `Exibindo o prato de ID ${id}`
    });
};

export const excluirPrato = (req: Request, res: Response): void => {
    const { id } = req.params;

    res.status(200).json({
        mensagem: `Prato ${id} removido do cardápio`
    });
};