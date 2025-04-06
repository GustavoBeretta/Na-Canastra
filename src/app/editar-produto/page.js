'use client';

import ProductCardAdmin from '@/components/ProductCardAdmin';
import { useState, useEffect } from 'react';
import styles from '../../styles/CRUDProduto.module.css';
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import fetchProducts from '@/utils/fetchProducts';

export default function EditarProdutos() {

  const router = useRouter();

  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProdutos = async () => {
      setProdutos(await fetchProducts())
      setIsLoading(false)
    };
    
    loadProdutos()
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <main>
      <div style={styles_local.div_container}>
        <button className={styles.button} onClick={() => signOut()}>Encerrar sessão</button>
        <h1 className='tipo_cardapio'>Editar produtos</h1>
        <button className={styles.button} onClick={() => router.push('/criar-produto')}>Criar produto</button>
      </div>
      <div className='produtos'>
        {produtos.length > 0 ? (
          produtos.map(q => (
            <ProductCardAdmin
              key={q._id}
              id={q._id}
              urlImagem={q.urlImagem ? q.urlImagem : 'https://via.placeholder.com/150'}
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