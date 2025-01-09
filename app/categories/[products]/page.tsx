'use client';
import { useEffect, useState } from 'react';
import { fetchProducts } from '@/app/lib/products';
import ProductGrid from '@/app/components/ProductGrid';

interface CategoryPageProps {
  params: { products: string };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  const [products, setProducts] = useState([]);
  const category = params.products;

  useEffect(() => {
    const getProducts = async () => {
      const allProducts = await fetchProducts();
      const categoryProducts = allProducts.filter(product => product.category === category);
      setProducts(categoryProducts);
    };
    getProducts();
  }, [category]);

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">{category.charAt(0).toUpperCase() + category.slice(1)} Section</h1>
      <ProductGrid products={products} />
    </main>
  );
};

export default CategoryPage;

