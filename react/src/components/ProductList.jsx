import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = ({ products, onSearch, onSortChange, sortOrder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  const handleRegisterClick = () => {
    navigate("/registration");
  };

  return (
    <div className="productList">
      <div className="productListHeader">
        <h2 className="sectionTitle">판매 중인 상품</h2>
        <div className="controls">
          <div className="searchForm">
            <div className="searchContainer">
              <span className="searchIcon">🔍</span>
              <input
                type="text"
                placeholder="검색할 상품을 입력해주세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                className="searchInput"
              />
            </div>
          </div>
          <button className="registerBtn" onClick={handleRegisterClick}>
            상품 등록하기
          </button>
          <div className="sortContainer">
            <select
              value={sortOrder}
              onChange={(e) => onSortChange(e.target.value)}
              className="sortSelect"
            >
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </div>
        </div>
      </div>

      <div className="productGrid">
        {products.map((product) => (
          <div key={product.id} className="productCard">
            <div className="productImageContainer">
              <img
                src={product.images[0] || "/api/placeholder/300/200"}
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

export default ProductList;
