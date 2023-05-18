import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AtletaUsuarioSchema = new mongoose.Schema({
    id: {type : String},
    nome: {type : String, required: true},
    email: {type : String,unique : true, lowercase: true, require: true},
    competicoes: {type: mongoose.Schema.Types.ObjectId, ref: 'competicoes', required: true},
    idade : {type : Number, require: true},
    altura: {type : Number, require: true},
    genero: {type: String, require: true},
    password: {type: String, require: true, select: false},
    criadoquando: {type: Date, default: Date.now}
    
})

AtletaUsuarioSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});


const atleta = mongoose.model('atletas', AtletaUsuarioSchema);
export default atleta;


