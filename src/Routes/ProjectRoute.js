import  express  from "express";
import projectController from "../Controller/projectController.js";
import authMiddleware  from "../middlewares/auth.js ";

const router = express.Router();

//router.use(authMiddleware)

router

.get("/auth/projects", projectController.teste)


export default router;