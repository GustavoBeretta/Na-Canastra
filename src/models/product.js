import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    preco: {
        type: String,
        required: true,
    },
    peso: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        enum: ['Queijos', 'Búfala', 'Zero Lactose', 'Doces', 'Variedades'],
        required: true,
    },
    urlImagem: {
        type: String,
        required: true
    },
    caminhoImagem: {
        type: String,
        required: true
    }
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
