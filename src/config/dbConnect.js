import mongoose from "mongoose"

mongoose.connect("mongodb+srv://Kung:123@cluster0.seue48x.mongodb.net/ProjetoPIT")

let db = mongoose.connection;

export default db;