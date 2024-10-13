import Product from "../models/product.js";

async function getProducts(request, response) {
    const product = await Product.find();
    return response.status(200).json(product);
}

async function createProduct(request, response) {
    const product = request.body;
    const newProduct = await Product.create(product);
    return response.json(newProduct);
}

export { createProduct, getProducts };
