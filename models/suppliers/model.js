const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  domainPlans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DomainPlans"
    }
  ],
  emailPlans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmailPlans"
    }
  ],
  hostingPlans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HostingPlans"
    }
  ],
  sslPlans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SslPlans"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

let Supplier = mongoose.model("Suppliers", supplierSchema);
module.exports = {Supplier};