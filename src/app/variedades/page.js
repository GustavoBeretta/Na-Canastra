'use client';

import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';
import fetchProducts from '@/utils/fetchProducts';

export default function Variedades() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProdutos = async () => {
      setProdutos(await fetchProducts("Variedades"))
      setIsLoading(false)
    };
    
    loadProdutos()
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <main>
      <h1 className='tipo_cardapio'>Variedades</h1>
      <div className='produtos'>
        {produtos.length > 0 ? (
          produtos.map(q => (
            <ProductCard
              key={q._id}
              urlImagem={q.urlImagem ? q.urlImagem : 'https://via.placeholder.com/150'}
              name={q.name}
              peso={q.peso}
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
