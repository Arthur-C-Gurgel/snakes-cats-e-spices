

const botaoHero = document.querySelector(".hero button");

botaoHero.addEventListener("click", () => {
    alert("Bem-vindo ao Wrighters Fate!");
});

// Botão cardápio
const botaoCardapio = document.querySelector(".btn-cardapio");

botaoCardapio.addEventListener("click", () => {
    alert("Abrindo o cardápio completo...");
});

// Efeito nos cards
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.05)";
        card.style.transition = "0.3s";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
    });
});