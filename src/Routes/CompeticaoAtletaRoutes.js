import express from "express";
import compatleta from "../Controller/CompeticaoAtleta.js";

const router = express.Router();

router
.post('/competicoes/atleta', compatleta.adicionarAtletaCompeticao)
.get('/competicoes/:competicaoId/atletas', compatleta.listarAtletasDaCompeticao)
.put('/competicoes/:competicaoId/atletas/:atletaId', compatleta.aprovarAtletaDaCompeticao)

export default router;