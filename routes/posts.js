const express = require("express");
const router = express.Router();
const Post = require("../schemas/posts.js");
const authMiddleware = require("../middlewares/auth-middleware.js");
const User = require("../schemas/user.js");

router.get("/posts", async (req, res, next) => {
  const posts = await Post.find(
    {},
    { postId: 1, userId: 1, nickname: 1, title: 1, createdAt: 1 }
  ).sort({
    postId: -1,
  });

  try {
    if (posts.length) {
      res.json({ posts: posts });
    } else {
      return res.send("데이터가 없습니다.");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ errorMessage: "게시글 조회에 실패하였습니다." });
  }
});

router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findOne({ postId: postId });

  try {
    if (post) {
      const result = {
        postId: post.postId,
        userId: post.userId,
        nickname: post.nickname,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };

      res.status(200).json({ post: result });
    } else {
      return res
        .status(400)
        .json({ errorMessage: "게시글 조회에 실패하였습니다." });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ errorMessage: "게시글 조회에 실패하였습니다." });
  }
});

router.post("/posts", authMiddleware, async (req, res, next) => {
  // const { userId } = res.locals.user;
  const { title, content } = req.body;
  const { userId } = res.locals.user;
  const user = await User.findOne({ userId });
  const maxPostId = await Post.findOne().sort("-postId").exec();
  const postId = maxPostId ? maxPostId.postId + 1 : 1;

  // const user = await User.findOne({ userId });

  if (!title && !content) {
    return res
      .status(412)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }

  try {
    if (!title) {
      return res
        .status(412)
        .json({ errorMessage: "게시글 제목의 형식이 일치하지 않습니다." });
    } else if (!content) {
      return res
        .status(412)
        .json({ errorMessage: "게시글 내용의 형식이 일치하지 않습니다." });
    }

    const post = new Post({
      userId: userId,
      postId: postId,
      nickname: user.nickname,
      title,
      content,
    });

    await post.save();

    res.status(201).json({ message: "게시글 작성에 성공하였습니다." });
  } catch (error) {
    return res
      .status(400)
      .json({ errorMessage: "게시글 작성에 실패하였습니다." });
  }
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
