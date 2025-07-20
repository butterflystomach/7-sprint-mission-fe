import BestPosts from "@/components/BestPostArea";
import PostArea from "@/components/PostArea";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [bestPosts, setBestPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("latest"); // latest, popular, likes

  const apiRequest = async (url, options = {}) => {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  async function getBestPosts() {
    try {
      setError(null);

      const data = await apiRequest("/api/posts/best");

      if (data.success) {
        setBestPosts(data.results || []);
      } else {
        throw new Error(
          data.message || "Best 게시글을 불러오는데 실패했습니다."
        );
      }
    } catch (error) {
      console.error("Best 게시글 로딩 실패:", error);
      setError("Best 게시글을 불러오는데 실패했습니다.");
      setBestPosts([]);
    }
  }

  async function getPosts(page = 1, sort = "latest") {
    try {
      setLoading(true);
      setError(null);

      const data = await apiRequest(
        `/api/posts?page=${page}&limit=10&sort=${sort}`
      );

      if (data.success) {
        const { posts: nextPosts, pagination: nextPagination } = data.data;
        setPosts(nextPosts || []);
        setPagination(nextPagination || {});
      } else {
        throw new Error(data.message || "게시글을 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글 로딩 실패:", error);
      setError("게시글을 불러오는데 실패했습니다.");
      setPosts([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  }

  const handleSortChange = (newSort) => {
    setSortType(newSort);
    setCurrentPage(1);
    getPosts(1, newSort);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    getPosts(newPage, sortType);
  };

  const refreshPosts = () => {
    getBestPosts();
    getPosts(currentPage, sortType);
  };

  useEffect(() => {
    getBestPosts();
    getPosts();
  }, []);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button
          onClick={() => {
            setError(null);
            refreshPosts();
          }}
          className={styles.retryButton}
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <>
      <BestPosts className={styles.bestPosts} posts={bestPosts} />

      <PostArea
        className={styles.postArea}
        posts={posts}
        loading={loading}
        pagination={pagination}
        currentPage={currentPage}
        sortType={sortType}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
        onRefresh={refreshPosts}
      />

      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <span>게시글을 불러오는 중...</span>
        </div>
      )}

      {pagination.totalPages > 1 && !loading && (
        <div className={styles.paginationContainer}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.hasPrev || loading}
            className={styles.pageButton}
          >
            이전
          </button>

          <span className={styles.pageInfo}>
            {currentPage} / {pagination.totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.hasNext || loading}
            className={styles.pageButton}
          >
            다음
          </button>
        </div>
      )}
    </>
  );
}
