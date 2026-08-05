/* =========================================
   CADASTRO.JS — Lógica da página de cadastro
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const formCadastro = document.querySelector("#form-cadastro");
    const mensagem = document.querySelector(".auth-message");

    if (formCadastro) {
        formCadastro.addEventListener("submit", async (e) => {
            e.preventDefault();
            const nome = formCadastro.querySelector('[name="nome"]')?.value;
            const email = formCadastro.querySelector('[name="email"]')?.value;
            const senha = formCadastro.querySelector('[name="senha"]')?.value;

            if (!nome || !email || !senha) {
                mostrarMensagem("Preencha todos os campos.", "error");
                return;
            }

            if (senha.length < 6) {
                mostrarMensagem("A senha deve ter pelo menos 6 caracteres.", "error");
                return;
            }

            try {
                const resultado = await api.cadastrar(nome, email, senha);
                if (resultado.success) {
                    mostrarMensagem("Cadastro realizado com sucesso! Redirecionando...", "success");
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 1500);
                } else {
                    mostrarMensagem(resultado.message || "Erro ao cadastrar.", "error");
                }
            } catch (err) {
                mostrarMensagem("Erro ao conectar ao servidor.", "error");
            }
        });
    }

    function mostrarMensagem(texto, tipo) {
        if (mensagem) {
            mensagem.textContent = texto;
            mensagem.className = `auth-message ${tipo}`;
            mensagem.style.display = "block";
            setTimeout(() => {
                mensagem.style.display = "none";
            }, 4000);
        }
    }
});
