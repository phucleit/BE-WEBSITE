const dayjs = require('dayjs');

const ContentServices = require("../../../models/services/content/model");

const contentServicesController = {
  addContentServices: async(req, res) => {
    try {
      const newContentServices = new ContentServices(req.body);
      newContentServices.expiredAt = new Date(newContentServices.registeredAt);
      newContentServices.expiredAt.setMonth(newContentServices.expiredAt.getMonth() + req.body.periods);
      const saveContentServices = await newContentServices.save();
      return res.status(200).json(saveContentServices);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getContentServices: async(req, res) => {
    try {
      const contentServices = await ContentServices.find().sort({"createdAt": -1}).populate('content_plan_id').populate('customer_id', 'fullname gender email phone');
      return res.status(200).json(contentServices);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getDetailContentServices: async(req, res) => {
    try {
      const contentServices = await ContentServices.findById(req.params.id).sort({"createdAt": -1}).populate('content_plan_id').populate('customer_id', 'fullname gender email phone');
      return res.status(200).json(contentServices);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  deleteContentServices: async(req, res) => {
    try {
      await ContentServices.findByIdAndDelete(req.params.id);
      return res.status(200).json("Xóa thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  updateContentServices: async(req, res) => {
    try {
      const contentServices = await ContentServices.findById(req.params.id);
      if (req.body.periods) {
        const currentDate = new Date();
        const expiredAt = currentDate.setMonth(currentDate.getMonth() + req.body.periods);
        await contentServices.updateOne({$set: {expiredAt: expiredAt, periods: req.body.periods, status: 1}});
        return res.status(200).json("Cập nhật thành công!");
      }
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
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
        } catch (err) {
          console.error(err);
          return res.status(500).send(err.message);
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
      
      return res.status(200).json(contentServicesExpired);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
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
        } catch (err) {
          console.error(err);
          return res.status(500).send(err.message);
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
      
      return res.status(200).json(contentServicesExpiring);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  }
}

module.exports = contentServicesController;