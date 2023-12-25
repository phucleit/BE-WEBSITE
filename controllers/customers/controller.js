const { Customer } = require("../../models/customers/model");

const { ObjectId } = require('mongoose').Types;

const customerController = {
  addCustomer: async(req, res) => {
    try {
      const newCustomer = new Customer(req.body);
      const saveCustomer = await newCustomer.save();
      res.status(200).json(saveCustomer);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getCustomer: async(req, res) => {
    try {
      const customers = await Customer.find().sort({"createdAt": -1});
      res.status(200).json(customers);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDetailCustomer: async(req, res) => {
    try {
      const customer = await Customer.aggregate([
        {
          $match: {
            _id: new ObjectId(req.params.id),
          },
        },
        //domainservices
        {
          $lookup: {
            from: "domainservices",
            localField: "_id",
            foreignField: "customer_id",
            as: "domain_services"
          }
        },
        { $unwind: { path: '$domain_services', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'domainplans',
            localField: 'domain_services.domain_plan_id',
            foreignField: '_id',
            as: 'domain_services.domain_plan'
          }
        },
        {
          $lookup: {
            from: 'suppliers',
            localField: 'domain_services.supplier_id',
            foreignField: '_id',
            as: 'domain_services.supplier'
          }
        },

        // hostingservices
        {
          $lookup: {
            from: "hostingservices",
            localField: "_id",
            foreignField: "customer_id",
            as: "hosting_services"
          }
        },
        { $unwind: { path: '$hosting_services', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'domainservices',
            localField: 'hosting_services.domain_service_id',
            foreignField: '_id',
            as: 'hosting_services.domain_service'
          }
        },
        {
          $lookup: {
            from: 'hostingplans',
            localField: 'hosting_services.hosting_plan_id',
            foreignField: '_id',
            as: 'hosting_services.hosting_plan'
          }
        },
        {
          $lookup: {
            from: 'domainplans',
            localField: 'hosting_services.domain_plan_id',
            foreignField: '_id',
            as: 'hosting_services.domain_plan'
          }
        },
        {
          $lookup: {
            from: 'suppliers',
            localField: 'hosting_services.domain_supplier_id',
            foreignField: '_id',
            as: 'hosting_services.domain_supplier'
          }
        },
        {
          $lookup: {
            from: 'suppliers',
            localField: 'hosting_services.hosting_supplier_id',
            foreignField: '_id',
            as: 'hosting_services.hosting_supplier'
          }
        },

        // emailservices
        {
          $lookup: {
            from: "emailservices",
            localField: "_id",
            foreignField: "customer_id",
            as: "email_services"
          }
        },
        { $unwind: { path: '$email_services', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'domainservices',
            localField: 'email_services.domain_service_id',
            foreignField: '_id',
            as: 'email_services.domain_service'
          }
        },
        {
          $lookup: {
            from: 'emailplans',
            localField: 'email_services.email_plan_id',
            foreignField: '_id',
            as: 'email_services.email_plan'
          }
        },
        {
          $lookup: {
            from: 'domainplans',
            localField: 'email_services.domain_plan_id',
            foreignField: '_id',
            as: 'email_services.domain_plan'
          }
        },
        {
          $lookup: {
            from: 'suppliers',
            localField: 'email_services.domain_supplier_id',
            foreignField: '_id',
            as: 'email_services.domain_supplier'
          }
        },
        {
          $lookup: {
            from: 'suppliers',
            localField: 'email_services.email_supplier_id',
            foreignField: '_id',
            as: 'email_services.email_supplier'
          }
        },
        
        // sslservices
        {
          $lookup: {
            from: "sslservices",
            localField: "_id",
            foreignField: "customer_id",
            as: "ssl_services"
          }
        },
        { $unwind: { path: '$ssl_services', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'domainservices',
            localField: 'ssl_services.domain_service_id',
            foreignField: '_id',
            as: 'ssl_services.domain_service'
          }
        },
        {
          $lookup: {
            from: 'sslplans',
            localField: 'ssl_services.ssl_plan_id',
            foreignField: '_id',
            as: 'ssl_services.ssl_plan'
          }
        },
        {
          $lookup: {
            from: 'domainplans',
            localField: 'ssl_services.domain_plan_id',
            foreignField: '_id',
            as: 'ssl_services.domain_plan'
          }
        },
        {
          $lookup: {
            from: 'suppliers',
            localField: 'ssl_services.domain_supplier_id',
            foreignField: '_id',
            as: 'ssl_services.domain_supplier'
          }
        },
        {
          $lookup: {
            from: 'suppliers',
            localField: 'ssl_services.ssl_supplier_id',
            foreignField: '_id',
            as: 'ssl_services.ssl_supplier'
          }
        },

        // websiteservices
        {
          $lookup: {
            from: "websiteservices",
            localField: "_id",
            foreignField: "customer_id",
            as: "website_services"
          }
        },
        { $unwind: { path: '$website_services', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'domainservices',
            localField: 'website_services.domain_service_id',
            foreignField: '_id',
            as: 'website_services.domain_service'
          }
        },
        {
          $lookup: {
            from: 'domainplans',
            localField: 'website_services.domain_plan_id',
            foreignField: '_id',
            as: 'website_services.domain_plan'
          }
        },
        {
          $lookup: {
            from: 'suppliers',
            localField: 'website_services.domain_supplier_id',
            foreignField: '_id',
            as: 'website_services.domain_supplier'
          }
        },

        // contentservices
        {
          $lookup: {
            from: "contentservices",
            localField: "_id",
            foreignField: "customer_id",
            as: "content_services"
          }
        },
        { $unwind: { path: '$content_services', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'contentplans',
            localField: 'content_services.content_plan_id',
            foreignField: '_id',
            as: 'content_services.content_plan'
          }
        },

        // group
        {
          $group: {
            _id: '$_id',
            fullname: { $first: '$fullname' },
            email: { $first: '$email' },
            gender: { $first: '$gender' },
            idNumber: { $first: '$idNumber' },
            phone: { $first: '$phone' },
            address: { $first: '$address' },
            createdAt: { $first: '$createdAt' },
            __v: { $first: '$__v' },
            domain_services: { $addToSet: '$domain_services' },
            hosting_services: { $addToSet: '$hosting_services' },
            email_services: { $addToSet: '$email_services' },
            ssl_services: { $addToSet: '$ssl_services' },
            website_services: { $addToSet: '$website_services' },
            content_services: { $addToSet: '$content_services' },
          }
        },
      ]);
      res.status(200).json(customer);
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  deleteCustomer: async(req, res) => {
    try {
      const customer = await Customer.findByIdAndDelete(req.params.id);
      res.status(200).json(customer);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateCustomer: async(req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      await customer.updateOne({$set: req.body});
      res.status(200).json("Updated successfully");
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = customerController;