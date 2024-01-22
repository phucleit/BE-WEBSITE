const dayjs = require('dayjs');

const { ContentServices } = require("../../../models/services/content/model");

const contentServicesController = {
  addContentServices: async(req, res) => {
    try {
      const newContentServices = new ContentServices(req.body);
      newContentServices.expiredAt = new Date(newContentServices.registeredAt);
      newContentServices.expiredAt.setMonth(newContentServices.expiredAt.getMonth() + req.body.periods);
      newContentServices.status = 1;
      const saveContentServices = await newContentServices.save();
      res.status(200).json(saveContentServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getContentServices: async(req, res) => {
    try {
      const contentServices = await ContentServices.find().sort({"createdAt": -1}).populate('content_plan_id').populate('customer_id', 'fullname gender email phone');
      res.status(200).json(contentServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDetailContentServices: async(req, res) => {
    try {
      const contentServices = await ContentServices.findById(req.params.id).sort({"createdAt": -1}).populate('content_plan_id').populate('customer_id', 'fullname gender email phone');
      res.status(200).json(contentServices);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  deleteContentServices: async(req, res) => {
    try {
      await ContentServices.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateContentServices: async(req, res) => {
    try {
      const contentServices = await ContentServices.findById(req.params.id);
      if (req.body.periods) {
        const currentDate = new Date();
        const expiredAt = currentDate.setMonth(currentDate.getMonth() + req.body.periods);
        await contentServices.updateOne({$set: {expiredAt: expiredAt, status: 1}});
        res.status(200).json("Updated successfully!");
      }
      // await contentServices.updateOne({$set: req.body});
      // res.status(200).json("Updated successfully");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getContentServicesExpired: async(req, res) => {
    try {
      var currentDate = new Date();
      var contentServicesExpired = await ContentServices.find(
        {
          expiredAt: {$lte: currentDate}
        }
      );

      for (const item of contentServicesExpired) {
        try {
          contentServicesExpired = await ContentServices.findByIdAndUpdate(
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

      contentServicesExpired = await ContentServices
        .find(
          {
            expiredAt: {$lte: currentDate}
          }
        )
        .sort({"createdAt": -1})
        .populate('content_plan_id')
        .populate('customer_id', 'fullname gender email phone')
      
      res.status(200).json(contentServicesExpired);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getContentServicesExpiring: async(req, res) => {
    try {
      var currentDate = new Date();
      var dateExpired = dayjs(currentDate).add(30, 'day');
      var contentServicesExpiring = await ContentServices.find(
        {
          expiredAt: {
            $gte: dayjs(currentDate).startOf('day').toDate(),
            $lte: dayjs(dateExpired).endOf('day').toDate()
          }
        }
      );

      for (const item of contentServicesExpiring) {
        try {
          contentServicesExpiring = await ContentServices.findByIdAndUpdate(
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

      contentServicesExpiring = await ContentServices
        .find(
          {
            expiredAt: {
              $gte: dayjs(currentDate).startOf('day').toDate(),
              $lte: dayjs(dateExpired).endOf('day').toDate()
            }
          }
        )
        .sort({"createdAt": -1})
        .populate('content_plan_id')
        .populate('customer_id', 'fullname gender email phone')
      
      res.status(200).json(contentServicesExpiring);
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = contentServicesController;