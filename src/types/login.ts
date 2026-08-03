import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserRepository } from "../models/userRepository";

const repo = new UserRepository();

export async function login(req: Request, res: Response) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                success: false,
                message: "Informe o e-mail e a senha."
            });
        }

        const usuario = await repo.buscarEmail(email);

        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: "E-mail ou senha inválidos."
            });
        }

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senhaHash
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                success: false,
                message: "E-mail ou senha inválidos."
            });
        }

        // Salva o usuário na sessão
        req.session.usuario = {
            id: usuario.id!,
            nome: usuario.nome,
            email: usuario.email
        };

        return res.status(200).json({
            success: true,
            message: "Login realizado com sucesso."
        });

    } catch {
        return res.status(500).json({
            success: false,
            message: "Erro ao realizar login."
        });
    }
}