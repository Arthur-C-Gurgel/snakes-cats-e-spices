import { Request, Response, NextFunction } from "express";

export function validarId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "ID inválido."
        });
    }

    next();
}