const { ContentPlans } = require("../../../models/plans/content/model");

const contentPlansController = {
    addContentPlans: async(req, res) => {
      try {
        const newContentPlans = new ContentPlans(req.body);
        const saveContentPlans = await newContentPlans.save();
        res.status(200).json(saveContentPlans);
      } catch(err) {
        res.status(500).json(err);
      }
    },

    getContentPlans: async(req, res) => {
      try {
        const contentPlans = await ContentPlans.find().sort({"createdAt": -1});
        res.status(200).json(contentPlans);
      } catch(err) {
        res.status(500).json(err);
      }
    },

    getDetailContentPlans: async(req, res) => {
      try {
        const contentPlans = await ContentPlans.findById(req.params.id);
        res.status(200).json(contentPlans);
      } catch(err) {
        res.status(500).json(err);
      }
    },

    deleteContentPlans: async(req, res) => {
      try {
        await ContentPlans.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted successfully!");
      } catch(err) {
        res.status(500).json(err);
      }
    },

    updateContentPlans: async(req, res) => {
      try {
        const contentPlans = await ContentPlans.findById(req.params.id);
        await contentPlans.updateOne({$set: req.body});
        res.status(200).json("Updated successfully!");
      } catch(err) {
        res.status(500).json(err);
      }
    }
}

module.exports = contentPlansController;