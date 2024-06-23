const mongoose = require("mongoose");

const groupUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  // group: {
  //   type: Object,
  //   required: true
  // }
}, {timestamps: true});

let GroupUsers = mongoose.model("GroupUsers", groupUserSchema);
module.exports = GroupUsers;