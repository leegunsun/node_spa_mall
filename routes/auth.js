const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../schemas/user.js");

router.post("/login", async (req, res) => {
  const { nickname, password } = req.body;
  console.log(nickname);
  const user = await User.findOne({ nickname: nickname });

  try {
    if (!user || password !== user.password) {
      return res
        .status(412)
        .json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
    }

    const token = jwt.sign({ userId: user.userId }, "customized-secret-key");

    res.cookie("Authorization", `Bearer ${token}`);
    res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ errorMessage: "로그인에 실패하였습니다." });
  }
});

module.exports = router;

// # 412 해당하는 유저가 존재하지 않는 경우
// {"errorMessage": "닉네임 또는 패스워드를 확인해주세요."}
// # 400 예외 케이스에서 처리하지 못한 에러
// {"errorMessage": "로그인에 실패하였습니다."}
// joy 쓰기 node 정규식 로그인
