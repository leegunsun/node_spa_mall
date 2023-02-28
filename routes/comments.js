const express = require("express");
const Comments = require("../schemas/comment.js");
const router = express.Router();
const Post = require("../schemas/posts.js");

router.get("/", async (req, res) => {
  res.send("test");
});

router.post("/input/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  console.log(postId);
  console.log(post);
  if (!post) {
    console.log("Post not found");
    return res.status(404).json({ message: "Post not found" });
  } else {
    post.comments.push({
      content: "Test commenting",
      user: "username",
    });
  }

  await post.save();
  res.status(200).json({ message: "Comment successful" });
});

module.exports = router;
