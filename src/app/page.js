'use client'

import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';

const getQueijos = async () => {
  try {
    const res = await fetch('http://localhost:3001/Product');
    if (!res.ok) {
      throw new Error("Failed to fetch the products");
    }
    const data = await res.json();
    return Array.isArray(data.product) ? data.product : [];
  } catch (error) {
    console.log("Error loading the products: ", error);
    return [];
  }
};

export default function Home() {

  const [queijos, setQueijos] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getQueijos();
      const queijos = data.filter(product => product.tipo === 'Queijos');
      setQueijos(queijos);
    };
  
    fetchProducts();
  }, []);
  

  return (
    <div>
      <h1>Queijos</h1>
      <div>
        {queijos.length > 0 ? (
          queijos.map(q => (
            <ProductCard
              product={q}
            />
          ))
        ) : (
          <p>Nenhum produto encontrado</p>
        )}

      </div>
    </div>
  );
}
