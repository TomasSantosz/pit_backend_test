import express from "express";
import competicoesController from "../Controller/competicoesController.js";

const router = express.Router();

router
.delete('/competicoes/:competicaoId/atletas/:atletaId', competicoesController.removerAtletaDaCompeticao)
.get('/atletas/:atletaId/competicoes', competicoesController.listarCompeticoesDoAtleta)
.get("/Competicoes", competicoesController.ListarCompeticoes)
.get("/Competicoes/:id",competicoesController.ObterCompeticaopeloid)
.post("/Competicoes", competicoesController.CadastrarCompeticoes)
.put("/Competicoes/:id",competicoesController.Atualizarcompeticoes)
.delete('/competicoes/:competicaoId/atletas/:atletaId', competicoesController.removerAtletaDaCompeticao)
.delete("/Competicoes/:id",competicoesController.excluirCompeticao)
//.get('/atletas/:atletaId/competicoes', competicoesController.ListarCompeticoesDoAtleta)
export default router; 