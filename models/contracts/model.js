const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  contract_code: {
    type: String,
    required: true
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers"
  },
  total_price: {
    type: Number
  },
  deposit_amount: {
    type: Number,
    default: 0
  },
  remaining_cost: {
    type: Number,
    default: 0
  },
  status: {
    type: Number
  },
  note: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

let Contracts = mongoose.model("Contracts", contractSchema);
module.exports = {Contracts};