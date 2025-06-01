import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import BestProductList from './components/BestProductList';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';
import Footer from './components/Footer.jsx';
import './App.css';

const App = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  
  const pageSize = 10;

  // API에서 데이터 가져오기
  const fetchProducts = async (page = 1, orderBy = 'recent', keyword = '') => {
    try {
      setLoading(true);
      let url = `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
      
      if (keyword) {
        url += `&keyword=${encodeURIComponent(keyword)}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (page === 1) {
        setAllProducts(data.list || []);
      }
      
      setFilteredProducts(data.list || []);
      setTotalCount(data.totalCount || 0);
    } catch (error) {
      console.error('상품 데이터를 가져오는데 실패했습니다:', error);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로딩
  useEffect(() => {
    fetchProducts(1, sortOrder, searchTerm);
  }, []);

  // 페이지 변경
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page, sortOrder, searchTerm);
  };

  // 정렬 변경
  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setCurrentPage(1);
    fetchProducts(1, newSortOrder, searchTerm);
  };

  // 검색
  const handleSearch = (keyword) => {
    setSearchTerm(keyword);
    setCurrentPage(1);
    fetchProducts(1, sortOrder, keyword);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  if (loading && currentPage === 1) {
    return (
      <div className="app">
        <div className="container">
          <div className="loading">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div>
        <Header />
      </div>
      <div className="container">
        <BestProductList products={allProducts} />
        <ProductList 
          products={filteredProducts}
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          sortOrder={sortOrder}
        />
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
