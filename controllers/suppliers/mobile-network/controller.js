const MobileNetwork = require("../../../models/suppliers/mobile-network/model");

const mobileNetworkController = {
  getMobileNetwork: async(req, res) => {
    try {
      const mobileNetwork = await MobileNetwork.find().sort({"createdAt": -1});
      return res.status(200).json(mobileNetwork);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  addMobileNetwork: async(req, res) => {
    try {
      const newMobileNetwork = new MobileNetwork(req.body);
      const saveMobileNetwork = await newMobileNetwork.save();
      return res.status(200).json(saveMobileNetwork);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getDetailMobileNetwork: async(req, res) => {
    try {
      const mobileNetwork = await MobileNetwork.findById(req.params.id);
      return res.status(200).json(mobileNetwork);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  updateMobileNetwork: async(req, res) => {
    try {
      const mobileNetwork = await MobileNetwork.findById(req.params.id);
      await mobileNetwork.updateOne({$set: req.body});
      return res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  deleteMobileNetwork: async(req, res) => {
    try {
      await MobileNetwork.findByIdAndDelete(req.params.id);
      return res.status(200).json("Xóa thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },
}

module.exports = mobileNetworkController;