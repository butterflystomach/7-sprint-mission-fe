// mockUp Data

const posts = [
  {
    id: 1,
    title: "맥북 16인치 16기가 테라 원도 사양이면 얼마에 팔아야하나요?",
    content: "맥북 16인치 16기가 테라 원도 사양이면 얼마에 팔아야하나요?",
    author: "홍길동",
    date: "2024.04.16",
    views: 9999,
    likes: 123,
    isBest: true,
    thumbnail: "/images/product_basic.svg",
    comments: [
      {
        id: 1,
        author: "댓글작성자1",
        content: "좋은 사양이네요",
        date: "2024.04.16",
        likes: 5,
      },
      {
        id: 2,
        author: "댓글작성자2",
        content: "시세를 잘 모르겠네요",
        date: "2024.04.16",
        likes: 2,
      },
    ],
  },
  {
    id: 2,
    title: "맥북 16인치 16기가 테라 원도 사양이면 얼마에 팔아야하나요?",
    content: "맥북 관련 질문입니다.",
    author: "김철수",
    date: "2024.04.15",
    views: 8888,
    likes: 89,
    isBest: true,
    thumbnail: "/images/product_basic.svg",
    comments: [],
  },
];

const getRelatedPosts = (currentPostId, limit = 3) => {
  return posts
    .filter((post) => post.id !== currentPostId)
    .slice(0, limit)
    .map((post) => ({
      id: post.id,
      title: post.title,
      author: post.author,
      date: post.date,
      views: post.views,
    }));
};

export default function handler(req, res) {
  const { id } = req.query;
  const postId = parseInt(id);

  if (req.method === "GET") {
    try {
      const post = posts.find((p) => p.id === postId);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "게시글을 찾을 수 없습니다.",
        });
      }

      post.views += 1;

      const relatedPosts = getRelatedPosts(postId);

      res.status(200).json({
        success: true,
        data: {
          post: post,
          relatedPosts: relatedPosts,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "게시글을 불러오는데 실패했습니다.",
        error: error.message,
      });
    }
  } else if (req.method === "PUT") {
    try {
      const postIndex = posts.findIndex((p) => p.id === postId);

      if (postIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "게시글을 찾을 수 없습니다.",
        });
      }

      const { title, content } = req.body;

      posts[postIndex] = {
        ...posts[postIndex],
        title: title || posts[postIndex].title,
        content: content || posts[postIndex].content,
        updatedAt: new Date().toISOString(),
      };

      res.status(200).json({
        success: true,
        data: posts[postIndex],
        message: "게시글이 성공적으로 수정되었습니다.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "게시글 수정에 실패했습니다.",
        error: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const postIndex = posts.findIndex((p) => p.id === postId);

      if (postIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "게시글을 찾을 수 없습니다.",
        });
      }

      posts.splice(postIndex, 1);

      res.status(200).json({
        success: true,
        message: "게시글이 성공적으로 삭제되었습니다.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "게시글 삭제에 실패했습니다.",
        error: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}
