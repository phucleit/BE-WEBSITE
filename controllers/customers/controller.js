const fs = require('fs');
const { Customer } = require("../../models/customers/model");

const { ObjectId } = require('mongoose').Types;

const customerController = {
  addCustomer: async(req, res) => {
    try {
      const newCustomer = new Customer(req.body);
      if (req.files.image_front_view) {
        let imagesBuffer = [];
        req.files.image_front_view.forEach(function (file) {
          const imageBuffer = fs.readFileSync(file.path);
          const base64Image = imageBuffer.toString('base64');
          imagesBuffer.push(base64Image);
        });
        newCustomer.image_front_view = imagesBuffer;
      }

      if (req.files.image_back_view) {
        let imagesBuffer = [];
        req.files.image_back_view.forEach(function (file) {
            const imageBuffer = fs.readFileSync(file.path);
            const base64Image = imageBuffer.toString('base64');
            imagesBuffer.push(base64Image);
        });
        newCustomer.image_back_view = imagesBuffer;
      }

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
      const customers = await Customer.findById(req.params.id);
      res.status(200).json(customers);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDomainServiceByCustomerId: async(req, res) => {
    try {
      const domainServiceByCustomerId = await Customer.aggregate([
        {
          $match: {
            _id: new ObjectId(req.params.id),
          },
        },

        {
          $lookup: {
            from: "domainservices",
            localField: "_id",
            foreignField: "customer_id",
            as: "domain_services"
          }
        },
        { $unwind: { path: "$domain_services", preserveNullAndEmptyArrays: true } },
        {
          $sort: {
            "domain_services.createdAt": -1,
          },
        },
        {
          $lookup: {
            from: "domainplans",
            localField: "domain_services.domain_plan_id",
            foreignField: "_id",
            as: "domain_services.domain_plan"
          }
        },
        {
          $lookup: {
            from: "suppliers",
            localField: "domain_services.supplier_id",
            foreignField: "_id",
            as: "domain_services.supplier"
          }
        },
        {
          $group: {
            _id: "$_id",
            domain_services: { $push: "$domain_services" },
          }
        },
      ]);
      
      res.status(200).json(domainServiceByCustomerId);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getHostingServiceByCustomerId: async(req, res) => {
    try {
      const hostingServiceByCustomerId = await Customer.aggregate([
        {
          $match: {
            _id: new ObjectId(req.params.id),
          },
        },

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
          $sort: {
            'hosting_services.createdAt': -1,
          },
        },
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
        {
          $group: {
            _id: "$_id",
            hosting_services: { $push: "$hosting_services" },
          }
        },
      ]);
      
      res.status(200).json(hostingServiceByCustomerId);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getEmailServiceByCustomerId: async(req, res) => {
    try {
      const emailServiceByCustomerId = await Customer.aggregate([
        {
          $match: {
            _id: new ObjectId(req.params.id),
          },
        },

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
          $sort: {
            'email_services.createdAt': -1,
          },
        },
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
        {
          $group: {
            _id: "$_id",
            email_services: { $push: "$email_services" },
          }
        },
      ]);
      
      res.status(200).json(emailServiceByCustomerId);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getSslServiceByCustomerId: async(req, res) => {
    try {
      const sslServiceByCustomerId = await Customer.aggregate([
        {
          $match: {
            _id: new ObjectId(req.params.id),
          },
        },

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
          $sort: {
            'ssl_services.createdAt': -1,
          },
        },
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
        {
          $group: {
            _id: "$_id",
            ssl_services: { $push: "$ssl_services" },
          }
        },
      ]);
      
      res.status(200).json(sslServiceByCustomerId);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getWebsiteServiceByCustomerId: async(req, res) => {
    try {
      const websiteServiceByCustomerId = await Customer.aggregate([
        {
          $match: {
            _id: new ObjectId(req.params.id),
          },
        },

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
          $sort: {
            'website_services.createdAt': -1,
          },
        },
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
        {
          $group: {
            _id: "$_id",
            website_services: { $push: "$website_services" },
          }
        },
      ]);
      
      res.status(200).json(websiteServiceByCustomerId);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getContentServiceByCustomerId: async(req, res) => {
    try {
      const contentServiceByCustomerId = await Customer.aggregate([
        {
          $match: {
            _id: new ObjectId(req.params.id),
          },
        },

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
          $sort: {
            'content_services.createdAt': -1,
          },
        },
        {
          $lookup: {
            from: 'contentplans',
            localField: 'content_services.content_plan_id',
            foreignField: '_id',
            as: 'content_services.content_plan'
          }
        },
        {
          $group: {
            _id: "$_id",
            content_services: { $push: "$domain_services" },
          }
        },
      ]);
      
      res.status(200).json(contentServiceByCustomerId);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getToplistServiceByCustomerId: async(req, res) => {
    try {
      const toplistServiceByCustomerId = await Customer.aggregate([
        {
          $match: {
            _id: new ObjectId(req.params.id),
          },
        },

        {
          $lookup: {
            from: "toplistservices",
            localField: "_id",
            foreignField: "customer_id",
            as: "toplist_services"
          }
        },
        { $unwind: { path: '$toplist_services', preserveNullAndEmptyArrays: true } },
        {
          $sort: {
            'toplist_services.createdAt': -1,
          },
        },
        {
          $group: {
            _id: "$_id",
            toplist_services: { $push: "$toplist_services" },
          }
        },
      ]);
      
      res.status(200).json(toplistServiceByCustomerId);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getMaintenanceServiceByCustomerId: async(req, res) => {
    try {
      const maintenanceServiceByCustomerId = await Customer.aggregate([
        {
          $match: {
            _id: new ObjectId(req.params.id),
          },
        },

        {
          $lookup: {
            from: "maintenanceservices",
            localField: "_id",
            foreignField: "customer_id",
            as: "maintenance_services"
          }
        },
        { $unwind: { path: '$maintenance_services', preserveNullAndEmptyArrays: true } },
        {
          $sort: {
            'maintenance_services.createdAt': -1,
          },
        },
        {
          $lookup: {
            from: 'domainservices',
            localField: 'maintenance_services.domain_service_id',
            foreignField: '_id',
            as: 'maintenance_services.domain_service'
          }
        },
        {
          $lookup: {
            from: 'domainplans',
            localField: 'maintenance_services.domain_plan_id',
            foreignField: '_id',
            as: 'maintenance_services.domain_plan'
          }
        },
        {
          $lookup: {
            from: 'suppliers',
            localField: 'maintenance_services.domain_supplier_id',
            foreignField: '_id',
            as: 'maintenance_services.domain_supplier'
          }
        },
        {
          $lookup: {
            from: 'maintenanceplans',
            localField: 'maintenance_services.maintenance_plan_id',
            foreignField: '_id',
            as: 'maintenance_services.maintenance_plan'
          }
        },
        {
          $group: {
            _id: "$_id",
            maintenance_services: { $push: "$maintenance_services" },
          }
        },
      ]);
      
      res.status(200).json(maintenanceServiceByCustomerId);
    } catch(err) {
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

      if (req.files.image_front_view) {
        let imagesBuffer = [];
        req.files.image_front_view.forEach(function (file) {
          const imageBuffer = fs.readFileSync(file.path);
          const base64Image = imageBuffer.toString('base64');
          imagesBuffer.push(base64Image);
        });
        customer.image_front_view = imagesBuffer;
        await customer.updateOne({$set: {image_front_view: imagesBuffer}});
      }
    
      if (req.files.image_back_view) {
        let imagesBuffer = [];
        req.files.image_back_view.forEach(function (file) {
          const imageBuffer = fs.readFileSync(file.path);
          const base64Image = imageBuffer.toString('base64');
          imagesBuffer.push(base64Image);
        });
        customer.image_back_view = imagesBuffer;
        await customer.updateOne({$set: {image_back_view: imagesBuffer}});
      }

      await customer.updateOne({$set: req.body});
      
      res.status(200).json("Updated successfully");
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = customerController;