const express = require("express");
const router = express.Router();
const Post = require("../schemas/posts.js");

router.get("/", async (req, res, next) => {
  res.json({ allData: await Post.find() });
});

module.exports = router;
