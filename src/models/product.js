import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    preco: {
        type: Number,
        required: true,
    },
    peso: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        enum: ['Queijos', 'Búfula', 'Zero Lactose', 'Doces', 'Variedades'],
        required: true,
    },
    imageURL: {
        type: String
    }
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
