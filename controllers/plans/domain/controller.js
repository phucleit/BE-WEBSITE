const DomainPlans = require("../../../models/plans/domain/model");

const domainPlansController = {
    addDomainPlans: async(req, res) => {
        try {
            const newDomainPlans = new DomainPlans(req.body);
            const saveDomainPlans = await newDomainPlans.save();
            return res.status(200).json(saveDomainPlans);
        } catch(err) {
            console.error(err);
            return res.status(500).send(err.message);
        }
    },

    getDomainPlans: async(req, res) => {
        try {
            const domainPlans = await DomainPlans.find().sort({"createdAt": -1}).populate('supplier_id', 'name company');
            return res.status(200).json(domainPlans);
        } catch(err) {
            console.error(err);
            return res.status(500).send(err.message);
        }
    },

    getDetailDomainPlans: async(req, res) => {
        try {
            const domainPlans = await DomainPlans.findById(req.params.id).populate('supplier_id', 'name company phone address');
            return res.status(200).json(domainPlans);
        } catch(err) {
            console.error(err);
            return res.status(500).send(err.message);
        }
    },

    deleteDomainPlans: async(req, res) => {
        try {
            await DomainPlans.findByIdAndDelete(req.params.id);
            return res.status(200).json("Xóa thành công!");
        } catch(err) {
            console.error(err);
            return res.status(500).send(err.message);
        }
    },

    updateDomainPlans: async(req, res) => {
        try {
            const domainPlans = await DomainPlans.findById(req.params.id);
            await domainPlans.updateOne({$set: req.body});
            return res.status(200).json("Cập nhật thành công!");
        } catch(err) {
            console.error(err);
            return res.status(500).send(err.message);
        }
    }
}

module.exports = domainPlansController;