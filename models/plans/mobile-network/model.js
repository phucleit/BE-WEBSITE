const mongoose = require("mongoose");

const mobileNetworkPlansSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  importPrice: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  content: {
    type: String
  },
  esim: {
    type: Boolean
  },
  supplierMobileNetworkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MobileNetworks"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

let MobileNetworkPlans = mongoose.model("MobileNetworkPlans", mobileNetworkPlansSchema);
module.exports = {MobileNetworkPlans};