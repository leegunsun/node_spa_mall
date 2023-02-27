const mongoose = require("mongoose");

//postsSchema에 필요한것, 고유한 아이디, 제목, 시간
//
const postsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
});

postsSchema.virtual("postId").get(function () {
  return this._id.toHexString();
});

postsSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.id;
  },
});
module.exports = mongoose.model("Posts", postsSchema);
