import mongoose from "mongoose";

const EsporteSchema = new mongoose.Schema(
    {
        
        id:{type: String},
        nome:{type: String, required: true },
        Regras:{type: String, required: true}




}
    
);

const esportes = mongoose.model('esportes', EsporteSchema);

export default esportes;