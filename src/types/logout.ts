import { Request, Response } from "express";

export function logout(req: Request, res: Response) {
    req.session.destroy(() => {
        res.json({
            success: true,
            message: "Logout realizado com sucesso."
        });
    });
}