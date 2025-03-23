'use client';

import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';
import getProdutos from '@/utils/getProdutos';

export default function Doces() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProdutos();
      const produtos = data.filter(product => product.tipo === 'Doces');
      const produtosOrdenados = produtos.sort((a, b) => a.name.localeCompare(b.name));
      setProdutos(produtosOrdenados);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <main>
      <h1 className='tipo_cardapio'>Doces</h1>
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
