const mongoose = require("mongoose");

const contentPlansSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  number_of_articles: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

let ContentPlans = mongoose.model("ContentPlans", contentPlansSchema);
module.exports = {ContentPlans};