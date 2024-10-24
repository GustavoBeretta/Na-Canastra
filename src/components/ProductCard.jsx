import styles from '../styles/ProductCard.module.css';

export default function ProductCard({imagem, name, peso, preco}) {
  return (
    <div className={styles.card_produto}>
      <img src={imagem} className={styles.foto_produto}/>
      <div>
        <h2 className={styles.nome_produto}>{name}</h2>
        <p className={styles.peso}>Peso: {peso}</p>
        <p className={styles.preco}>R${preco}</p>
      </div>
    </div>
  );
}
