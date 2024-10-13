import { Router } from "express";
import { getUsers, createUsers } from "./controllers/UserController.js";
import { createProduct, getProducts, updateProduct, deleteProduct } from "./controllers/ProductController.js";
const routes = Router();

routes.get("/Users", getUsers);
routes.post("/Users", createUsers);
routes.get("/Product", getProducts);
routes.post("/Product", createProduct);
routes.put('/products/:id', updateProduct); // Rota para atualizar o produto
routes.delete('/products/:id', deleteProduct);

export default routes;
