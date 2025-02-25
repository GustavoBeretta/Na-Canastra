"use client";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter(); 
    const { data: session, status } = useSession();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    
    useEffect(() => {
      if (status === "loading") return;
      if (session) {
        router.push("/editar-produto");
      }
    }, [session, status, router]);

    const handleSubmit =  async(event) => {
        event.preventDefault();

        try {
          const res = await signIn("credentials", {
            email, password, redirect: false,
          });

          if (res.error){
              alert("E-mail ou senha incorretos");
              return;
          }

          router.push("/editar-produto");
        
        } catch (error) {
            console.log(error)
        }

    }

    return (
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.title}>FAÇA SEU LOGIN</h1>
  
          <label style={styles.label}>
            E-mail
            <input
              type="text"
              maxLength={20}
              style={styles.input}
              onChange={(event) => setEmail(event?.target.value)}
            />
          </label>
  
          <label style={styles.label}>
            Senha
            <input
              type="password"
              maxLength={20}
              style={styles.input}
              onChange={(event) => setPassword(event?.target.value)}
            />
          </label>
  
          <button
            type="submit"
            style={styles.button}
          >
            FAZER LOGIN
          </button>
        </form>
      </div>
    );
  }
  
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f6f6f6',
    },
    form: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '16px',
      textAlign: 'center',
      color: '#5e2129', // Cor primária
    },
    label: {
      display: 'block',
      color: '#333',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginTop: '4px',
      marginBottom: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#5e2129', // Cor primária
      color: '#fff',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
  };
  
  // Adicione um efeito de hover ao botão
  styles.button[':hover'] = {
    backgroundColor: '#4d1a20', // Cor primária escura para hover
  };
  