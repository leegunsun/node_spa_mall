const jwt = require("jsonwebtoken");
const User = require("../schemas/user.js");

module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies;

  const [tokenType, token] = (Authorization ?? "").split(" ");

  if (!token || tokenType !== "Bearer") {
    return res
      .status(404)
      .json({ errorMessage: "로그인이 필요한 기능입니다." });
  }

  try {
    const { userId } = jwt.verify(token, "customized-secret-key");
    const user = await User.findOne({ userId });

    res.locals.user = user;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(403)
      .json({ errorMessage: "전달된 쿠키에서 오류가 발생하였습니다." });
    return;
  }
};
