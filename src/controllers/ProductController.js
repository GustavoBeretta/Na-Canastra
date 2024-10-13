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

// Função para editar um produto
async function updateProduct(request, response) {
    const { id } = request.params; // Captura o ID do produto da URL
    const updates = request.body; // Captura as atualizações do corpo da requisição

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true }); // Atualiza o produto e retorna o novo documento
        if (!updatedProduct) {
            return response.status(404).json({ message: "Produto não encontrado" });
        }
        return response.status(200).json(updatedProduct); // Retorna o produto atualizado
    } catch (error) {
        return response.status(500).json({ message: "Erro ao atualizar o produto", error });
    }
}

// Função para deletar um produto
async function deleteProduct(request, response) {
    const { id } = request.params; // Captura o ID do produto da URL

    try {
        const deletedProduct = await Product.findByIdAndDelete(id); // Deleta o produto
        if (!deletedProduct) {
            return response.status(404).json({ message: "Produto não encontrado" });
        }
        return response.status(200).json({ message: "Produto deletado com sucesso" }); // Retorna mensagem de sucesso
    } catch (error) {
        return response.status(500).json({ message: "Erro ao deletar o produto", error });
    }
}

export { createProduct, getProducts, updateProduct, deleteProduct };
