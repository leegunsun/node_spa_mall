const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  commentId: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

commentsSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Comments", commentsSchema);
