const dayjs = require('dayjs');

const ToplistServices = require("../../../models/services/toplist/model");

const toplistServiceController = {
  addToplistService: async(req, res) => {
    try {
      const newToplistService = new ToplistServices(req.body);
      newToplistService.expiredAt = new Date(newToplistService.registeredAt);
      newToplistService.expiredAt.setFullYear(newToplistService.expiredAt.getFullYear() + req.body.periods);
      newToplistService.status = 1;
      const saveToplistService = await newToplistService.save();
      
      res.status(200).json(saveToplistService);
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getToplistService: async(req, res) => {
    try {
      let toplistService = await ToplistServices.find().sort({"createdAt": -1}).populate('customer_id', 'fullname gender email phone');
      res.status(200).json(toplistService);
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getDetailToplistService: async(req, res) => {
    try {
      const toplistService = await ToplistServices.findById(req.params.id)
        .populate('customer_id', 'fullname gender email phone');
      
      res.status(200).json(toplistService);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  deleteToplistService: async(req, res) => {
    try {
      await ToplistServices.findByIdAndDelete(req.params.id);
      
      res.status(200).json("Deleted successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateToplistService: async(req, res) => {
    try {
      const toplistService = await ToplistServices.findById(req.params.id);
      if (req.body.periods) {
        const currentDate = new Date();
        const expiredAt = currentDate.setFullYear(currentDate.getFullYear() + req.body.periods);
        await toplistService.updateOne({$set: {expiredAt: expiredAt, status: 1}});
      }
      await toplistService.updateOne({$set: req.body});
      
      res.status(200).json("Updated successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getToplistServiceExpired: async(req, res) => {
    try {
      var currentDate = new Date();
      var toplistServiceExpired = await ToplistServices.find(
        {
          expiredAt: {$lte: currentDate}
        }
      );

      for (const item of toplistServiceExpired) {
        try {
          toplistServiceExpired = await ToplistServices.findByIdAndUpdate(
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

      toplistServiceExpired = await ToplistServices
        .find(
          {
            expiredAt: {$lte: currentDate}
          }
        )
        .sort({"createdAt": -1})
        .populate('customer_id', 'fullname gender email phone');
      
      
      res.status(200).json(toplistServiceExpired);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getToplistServiceExpiring: async(req, res) => {
    try {
      var currentDate = new Date();
      var dateExpired = dayjs(currentDate).add(30, 'day');
      var toplistServiceExpiring = await ToplistServices.find(
        {
          expiredAt: {
            $gte: dayjs(currentDate).startOf('day').toDate(),
            $lte: dayjs(dateExpired).endOf('day').toDate()
          }
        }
      );

      for (const item of toplistServiceExpiring) {
        try {
          toplistServiceExpiring = await ToplistServices.findByIdAndUpdate(
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

      toplistServiceExpiring = await ToplistServices
        .find(
          {
            expiredAt: {
              $gte: dayjs(currentDate).startOf('day').toDate(),
              $lte: dayjs(dateExpired).endOf('day').toDate()
            }
          }
        )
        .sort({"createdAt": -1})
        .populate('customer_id', 'fullname gender email phone');
      
      
      res.status(200).json(toplistServiceExpiring);
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = toplistServiceController;