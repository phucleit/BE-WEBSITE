const MaintenancePlans = require("../../../models/plans/maintenance/model");

const maintenancePlansController = {
  addMaintenancePlans: async(req, res) => {
    try {
      const newMaintenancePlans = new MaintenancePlans(req.body);
      const saveMaintenancePlans = await newMaintenancePlans.save();
      
      res.status(200).json(saveMaintenancePlans);
    } catch(err) {
        res.status(500).json(err);
    }
  },

  getMaintenancePlans: async(req, res) => {
    try {
      const maintenancePlans = await MaintenancePlans.find().sort({"createdAt": -1});
      
      res.status(200).json(maintenancePlans);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDetailMaintenancePlans: async(req, res) => {
    try {
      const maintenancePlans = await MaintenancePlans.findById(req.params.id);
      
      res.status(200).json(maintenancePlans);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  deleteMaintenancePlans: async(req, res) => {
    try {
      await MaintenancePlans.findByIdAndDelete(req.params.id);
      
      res.status(200).json("Deleted successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateMaintenancePlans: async(req, res) => {
    try {
      const maintenancePlans = await MaintenancePlans.findById(req.params.id);
      await maintenancePlans.updateOne({$set: req.body});
      
      res.status(200).json("Updated successfully");
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = maintenancePlansController;