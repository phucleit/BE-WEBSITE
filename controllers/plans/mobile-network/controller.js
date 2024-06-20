const MobileNetworkPlans = require("../../../models/plans/mobile-network/model");

const mobileNetworkPlansController = {
  getMobileNetworkPlans: async(req, res) => {
    try {
      const mobileNetworkPlans = await MobileNetworkPlans.find().sort({"createdAt": -1}).populate('supplierMobileNetworkId');
      res.status(200).json(mobileNetworkPlans);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  addMobileNetworkPlans: async(req, res) => {
    try {
      const newMobileNetworkPlans = new MobileNetworkPlans(req.body);
      const saveMobileNetworkPlans = await newMobileNetworkPlans.save();
      res.status(200).json(saveMobileNetworkPlans);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDetailMobileNetworkPlans: async(req, res) => {
    try {
      const mobileNetworkPlans = await MobileNetworkPlans.findById(req.params.id).populate('supplierMobileNetworkId');
      res.status(200).json(mobileNetworkPlans);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateMobileNetworkPlans: async(req, res) => {
    try {
      const mobileNetworkPlans = await MobileNetworkPlans.findById(req.params.id);
      await mobileNetworkPlans.updateOne({$set: req.body});
      res.status(200).json("Updated successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  deleteMobileNetworkPlans: async(req, res) => {
    try {
      await MobileNetworkPlans.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },
}

module.exports = mobileNetworkPlansController;