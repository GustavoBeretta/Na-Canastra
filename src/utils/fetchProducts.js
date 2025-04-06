import getProdutos from '@/utils/getProdutos';

const fetchProducts = async (tipo=null) => {
    let data = await getProdutos();
    if (tipo) {
      data = data.filter(product => product.tipo === tipo);
    }
    const produtosOrdenados = data.sort((a, b) => a.name.localeCompare(b.name));
    return produtosOrdenados
  };

  export default fetchProducts;