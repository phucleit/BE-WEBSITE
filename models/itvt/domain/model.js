const mongoose = require("mongoose");

const domainITVTSchema = new mongoose.Schema({
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
    ref: "Customers",
    index: true
  },
  ping_cloudflare: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number,
    default: 1
  },
  registeredAt: {
    type: Date
  },
  expiredAt: {
    type: Date
  },
}, {timestamps: true});

let DomainITVT = mongoose.model("DomainITVT", domainITVTSchema);
module.exports = DomainITVT;
