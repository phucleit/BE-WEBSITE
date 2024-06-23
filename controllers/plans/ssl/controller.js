const SslPlans = require("../../../models/plans/ssl/model");

const sslPlansController = {
    addSslPlans: async(req, res) => {
        try {
            const newSslPlans = new SslPlans(req.body);
            const saveSslPlans = await newSslPlans.save();
            return res.status(200).json(saveSslPlans);
        } catch(err) {
            console.error(err);
            return res.status(500).send(err.message);
        }
    },

    getSslPlans: async(req, res) => {
        try {
            const sslPlans = await SslPlans.find().sort({"createdAt": -1}).populate('supplier_id', 'name company');
            return res.status(200).json(sslPlans);
        } catch(err) {
            console.error(err);
            return res.status(500).send(err.message);
        }
    },

    getDetailSslPlans: async(req, res) => {
        try {
            const sslPlans = await SslPlans.findById(req.params.id).populate('supplier_id', 'name company phone address');
            return res.status(200).json(sslPlans);
        } catch(err) {
            console.error(err);
            return res.status(500).send(err.message);
        }
    },

    deleteSslPlans: async(req, res) => {
        try {
            await SslPlans.findByIdAndDelete(req.params.id);
            return res.status(200).json("Xóa thành công!");
        } catch(err) {
            console.error(err);
            return res.status(500).send(err.message);
        }
    },

    updateSslPlans: async(req, res) => {
        try {
            const sslPlans = await SslPlans.findById(req.params.id);
            await sslPlans.updateOne({$set: req.body});
            return res.status(200).json("Cập nhật thành công!");
        } catch(err) {
            console.error(err);
            return res.status(500).send(err.message);
        }
    }
}

module.exports = sslPlansController;