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
      const { page = 1, limit = 10, sort = "latest" } = req.query;

      let sortedPosts = [...posts];

      switch (sort) {
        case "popular":
          sortedPosts.sort((a, b) => b.views - a.views);
          break;
        case "likes":
          sortedPosts.sort((a, b) => b.likes - a.likes);
          break;
        case "latest":
        default:
          sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
      }

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

      const bestPosts = posts.filter((post) => post.isBest).slice(0, 3);

      res.status(200).json({
        success: true,
        data: {
          posts: paginatedPosts,
          bestPosts: bestPosts,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(posts.length / limit),
            totalPosts: posts.length,
            hasNext: endIndex < posts.length,
            hasPrev: page > 1,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "게시글을 불러오는데 실패했습니다.",
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
