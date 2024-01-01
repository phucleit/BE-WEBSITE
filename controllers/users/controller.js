const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Users } = require("../../models/users/model");

const userController = {
  addUser: async(req, res) => {
    try {
      const {username, email, password} = req.body;
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = await Users({username, email, password: hashedPassword });
      const saveUser = await newUser.save();
      res.status(200).json(saveUser);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  signIn: async(req, res) => {
    try {
      const {username, password} = req.body;

      const validUser = await Users.findOne({username});
      if (!validUser) return res.status(404).json('User not found!');

      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (! validPassword) return res.status(401).json('Wrong credentials!');
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getUser: async(req, res) => {
    try {
      
    } catch(err) {
      res.status(500).json(err);
    }
  },

  getDetailUser: async(req, res) => {
    try {
      
    } catch(err) {
      res.status(500).json(err);
    }
  },

  deleteUser: async(req, res) => {
    try {
    
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateUser: async(req, res) => {
    try {
      
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = userController;