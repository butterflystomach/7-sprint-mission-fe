import BestPosts from "@/components/BestPostArea";
import PostArea from "@/components/PostArea";
import axios from "@/lib/axios.js";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [bestPosts, setBestPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  async function getBestPosts() {
    const res = await axios.get("/posts/best");
    const nextBestPosts = res.data.results;
    setBestPosts(nextBestPosts);
  }

  async function getPosts() {
    const res = await axios.get("/posts");
    const nextPosts = res.data.results;
    setPosts(nextPosts);
  }

  useEffect(() => {
    getBestPosts();
    getPosts();
  }, []);

  return (
    <>
      <BestPosts className={styles.bestPosts} posts={bestPosts} />
      <PostArea className={styles.postArea} posts={posts} />
    </>
  );
}
