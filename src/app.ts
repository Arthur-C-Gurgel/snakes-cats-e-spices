import express from "express";
import session from "express-session";
import path from "path";
import { apiRoutes } from "./routes/apiRoutes";
import { pageRoutes } from "./routes/pageRoutes";
import { authRoutes } from "./routes/authRoutes";

const app = express();

// Configurações básicas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

// Configuração da Sessão
app.use(session({
    secret: "blog-secreto-senac-2026",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hora
        httpOnly: true,
        secure: false,
    }
}));

// Configuração do View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rotas
app.use("/", pageRoutes);
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

export default app;
