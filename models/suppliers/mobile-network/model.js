const mongoose = require("mongoose");

const mobileNetworkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

let MobileNetwork = mongoose.model("MobileNetworks", mobileNetworkSchema);
module.exports = MobileNetwork;