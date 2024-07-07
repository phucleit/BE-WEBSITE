const fs = require('fs-extra');
const path = require('path');
const Customer = require("../../models/customers/model");

const { ObjectId } = require('mongoose').Types;

const customerController = {
  addCustomer: async(req, res) => {
    try {
      const {
        fullname,
        email,
        gender,
        idNumber,
        phone,
        address,
        company,
        tax_code,
        address_company,
        representative,
        representative_hotline,
        mail_vat,
      } = req.body;

      const count = await Customer.countDocuments({
        $or: [
          { phone: phone },
          { email: email }
        ]
      });

      if (count > 0 ) throw new Error(`Số điện thoại hoặc email đã được đăng ký!`)
      const newCustomer = new Customer({
        fullname: fullname,
        email: email,
        gender: gender,
        idNumber: idNumber,
        phone: phone,
        address: address,
        company: company,
        tax_code: tax_code,
        address_company: address_company,
        representative: representative,
        representative_hotline: representative_hotline,
        mail_vat: mail_vat,
        image_front_view: req.files['image_front_view'] ? req.files['image_front_view'].map(file => file.path) : [],
        image_back_view: req.files['image_back_view'] ? req.files['image_back_view'].map(file => file.path) : []
      });

      const saveCustomer = await newCustomer.save();
      return res.status(200).json(saveCustomer);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getCustomer: async(req, res) => {
    try {
      const customers = await Customer.find().sort({"createdAt": -1});
      return res.status(200).json(customers);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getDetailCustomer: async(req, res) => {
    try {
      const customers = await Customer.findById(req.params.id);
      return res.status(200).json(customers);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  deleteCustomer: async(req, res) => {
    try {
      const customer = await Customer.findByIdAndDelete(req.params.id);
      if (!customer) {
        return res.status(404).send('Không tìm thấy khách hàng!');
      }
      const deleteFiles = async (filePaths) => {
        for (const filePath of filePaths) {
          try {
            await fs.remove(path.resolve(filePath));
          } catch (err) {
            console.error(`Lỗi xóa tập tin: ${filePath}`, err);
          }
        }
      };
  
      await deleteFiles(customer.image_front_view);
      await deleteFiles(customer.image_back_view);
  
      await Customer.findByIdAndDelete(req.params.id);
  
      return res.status(200).send('Xóa thành công!');
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);    }
  },

  updateCustomer: async(req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);

      if (!customer) {
        return res.status(404).send('Không tìm thấy khách hàng!');
      }

      const updateData = { ...req.body };

      if (req.files['image_front_view']) {
        updateData.image_front_view = req.files['image_front_view'].map(file => file.path);
      }

      if (req.files['image_back_view']) {
        updateData.image_back_view = req.files['image_back_view'].map(file => file.path);
      }

      await Customer.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
      return res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
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
      
      return res.status(200).json(domainServiceByCustomerId);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
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
      
      return res.status(200).json(hostingServiceByCustomerId);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
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
      
      return res.status(200).json(emailServiceByCustomerId);
    } catch(err) {
      console.error(err);
      res.status(500).send(err.message);
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
      
      return res.status(200).json(sslServiceByCustomerId);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
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
      
      return res.status(200).json(websiteServiceByCustomerId);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getContentServiceByCustomerId: async(req, res) => {
    try {
      // const contentServiceByCustomerId = await Customer.aggregate([
      //   {
      //     $match: {
      //       _id: new ObjectId(req.params.id),
      //     },
      //   },

      //   {
      //     $lookup: {
      //       from: "contentservices",
      //       localField: "_id",
      //       foreignField: "customer_id",
      //       as: "content_services"
      //     }
      //   },
      //   { $unwind: { path: '$content_services', preserveNullAndEmptyArrays: true } },
      //   {
      //     $sort: {
      //       'content_services.createdAt': -1,
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: 'contentplans',
      //       localField: 'content_services.content_plan_id',
      //       foreignField: '_id',
      //       as: 'content_services.content_plan'
      //     }
      //   },
      //   {
      //     $group: {
      //       _id: "$_id",
      //       content_services: { $push: "$domain_services" },
      //     }
      //   },
      // ]);
      
      
      let {offset, limit, search} = req.query
      if(!offset){
        offset = 0
      }
      if(!limit) limit = 10

      const {id} = req.params
      if(!ObjectId.isValid(id)) throw new Error(`Không tìm thấy dữ liệu!`)

      let query = {}
      if(ObjectId.isValid(id)){
        query = {
          _id:id
        }
        
      }
      if(search){
        query = {
          ...query,
          $or:[
            {fullname:{$regex:".*"+search+".*", $options:"i"}},
            {phone:{$regex:".*"+search+".*", $options:"i"}},
            {email:{$regex:".*"+search+".*", $options:"i"}},
          ]
        }
      }
        const [
            data,
            count
        ] = await Promise.all([
            Customer.find(query).populate(['data_service']),
            Customer.countDocuments(query),

        ])
     
      return res.json({
        data, 
        count,
        total_page: (offset/limit)+1,
        length: data.length
      });
    } catch(err) {
      return res.status(500).json(err);
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
      
      return res.status(200).json(toplistServiceByCustomerId);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getMaintenanceServiceByCustomerId: async(req, res) => {
    try {

      let {offset, limit} = req.query
      if(!offset){
        offset = 0
      }
      if(!limit) limit = 10

      const {id} = req.params
      if(!ObjectId.isValid(id)) throw new Error(`Không tìm thấy dữ liệu!`)

      const data = await Customer.find({_id:id}).populate(['data_service'])
      console.log(data)
      // const maintenanceServiceByCustomerId = await Customer.aggregate([
      //   {
      //     $match: {
      //       _id: new ObjectId(id),
      //     },
      //   },

      //   {
      //     $lookup: {
      //       from: "maintenanceservices",
      //       localField: "_id",
      //       foreignField: "customer_id",
      //       as: "maintenance_services"
      //     }
      //   },
      //   { $unwind: { path: '$maintenance_services', preserveNullAndEmptyArrays: true } },
      //   {
      //     $sort: {
      //       'maintenance_services.createdAt': -1,
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: 'domainservices',
      //       localField: 'maintenance_services.domain_service_id',
      //       foreignField: '_id',
      //       as: 'maintenance_services.domain_service'
      //     }
      //   },
      //   {
      //     $lookup: {
      //       from: 'domainplans',
      //       localField: 'maintenance_services.domain_plan_id',
      //       foreignField: '_id',
      //       as: 'maintenance_services.domain_plan'
      //     }
      //   },
      //   {
      //     $lookup: {
      //       from: 'suppliers',
      //       localField: 'maintenance_services.domain_supplier_id',
      //       foreignField: '_id',
      //       as: 'maintenance_services.domain_supplier'
      //     }
      //   },
      //   {
      //     $lookup: {
      //       from: 'maintenanceplans',
      //       localField: 'maintenance_services.maintenance_plan_id',
      //       foreignField: '_id',
      //       as: 'maintenance_services.maintenance_plan'
      //     }
      //   },
      //   {
      //     $group: {
      //       _id: "$_id",
      //       maintenance_services: { $push: "$maintenance_services" },
      //     }
      //   },
      // ]);
      
      return res.status(200).json(maintenanceServiceByCustomerId);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },
}

module.exports = customerController;