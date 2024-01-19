const mongoose = require("mongoose");

const sslPlansSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  import_price: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  feature: {
    type: String,
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Suppliers"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

let SslPlans = mongoose.model("SslPlans", sslPlansSchema);
module.exports = {SslPlans};