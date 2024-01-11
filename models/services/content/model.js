const mongoose = require("mongoose");

const contentServicesSchema = new mongoose.Schema({
  content_plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ContentPlans"
  },
  periods: {
    type: Number,
    required: true
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers"
  },
  status: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  registeredAt: {
    type: Date
  },
  expiredAt: {
    type: Date
  },
});

let ContentServices = mongoose.model("ContentServices", contentServicesSchema);
module.exports = {ContentServices};