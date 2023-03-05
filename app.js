const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index.js");
const postRouter = require("./routes/posts.js");
const commentRouter = require("./routes/comments.js");
const signupRouter = require("./routes/signup.js");
const authRouter = require("./routes/auth.js");

const connect = require("./schemas");

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
connect();

app.use("/", indexRouter);
app.use("/api", [postRouter, commentRouter, signupRouter, authRouter]);

app.get("/", (req, res) => {
  res.send("main page");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
