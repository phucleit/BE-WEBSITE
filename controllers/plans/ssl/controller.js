const SslPlans = require("../../../models/plans/ssl/model");

const sslPlansController = {
    addSslPlans: async(req, res) => {
        try {
            const newSslPlans = new SslPlans(req.body);
            const saveSslPlans = await newSslPlans.save();
            
            res.status(200).json(saveSslPlans);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    getSslPlans: async(req, res) => {
        try {
            const sslPlans = await SslPlans.find().sort({"createdAt": -1}).populate('supplier_id', 'name company');
            
            res.status(200).json(sslPlans);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    getDetailSslPlans: async(req, res) => {
        try {
            const sslPlans = await SslPlans.findById(req.params.id).populate('supplier_id', 'name company phone address');
            
            res.status(200).json(sslPlans);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    deleteSslPlans: async(req, res) => {
        try {
            await SslPlans.findByIdAndDelete(req.params.id);
            
            res.status(200).json("Deleted successfully!");
        } catch(err) {
            res.status(500).json(err);
        }
    },

    updateSslPlans: async(req, res) => {
        try {
            const sslPlans = await SslPlans.findById(req.params.id);
            await sslPlans.updateOne({$set: req.body});
            
            res.status(200).json("Updated successfully");
        } catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = sslPlansController;