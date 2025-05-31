import { useState, useEffect } from 'react';

function Section() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('recent'); // 'recent' or 'favorite'
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const itemsPerPage = 10;

  const fetchBestProducts = async () => {
    try {
      const response = await fetch('https://panda-market-api.vercel.app/products?orderBy=favorite&pageSize=4');
      const data = await response.json();
      setBestProducts(data.list || []);
    } catch (error) {
      console.error('베스트 상품을 불러오는데 실패했습니다:', error);
    }
  };

  const fetchProducts = async (page = 1, search = '', order = 'recent') => {
    setLoading(true);
    try {
      let url = `https://panda-market-api.vercel.app/products?`;
      const params = new URLSearchParams({
        page: page,
        pageSize: itemsPerPage,
        orderBy: order === 'recent' ? 'createdAt' : 'favoriteCount',
      });
      
      if (search) {
        params.append('keyword', search);
      }
      
      url += params.toString();
      
      const response = await fetch(url);
      const data = await response.json();
      
      setProducts(data.list || []);
      setTotalCount(data.totalCount || 0);
    } catch (error) {
      console.error('상품을 불러오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestProducts();
    fetchProducts(1, searchQuery, sortOrder);
  }, []);

  useEffect(() => {
    fetchProducts(currentPage, searchQuery, sortOrder);
  }, [currentPage, searchQuery, sortOrder]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1); 
    setDropdownOpen(false);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const formatPrice = (price) => {
    return price.toLocaleString() + '원';
  };

  return (
    <div className="section-container">
      {/* 베스트 상품 섹션 */}
      <section className="best-section">
        <h2>베스트 상품</h2>
        <div className="product-grid best-grid">
          {bestProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.images[0]} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{formatPrice(product.price)}</p>
                <div className="product-stats">
                  <span className="favorite-count">♡ {product.favoriteCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 전체 상품 섹션 */}
      <section className="all-products-section">
        <div className="section-header">
          <h2>판매 중인 상품</h2>
          <div className="controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="검색할 상품을 입력해주세요"
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
              <button className="search-button">상품 등록하기</button>
            </div>
            <div className="sort-dropdown">
              <button 
                className="dropdown-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {sortOrder === 'recent' ? '최신순' : '좋아요순'}
                <span className="dropdown-arrow">▼</span>
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => handleSortChange('recent')}>최신순</button>
                  <button onClick={() => handleSortChange('favorite')}>좋아요순</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">로딩 중...</div>
        ) : (
          <>
            <div className="product-grid all-products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.images[0]} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">{formatPrice(product.price)}</p>
                    <div className="product-stats">
                      <span className="favorite-count">♡ {product.favoriteCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-arrow"
                >
                  ‹
                </button>
                
                {getPageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                  >
                    {pageNum}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-arrow"
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Section;