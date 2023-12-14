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
    domain_plan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DomainPlans"
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers"
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    expiredAt: {
      type: Date
    },
});

let DomainServices = mongoose.model("DomainServices", domainServicesSchema);
module.exports = {DomainServices};