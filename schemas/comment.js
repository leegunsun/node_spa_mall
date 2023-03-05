const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
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

commentsSchema.virtual("commentId").get(function () {
  return this._id.toHexString();
});

commentsSchema.set("toJSON", {
  virtual: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = commentsSchema;
