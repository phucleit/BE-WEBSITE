const mongoose = require("mongoose");

const userchema = new mongoose.Schema({
  display_name: {
    type: String,
    required: false,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
  createdAt: {
    type: Date,
    default: Date.now
  },
});

let Users = mongoose.model("Users", userchema);
module.exports = {Users};