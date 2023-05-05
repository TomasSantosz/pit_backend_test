import mongoose from "mongoose";

const competicaoSchema = new mongoose.Schema(
    {
        id: {type : String},
        nome: {type : String, required: true},
        esporte : {type: mongoose.Schema.Types.ObjectId, ref: 'esportes', required: true},
        descricao : {type : String, required: true},
        NumPart :{type: Number, required: true},
        Local :  {type : String, required: true},
        DataInicio : {type: Date, min: Date.now, required: true},
        Datatermino : {type: Date, required: true}
}
)

const competicoes = mongoose.model("competicoes", competicaoSchema)

export default competicoes;
