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

router.put("/posts/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findOne({ postId: postId });
  const { title, content } = req.body;
  const { userId } = res.locals.user;

  if (!title && !content) {
    return res
      .status(412)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }

  try {
    if (userId !== post.userId) {
      return res
        .status(403)
        .json({ errorMessage: "게시글 수정의 권한이 존재하지 않습니다." });
    }

    if (!title) {
      return res
        .status(412)
        .json({ errorMessage: "게시글 제목의 형식이 일치하지 않습니다." });
    } else if (!content) {
      return res
        .status(412)
        .json({ errorMessage: "게시글 내용의 형식이 일치하지 않습니다." });
    }

    if (post) {
      post.title = title;
      post.content = content;
      await post.save();
      res.status(200).json({ message: "게시글을 수정하였습니다." });
    } else {
      return res
        .status(401)
        .json({ errorMessage: "게시글이 정상적으로 수정되지 않았습니다." });
    }
  } catch {
    return res
      .status(400)
      .json({ errorMessage: "게시글 수정에 실패하였습니다." });
  }
});

//put

// # 403 게시글을 수정할 권한이 존재하지 않는 경우
// {"errorMessage": "게시글 수정의 권한이 존재하지 않습니다."}

// # 403 Cookie가 비정상적이거나 만료된 경우
// {"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}
// # 403 Cookie가 존재하지 않을 경우
// {"errorMessage": "로그인이 필요한 기능입니다."}
// # 400 예외 케이스에서 처리하지 못한 에러
// {"errorMessage": "게시글 수정에 실패하였습니다."}
// # 412 body 데이터가 정상적으로 전달되지 않는 경우
// {"errorMessage": "데이터 형식이 올바르지 않습니다."}
// # 412 Title의 형식이 비정상적인 경우
// {"errorMessage": "게시글 제목의 형식이 일치하지 않습니다."}
// # 412 Content의 형식이 비정상적인 경우
// {"errorMessage": "게시글 내용의 형식이 일치하지 않습니다."}
// # 401 게시글 수정이 실패한 경우
// {"errorMessage": "게시글이 정상적으로 수정되지 않았습니다.”}

router.delete("/posts/:postId", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;
  const post = await Post.findOne({ postId: postId });

  try {
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: "게시글이 존재하지 않습니다." });
    }

    if (post.userId == userId) {
      await post.deleteOne();
      res.status(200).json({ message: "게시글을 삭제하였습니다." });
    } else {
      res
        .status(403)
        .json({ errorMessage: "게시글의 삭제 권한이 존재하지 않습니다." });
    }
  } catch {
    return res
      .status(400)
      .json({ errorMessage: "게시글 삭제에 실패하였습니다." });
  }
});

// # 401 게시글 삭제에 실패한 경우
// {"errorMessage": "게시글이 정상적으로 삭제되지 않았습니다.”}

// # 400 예외 케이스에서 처리하지 못한 에러
// {"errorMessage": "게시글 작성에 실패하였습니다."}
// # 403 Cookie가 존재하지 않을 경우
// {"errorMessage": "로그인이 필요한 기능입니다."}
// # 403 Cookie가 비정상적이거나 만료된 경우
// {"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}
// # 404 게시글이 존재하지 않는경우
// {"errorMessage": "게시글이 존재하지 않습니다."}
// # 403 게시글을 삭제할 권한이 존재하지 않는 경우
// {"errorMessage": "게시글의 삭제 권한이 존재하지 않습니다."}
module.exports = router;
