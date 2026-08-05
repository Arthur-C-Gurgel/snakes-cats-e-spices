import { Request, Response, NextFunction } from "express";

export function auth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.session.usuario) {
        return res.status(401).json({
            success: false,
            message: "Faça login para continuar."
        });
    }

    next();
}