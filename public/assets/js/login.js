/* =========================================
   LOGIN.JS — Lógica da página de login
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.querySelector("#form-login");
    const mensagem = document.querySelector(".auth-message");

    if (formLogin) {
        formLogin.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = formLogin.querySelector('[name="email"]')?.value;
            const senha = formLogin.querySelector('[name="senha"]')?.value;

            if (!email || !senha) {
                mostrarMensagem("Preencha todos os campos.", "error");
                return;
            }

            try {
                const resultado = await api.login(email, senha);
                if (resultado.success) {
                    mostrarMensagem("Login realizado com sucesso!", "success");
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1000);
                } else {
                    mostrarMensagem(resultado.message || "E-mail ou senha inválidos.", "error");
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
