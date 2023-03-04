const express = require("express");
const router = express.Router();
const Post = require("../schemas/posts.js");

router.get("/", async (req, res, next) => {
  const test = await Post.find({});

  try {
    res.json({ test });
    // const renamedResult = test.map((user) => {
    //   return { user1: user.user, password1: user.password, title1: user.title };
    // });
    // res.json({ RESULT: renamedResult });
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
