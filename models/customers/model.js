const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    birthday: {
        type: String,
    },
    idNumber: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    frontView: {
        type: String,
    },
    backView: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

let Customer = mongoose.model("Customer", customerSchema);
module.exports = {Customer};