const mongoose = require("mongoose");

const domainServicesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  periods: {
    type: Number,
    required: true
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Suppliers"
  },
  domain_plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DomainPlans"
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

let DomainServices = mongoose.model("DomainServices", domainServicesSchema);
module.exports = {DomainServices};