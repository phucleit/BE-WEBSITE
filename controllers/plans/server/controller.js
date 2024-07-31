const ServerPlans = require("../../../models/plans/server/model");
const logAction = require("../../../middleware/action_logs");

const ServerPlansController = {
  addServerPlans: async(req, res) => {
    try {
      const newServerPlans = new ServerPlans(req.body);
      const saveServerPlans = await newServerPlans.save();
      await logAction(req.auth._id, 'Gói DV Server', 'Thêm mới');
      return res.status(200).json(saveServerPlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getServerPlans: async(req, res) => {
    try {
      const serverPlans = await ServerPlans.find().sort({"createdAt": -1}).populate('supplier_server_id', 'name company');
      return res.status(200).json(serverPlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getDetailServerPlans: async(req, res) => {
    try {
      const serverPlans = await ServerPlans.findById(req.params.id).populate('supplier_server_id', 'name company phone address');
      return res.status(200).json(serverPlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  deleteServerPlans: async(req, res) => {
    try {
      await ServerPlans.findByIdAndDelete(req.params.id);
      await logAction(req.auth._id, 'Gói DV Server', 'Xóa');
      return res.status(200).json("Xóa thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  updateServerPlans: async(req, res) => {
    try {
      const serverPlans = await ServerPlans.findById(req.params.id);
      await serverPlans.updateOne({$set: req.body});
      await logAction(req.auth._id, 'Gói DV Server', 'Cập nhật');
      return res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  }
}

module.exports = ServerPlansController;