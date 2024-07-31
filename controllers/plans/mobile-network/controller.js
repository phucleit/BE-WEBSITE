const MobileNetworkPlans = require("../../../models/plans/mobile-network/model");
const logAction = require("../../../middleware/action_logs");

const mobileNetworkPlansController = {
  getMobileNetworkPlans: async(req, res) => {
    try {
      const mobileNetworkPlans = await MobileNetworkPlans.find().sort({"createdAt": -1}).populate('supplier_mobile_network_id');
      return res.status(200).json(mobileNetworkPlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  addMobileNetworkPlans: async(req, res) => {
    try {
      const newMobileNetworkPlans = new MobileNetworkPlans(req.body);
      const saveMobileNetworkPlans = await newMobileNetworkPlans.save();
      await logAction(req.auth._id, 'Gói DV Nhà mạng', 'Thêm mới');
      return res.status(200).json(saveMobileNetworkPlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getDetailMobileNetworkPlans: async(req, res) => {
    try {
      const mobileNetworkPlans = await MobileNetworkPlans.findById(req.params.id).populate('supplier_mobile_network_id');
      return res.status(200).json(mobileNetworkPlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  updateMobileNetworkPlans: async(req, res) => {
    try {
      const mobileNetworkPlans = await MobileNetworkPlans.findById(req.params.id);
      await mobileNetworkPlans.updateOne({$set: req.body});
      await logAction(req.auth._id, 'Gói DV Nhà mạng', 'Cập nhật');
      return res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  deleteMobileNetworkPlans: async(req, res) => {
    try {
      await MobileNetworkPlans.findByIdAndDelete(req.params.id);
      await logAction(req.auth._id, 'Gói DV Nhà mạng', 'Xóa');
      return res.status(200).json("Xóa thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },
}

module.exports = mobileNetworkPlansController;