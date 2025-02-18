'use client';

import ProductCardAdmin from '@/components/ProductCardAdmin';
import { useState, useEffect } from 'react';
import styles from '../../styles/CRUDProduto.module.css';
import { signOut } from "next-auth/react"

const getProdutos = async () => {
  try {
    const res = await fetch('/api/products', {cache: "no-store"});
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return Array.isArray(data.products) ? data.products : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function EditarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const produtos = await getProdutos();
      setProdutos(produtos);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <main>
      <div style={styles_local.div_container}>
        <button className={styles.button} onClick={() => signOut()}>Encerrar sessão</button>
        <h1 className='tipo_cardapio'>Editar produtos</h1>
        <button className={styles.button}>Criar produto</button>
      </div>
      <div className='produtos'>
        {produtos.length > 0 ? (
          produtos.map(q => (
            <ProductCardAdmin
              key={q._id}
              id={q._id}
              imagem={q.imagem ? q.imagem : 'https://via.placeholder.com/150'}
              name={q.name}
              peso={q.peso}
              tipo={q.tipo}
              preco={q.preco}
            />
          ))
        ) : (
          <p>Nenhum produto encontrado</p>
        )}
      </div>
    </main>
  );
}

const styles_local = {
  div_container: {
    display: 'flex',
  }
}