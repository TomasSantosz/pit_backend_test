import  express  from "express";
import authController from "../Controller/authController.js";




const router = express.Router();

router
.post("/auth/registro", authController.CadastroLogin)
.post("/auth/autentica", authController.Autentificacao)
.get("/atleta", authController.ListarAtletas)
.get("/atleta/:id", authController.ListarAtleta)
.put("/atleta/:id", authController.EditarAtleta)



export default router
