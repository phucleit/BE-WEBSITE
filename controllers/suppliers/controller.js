const { Supplier } = require("../../models/suppliers/model");
const { DomainPlans } = require("../../models/plans/domain/model");
const { EmailPlans } = require("../../models/plans/email/model");
const { HostingPlans } = require("../../models/plans/hosting/model");
const { SslPlans } = require("../../models/plans/ssl/model");

const supplierController = {
  addSupplier: async(req, res) => {
    try {
      const newSupplier = new Supplier(req.body);
      const saveSupplier = await newSupplier.save();
      res.status(200).json(saveSupplier);
    } catch(err) {
      res.status(500).json(err);
    }
},

  getSupplier: async(req, res) => {
    try {
      const suppliers = await Supplier.find().sort({"createdAt": -1});
      res.status(200).json(suppliers);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDetailSupplier: async(req, res) => {
    try {
      const supplier = await Supplier.findById(req.params.id).populate("domainPlans").populate("emailPlans").populate("hostingPlans").populate("sslPlans");
      res.status(200).json(supplier);
    } catch(err) {
        res.status(500).json(err);
    }
  },

  deleteSupplier: async(req, res) => {
    try {
      await DomainPlans.updateMany({supplier: req.params.id}, {supplier: null});
      await EmailPlans.updateMany({supplier: req.params.id}, {supplier: null});
      await HostingPlans.updateMany({supplier: req.params.id}, {supplier: null});
      await SslPlans.updateMany({supplier: req.params.id}, {supplier: null});
      await Supplier.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateSupplier: async(req, res) => {
    try {
      const supplier = await Supplier.findById(req.params.id);
      await supplier.updateOne({$set: req.body});
      res.status(200).json("Updated successfully");
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = supplierController;