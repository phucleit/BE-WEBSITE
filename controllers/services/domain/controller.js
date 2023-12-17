const dayjs = require('dayjs');

const { DomainServices } = require("../../../models/services/domain/model");

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

      domainServices = await DomainServices.find().sort({"createdAt": -1})
        .populate('domain_plan_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('supplier_id', 'name company');
      
      res.status(200).json(domainServices);
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
      res.status(500).json(err);
    }
  },

  getDomainServicesExpired: async(req, res) => {
    try {
      var currentDate = new Date();
      var domainServicesExpired = await DomainServices.find(
        {
          expiredAt: {$lte: currentDate}
        }
      );

      for (const item of domainServicesExpired) {
        try {
          domainServicesExpired = await DomainServices.findByIdAndUpdate(
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

      domainServicesExpired = await DomainServices
        .find(
          {
            expiredAt: {$lte: currentDate}
          }
        )
        .sort({"createdAt": -1})
        .populate('domain_plan_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('supplier_id', 'name company');
      
      res.status(200).json(domainServicesExpired);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDomainServicesExpiring: async(req, res) => {
    try {
      var currentDate = new Date();
      var dateExpired = dayjs(currentDate).add(30, 'day');
      var domainServicesExpiring = await DomainServices.find(
        {
          expiredAt: {
            $gte: dayjs(currentDate).startOf('day').toDate(),
            $lte: dayjs(dateExpired).endOf('day').toDate()
          }
        }
      );

      for (const item of domainServicesExpiring) {
        try {
          domainServicesExpiring = await DomainServices.findByIdAndUpdate(
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

      domainServicesExpiring = await DomainServices
        .find(
          {
            expiredAt: {
              $gte: dayjs(currentDate).startOf('day').toDate(),
              $lte: dayjs(dateExpired).endOf('day').toDate()
            }
          }
        )
        .sort({"createdAt": -1})
        .populate('domain_plan_id')
        .populate('customer_id', 'fullname gender email phone')
        .populate('supplier_id', 'name company');
      
      res.status(200).json(domainServicesExpiring);
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = domainServicesController;