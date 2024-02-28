const mongoose = require("mongoose");

const groupUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  group: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

let GroupUsers = mongoose.model("GroupUserss", groupUserSchema);
module.exports = {GroupUsers};