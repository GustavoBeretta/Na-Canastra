export default function ProductCard(product) {
  return (
    <div>
      <img src={product.imageURL}/>
      <div>
        <h2>{product.name}</h2>
        <p>Peso: {product.peso}</p>
        <p>R${product.preco}</p>
      </div>
    </div>
  );
}
