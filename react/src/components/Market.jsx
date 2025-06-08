import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import "./Market.css";
import itemDefaultImg from "../assets/itemDefaultImg.svg";

const Market = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const pageSize = 10;

  // API에서 상품 데이터 가져오기
  const fetchProducts = async (page = 1, orderBy = "recent", keyword = "") => {
    try {
      setLoading(true);
      let url = `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;

      if (keyword) {
        url += `&keyword=${encodeURIComponent(keyword)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setProducts(data.list || []);
      setTotalPages(Math.ceil(data.totalCount / pageSize));
    } catch (error) {
      console.error("상품 데이터를 가져오는데 실패했습니다:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로딩
  useEffect(() => {
    fetchProducts(1, sortOrder, searchTerm);
  }, []);

  // 검색 처리
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts(1, sortOrder, searchTerm);
  };

  // 정렬 변경
  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setCurrentPage(1);
    fetchProducts(1, newSortOrder, searchTerm);
  };

  // 페이지 변경 (Pagination 컴포넌트에서 호출될 함수)
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchProducts(page, sortOrder, searchTerm);
    }
  };

  // 상품 등록 페이지로 이동
  const handleRegisterClick = () => {
    navigate("/registration");
  };

  if (loading) {
    return (
      <div className="marketContainer">
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="marketContainer">
      <div className="marketHeader">
        <h1 className="marketTitle">판매 중인 상품</h1>
        <div className="marketControls">
          <form onSubmit={handleSearch} className="searchForm">
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchInput"
            />
          </form>
          <button className="registerButton" onClick={handleRegisterClick}>
            상품 등록하기
          </button>
          <select
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
            className="sortSelect"
          >
            <option value="recent">최신순</option>
          </select>
        </div>
      </div>

      <div className="productsGrid">
        {products.map((product) => (
          <div key={product.id} className="productCard">
            <div className="productImage">
              <img
                src={product.images?.[0] || itemDefaultImg}
                alt={product.name}
                onError={(e) => {
                  e.target.src = itemDefaultImg;
                }}
              />
            </div>
            <div className="productInfo">
              <h3 className="productName">{product.name}</h3>
              <p className="productPrice">
                {product.price?.toLocaleString()}원
              </p>
              <div className="productStats">
                <span className="likes">♥ {product.favoriteCount || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Market;
