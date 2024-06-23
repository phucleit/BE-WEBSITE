const mongoose = require("mongoose");

const mobileNetworkServicesSchema = new mongoose.Schema({
  periods: {
    type: Number,
    required: true
  },
  supplierMobileNetworkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MobileNetworks"
  },
  mobileNetworkPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MobileNetworkPlans"
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers"
  },
  status: {
    type: Number
  },
  registeredAt: {
    type: Date
  },
  expiredAt: {
    type: Date
  },
}, {timestamps: true});

let MobileNetworkServices = mongoose.model("MobileNetworkServices", mobileNetworkServicesSchema);
module.exports = MobileNetworkServices;