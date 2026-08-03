import express from "express";
import { apiRoutes } from "./routes/apiRoutes";
import { pageRoutes } from "./routes/pageRoutes";
import session from "express-session";

const app= express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));

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

app.set("view engine", "ejs");
app.set("views","./src/views");

app.use("/", pageRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
