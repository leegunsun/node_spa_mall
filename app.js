const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const postRouter = require("./routes/posts");
const indexRouter = require("./routes/index.js");
// const commentRouter = require("./routes/comments.js");

const connect = require("./schemas");

app.set("view engine", "ejs");
app.set("views", "view");

app.use(express.static(path.join(__dirname, "public")));

connect();

app.use(express.json());
app.use("/api", [postRouter, indexRouter]);
// app.use("/api/postComment", commentRouter);

app.get("/", (req, res) => {
  res.send("main page");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
