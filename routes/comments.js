const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware.js");
const Comments = require("../schemas/comment.js");
const router = express.Router();
const Post = require("../schemas/posts.js");
const User = require("../schemas/user.js");

router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findOne({ _id: postId });
    if (post) {
      const sortedComments = post.comments.sort(
        (a, b) => b.createAt - a.createAt
      );
      res.json({ show: sortedComments });
    } else {
      res.send("댓글이 없습니다.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
});

router.post("/posts/:postId/comments", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { content } = req.body;
  const { postId } = req.params;

  const post = await Post.findOne({ postId });
  const user = await User.findOne({ userId: userId });

  const maxCommentId = await Comments.findOne().sort("-commentId").exec();
  const commentId = maxCommentId ? maxCommentId.commentId + 1 : 1;

  try {
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: "게시글이 존재하지 않습니다." });
    }

    if (!content) {
      return res
        .status(412)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }

    const comment = new Comments({
      content,
      nickname: user.nickname,
      userId,
      postId,
      commentId: commentId,
    });

    await comment.save();
    res.status(200).json({ message: "댓글을 작성하였습니다." });
  } catch (error) {
    return res
      .status(400)
      .json({ errorMessage: "댓글 작성에 실패하였습니다." });
  }

  //  # 412 body 데이터가 정상적으로 전달되지 않는 경우
  //  {"errorMessage": "데이터 형식이 올바르지 않습니다."}
  //  # 400 예외 케이스에서 처리하지 못한 에러
  //  {"errorMessage": "댓글 작성에 실패하였습니다."}

  //  # 404 댓글을 작성할 게시글이 존재하지 않는경우
  //  {"errorMessage": "게시글이 존재하지 않습니다."}
  //  # 403 Cookie가 존재하지 않을 경우
  //  {"errorMessage": "로그인이 필요한 기능입니다."}
  //  # 403 Cookie가 비정상적이거나 만료된 경우
  //  {"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}

  // if (!post) {
  //   return res.status(404).json({ message: "포스트를 찾지 못했습니다." });
  // } else {
  //   if (content) {
  //     post.comments.push({
  //       content,
  //       user,
  //     });
  //   } else {
  //     return res.json({ message: "댓글 내용을 입력해주세요" });
  //   }

  //   // post.comments.push({
  //   //   content: "테스트 코멘트",
  //   //   user: "유저 이름",
  //   // });
  // }

  // await post.save();
  // res.status(200).json({ message: "코멘트 성공" });
});

router.put("/input/:postId/:commentId", async (req, res) => {
  const { postId, commentId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "코멘트가 비어있는지 확인하세요" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "포스트를 찾을 수 없습니다." });
    }

    const comment = post.comments.find(
      (c) => c.commentId.toString() === commentId
    );
    if (!comment) {
      return res.status(404).json({ message: "코멘트를 찾을 수 없습니다." });
    }
    comment.content = content;

    await post.save();

    return res.json({ message: "코멘트를 수정했습니다." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

router.delete("/input/:postId/:commentId", async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send("포스트가 존재하지 않습니다.");
    }
    //toString()을 붙어야 하는지 확인해보자 toString()을 붙여야 작동한다.
    const comment = post.comments.find(
      (ele) => ele.commentId.toString() === commentId
    );

    if (!comment) {
      console.log(typeof comment);
      return res.status(404).json({ message: "댓글이 존재하지 않습니다." });
    }

    post.comments.pull(comment);
    await post.save();
    return res.json({ message: "댓글이 삭제 되었습니다." });
  } catch {
    console.error(error);
    return res.status(500).send("서버 에러입니다.");
  }
});

module.exports = router;
