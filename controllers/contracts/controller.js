const Contracts = require("../../models/contracts/model");

const contractController = {
  addContract: async(req, res) => {
    try {
      const newContract = new Contracts(req.body);
      const existing_contract_code = await Contracts.findOne({ contract_code: req.body.contract_code });

      if (existing_contract_code) {
        res.status(409).json('Mã hợp đồng đã tồn tại!');
      } else {
        const total_price = req.body.total_price;
        const deposit_amount = req.body.deposit_amount;
        const remaining_cost = req.body.remaining_cost;

        if (deposit_amount || remaining_cost) {
          if ((deposit_amount + remaining_cost) == total_price) {
            newContract.status = 1;
          } else if (deposit_amount < total_price) {
            newContract.status = 2;
          }
        } else {
          newContract.status = 1;
        }

        const saveContract = await newContract.save();
        return res.status(200).json(saveContract);
      }
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
},

  getContract: async(req, res) => {
    try {
      const contract = await Contracts.find().sort({"createdAt": -1}).populate('customer_id');
      return res.status(200).json(contract);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getDetailContract: async(req, res) => {
    try {
      const contract = await Contracts.findById(req.params.id).populate('customer_id');
      return res.status(200).json(contract);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  deleteContract: async(req, res) => {
    try {
      await Contracts.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa thành công!");
    } catch(err) {
      res.status(500).json(err);
    }
  },

  updateContract: async(req, res) => {
    try {
      const contract = await Contracts.findById(req.params.id);
      await contract.updateOne({$set: req.body});
      return res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  }
}

module.exports = contractController;