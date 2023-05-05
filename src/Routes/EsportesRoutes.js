import express from "express";
import EsportesController from "../Controller/esportesController.js";

const router = express.Router();

router
.get("/Esportes", EsportesController.ListarEsportes)
.get("/Esportes/:id",EsportesController.ObterEsportepeloid)
.post("/Esportes", EsportesController.CadastrarEsportes)
.put("/Esportes/:id",EsportesController.AtualizarEsportes)
.delete("/Esportes/:id",EsportesController.excluiresporte)
export default router; 