import { Router } from "express";
import { getUsers, createUsers } from "./controllers/UserController.js";
import { createProduct, getProducts } from "./controllers/ProductController.js";
const routes = Router();

routes.get("/Users", getUsers);
routes.post("/Users", createUsers);
routes.get("/Product", getProducts);
routes.post("/Product", createProduct);
router.put('/products/:id', updateProduct); // Rota para atualizar o produto
router.delete('/products/:id', deleteProduct);

export default routes;
