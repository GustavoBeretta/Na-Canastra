import express from "express";
import mongoose, { Mongoose } from "mongoose";
import User from "./models/user.js";

const app = express();

app.use(express, json());

const users = [];
mongoose
  .connect(
    "mongodb+srv://softwarenacanastra:RZngX6LS6mXjKuGJ@canastradb.u6e6o.mongodb.net/?retryWrites=true&w=majority&appName=CanastraDB"
  )
  .then(() => console.log("Conectado ao Banco de Dados"))
  .catch(() => console.log("Deu ruim"));
