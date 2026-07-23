import express from "express";
import { apiRoutes } from "./routes/apiRoutes";
import { pageRoutes } from "./routes/pageRoutes";

const app= express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views","./src/views");

app.use("/", pageRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});