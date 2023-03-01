const mongoose = require("mongoose");
const commentsSchema = require("./comment.js");

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
    default: Date.now,
  },
  comments: [commentsSchema],
  // testid: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   default: mongoose.Types.ObjectId,
  // },
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
