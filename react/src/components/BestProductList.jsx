import React from 'react';
import './BestProductList.css';

const BestProductList = ({ products }) => {
  const bestProducts = products.slice(0, 4);

  return (
    <div className="best-products">
      <h2 className="section-title">베스트 상품</h2>
      <div className="best-grid">
        {bestProducts.map((product) => (
          <div key={product.id} className="best-product-card">
            <div className="product-image-container">
              <img 
                src={product.images[0] || '/api/placeholder/300/200'} 
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price.toLocaleString()}원</p>
              <div className="product-stats">
                <span className="likes">
                  <span className="heart-icon">♥</span>
                  {product.favoriteCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestProductList;