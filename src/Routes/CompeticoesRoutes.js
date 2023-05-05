import express from "express";
import competicoesController from "../Controller/competicoesController.js";

const router = express.Router();

router
.get("/Competicoes", competicoesController.ListarCompeticoes)
.get("/Competicoes/:id",competicoesController.ObterCompeticaopeloid)
.post("/Competicoes", competicoesController.CadastrarCompeticoes)
.put("/Competicoes/:id",competicoesController.Atualizarcompeticoes)
.delete("/Competicoes/:id",competicoesController.excluirCompeticao)
export default router; 