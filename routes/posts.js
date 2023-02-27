const express = require("express");
const router = express.Router();
const Post = require("../schemas/posts.js");

router.get("/posts", async (req, res, next) => {
  const posts = await Post.find(
    {},
    { postId: 1, title: 1, user: 1, createdAt: 1 }
  ).sort({
    createdAt: -1,
  });

  if (posts.length) {
    res.json({ data: posts });
  } else {
    res.send("데이터가 없습니다.");
  }
});

router.post("/posts", async (req, res, next) => {
  await Post.create({
    user: "Developer",
    password: "1234",
    title: "안녕하세요",
    content: "안녕하세요 content 입니다.",
    createdAt: Date(),
  });
  res.status(200).json({ message: "게시글을 생성하였습니다." });
});

module.exports = router;
