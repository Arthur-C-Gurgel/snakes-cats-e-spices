import express, { Router } from "express";
import { apiRoutes } from "./apiRoutes"; 
export const pageRoutes  = Router();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", pageRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
  