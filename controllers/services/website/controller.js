const WebsiteServices = require("../../../models/services/website/model");

const websiteServicesController = {
  addWebsiteServices: async(req, res) => {
    try {
      const newWebsite = new WebsiteServices(req.body);
      newWebsite.status = 1;
      const saveWebsiteServices = await newWebsite.save();
      
      res.status(200).json(saveWebsiteServices);
    } catch(err) {
      res.status(500).json(err);
    }
},

  getWebsiteServices: async(req, res) => {
    try {
      let websiteServices = await WebsiteServices
        .find()
        .sort({"createdAt": -1})
        .populate('domain_service_id');
      
      for (const item of websiteServices) {
        const domain_plan_id = item.domain_service_id.domain_plan_id;
        const domain_supplier_id = item.domain_service_id.supplier_id;

        try {
          websiteServices = await WebsiteServices.findByIdAndUpdate(
            item._id,
            {
              $set: {
                domain_plan_id: domain_plan_id,
                domain_supplier_id: domain_supplier_id,
              }
            },
            { new: true }
          );
        } catch (error) {
          console.log(error);
          res.status(500).json(error);
        }
      }

      websiteServices = await WebsiteServices.find().sort({"createdAt": -1})
        .populate('domain_service_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('domain_plan_id', 'name')
        .populate('domain_supplier_id', 'name company')
      
      
      res.status(200).json(websiteServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDetailWebsiteServices: async(req, res) => {
    try {
      const websiteServices = await WebsiteServices.findById(req.params.id)
        .populate('domain_service_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('domain_plan_id', 'name')
        .populate('domain_supplier_id', 'name company');

      
      res.status(200).json(websiteServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  deleteWebsiteServices: async(req, res) => {
    try {
      await WebsiteServices.findByIdAndDelete(req.params.id);
      
      res.status(200).json("Deleted successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateWebsiteServices: async(req, res) => {
    try {
      const websiteServices = await WebsiteServices.findById(req.params.id);
      await websiteServices.updateOne({$set: req.body});
      
      res.status(200).json("Updated successfully");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getWebsiteServicesClosed: async(req, res) => {
    try {
      var websiteServicesClosed = await WebsiteServices.find(
        {
          status: 2
        }
      )
      .sort({"createdAt": -1})
      .populate('domain_service_id')
      .populate('customer_id', 'fullname gender email phone')
      .populate('domain_plan_id', 'name')
      .populate('domain_supplier_id', 'name company');
    
      
      res.status(200).json(websiteServicesClosed);
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = websiteServicesController;