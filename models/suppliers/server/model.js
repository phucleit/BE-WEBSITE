const mongoose = require("mongoose");

const serverkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

let Server = mongoose.model("Servers", serverkSchema);
module.exports = Server;