const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

commentsSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = commentsSchema;
