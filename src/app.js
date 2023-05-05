import express from "express";
import db from "./config/dbConnect.js"
import esportes from "./Models/Esporte.js";
import routes from "./Routes/index.js";
const app = express();

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log('conexão com o banco fneita com sucesso')
})

app.use(express.json())

routes(app);

//const esportes =[
   // {id: 1, "nome": "Futebol"},
    //{id: 2, "nome": "Basquete"}

//]


app.get('/esportes', (req, res) => {
    esportes.find().then(esportes => res.status(200).json(esportes))
      .catch(erro => res.status(500).json({ erro: erro.message }));
  });
        
        
    

    



app.get('/esportes/:id', (req,res)=>{
    let index = buscaesporte(req.params.id);
    
    res.json(esportes[index]);

})

app.post('/esportes', (req, res) => {
    esportes.push(req.body);
    res.status(201).send('Esporte cadastrado com sucesso')
})

app.put('/esportes/:id', (req,res)=>{
    let index = buscaesporte(req.params.id);
    esportes[index].nome = req.body.nome;
    res.json(esportes);

})

app.delete('/esportes/:id', (req,res)=>{
    let {id} = req.params;
    let index = buscaesporte(id);
    esportes.splice(index, 1);
    res.send(`Modalidade esportiva ${id} removida com sucesso`);

})

function buscaesporte(id) {
return esportes.findIndex(esporte => esporte.id == id)
}


export default app