import React from 'react';

interface ProductCardProps {
  name: string;
  price: string;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, imageUrl }) => {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-image" />
      <h2 className="product-name">{name}</h2>
      <p className="product-price">{price}</p>
    </div>
  );
};

export default ProductCard;