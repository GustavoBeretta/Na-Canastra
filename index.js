import express, { request, response } from "express";
import User from "./src/models/user.js";
import connectDatabase from "./src/database/db.js";
import product from "./src/models/product.js";
const app = express();

// app.use(express, json());
app.get("./users", async (request, response) => {
  const users = await User.find();
  return response.status(200).json(users);
});

app.post("./users", async (request, response) => {
  const user = request.body;
  const newUser = await User.create(user);
  return response.json(newUser);
});

connectDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor rodando e banco de dados conectados");
    });
  })
  .catch(() => console.log("Deu ruim"));
