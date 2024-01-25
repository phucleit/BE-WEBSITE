const mongoose = require("mongoose");

const maintenanceServicesSchema = new mongoose.Schema({
  service_type: {
    type: Number,
  },
  domain_service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DomainServices"
  },
  maintenance_plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaintenancePlans"
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
  domain_plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DomainPlans"
  },
  domain_supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Suppliers"
  },
});

let MaintenanceServices = mongoose.model("MaintenanceServices", maintenanceServicesSchema);
module.exports = {MaintenanceServices};