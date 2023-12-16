const { DomainServices } = require("../../../models/services/domain/model");
const { Supplier } = require("../../../models/suppliers/model");

const { ObjectId } = require('mongoose').Types;

const domainServicesController = {
  addDomainServices: async(req, res) => {
    try {
      const newDomainServices = new DomainServices(req.body);
      newDomainServices.expiredAt = new Date(newDomainServices.createdAt);
      newDomainServices.expiredAt.setFullYear(newDomainServices.expiredAt.getFullYear() + req.body.periods);
      newDomainServices.status = 1;
      const saveDomainServices = await newDomainServices.save();
      res.status(200).json(saveDomainServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDomainServices: async(req, res) => {
    try {
      let domainServices = await DomainServices.find().sort({"createdAt": -1}).populate('domain_plan_id').populate('customer_id', 'fullname gender email phone');

      for (const item of domainServices) {
        const supplier_id = item.domain_plan_id.supplier_id;
        try {
          domainServices = await DomainServices.findByIdAndUpdate(
            item._id,
            {
              $set: {
                supplier_id: supplier_id
              }
            },
            { new: true }
          );
        } catch (error) {
          res.status(500).json(error);
        }
      }

      const newDomainServices = await DomainServices.find().sort({"createdAt": -1})
        .populate('domain_plan_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('supplier_id', 'name company');
      
      res.status(200).json(newDomainServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDetailDomainServices: async(req, res) => {
      try {
        const domainServices = await DomainServices.findById(req.params.id)
          .populate('domain_plan_id', 'name price')
          .populate('customer_id', 'fullname gender email phone')
          .populate('supplier_id', 'name company');
        res.status(200).json(domainServices);
      } catch(err) {
          res.status(500).json(err);
      }
  },

  deleteDomainServices: async(req, res) => {
    try {
      await DomainServices.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateDomainServices: async(req, res) => {
    try {
      const domainServices = await DomainServices.findById(req.params.id);
      if (req.body.periods) {
        const expiredAt = domainServices.expiredAt.setFullYear(domainServices.expiredAt.getFullYear() + req.body.periods);
        await domainServices.updateOne({$set: {expiredAt: expiredAt}});
      }
      await domainServices.updateOne({$set: req.body});
      res.status(200).json("Updated successfully!");
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

module.exports = domainServicesController;