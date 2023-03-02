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
    res.status(500).send("서버 오류");
  }
});

router.post("/input/:postId", async (req, res) => {
  const { content, user } = req.body;
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "포스트를 찾지 못했습니다." });
  } else {
    if (content) {
      post.comments.push({
        content,
        user,
      });
    } else {
      return res.json({ message: "댓글 내용을 입력해주세요" });
    }

    // post.comments.push({
    //   content: "테스트 코멘트",
    //   user: "유저 이름",
    // });
  }

  await post.save();
  res.status(200).json({ message: "코멘트 성공" });
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

// router.get("/user", (req,res)=> {
// const users = User.find({})

//   if(!users) {
//     return res.status(400).json({ message : "회원 목록 조회 실패"})
//   }

// const rename = users.map(({_id,name,ID,pw}) => {
//   return {userId:_id, name:name,ID:ID,pw:pw}
// })

// res.json({ "result" : rename})

// })

// router.get("/user/:userid", (req,res)=> {
//   const userId = req.params.userid
//   const users = User.findById(userId)

//   if(!users) {
//     return res.status(400).json({ message : "회원 상세 조회 실패"})
//   }

//   const rename = users.map(({_id,name,ID,pw}) => {
//     return {userId:_id, name:name,ID:ID,pw:pw}
//   })

//   res.json({ "result" : rename})

// })

module.exports = router;
