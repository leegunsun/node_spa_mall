const express = require("express");
const router = express.Router();
const Post = require("../schemas/posts.js");

router.get("/posts", (req, res, next) => {
  res.render("../view/index.html");
});

router.post("/posts", async (req, res, next) => {
  const existsPosts = await Post.find({ postsId: 1 });
  console.log(existsPosts);
  await Post.create({
    postsId: 1,
    title: "testTitle",
    postDate: Date(),
    userName: "lee",
  });
  res.redirect("/");
});

module.exports = router;
