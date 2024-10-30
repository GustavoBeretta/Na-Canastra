import { connectToDatabase } from "../../../lib/mongodb"; // ajuste o caminho conforme necessário
import Pessoa from "../../../models/pessoa"; // ajuste o caminho conforme necessário
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await connectToDatabase(); // Certifique-se de conectar ao banco de dados antes de operar

  if (req.method === "POST") {
    const { email, senha } = req.body;

    // Verifica se o usuário já existe
    const existingUser = await Pessoa.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Usuário já existe" });
    }

    // Hash a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria um novo usuário
    const newUser = new Pessoa({
      email,
      senha: hashedPassword,
    });

    await newUser.save(); // Salva o novo usuário no MongoDB

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
