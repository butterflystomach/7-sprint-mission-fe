// 기존 코드와의 호환성을 위한 Best 게시글 전용 API

// mockUp Data
const posts = [
  {
    id: 1,
    title: "맥북 16인치 16기가 테라 원도 사양이면 얼마에 팔아야하나요?",
    author: "홍길동",
    date: "2024.04.16",
    views: 9999,
    likes: 123,
    isBest: true,
    thumbnail: "/images/product_basic.svg",
  },
  {
    id: 2,
    title: "맥북 16인치 16기가 테라 원도 사양이면 얼마에 팔아야하나요?",
    author: "김철수",
    date: "2024.04.15",
    views: 8888,
    likes: 89,
    isBest: true,
    thumbnail: "/images/product_basic.svg",
  },
  {
    id: 3,
    title: "맥북 16인치 16기가 테라 원도 사양이면 얼마에 팔아야하나요?",
    author: "이영희",
    date: "2024.04.14",
    views: 7777,
    likes: 67,
    isBest: true,
    thumbnail: "/images/product_basic.svg",
  },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const bestPosts = posts
        .filter((post) => post.isBest)
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 3);

      res.status(200).json({
        success: true,
        results: bestPosts,
        count: bestPosts.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Best 게시글을 불러오는데 실패했습니다.",
        error: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}
