const dayjs = require('dayjs');

const { EmailServices } = require("../../../models/services/email/model");

const emailServicesController = {
  addEmailServices: async(req, res) => {
    try {
      const newEmailServices = new EmailServices(req.body);
      newEmailServices.expiredAt = new Date(newEmailServices.registeredAt);
      newEmailServices.expiredAt.setFullYear(newEmailServices.expiredAt.getFullYear() + req.body.periods);
      newEmailServices.status = 1;
      const saveEmailServices = await newEmailServices.save();
      
      res.status(200).json(saveEmailServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getEmailServices: async(req, res) => {
    try {
      let emailServices = await EmailServices
        .find()
        .sort({"createdAt": -1})
        .populate('domain_service_id')
        .populate('email_plan_id');
      
      for (const item of emailServices) {
        const domain_plan_id = item.domain_service_id.domain_plan_id;
        const domain_supplier_id = item.domain_service_id.supplier_id;
        const email_supplier_id = item.email_plan_id.supplier_id;

        try {
          emailServices = await EmailServices.findByIdAndUpdate(
            item._id,
            {
              $set: {
                domain_plan_id: domain_plan_id,
                domain_supplier_id: domain_supplier_id,
                email_supplier_id: email_supplier_id,
              }
            },
            { new: true }
          );
        } catch (error) {
          res.status(500).json(error);
        }
      }

      emailServices = await EmailServices.find().sort({"createdAt": -1})
        .populate('domain_service_id')
        .populate('email_plan_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('domain_plan_id', 'name')
        .populate('domain_supplier_id', 'name company')
        .populate('email_supplier_id', 'name company');
      
      
      res.status(200).json(emailServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDetailEmailServices: async(req, res) => {
    try {
      const emailServices = await EmailServices.findById(req.params.id)
        .populate('domain_service_id')
        .populate('email_plan_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('domain_plan_id', 'name')
        .populate('domain_supplier_id', 'name company')
        .populate('email_supplier_id', 'name company');
      
      
      res.status(200).json(emailServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  deleteEmailServices: async(req, res) => {
    try {
      await EmailServices.findByIdAndDelete(req.params.id);
      
      res.status(200).json("Deleted successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateEmailServices: async(req, res) => {
    try {
      const emailServices = await EmailServices.findById(req.params.id);
      if (req.body.periods) {
        const expiredAt = emailServices.expiredAt.setFullYear(emailServices.expiredAt.getFullYear() + req.body.periods);
        await emailServices.updateOne({$set: {expiredAt: expiredAt, status: 1}});
        res.status(200).json("Updated successfully!");
      }

      
      await emailServices.updateOne({$set: req.body});
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getEmailServicesExpired: async(req, res) => {
    try {
      var currentDate = new Date();
      var emailServicesExpired = await EmailServices.find(
        {
          expiredAt: {$lte: currentDate}
        }
      );

      for (const item of emailServicesExpired) {
        try {
          emailServicesExpired = await EmailServices.findByIdAndUpdate(
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

      emailServicesExpired = await EmailServices
        .find(
          {
            expiredAt: {$lte: currentDate}
          }
        )
        .sort({"createdAt": -1})
        .populate('domain_service_id')
        .populate('email_plan_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('domain_plan_id', 'name')
        .populate('domain_supplier_id', 'name company')
        .populate('email_supplier_id', 'name company');
      
      
      res.status(200).json(emailServicesExpired);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getEmailServicesExpiring: async(req, res) => {
    try {
      var currentDate = new Date();
      var dateExpired = dayjs(currentDate).add(30, 'day');
      var emailServicesExpiring = await EmailServices.find(
        {
          expiredAt: {
            $gte: dayjs(currentDate).startOf('day').toDate(),
            $lte: dayjs(dateExpired).endOf('day').toDate()
          }
        }
      );

      for (const item of emailServicesExpiring) {
        try {
          emailServicesExpiring = await EmailServices.findByIdAndUpdate(
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

      emailServicesExpiring = await EmailServices
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
        .populate('email_plan_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('domain_plan_id', 'name')
        .populate('domain_supplier_id', 'name company')
        .populate('email_supplier_id', 'name company');
      
      
      res.status(200).json(emailServicesExpiring);
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = emailServicesController;