import styles from '../styles/ProductCard.module.css';
import Link from 'next/link';

export default function ProductCardAdmin({ id, imagem, name, peso, tipo, preco}) {
  return (
    <Link href={`/editar-produto/${id}`} passHref>
        <div className={styles.card_produto}>
        <img src={imagem} className={styles.foto_produto}/>
        <div>
            <h2 className={styles.nome_produto}>{name}</h2>
            <p className={styles.tipo}>Tipo: {tipo}</p>
            <p className={styles.peso}>Peso: {peso}</p> 
            <p className={styles.preco}>R${preco}</p>
        </div>
        </div>
    </Link>
  );
}
