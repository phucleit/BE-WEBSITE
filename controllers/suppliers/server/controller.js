const Server = require("../../../models/suppliers/server/model");

const serverController = {
  getServer: async(req, res) => {
    try {
      const server = await Server.find().sort({"createdAt": -1});
      return res.status(200).json(server);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  addServer: async(req, res) => {
    try {
      const newServer = new Server(req.body);
      const saveServer = await newServer.save();
      return res.status(200).json(saveServer);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getDetailServer: async(req, res) => {
    try {
      const server = await Server.findById(req.params.id);
      return res.status(200).json(server);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  updateServer: async(req, res) => {
    try {
      const server = await Server.findById(req.params.id);
      await server.updateOne({$set: req.body});
      return res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  deleteServer: async(req, res) => {
    try {
      await Server.findByIdAndDelete(req.params.id);
      return res.status(200).json("Xóa thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },
}

module.exports = serverController;