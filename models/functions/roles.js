const mongoose = require("mongoose");
const sha512  = require("js-sha512");

const ObjectId = mongoose.Types.ObjectId

const userchema = new mongoose.Schema({
  function_id: {
    type: ObjectId,
    required: true,
    index: true
  },
  group_user_id:{
    type: ObjectId,
    required: true,
    index: true
  }
});

const Roles = mongoose.model("Roles", userchema);
module.exports = Roles;

