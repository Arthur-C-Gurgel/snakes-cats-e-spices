import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../entities/clienteEntity";
import { UserRepository } from "../models/userRepository";

const repo = new UserRepository();

export async function cadastrar(req: Request, res: Response) {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                success: false,
                message: "Preencha todos os campos."
            });
        }

        const usuarioExistente = await repo.buscarEmail(email);

        if (usuarioExistente) {
            return res.status(400).json({
                success: false,
                message: "Este e-mail já está cadastrado."
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = new User(
            0,
            nome,
            email,
            senhaHash,
        );

        await repo.cadastrar(usuario);

        return res.status(201).json({
            success: true,
            message: "Usuário cadastrado com sucesso."
        });

    } catch {
        return res.status(500).json({
            success: false,
            message: "Erro ao cadastrar usuário."
        });
    }
}