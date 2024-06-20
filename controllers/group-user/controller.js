const GroupUsers = require("../../models/group-user/model");

const groupUserController = {
  getGroupUser: async(req, res) => {
    try {
      const groupUser = await GroupUsers.find().sort({"createdAt": -1});
      res.status(200).json(groupUser);
    } catch(err) {
      console.error(err)
      res.status(500).json(err);
    }
  },

  addGroupUser: async(req, res) => {
    try {
      const newGroupUser = new GroupUsers(req.body);
      const saveGroupUser = await newGroupUser.save();
      res.status(200).json(saveGroupUser);
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getDetailGroupUser: async(req, res) => {
    try {
      const groupUser = await GroupUsers.findById(req.params.id);
      res.status(200).json(groupUser);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateGroupUser: async(req, res) => {
    try {
      const groupUser = await GroupUsers.findById(req.params.id);
      await groupUser.updateOne({$set: req.body});
      res.status(200).json("Updated successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  deleteGroupUser: async(req, res) => {
    try {
      await GroupUsers.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch(err) {
      res.status(500).json(err);
    }
  },
}

module.exports = groupUserController;