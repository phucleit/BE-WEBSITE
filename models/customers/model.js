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
        type: Number,
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
    company: {
        type: String,
    },
    tax_code: {
        type: Number,
    },
    address_company: {
        type: String,
    },
    representative: {
        type: String,
    },
    representative_hotline: {
        type: Number,
    },
    mail_vat: {
        type: String,
    },
    image_front_view: {
        type: [String],
    },
    image_back_view: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

let Customer = mongoose.model("Customers", customerSchema);
module.exports = {Customer};