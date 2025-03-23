const getProdutos = async () => {
    try {
      const res = await fetch('/api/products', {cache: "no-store"});
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      return Array.isArray(data.products) ? data.products : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

export default getProdutos;