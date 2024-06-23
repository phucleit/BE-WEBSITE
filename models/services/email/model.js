const mongoose = require("mongoose");

const emailServicesSchema = new mongoose.Schema({
  domain_service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DomainServices"
  },
  email_plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmailPlans"
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
  domain_plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DomainPlans"
  },
  domain_supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Suppliers"
  },
  email_supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Suppliers"
  },
}, {timestamps: true});

let EmailServices = mongoose.model("EmailServices", emailServicesSchema);
module.exports = EmailServices;