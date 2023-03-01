const express = require("express");
const router = express.Router();
const Post = require("../schemas/posts.js");

router.get("/", async (req, res, next) => {
  const test = await Post.findOne();

  res.json({ allData: test });
  console.log("Post.postId === Post.testid", test.postId === test.testid);
  console.log("Post.postId === Post._id", test.postId === test._id);
  console.log("Post.postId === Post.id", test.postId === test.id);
  console.log("Post.testid === Post.id", test.testid === test.id);
  // console.log("Post._id === Post.id", String(test._id));
  // console.log("Post.testid === Post._id", test.testid);
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
