import styles from '../styles/ProductCard.module.css';
import { useState, useRef, useEffect } from 'react';

export default function ProductCard({urlImagem, name, peso, preco}) {

  const nameRef = useRef(null);
  const [isOverflowing2Lines, setIsOverflowing2Lines] = useState(false);

  useEffect(() => {
    const element = nameRef.current;
    if (element) {
      // 1) Pegamos o line-height real do elemento
      const lineHeight = parseFloat(
        window.getComputedStyle(element).lineHeight
      );

      // 2) Calculamos quantas linhas o texto está ocupando
      const lines = element.scrollHeight / lineHeight;

      // 3) Se for maior que 2 linhas, habilitamos a rolagem vertical
      setIsOverflowing2Lines(lines > 3);
    }
  }, [name]);

  return (
    <div className={styles.card_produto}>
      <img src={urlImagem} className={styles.foto_produto}/>
      <div>
      <h2
          ref={nameRef}
          className={
            isOverflowing2Lines
              ? styles.nome_produto_marquee
              : styles.nome_produto_normal
          }
        >
          {isOverflowing2Lines ? <span>{name}</span> : name}
        </h2>
        <p className={styles.peso}>{peso}</p>
        <p className={styles.preco}>
          R${(preco/100).toFixed(2).replace(/\./g, ',')}
        </p>
      </div>
    </div>
  );
}
