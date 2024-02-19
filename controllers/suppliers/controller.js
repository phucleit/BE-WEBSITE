const { Supplier } = require("../../models/suppliers/model");
const { DomainPlans } = require("../../models/plans/domain/model");
const { EmailPlans } = require("../../models/plans/email/model");
const { HostingPlans } = require("../../models/plans/hosting/model");
const { SslPlans } = require("../../models/plans/ssl/model");

const { ObjectId } = require('mongoose').Types;

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
      const supplier = await Supplier.aggregate([
        {
          $match: {
            _id: new ObjectId(req.params.id),
          },
        },

        // domainplans
        {
          $lookup: {
            from: "domainplans",
            localField: "_id",
            foreignField: "supplier_id",
            as: "domainPlans"
          }
        },
        {
          $unwind: { path: "$domainPlans", preserveNullAndEmptyArrays: true },
        },
        {
          $sort: {
            'domainPlans.createdAt': -1,
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            company: { $first: "$company" },
            tax_code: { $first: "$tax_code" },
            phone: { $first: "$phone" },
            name_support: { $first: "$name_support" },
            phone_support: { $first: "$phone_support" },
            address: { $first: "$address" },
            createdAt: { $first: "$createdAt" },
            __v: { $first: "$__v" },
            domainPlans: { $push: "$domainPlans" },
          },
        },

        // emailplans
        {
          $lookup: {
            from: "emailplans",
            localField: "_id",
            foreignField: "supplier_id",
            as: "emailPlans"
          }
        },
        {
          $unwind: { path: "$emailPlans", preserveNullAndEmptyArrays: true },
        },
        {
          $sort: {
            'emailPlans.createdAt': -1,
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            company: { $first: "$company" },
            tax_code: { $first: "$tax_code" },
            phone: { $first: "$phone" },
            name_support: { $first: "$name_support" },
            phone_support: { $first: "$phone_support" },
            address: { $first: "$address" },
            createdAt: { $first: "$createdAt" },
            __v: { $first: "$__v" },
            domainPlans: { $first: "$domainPlans" },
            emailPlans: { $push: "$emailPlans" },
          },
        },

        // hostingPlans
        {
          $lookup: {
            from: "hostingplans",
            localField: "_id",
            foreignField: "supplier_id",
            as: "hostingPlans"
          }
        },
        {
          $unwind: { path: "$hostingPlans", preserveNullAndEmptyArrays: true },
        },
        {
          $sort: {
            'hostingPlans.createdAt': -1,
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            company: { $first: "$company" },
            tax_code: { $first: "$tax_code" },
            phone: { $first: "$phone" },
            name_support: { $first: "$name_support" },
            phone_support: { $first: "$phone_support" },
            address: { $first: "$address" },
            createdAt: { $first: "$createdAt" },
            __v: { $first: "$__v" },
            domainPlans: { $first: "$domainPlans" },
            emailPlans: { $first: "$emailPlans" },
            hostingPlans: { $push: "$hostingPlans" },
          },
        },

        // sslPlans
        {
          $lookup: {
            from: "sslplans",
            localField: "_id",
            foreignField: "supplier_id",
            as: "sslPlans"
          }
        },
        {
          $unwind: { path: "$sslPlans", preserveNullAndEmptyArrays: true },
        },
        {
          $sort: {
            'sslPlans.createdAt': -1,
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            company: { $first: "$company" },
            tax_code: { $first: "$tax_code" },
            phone: { $first: "$phone" },
            name_support: { $first: "$name_support" },
            phone_support: { $first: "$phone_support" },
            address: { $first: "$address" },
            createdAt: { $first: "$createdAt" },
            __v: { $first: "$__v" },
            domainPlans: { $first: "$domainPlans" },
            emailPlans: { $first: "$emailPlans" },
            hostingPlans: { $first: "$hostingPlans" },
            sslPlans: { $push: "$sslPlans" },
          },
        },
      ]);
      
      res.status(200).json(supplier);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  deleteSupplier: async(req, res) => {
    try {
      await DomainPlans.updateMany({supplier_id: req.params.id}, {supplier_id: null});
      await EmailPlans.updateMany({supplier_id: req.params.id}, {supplier_id: null});
      await HostingPlans.updateMany({supplier_id: req.params.id}, {supplier_id: null});
      await SslPlans.updateMany({supplier_id: req.params.id}, {supplier_id: null});
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