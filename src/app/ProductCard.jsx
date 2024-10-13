export default function ProductCard(product) {
  return (
    <div class="card_produto">
      <img src={product.image_path} class="foto_produto" />
      <div>
        <h2 class="nome_produto">{product.name}</h2>
        <p class="peso">Peso: {product.weight}</p>
        <p class="preço">R${product.price}</p>
      </div>
    </div>
  );
}
