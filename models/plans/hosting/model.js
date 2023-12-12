const mongoose = require("mongoose");

const hostingPlansSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Suppliers"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

let HostingPlans = mongoose.model("HostingPlans", hostingPlansSchema);
module.exports = {HostingPlans};