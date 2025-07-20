import React from "react";
import Link from "next/link";
import styles from "./BestPostArea.module.css";

export default function BestPosts({ className = "", posts }) {
  return (
    <div className={`${styles.bestPosts} ${className}`}>
      <h2 className={styles.title}>베스트 게시글</h2>
      <div className={styles.postGrid}>
        {posts?.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <Link className={styles.post} href={`/posts/${post.id}`}>
              <div className={styles.bestBadge}>
                <span className={styles.badgeText}>👑 Best</span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <div className={styles.postMeta}>
                  <span className={styles.author}>{post.author}</span>
                  <span className={styles.views}>
                    👁 {post.views?.toLocaleString()}
                  </span>
                  <span className={styles.date}>{post.date}</span>
                </div>
              </div>
              {post.hasImage && (
                <div className={styles.postImage}>
                  <div className={styles.imagePlaceholder}>📷</div>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
