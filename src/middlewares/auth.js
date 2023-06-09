import jwt from "jsonwebtoken";
//import config from "../config/auth.json" assert { type: "json" };
import fs from "fs";
const authMiddleware = (req, res, next) => {
  const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

  const config = loadJSON('../config/auth.json');
    const authHeader = req.headers.authorization;
  
    if (!authHeader)
      return res.status(401).send({error: 'Sem token valido'});
  
    const parts = authHeader.split(' ');
  
    if (!parts.length === 2)
      return res.status(401).send({error: 'erro de token'});
  
    const [scheme, token] = parts;
  
    if (!/^Bearer$/i.test(scheme))
      return res.status(401).send({error: ' token mal formatado'});
  
    jwt.verify(token, config.secret, (err, decoded) => { 
      if (err) return res.status(401).send({error: ' token inválido'});
  
      req.atletaId = decoded.id;
      return next();
    });
  };
  
  export default authMiddleware;
  
