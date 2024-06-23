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
  registeredAt: {
    type: Date
  },
  expiredAt: {
    type: Date
  },
}, {timestamps: true});

let ContentServices = mongoose.model("ContentServices", contentServicesSchema);
module.exports = ContentServices;