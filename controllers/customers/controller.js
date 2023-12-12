const { Customer } = require("../../models/customers/model");

const customerController = {
    addCustomer: async(req, res) => {
        try {
            const newCustomer = new Customer(req.body);
            const saveCustomer = await newCustomer.save();
            res.status(200).json(saveCustomer);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    getCustomer: async(req, res) => {
        try {
            const customers = await Customer.find().sort({"createdAt": -1});
            res.status(200).json(customers);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    getDetailCustomer: async(req, res) => {
        try {
            const customer = await Customer.findById(req.params.id);
            res.status(200).json(customer);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    deleteCustomer: async(req, res) => {
        try {
            const customer = await Customer.findByIdAndDelete(req.params.id);
            res.status(200).json(customer);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    updateCustomer: async(req, res) => {
        try {
            const customer = await Customer.findById(req.params.id);
            await customer.updateOne({$set: req.body});
            res.status(200).json("Updated successfully");
        } catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = customerController;