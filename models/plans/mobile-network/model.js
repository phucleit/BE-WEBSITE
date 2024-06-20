const mongoose = require("mongoose");

const mobileNetworkPlansSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  capacity: {
    type: Number,
    required: true,
    index: true
  },
  importPrice: {
    type: Number,
    required: true,
    index: true
  },
  price: {
    type: Number,
    required: true,
    index: true
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
  }
}, {timestamps: true});

let MobileNetworkPlans = mongoose.model("MobileNetworkPlans", mobileNetworkPlansSchema);
module.exports = MobileNetworkPlans;