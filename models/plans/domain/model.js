const mongoose = require("mongoose");

const domainPlansSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
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

let DomainPlans = mongoose.model("DomainPlans", domainPlansSchema);
module.exports = {DomainPlans};