/* =========================================
   ADMIN.JS — Lógica do painel administrativo
   ========================================= */

document.addEventListener("DOMContentLoaded", async () => {
    // Verificar se o usuário é admin
    const usuario = await verificarSessao();
    if (!usuario) {
        window.location.href = "/login";
        return;
    }

    // Carregar dados iniciais
    await carregarResumo();
    await carregarPratos();
    await carregarPedidos();

    // Sidebar — navegação
    const sidebarLinks = document.querySelectorAll(".admin-sidebar nav a");
    const sections = document.querySelectorAll(".admin-section");

    sidebarLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.dataset.section;

            sidebarLinks.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");

            sections.forEach((s) => {
                s.style.display = s.dataset.section === target ? "block" : "none";
            });
        });
    });

    // Formulário de cadastro de prato
    const formPrato = document.querySelector("#form-prato-admin");
    if (formPrato) {
        formPrato.addEventListener("submit", async (e) => {
            e.preventDefault();
            const nome = formPrato.querySelector('[name="nome"]')?.value;
            const descricao = formPrato.querySelector('[name="descricao"]')?.value;
            const preco = formPrato.querySelector('[name="preco"]')?.value;

            if (nome && descricao && preco) {
                await api.cadastrarPrato(nome, descricao, preco);
                formPrato.reset();
                carregarPratos();
            }
        });
    }

    // Funções auxiliares
    async function verificarSessao() {
        try {
            const res = await fetch("/auth/perfil");
            if (res.ok) {
                const data = await res.json();
                return data.usuario;
            }
        } catch (err) {
            console.error("Erro ao verificar sessão:", err);
        }
        return null;
    }

    async function carregarResumo() {
        const contadorPratos = document.querySelector("#contador-pratos");
        const contadorPedidos = document.querySelector("#contador-pedidos");

        if (contadorPratos) {
            const pratos = await api.listarPratos();
            contadorPratos.textContent = pratos.length || 0;
        }

        if (contadorPedidos) {
            try {
                const pedidos = await api.listarPedidos();
                contadorPedidos.textContent = pedidos.length || 0;
            } catch {
                contadorPedidos.textContent = "0";
            }
        }
    }

    async function carregarPratos() {
        const tbody = document.querySelector("#tabela-pratos-admin tbody");
        if (!tbody) return;

        tbody.innerHTML = "";
        try {
            const pratos = await api.listarPratos();
            pratos.forEach((prato) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${prato.id || "-"}</td>
                    <td>${prato.nome || prato.name}</td>
                    <td>R$ ${parseFloat(prato.preco).toFixed(2)}</td>
                    <td>${prato.descricao || ""}</td>
                    <td>
                        <button class="btn-delete" data-id="${prato.id}">Remover</button>
                    </td>`;
                tbody.appendChild(tr);
            });

            tbody.querySelectorAll(".btn-delete").forEach((btn) => {
                btn.addEventListener("click", async () => {
                    const id = btn.dataset.id;
                    if (confirm("Remover este prato?")) {
                        await api.removerPrato(id);
                        carregarPratos();
                        carregarResumo();
                    }
                });
            });
        } catch (err) {
            console.error("Erro ao carregar pratos:", err);
        }
    }

    async function carregarPedidos() {
        const tbody = document.querySelector("#tabela-pedidos-admin tbody");
        if (!tbody) return;

        tbody.innerHTML = "";
        try {
            const pedidos = await api.listarPedidos();
            pedidos.forEach((pedido) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${pedido.id || "-"}</td>
                    <td>${pedido.cliente || "-"}</td>
                    <td>${pedido.status || "Pendente"}</td>
                    <td>R$ ${parseFloat(pedido.total || 0).toFixed(2)}</td>`;
                tbody.appendChild(tr);
            });
        } catch (err) {
            console.error("Erro ao carregar pedidos:", err);
        }
    }
});
