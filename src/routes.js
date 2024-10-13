import { Router } from "express";
import { getUsers, createUsers } from "./controllers/UserController.js";
import { createProduct, getProducts } from "./controllers/ProductController.js";
const routes = Router();

routes.get("/Users", getUsers);
routes.post("/Users", createUsers);
routes.get("/Product", getProducts);
routes.post("/Product", createProduct);
export default routes;
