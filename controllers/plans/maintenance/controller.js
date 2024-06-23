const MaintenancePlans = require("../../../models/plans/maintenance/model");

const maintenancePlansController = {
  addMaintenancePlans: async(req, res) => {
    try {
      const newMaintenancePlans = new MaintenancePlans(req.body);
      const saveMaintenancePlans = await newMaintenancePlans.save();
      return res.status(200).json(saveMaintenancePlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getMaintenancePlans: async(req, res) => {
    try {
      const maintenancePlans = await MaintenancePlans.find().sort({"createdAt": -1});
      return res.status(200).json(maintenancePlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getDetailMaintenancePlans: async(req, res) => {
    try {
      const maintenancePlans = await MaintenancePlans.findById(req.params.id);
      return res.status(200).json(maintenancePlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  deleteMaintenancePlans: async(req, res) => {
    try {
      await MaintenancePlans.findByIdAndDelete(req.params.id);
      return res.status(200).json("Xóa thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  updateMaintenancePlans: async(req, res) => {
    try {
      const maintenancePlans = await MaintenancePlans.findById(req.params.id);
      await maintenancePlans.updateOne({$set: req.body});
      return res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  }
}

module.exports = maintenancePlansController;