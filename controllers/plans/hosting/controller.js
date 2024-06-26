const HostingPlans = require("../../../models/plans/hosting/model");

const hostingPlansController = {
  addHostingPlans: async(req, res) => {
    try {
      const newHostingPlans = new HostingPlans(req.body);
      const saveHostingPlans = await newHostingPlans.save();
      return res.status(200).json(saveHostingPlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getHostingPlans: async(req, res) => {
    try {
      const hostingPlans = await HostingPlans.find().sort({"createdAt": -1}).populate('supplier_id', 'name company');
      return res.status(200).json(hostingPlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getDetailHostingPlans: async(req, res) => {
    try {
      const hostingPlans = await HostingPlans.findById(req.params.id).populate('supplier_id', 'name company phone address');
      return res.status(200).json(hostingPlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  deleteHostingPlans: async(req, res) => {
    try {
      await HostingPlans.findByIdAndDelete(req.params.id);
      return res.status(200).json("Xóa thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  updateHostingPlans: async(req, res) => {
    try {
      const hostingPlans = await HostingPlans.findById(req.params.id);
      await hostingPlans.updateOne({$set: req.body});
      return res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  }
}

module.exports = hostingPlansController;