import mongoose from mongoose;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    preco: {
        type: Number,
        required: true,
    },
    peso:{
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

export default mongoose.model('Product', productSchema)