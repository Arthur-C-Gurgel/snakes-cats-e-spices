/* =========================================
   CARDÁPIO.JS — Lógica da página de cardápio
   ========================================= */

document.addEventListener("DOMContentLoaded", async () => {
    const formPrato = document.querySelector(".form-prato");
    const tabelaPratos = document.querySelector("#tabela-pratos tbody");
    const gridPratos = document.querySelector("#grid-pratos");

    // Carregar pratos ao abrir a página
    async function carregarPratos() {
        try {
            const pratos = await api.listarPratos();
            renderizarPratos(pratos);
        } catch (err) {
            console.error("Erro ao carregar pratos:", err);
        }
    }

    // Renderizar pratos na tabela
    function renderizarPratos(pratos) {
        if (tabelaPratos) {
            tabelaPratos.innerHTML = "";
            if (pratos.length === 0) {
                tabelaPratos.innerHTML = `
                    <tr>
                        <td colspan="4" style="text-align:center; color:#888;">
                            Nenhum prato cadastrado.
                        </td>
                    </tr>`;
            } else {
                pratos.forEach((prato) => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${prato.nome || prato.name}</td>
                        <td>R$ ${parseFloat(prato.preco).toFixed(2)}</td>
                        <td>${prato.descricao || ""}</td>
                        <td>
                            <button class="btn-delete" data-id="${prato.id}">Remover</button>
                        </td>`;
                    tabelaPratos.appendChild(tr);
                });

                // Listener para botões de remover
                tabelaPratos.querySelectorAll(".btn-delete").forEach((btn) => {
                    btn.addEventListener("click", async () => {
                        const id = btn.dataset.id;
                        if (confirm("Deseja realmente remover este prato?")) {
                            await api.removerPrato(id);
                            carregarPratos();
                        }
                    });
                });
            }
        }

        // Renderizar em grid (cards visuais)
        if (gridPratos) {
            gridPratos.innerHTML = "";
            pratos.forEach((prato) => {
                const card = document.createElement("div");
                card.className = "prato-card";
                card.innerHTML = `
                    <div class="info">
                        <h3>${prato.nome || prato.name}</h3>
                        <p>${prato.descricao || ""}</p>
                        <span class="preco">R$ ${parseFloat(prato.preco).toFixed(2)}</span>
                    </div>`;
                gridPratos.appendChild(card);
            });
        }
    }

    // Formulário de cadastro
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

    // Inicializar
    await carregarPratos();
});
