// mockUp Data

let comments = [
  {
    id: 1,
    postId: 1,
    author: "댓글작성자1",
    content: "좋은 사양이네요",
    date: "2024.04.16",
    likes: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    postId: 1,
    author: "댓글작성자2",
    content: "시세를 잘 모르겠네요",
    date: "2024.04.16",
    likes: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    postId: 1,
    author: "댓글작성자3",
    content: "추가 질문이 있어요",
    date: "2024.04.16",
    likes: 1,
    createdAt: new Date().toISOString(),
  },
];

export default function handler(req, res) {
  const { postId } = req.query;
  const postIdNum = parseInt(postId);

  if (req.method === "GET") {
    try {
      const postComments = comments
        .filter((comment) => comment.postId === postIdNum)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      res.status(200).json({
        success: true,
        data: {
          comments: postComments,
          totalComments: postComments.length,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "댓글을 불러오는데 실패했습니다.",
        error: error.message,
      });
    }
  } else if (req.method === "POST") {
    try {
      const { author, content } = req.body;

      if (!author || !content) {
        return res.status(400).json({
          success: false,
          message: "작성자와 내용을 모두 입력해주세요.",
        });
      }

      if (content.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "댓글 내용을 입력해주세요.",
        });
      }

      const newComment = {
        id: Math.max(...comments.map((c) => c.id), 0) + 1,
        postId: postIdNum,
        author: author.trim(),
        content: content.trim(),
        date: new Date()
          .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\./g, "."),
        likes: 0,
        createdAt: new Date().toISOString(),
      };

      comments.push(newComment);

      res.status(201).json({
        success: true,
        data: newComment,
        message: "댓글이 성공적으로 작성되었습니다.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "댓글 작성에 실패했습니다.",
        error: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const { commentId } = req.body;

      if (!commentId) {
        return res.status(400).json({
          success: false,
          message: "삭제할 댓글 ID를 제공해주세요.",
        });
      }

      const commentIndex = comments.findIndex(
        (c) => c.id === parseInt(commentId) && c.postId === postIdNum
      );

      if (commentIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "댓글을 찾을 수 없습니다.",
        });
      }

      comments.splice(commentIndex, 1);

      res.status(200).json({
        success: true,
        message: "댓글이 성공적으로 삭제되었습니다.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "댓글 삭제에 실패했습니다.",
        error: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}
