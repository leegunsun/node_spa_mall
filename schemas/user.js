const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

// postsSchema.virtual("userId").get(function () {
//   return this._id.toHexString();
// });

userSchema.set("toJSON", {
  // virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
module.exports = mongoose.model("User", userSchema);
