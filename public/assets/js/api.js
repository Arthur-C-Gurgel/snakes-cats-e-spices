/* =========================================
   API.JS — Comunicação com o backend
   ========================================= */

const API_BASE = "/api";

const api = {
    // Autenticação
    async login(email, senha) {
        const res = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
        });
        return res.json();
    },

    async cadastrar(nome, email, senha) {
        const res = await fetch("/auth/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha }),
        });
        return res.json();
    },

    async logout() {
        const res = await fetch("/auth/logout", { method: "POST" });
        return res.json();
    },

    // Pratos (Cardápio)
    async listarPratos() {
        const res = await fetch(`${API_BASE}/pratos`);
        return res.json();
    },

    async cadastrarPrato(nome, descricao, preco) {
        const res = await fetch(`${API_BASE}/pratos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, descricao, preco }),
        });
        return res.json();
    },

    async removerPrato(id) {
        const res = await fetch(`${API_BASE}/pratos/${id}`, {
            method: "DELETE",
        });
        return res.json();
    },

    // Perfil do usuário
    async getPerfil() {
        const res = await fetch("/auth/perfil");
        return res.json();
    },

    async atualizarPerfil(dados) {
        const res = await fetch("/auth/perfil", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
        return res.json();
    },

    // Pedidos
    async listarPedidos() {
        const res = await fetch(`${API_BASE}/pedidos`);
        return res.json();
    },

    async criarPedido(pedido) {
        const res = await fetch(`${API_BASE}/pedidos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido),
        });
        return res.json();
    },
};
