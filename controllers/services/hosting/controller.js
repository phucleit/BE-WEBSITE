const dayjs = require('dayjs');

const { HostingServices } = require("../../../models/services/hosting/model");

const hostingServicesController = {
  addHostingServices: async(req, res) => {
    try {
      const newHostingServices = new HostingServices(req.body);
      newHostingServices.expiredAt = new Date(newHostingServices.createdAt);
      newHostingServices.expiredAt.setFullYear(newHostingServices.expiredAt.getFullYear() + req.body.periods);
      newHostingServices.status = 1;
      const saveHostingServices = await newHostingServices.save();
      res.status(200).json(saveHostingServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getHostingServices: async(req, res) => {
    try {
      let hostingServices = await HostingServices
        .find()
        .sort({"createdAt": -1})
        .populate('domain_service_id')
        .populate('hosting_plan_id');
      
      for (const item of hostingServices) {
        const domain_plan_id = item.domain_service_id.domain_plan_id;
        const domain_supplier_id = item.domain_service_id.supplier_id;
        const hosting_supplier_id = item.hosting_plan_id.supplier_id;

        try {
          hostingServices = await HostingServices.findByIdAndUpdate(
            item._id,
            {
              $set: {
                domain_plan_id: domain_plan_id,
                domain_supplier_id: domain_supplier_id,
                hosting_supplier_id: hosting_supplier_id,
              }
            },
            { new: true }
          );
        } catch (error) {
          res.status(500).json(error);
        }
      }

      hostingServices = await HostingServices.find().sort({"createdAt": -1})
        .populate('domain_service_id')
        .populate('hosting_plan_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('domain_plan_id', 'name')
        .populate('domain_supplier_id', 'name company')
        .populate('hosting_supplier_id', 'name company');
      
      res.status(200).json(hostingServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDetailHostingServices: async(req, res) => {
    try {
      
    } catch(err) {
      res.status(500).json(err);
    }
  },

  deleteHostingServices: async(req, res) => {
    try {
      await HostingServices.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateHostingServices: async(req, res) => {
    try {
      
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getHostingServicesExpired: async(req, res) => {
    try {
      
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getHostingServicesExpiring: async(req, res) => {
    try {
      
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = hostingServicesController;