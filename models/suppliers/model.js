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
  createdAt: {
    type: Date,
    default: Date.now
  },
});

let Supplier = mongoose.model("Suppliers", supplierSchema);
module.exports = {Supplier};