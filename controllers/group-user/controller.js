const GroupUsers = require("../../models/group-user/model");
const logAction = require("../../middleware/action_logs");

const groupUserController = {
  getGroupUser: async(req, res) => {
    try {
      const groupUser = await GroupUsers.find().sort({"createdAt": -1});
      return res.status(200).json(groupUser);
    } catch(err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  addGroupUser: async(req, res) => {
    try {
      const newGroupUser = new GroupUsers(req.body);
      const saveGroupUser = await newGroupUser.save();
      await logAction(req.auth._id, 'Nhóm người dùng', 'Thêm mới');
      return res.status(200).json(saveGroupUser);
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
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
      await logAction(req.auth._id, 'Nhóm người dùng', 'Cập nhật', `/dashboard/users/update-group-users/${req.params.id}`);
      return res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  deleteGroupUser: async(req, res) => {
    try {
      await GroupUsers.findByIdAndDelete(req.params.id);
      await logAction(req.auth._id, 'Nhóm người dùng', 'Xóa');
      return res.status(200).json("Xóa thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },
}

module.exports = groupUserController;