import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import prisma from "@/lib/prisma";

const Products = () => {
  const [loading, setLoading] = useState(true);

  const products = prisma.product.findMany({
    id: products.id,
    name: products.name,
    price: products.price,
    imageUrl: products.imageUrl,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
    <ProductCard
      key={product.id}
      name={product.name}
      price={`$${product.price}`}
      imageUrl={product.imageUrl}
    />
  );
};

export default Products;
