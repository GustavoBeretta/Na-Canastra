'use client';

import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';

const getQueijos = async () => {
  try {
    const res = await fetch('/api/products');
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

export default function Home() {
  const [queijos, setQueijos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getQueijos();
      const queijos = data.filter(product => product.tipo === 'Queijos');
      setQueijos(queijos);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <main>
      <h1 className='tipo_cardapio'>Queijos</h1>
      <div className='produtos'>
        {queijos.length > 0 ? (
          queijos.map(q => (
            <ProductCard
              key={q._id}
              imageURL={q.imageURL ? q.imageURL : 'https://via.placeholder.com/150'}
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
