const dayjs = require('dayjs');

const MobileNetworkServices = require("../../../models/services/mobile-network/model");

const mobileNetworkServicesController = {
  getMobileNetworkServices: async(req, res) => {
    try {
      let mobileNetworkServices = await MobileNetworkServices.find().sort({"createdAt": -1}).populate('mobileNetworkPlanId').populate('customerId', 'fullname gender email phone');
      for (const item of mobileNetworkServices) {
        const supplierMobileNetworkId = item.mobileNetworkPlanId.supplierMobileNetworkId;
        try {
          mobileNetworkServices = await MobileNetworkServices.findByIdAndUpdate(
            item._id,
            {
              $set: {
                supplierMobileNetworkId: supplierMobileNetworkId
              }
            },
            { new: true }
          );
        } catch (error) {
          res.status(500).json(error);
        }
      }

      mobileNetworkServices = await MobileNetworkServices.find().sort({"createdAt": -1})
        .populate('mobileNetworkPlanId')
        .populate('customerId', 'fullname gender email phone')
        .populate('supplierMobileNetworkId');

      res.status(200).json(mobileNetworkServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  addMobileNetworkServices: async(req, res) => {
    try {
      const newMobileNetworkServices = new MobileNetworkServices(req.body);
      newMobileNetworkServices.expiredAt = new Date(newMobileNetworkServices.registeredAt);
      newMobileNetworkServices.expiredAt.setFullYear(newMobileNetworkServices.expiredAt.getFullYear() + req.body.periods);
      newMobileNetworkServices.status = 1;
      const saveMobileNetworkServices = await newMobileNetworkServices.save();
      
      res.status(200).json(saveMobileNetworkServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDetailMobileNetworkServices: async(req, res) => {
    try {
      const mobileNetworkServices = await MobileNetworkServices.findById(req.params.id)
        .populate('mobileNetworkPlanId')
        .populate('customerId', 'fullname gender email phone')
        .populate('supplierMobileNetworkId');
      res.status(200).json(mobileNetworkServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateMobileNetworkServices: async(req, res) => {
    try {
      const mobileNetworkServices = await MobileNetworkServices.findById(req.params.id);
      if (req.body.periods) {
        const currentDate = new Date();
        const expiredAt = currentDate.setFullYear(currentDate.getFullYear() + req.body.periods);
        await mobileNetworkServices.updateOne({$set: {expiredAt: expiredAt, status: 1}});
      }
      await mobileNetworkServices.updateOne({$set: req.body});
      res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  deleteMobileNetworkServices: async(req, res) => {
    try {
      await MobileNetworkServices.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa thành công!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getMobileNetworkServicesExpired: async(req, res) => {
    try {
      var currentDate = new Date();
      var mobileNetworkServicesExpired = await MobileNetworkServices.find(
        {
          expiredAt: {$lte: currentDate}
        }
      );

      for (const item of mobileNetworkServicesExpired) {
        try {
          mobileNetworkServicesExpired = await MobileNetworkServices.findByIdAndUpdate(
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

      mobileNetworkServicesExpired = await MobileNetworkServices
        .find(
          {
            expiredAt: {$lte: currentDate}
          }
        )
        .sort({"createdAt": -1})
        .populate('mobileNetworkPlanId')
        .populate('customerId', 'fullname gender email phone')
        .populate('supplierMobileNetworkId');
      
      res.status(200).json(mobileNetworkServicesExpired);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getMobileNetworkServicesExpiring: async(req, res) => {
    try {
      var currentDate = new Date();
      var dateExpired = dayjs(currentDate).add(30, 'day');
      var mobileNetworkServicesExpiring = await MobileNetworkServices.find(
        {
          expiredAt: {
            $gte: dayjs(currentDate).startOf('day').toDate(),
            $lte: dayjs(dateExpired).endOf('day').toDate()
          }
        }
      );

      for (const item of mobileNetworkServicesExpiring) {
        try {
          mobileNetworkServicesExpiring = await MobileNetworkServices.findByIdAndUpdate(
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

      mobileNetworkServicesExpiring = await MobileNetworkServices
        .find(
          {
            expiredAt: {
              $gte: dayjs(currentDate).startOf('day').toDate(),
              $lte: dayjs(dateExpired).endOf('day').toDate()
            }
          }
        )
        .sort({"createdAt": -1})
        .populate('mobileNetworkPlanId')
        .populate('customerId', 'fullname gender email phone')
        .populate('supplierMobileNetworkId');
      
      res.status(200).json(mobileNetworkServicesExpiring);
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = mobileNetworkServicesController;