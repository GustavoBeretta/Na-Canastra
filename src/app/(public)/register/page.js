"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(""); // Reseta o erro antes de cada nova tentativa

    // Envia a requisição de cadastro
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), // Não use password já hasheado aqui
    });

    if (response.ok) {
      router.push("/login");
    } else {
      const data = await response.json();
      setError(data.message || "Falha no cadastro.");
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <h1>Registrar</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
