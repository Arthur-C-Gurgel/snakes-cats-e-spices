import { apiRoutes } from "./apiRoutes";


const botaoCardapio = document.querySelector(".btn-cardapio") as HTMLButtonElement;


botaoCardapio.addEventListener("click", () => {
    window.location.href = "cardapio.html";
});
apiRoutes.get("/cardapio", (req, res)=>{
    res.sendFile("cardapio.html");
});

