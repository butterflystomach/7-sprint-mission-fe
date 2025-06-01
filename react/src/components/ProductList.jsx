import React, { useState } from 'react';
import './ProductList.css';

const ProductList = ({ products, onSearch, onSortChange, sortOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2 className="section-title">판매 중인 상품</h2>
        <div className="controls">
          <div className="search-form">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="검색할 상품을 입력해주세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                className="search-input"
              />
            </div>
          </div>
          <button className="register-btn">상품 등록하기</button>
          <div className="sort-container">
            <select 
              value={sortOrder} 
              onChange={(e) => onSortChange(e.target.value)}
              className="sort-select"
            >
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
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

export default ProductList;