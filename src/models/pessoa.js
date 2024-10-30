import mongoose from "mongoose";

const pessoaSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Pessoa", pessoaSchema);
