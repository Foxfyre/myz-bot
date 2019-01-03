const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
    username: String
  }
});

module.exports = mongoose.model("user", userSchema);
