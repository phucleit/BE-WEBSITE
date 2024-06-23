const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require("../../models/users/model");
const sha512 = require('js-sha512');
const ModelToken = require('../../models/users/token');

const userController = {
  addUser: async(req, res) => {
    try {
      const {display_name, username, email, password} = req.body;
      const hashedPassword = sha512(password);
      const newUser = await Users({display_name, username, email, password: hashedPassword });
      const saveUser = await newUser.save();
      return res.status(200).json(saveUser);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  signIn: async(req, res) => {
    try {
      const {username, password} = req.body;
      const validUser = await Users.findOne({username}).lean();
      if (!validUser) throw new Error('Tài khoản không tồn tại! Vui lòng nhập lại thông tin!')

      const validPassword = sha512(password);
      if (validPassword != validUser.password) throw new Error(`Tên đăng nhập hoặc mật khẩu không đúng! Vui lòng nhập lại thông tin!`)
      if (!validPassword) throw new Error('Mật khẩu không đúng! Vui lòng nhập mật khẩu!');
      const token = jwt.sign({ ...validUser }, process.env.JWT_SECRET);
      await new ModelToken({
        user_id: validUser._id,
        token: token
      }).save();
      return res.json({token});
    } catch(error) {
      console.error(error);
      return res.status(400).send(error.message)
    }
  },

  logout: async (req, res) => {
    try {
      res.cookie('access_token', '', { httpOnly: true, expires: new Date(0) });  
      res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getUser: async(req, res) => {
    try {
      const users = await Users.find().sort({"createdAt": -1});
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
      return res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  }
}

module.exports = userController;