import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../entities/clienteEntity";
import { UserRepository } from "../models/userRepository";

const repo = new UserRepository();

export class AuthController {
    async login(req: Request, res: Response) {
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

    logout(req: Request, res: Response) {
        req.session.destroy(() => {
            res.json({
                success: true,
                message: "Logout realizado com sucesso."
            });
        });
    }

    async cadastrar(req: Request, res: Response) {
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
}
