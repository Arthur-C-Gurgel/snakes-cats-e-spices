import { Request, Response } from "express";
import { pratoRepository } from "../models/pratoRepository";
import Prato from "../entities/pratoEntity";

const repo = new pratoRepository();

export async function StarPage(req: Request, res: Response) {
    try {
        return res.render("index", { flash: null });
    } catch {
        return res.status(500).json({
            sucess: false,
            mensagem: "Falhou ao carregar a página inicial"
        });  
      }
}

export async function listarPratos(req: Request, res: Response) {
    try {
        const pratos = await repo.listar();

        return res.render("pratos", {
            pratos,
            flash: null
        });
    } catch {
        return res.status(500).json({
            sucess: false,
            mensagem: "Falha ao listar os pratos."
        });
    }
}

export async function cadastrarPrato(req: Request, res: Response) {
try {
    const { nome, preco, descricao } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({
            sucess:false,
            mensagem:"Por favor, informe a descrição do prato."
        });
    }

    const prato = new Prato(nome, Number(preco), descricao);

    await repo.cadastrar(prato);

    return res.status(201).json({
        success: true,
        message: "Prato cadastrado com sucesso.",
        prato
    });

} catch {
    return res.status(500).json({
        success: false,
        message: "Falha ao cadastrar o prato."
    });
}
}

export async function RemoverPrato(req: Request, res: Response) {
try {
    const { id } = req.params;

    await repo.remover(Number(id));

    return res.status(200).json({
        success: true,
        message: "Prato removido com sucesso."
    });

} catch {
    return res.status(500).json({
        success: false,
        message: "Falha ao remover o prato."
    });
}
}
