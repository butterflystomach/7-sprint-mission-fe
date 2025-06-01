import React from 'react';
import './BestProductList.css';

const BestProductList = ({ products }) => {
  const bestProducts = products.slice(0, 4);

  return (
    <div className="bestProducts">
      <h2 className="sectionTitle">베스트 상품</h2>
      <div className="bestGrid">
        {bestProducts.map((product) => (
          <div key={product.id} className="bestProductCard">
            <div className="productImageContainer">
              <img 
                src={product.images[0] || '/api/placeholder/300/200'} 
                alt={product.name}
                className="productImage"
              />
            </div>
            <div className="productInfo">
              <h3 className="productName">{product.name}</h3>
              <p className="productPrice">{product.price.toLocaleString()}원</p>
              <div className="productStats">
                <span className="likes">
                  <span className="heartIcon">♥</span>
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