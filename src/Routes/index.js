import express from "express";
import esportes from "./EsportesRoutes.js";
import competicoes from "./CompeticoesRoutes.js";
import atleta from "./AuthRoutes.js";
import project from "./ProjectRoute.js";
import CompeticaoAtleta from "./CompeticaoAtletaRoutes.js";
const routes = (app) => {
    app.route('/').get((req,res)=>{
        res.status(200).send({titulo: "Trabalho Final"})
    })

    app.use(
        express.json(),
        esportes,
        competicoes,
        atleta,
        project,
        CompeticaoAtleta
    
    )

    
}

export default routes;