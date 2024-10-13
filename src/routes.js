import { Router } from "express";
import { getUsers, createUsers } from "./controllers/UserController.js";
import { getProduct, createProduct } from "./controllers/ProductController.js";
const routes = Router();

routes.get("/Users", getUsers);
routes.post("/Users", createUsers);
routes.get("/Product", getProduct);
routes.post("/Product", createProduct);
export default routes;
