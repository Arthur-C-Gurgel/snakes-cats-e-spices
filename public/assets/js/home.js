/* =========================================
   HOME.JS — Lógica da página inicial
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    // Botão "Visite nosso restaurante"
    const btnVisite = document.querySelector(".btn-hero");
    btnVisite?.addEventListener("click", () => {
        window.location.href = "/cardapio";
    });

    // Botão "Ver Cardápio Completo"
    const btnCardapio = document.querySelector(".btn-cardapio");
    btnCardapio?.addEventListener("click", () => {
        window.location.href = "/cardapio";
    });

    // Scroll suave na navbar
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.style.background = "rgba(0,0,0,0.95)";
            } else {
                navbar.style.background = "rgba(0,0,0,0.85)";
            }
        });
    }
});
