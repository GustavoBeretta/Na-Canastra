'use client';

import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';
import getProdutos from '@/utils/getProdutos';

export default function Queijos() {
  const [queijos, setQueijos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProdutos();
      const queijos = data.filter(product => product.tipo === 'Queijos');
      const produtosOrdenados = queijos.sort((a, b) => a.name.localeCompare(b.name));
      setQueijos(produtosOrdenados);
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
