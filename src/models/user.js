import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cep: {
        type: String,
        required: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true, // Para garantir que não existam CPFs duplicados
    },
    telefone: {
        type: String,
        required: true,
    }
});

export default mongoose.model("User", userSchema);
