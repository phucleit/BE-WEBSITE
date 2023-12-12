const { HostingPlans } = require("../../../models/plans/hosting/model");
const { Supplier } = require("../../../models/suppliers/model");

const hostingPlansController = {
    addHostingPlans: async(req, res) => {
        try {
            const newHostingPlans = new HostingPlans(req.body);
            const saveHostingPlans = await newHostingPlans.save();
            if (req.body.supplier) {
                const supplier = Supplier.findById(req.body.supplier);
                await supplier.updateOne({$push: {hostingPlans: saveHostingPlans._id}});
            }
            res.status(200).json(saveHostingPlans);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    getHostingPlans: async(req, res) => {
        try {
            const hostingPlans = await HostingPlans.find().sort({"createdAt": -1}).populate('supplier', 'name company');
            res.status(200).json(hostingPlans);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    getDetailHostingPlans: async(req, res) => {
        try {
            const hostingPlans = await HostingPlans.findById(req.params.id).populate('supplier', 'name company phone address');
            res.status(200).json(hostingPlans);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    deleteHostingPlans: async(req, res) => {
        try {
            await Supplier.updateMany({hostingPlans: req.params.id}, {$pull: {hostingPlans: req.params.id}})
            await HostingPlans.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted successfully!");
        } catch(err) {
            res.status(500).json(err);
        }
    },

    updateHostingPlans: async(req, res) => {
        try {
            const hostingPlans = await HostingPlans.findById(req.params.id);
            await hostingPlans.updateOne({$set: req.body});
            res.status(200).json("Updated successfully");
        } catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = hostingPlansController;