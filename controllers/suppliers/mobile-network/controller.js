const MobileNetwork = require("../../../models/suppliers/mobile-network/model");

const mobileNetworkController = {
  getMobileNetwork: async(req, res) => {
    try {
      const mobileNetwork = await MobileNetwork.find().sort({"createdAt": -1});
      res.status(200).json(mobileNetwork);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  addMobileNetwork: async(req, res) => {
    try {
      const newMobileNetwork = new MobileNetwork(req.body);
      const saveMobileNetwork = await newMobileNetwork.save();
      res.status(200).json(saveMobileNetwork);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDetailMobileNetwork: async(req, res) => {
    try {
      const mobileNetwork = await MobileNetwork.findById(req.params.id);
      res.status(200).json(mobileNetwork);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateMobileNetwork: async(req, res) => {
    try {
      const mobileNetwork = await MobileNetwork.findById(req.params.id);
      await mobileNetwork.updateOne({$set: req.body});
      res.status(200).json("Updated successfully");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  deleteMobileNetwork: async(req, res) => {
    try {
      await MobileNetwork.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },
}

module.exports = mobileNetworkController;