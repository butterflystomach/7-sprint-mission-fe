import React, { useState } from "react";
import Link from "next/link";
import styles from "./PostArea.module.css";

export default function PostArea({ className = "", posts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("최신순");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleWritePost = () => {
    // 글쓰기 기능 구현
    console.log("글쓰기 버튼 클릭");
  };

  return (
    <div className={`${styles.postArea} ${className}`}>
      {/* 헤더 영역 */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>게시글</h2>
          <span className={styles.postCount}>{posts?.length || 0}</span>
        </div>
        <button className={styles.writeButton} onClick={handleWritePost}>
          글쓰기
        </button>
      </div>

      {/* 검색 및 정렬 영역 */}
      <div className={styles.searchSection}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className={styles.sortSelect}
        >
          <option value="최신순">최신순</option>
          <option value="조회순">조회순</option>
          <option value="댓글순">댓글순</option>
        </select>
      </div>

      {/* 게시글 목록 */}
      <ul className={styles.postList}>
        {posts?.map((post) => (
          <li key={post.id}>
            <Link className={styles.post} href={`/posts/${post.id}`}>
              <div className={styles.content}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <div className={styles.postMeta}>
                  <span className={styles.author}>{post.author}</span>
                  <span className={styles.date}>{post.date}</span>
                  <div className={styles.viewsContainer}>
                    <span className={styles.viewsIcon}>👁</span>
                    <span className={styles.views}>
                      {post.views?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              {post.hasImage && (
                <div className={styles.postImage}>
                  <div className={styles.imagePlaceholder}>📷</div>
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
