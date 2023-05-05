import  express  from "express";
import authController from "../Controller/authController.js";




const router = express.Router();

router
.post("/auth/registro", authController.CadastroLogin)
.post("/auth/autentica", authController.Autentificacao)



export default router
