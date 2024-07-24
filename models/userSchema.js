const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 20,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
