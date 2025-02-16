import mongoose from "mongoose";

var Currency = mongoose.Types.Currency

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    preco: {
        type: Currency,
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
    imagem: {
        type: String,
        required: true
    }
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
