const mongoose = require("mongoose");

//postsSchema에 필요한것, 고유한 아이디, 제목, 시간
//
const postsSchema = new mongoose.Schema({
  postsId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Posts", postsSchema);
