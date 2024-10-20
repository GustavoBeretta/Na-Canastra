import express from "express";
import connectDatabase from "./database/db.js";
import routes from "./routes.js";
import { initializeApp } from "firebase/app";

const app = express();

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB5xHxX2lOfexhgouSNNK2jihDAvEHUUtI",
    authDomain: "nacanastra-10dc3.firebaseapp.com",
    projectId: "nacanastra-10dc3",
    storageBucket: "nacanastra-10dc3.appspot.com",
    messagingSenderId: "107671828494",
    appId: "1:107671828494:web:836f59ffad206e263ee45f",
    measurementId: "G-3WLT7EFKCG"
};

// Inicializar Firebase
initializeApp(firebaseConfig);

app.use(express.json());
app.use(routes);

// Conectar ao banco de dados MongoDB
connectDatabase()
    .then(() => {
        app.listen(3000, () => {
            console.log("Servidor rodando e banco de dados conectado");
        });
    })
    .catch(() => console.log("Deu ruim"));
