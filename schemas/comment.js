const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
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

module.exports = commentsSchema;
