const ContentPlans = require("../../../models/plans/content/model");

const contentPlansController = {
  addContentPlans: async(req, res) => {
    try {
      const newContentPlans = new ContentPlans(req.body);
      const saveContentPlans = await newContentPlans.save();
      return res.status(200).json(saveContentPlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getContentPlans: async(req, res) => {
    try {
      const contentPlans = await ContentPlans.find().sort({"createdAt": -1});
      return res.status(200).json(contentPlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getDetailContentPlans: async(req, res) => {
    try {
      const contentPlans = await ContentPlans.findById(req.params.id);
      return res.status(200).json(contentPlans);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  deleteContentPlans: async(req, res) => {
    try {
      await ContentPlans.findByIdAndDelete(req.params.id);
      return res.status(200).json("Xóa thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  updateContentPlans: async(req, res) => {
    try {
      const contentPlans = await ContentPlans.findById(req.params.id);
      await contentPlans.updateOne({$set: req.body});
      return res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  }
}

module.exports = contentPlansController;