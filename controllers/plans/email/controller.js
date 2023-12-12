const { EmailPlans } = require("../../../models/plans/email/model");
const { Supplier } = require("../../../models/suppliers/model");

const emailPlansController = {
    addEmailPlans: async(req, res) => {
        try {
            const newEmailPlans = new EmailPlans(req.body);
            const saveEmailPlans = await newEmailPlans.save();
            if (req.body.supplier) {
                const supplier = Supplier.findById(req.body.supplier);
                await supplier.updateOne({$push: {emailPlans: saveEmailPlans._id}});
            }
            res.status(200).json(saveEmailPlans);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    getEmailPlans: async(req, res) => {
        try {
            const emailPlans = await EmailPlans.find().sort({"createdAt": -1}).populate('supplier', 'name company');
            res.status(200).json(emailPlans);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    getDetailEmailPlans: async(req, res) => {
        try {
            const emailPlans = await EmailPlans.findById(req.params.id).populate('supplier', 'name company phone address');
            res.status(200).json(emailPlans);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    deleteEmailPlans: async(req, res) => {
        try {
            await await Supplier.updateMany({emailPlans: req.params.id}, {$pull: {emailPlans: req.params.id}})
            await EmailPlans.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted successfully!");
        } catch(err) {
            res.status(500).json(err);
        }
    },

    updateEmailPlans: async(req, res) => {
        try {
            const emailPlans = await EmailPlans.findById(req.params.id);
            await emailPlans.updateOne({$set: req.body});
            res.status(200).json("Updated successfully");
        } catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = emailPlansController;