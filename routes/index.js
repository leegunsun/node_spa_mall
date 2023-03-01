const express = require("express");
const router = express.Router();
const Post = require("../schemas/posts.js");

router.get("/", async (req, res, next) => {
  const test = await Post.find();

  res.json({ allData: test });
});

module.exports = router;

// {
//   "allData": [
//       {
//           "_id": "63fed23f0027917ff0fe4bee",
//           "testid": "63fed23f0027917ff0fe4bef",
//           "__v": 0,
//           "postId": "63fed23f0027917ff0fe4bee",
//           "id": "63fed23f0027917ff0fe4bee"
//       }
//   ]
// }
