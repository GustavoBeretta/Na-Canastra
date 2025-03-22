'use client';

import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';

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

export default function Variedades() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProdutos();
      const produtos = data.filter(product => product.tipo === 'Variedades');
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
