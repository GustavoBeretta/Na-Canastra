import styles from '../styles/ProductCard.module.css';

export default function ProductCard({imageURL, name, peso, preco}) {
  return (
    <div className={styles.card_produto}>
      <img src={imageURL} className={styles.foto_produto}/>
      <div>
        <h2 className={styles.nome_produto}>{name}</h2>
        <p className={styles.peso}>Peso: {peso}</p>
        <p className={styles.preco}>R${preco}</p>
      </div>
    </div>
  );
}
