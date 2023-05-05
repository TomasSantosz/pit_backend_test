import atleta from "../Models/Atleta.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class authController{
    

    static generateToken(params = {}){
        const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

        const config = loadJSON('../config/auth.json');
        return jwt.sign(params,config.secret, {
            expiresIn: 86400,
        } )

    }
    static CadastroLogin = async (req, res) => {
        const {email} = req.body;
        try{
            
            if(await atleta.findOne({email}))
            return res.status(400).send({error: 'E-mail já existente'})

            const Atleta = await atleta.create(req.body);

            Atleta.password = undefined;

            return res.send({Atleta,
                token : this.generateToken({id: Atleta.id}),
            });
            
        }catch(err){
            return res.status(400).send({error: 'Falha no registro'})
        }
    }

    static Autentificacao = async (req, res) => {
        const { email, password } = req.body;

        const Atleta = await atleta.findOne({email}).select('+password');

        if(!Atleta)
        return res.status(400).send({error: 'Usuario nao encontrado'});


        if(!await bcrypt.compare(password, Atleta.password))
        return res.status(400).send({error: 'senha inválida'})

        Atleta.password = undefined;

       

        res.send({Atleta, 
            token : this.generateToken({id: Atleta.id})});



    }





}

export default authController

