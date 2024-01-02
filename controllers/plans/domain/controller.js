const { DomainPlans } = require("../../../models/plans/domain/model");

const domainPlansController = {
    addDomainPlans: async(req, res) => {
        try {
            const newDomainPlans = new DomainPlans(req.body);
            const saveDomainPlans = await newDomainPlans.save();
            
            res.status(200).json(saveDomainPlans);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    getDomainPlans: async(req, res) => {
        try {
            const domainPlans = await DomainPlans.find().sort({"createdAt": -1}).populate('supplier_id', 'name company');
            
            res.status(200).json(domainPlans);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    getDetailDomainPlans: async(req, res) => {
        try {
            const domainPlans = await DomainPlans.findById(req.params.id).populate('supplier_id', 'name company phone address');
            
            res.status(200).json(domainPlans);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    deleteDomainPlans: async(req, res) => {
        try {
            await DomainPlans.findByIdAndDelete(req.params.id);
            
            res.status(200).json("Deleted successfully!");
        } catch(err) {
            res.status(500).json(err);
        }
    },

    updateDomainPlans: async(req, res) => {
        try {
            const domainPlans = await DomainPlans.findById(req.params.id);
            await domainPlans.updateOne({$set: req.body});
            
            res.status(200).json("Updated successfully!");
        } catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = domainPlansController;