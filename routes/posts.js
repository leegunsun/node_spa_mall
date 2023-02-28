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
  // const {user,password,title,content} = req.body
  // await Post.create({
  //   user,
  //   password,
  //   title,
  //   content,
  // });
  await Post.create({
    user: "Developer",
    password: "1234",
    title: "안녕하세요",
    content: "안녕하세요 content 입니다.",
  });
  res.status(200).json({ message: "게시글을 생성하였습니다." });
});

router.put("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  const test = await Post.findById(postId);
  const { title, content } = req.body;
  try {
    if (test.password === req.body.password) {
      test.title = title;
      test.content = content;
      res.send(test);
    } else {
      res.json({ message: "패스워드를 확인하세요" });
    }
  } catch {
    res.status(404).send("err");
  }
});

router.delete("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  const test = await Post.findById(postId);
  try {
    if (test.password === req.body.password) {
      test.deleteOne();
      res.json({ message: "성공" });
    } else {
      res.json({ message: "다시 해보세요" });
    }
  } catch {
    res.status(404).json({ message: "저장된 정보가 없습니다." });
  }
});

module.exports = router;
