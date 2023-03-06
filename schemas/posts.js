const mongoose = require("mongoose");
const commentsSchema = require("./comment.js");

const postsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: Number,
    required: true,
  },
  nickname: {
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
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentsSchema],
});

postsSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.id;
  },
});
module.exports = mongoose.model("Posts", postsSchema);
