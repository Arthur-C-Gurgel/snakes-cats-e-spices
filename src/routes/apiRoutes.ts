import { Router } from "express";
import { readFileSync, writeFileSync } from "fs";

export const apiRoutes = Router();

interface Prato {
    id: number;
    nome: string;
    cozinheiro: string;
    genero: string;
    nota: number;
}

function carregar(): Prato[] {
    return JSON.parse(readFileSync("dados/pratos.json", "utf-8"));
}

function salvar(pratos: Prato[]) {
    writeFileSync("dados/pratos.json", JSON.stringify(pratos, null, 2));
}

// GET /api/pratos
apiRoutes.get("/pratos", (req, res) => {
    let pratos = carregar();

    const { genero } = req.query;

    if (genero) {
        pratos = pratos.filter(
            (p) => p.genero.toLowerCase() === String(genero).toLowerCase()
        );
    }

    res.json({
        sucesso: true,
        dados: pratos,
        total: pratos.length,
    });
});

// POST /api/pratos
apiRoutes.post("/pratos", (req, res) => {
    const pratos = carregar();
    const { nome, cozinheiro, genero, nota } = req.body;

    // Validação
    if (!nome) {
        return res.status(400).json({
            sucesso: false,
            erro: "Nome do prato é obrigatório.",
        });
    }

    if (typeof nota !== "number" || nota < 0 || nota > 10) {
        return res.status(400).json({
            sucesso: false,
            erro: "A nota deve estar entre 0 e 10.",
        });
    }

    const novo: Prato = {
        id: pratos.length ? Math.max(...pratos.map((p) => p.id)) + 1 : 1,
        nome,
        cozinheiro,
        genero,
        nota,
    };

    pratos.push(novo);
    salvar(pratos);

    res.status(201).json({
        sucesso: true,
        dados: novo,
    });
});