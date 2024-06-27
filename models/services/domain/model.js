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
  server_plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServerPlans"
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers"
  },
  ping_cloudflare: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number
  },
  before_payment: {
    type: Boolean,
    default: false
  },
  after_payment: {
    type: Boolean,
    default: false
  },
  registeredAt: {
    type: Date
  },
  expiredAt: {
    type: Date
  },
}, {timestamps: true});

let DomainServices = mongoose.model("DomainServices", domainServicesSchema);
module.exports = DomainServices;
