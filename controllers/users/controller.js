const jwt = require('jsonwebtoken');

const Users = require("../../models/users/model");
const sha512 = require('js-sha512');
const ModelToken = require('../../models/users/token');
const logAction = require("../../middleware/action_logs");

const userController = {
  addUser: async(req, res) => {
    try {
      const {display_name, username, email, password, group_user_id} = req.body;
      const hashedPassword = sha512(password);
      const newUser = await Users({display_name, username, email, password: hashedPassword, group_user_id });
      const saveUser = await newUser.save();
      await logAction(req.auth._id, 'Tài khoản', 'Thêm mới');
      return res.status(200).json(saveUser);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getUser: async(req, res) => {
    try {
      const users = await Users.find().sort({"createdAt": -1}).populate('group_user_id', 'name');
      return res.status(200).json(users);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getDetailUser: async(req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      return res.status(200).json(user);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  deleteUser: async(req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);
      await logAction(req.auth._id, 'Tài khoản', 'Xóa');
      return res.status(200).json("Xóa thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  updateUser: async(req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      await user.updateOne({$set: req.body});
      await logAction(req.auth._id, 'Tài khoản', 'Cập nhật', `/dashboard/users/update-users/${req.params.id}`);
      return res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  }
}

module.exports = userController;