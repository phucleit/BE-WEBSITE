const dayjs = require('dayjs');

const { SslServices } = require("../../../models/services/ssl/model");

const sslServicesController = {
  addSslServices: async(req, res) => {
    try {
      const newSslServices = new SslServices(req.body);
      newSslServices.expiredAt = new Date(newSslServices.registeredAt);
      newSslServices.expiredAt.setFullYear(newSslServices.expiredAt.getFullYear() + req.body.periods);
      newSslServices.status = 1;
      const saveSslServices = await newSslServices.save();
      
      res.status(200).json(saveSslServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getSslServices: async(req, res) => {
    try {
      let sslServices = await SslServices
        .find()
        .sort({"createdAt": -1})
        .populate('domain_service_id')
        .populate('ssl_plan_id');
      
      for (const item of sslServices) {
        const domain_plan_id = item.domain_service_id.domain_plan_id;
        const domain_supplier_id = item.domain_service_id.supplier_id;
        const ssl_supplier_id = item.ssl_plan_id.supplier_id;

        try {
          sslServices = await SslServices.findByIdAndUpdate(
            item._id,
            {
              $set: {
                domain_plan_id: domain_plan_id,
                domain_supplier_id: domain_supplier_id,
                ssl_supplier_id: ssl_supplier_id,
              }
            },
            { new: true }
          );
        } catch (error) {
          res.status(500).json(error);
        }
      }

      sslServices = await SslServices.find().sort({"createdAt": -1})
        .populate('domain_service_id')
        .populate('ssl_plan_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('domain_plan_id')
        .populate('domain_supplier_id', 'name company')
        .populate('ssl_supplier_id', 'name company');
      
      
      res.status(200).json(sslServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDetailSslServices: async(req, res) => {
    try {
      const sslServices = await SslServices.findById(req.params.id)
        .populate('domain_service_id')
        .populate('ssl_plan_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('domain_plan_id')
        .populate('domain_supplier_id', 'name company')
        .populate('ssl_supplier_id', 'name company');

      
      res.status(200).json(sslServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  deleteSslServices: async(req, res) => {
    try {
      await SslServices.findByIdAndDelete(req.params.id);
      
      res.status(200).json("Deleted successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateSslServices: async(req, res) => {
    try {
      const sslServices = await SslServices.findById(req.params.id);
      if (req.body.periods) {
        const currentDate = new Date();
        const expiredAt = currentDate.setFullYear(currentDate.getFullYear() + req.body.periods);
        await sslServices.updateOne({$set: {expiredAt: expiredAt, status: 1}});
      }

      if (req.body.before_payment) {
        await sslServices.updateOne({$set: {before_payment: true}});
      }
      
      await sslServices.updateOne({$set: req.body});
      res.status(200).json("Updated successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getSslServicesExpired: async(req, res) => {
    try {
      var currentDate = new Date();
      var sslServicesExpired = await SslServices.find(
        {
          expiredAt: {$lte: currentDate}
        }
      );

      for (const item of sslServicesExpired) {
        try {
          sslServicesExpired = await SslServices.findByIdAndUpdate(
            item._id,
            {
              $set: {
                status: 3
              }
            },
            { new: true }
          );
        } catch (error) {
          res.status(500).json(error);
        }
      }

      sslServicesExpired = await SslServices
        .find(
          {
            expiredAt: {$lte: currentDate}
          }
        )
        .sort({"createdAt": -1})
        .populate('domain_service_id')
        .populate('ssl_plan_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('domain_plan_id')
        .populate('domain_supplier_id', 'name company')
        .populate('ssl_supplier_id', 'name company');
      
      res.status(200).json(sslServicesExpired);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getSslServicesExpiring: async(req, res) => {
    try {
      var currentDate = new Date();
      var dateExpired = dayjs(currentDate).add(30, 'day');
      var sslServicesExpiring = await SslServices.find(
        {
          expiredAt: {
            $gte: dayjs(currentDate).startOf('day').toDate(),
            $lte: dayjs(dateExpired).endOf('day').toDate()
          }
        }
      );

      for (const item of sslServicesExpiring) {
        try {
          sslServicesExpiring = await SslServices.findByIdAndUpdate(
            item._id,
            {
              $set: {
                status: 2
              }
            },
            { new: true }
          );
        } catch (error) {
          res.status(500).json(error);
        }
      }

      sslServicesExpiring = await SslServices
        .find(
          {
            expiredAt: {
              $gte: dayjs(currentDate).startOf('day').toDate(),
              $lte: dayjs(dateExpired).endOf('day').toDate()
            }
          }
        )
        .sort({"createdAt": -1})
        .populate('domain_service_id')
        .populate('ssl_plan_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('domain_plan_id')
        .populate('domain_supplier_id', 'name company')
        .populate('ssl_supplier_id', 'name company');
      
      res.status(200).json(sslServicesExpiring);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getSslServicesBeforePayment: async(req, res) => {
    try {
      const sslServicesBeforePayment = await SslServices
        .find(
          {
            before_payment: true
          }
        )
        .sort({"createdAt": -1})
        .populate('domain_service_id')
        .populate('ssl_plan_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('domain_plan_id')
        .populate('domain_supplier_id', 'name company')
        .populate('ssl_supplier_id', 'name company');
      
      res.status(200).json(sslServicesBeforePayment);
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = sslServicesController;