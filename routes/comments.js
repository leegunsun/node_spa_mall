const express = require("express");
const Comments = require("../schemas/comment.js");
const router = express.Router();
const Post = require("../schemas/posts.js");

router.get("/:postId", async (req, res) => {
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
    res.status(500).send("Internal Server Error");
  }
});

router.post("/input/:postId", async (req, res) => {
  // const {content,user}  = req.body
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "포스트를 찾지 못했습니다." });
  } else {
    // post.comments.push({
    //     content,
    //     user,
    //   });
    post.comments.push({
      content: "테스트 코멘트",
      user: "유저 이름",
    });
  }

  await post.save();
  res.status(200).json({ message: "코멘트 성공" });
});

module.exports = router;
