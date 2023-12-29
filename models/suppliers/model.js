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
  tax_code: {
    type: String,
  },
  phone: {
    type: Number,
  },
  name_support: {
    type: String,
  },
  phone_support: {
    type: Number,
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

let Supplier = mongoose.model("Suppliers", supplierSchema);
module.exports = {Supplier};