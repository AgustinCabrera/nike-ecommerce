import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Products = () =>{
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
}

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={`$${product.price}`}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  );
};

export default Products;