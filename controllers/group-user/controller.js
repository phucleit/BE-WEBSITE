const GroupUsers = require("../../models/group-user/model");

const groupUserController = {
  getGroupUser: async(req, res) => {
    try {
      const groupUser = await GroupUsers.find().sort({"createdAt": -1});
      return res.status(200).json(groupUser);
    } catch(err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  addGroupUser: async(req, res) => {
    try {
      const newGroupUser = new GroupUsers(req.body);
      const saveGroupUser = await newGroupUser.save();
      return res.status(200).json(saveGroupUser);
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getDetailGroupUser: async(req, res) => {
    try {
      const groupUser = await GroupUsers.findById(req.params.id);
      return res.status(200).json(groupUser);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  updateGroupUser: async(req, res) => {
    try {
      const groupUser = await GroupUsers.findById(req.params.id);
      await groupUser.updateOne({$set: req.body});
      return res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  deleteGroupUser: async(req, res) => {
    try {
      await GroupUsers.findByIdAndDelete(req.params.id);
      return res.status(200).json("Xóa thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },
}

module.exports = groupUserController;