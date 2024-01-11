const mongoose = require("mongoose");

const toplistServicesSchema = new mongoose.Schema({
    post: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    rental_location: {
      type: String,
      required: true
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
});

let ToplistServices = mongoose.model("ToplistServices", toplistServicesSchema);
module.exports = {ToplistServices};