const express = require("express");
const router = express.Router();
const Post = require("../schemas/posts.js");

router.get("/", async (req, res, next) => {
  const test = await Post.find({});
  const { user, password, title } = test;

  try {
    const renamedResult = test.map(({ user, password, title }) => {
      return { user1: user, password1: password, title1: title };
    });
    res.json({ RESULT: renamedResult });
  } catch {
    console.error(error);
  }
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
