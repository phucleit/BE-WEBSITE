const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    idNumber: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

let Customer = mongoose.model("Customer", customerSchema);
module.exports = {Customer};