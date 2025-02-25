import styles from '../styles/ProductCard.module.css';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function ProductCardAdmin({ id, imagem, name, peso, tipo, preco}) {

  const nameRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = nameRef.current;
    if (element) {
      setIsOverflowing(element.scrollWidth > element.clientWidth);
    }
  }, [name]);

  return (
    <Link href={`/editar-produto/${id}`} passHref>
        <div className={styles.card_produto}>
        <img src={imagem} className={styles.foto_produto}/>
        <div>
            <h2 
              className={styles.nome_produto} 
              title={name} 
              ref={nameRef}
            >
              {isOverflowing ? <span>{name}</span> : name}
            </h2>
            <p className={styles.tipo}>{tipo}</p>
            <p className={styles.peso}>{peso}</p> 
            <p className={styles.preco}>R${(preco/100).toFixed(2).replace(/\./g, ',')}</p>
        </div>
        </div>
    </Link>
  );
}
