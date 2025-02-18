const fs = require('fs-extra');
const path = require('path');
const Customer = require("../../models/customers/model");
const logAction = require("../../middleware/action_logs");

const { ObjectId } = require('mongoose').Types;

const customerController = {
  addCustomer: async(req, res) => {
    try {
      const {
        fullname,
        email,
        gender,
        idNumber,
        phone,
        address,
        company,
        tax_code,
        address_company,
        representative,
        representative_hotline,
        mail_vat,
        type_customer,
      } = req.body;

      const count = await Customer.countDocuments({
        $or: [
          { phone: phone },
          { email: email }
        ]
      });

      if (count > 0 ) throw new Error(`Số điện thoại hoặc email đã được đăng ký!`)
      const newCustomer = new Customer({
        fullname: fullname,
        email: email,
        gender: gender,
        idNumber: idNumber,
        phone: phone,
        address: address,
        company: company,
        tax_code: tax_code,
        address_company: address_company,
        representative: representative,
        representative_hotline: representative_hotline,
        mail_vat: mail_vat,
        image_front_view: req.files['image_front_view'] ? req.files['image_front_view'].map(file => file.path) : [],
        image_back_view: req.files['image_back_view'] ? req.files['image_back_view'].map(file => file.path) : [],
        type_customer: type_customer
      });

      const saveCustomer = await newCustomer.save();
      await logAction(req.auth._id, 'Khách hàng', 'Thêm mới');
      return res.status(200).json(saveCustomer);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getCustomer: async(req, res) => {
    try {
      const customers = await Customer.find().sort({"createdAt": -1});
      return res.status(200).json(customers);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getDetailCustomer: async(req, res) => {
    try {
      const customers = await Customer.findById(req.params.id).populate('data_service').exec();
      return res.status(200).json(customers);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  deleteCustomer: async(req, res) => {
    try {
      const customer = await Customer.findByIdAndDelete(req.params.id);
      if (!customer) {
        return res.status(404).send('Không tìm thấy khách hàng!');
      }
      const deleteFiles = async (filePaths) => {
        for (const filePath of filePaths) {
          try {
            await fs.remove(path.resolve(filePath));
          } catch (err) {
            console.error(`Lỗi xóa tập tin: ${filePath}`, err);
          }
        }
      };
  
      await deleteFiles(customer.image_front_view);
      await deleteFiles(customer.image_back_view);
  
      await Customer.findByIdAndDelete(req.params.id);
      await logAction(req.auth._id, 'Khách hàng', 'Xóa');
      return res.status(200).send('Xóa thành công!');
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);    }
  },

  updateCustomer: async(req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);

      if (!customer) {
        return res.status(404).send('Không tìm thấy khách hàng!');
      }

      const updateData = { ...req.body };

      if (req.files['image_front_view']) {
        updateData.image_front_view = req.files['image_front_view'].map(file => file.path);
      }

      if (req.files['image_back_view']) {
        updateData.image_back_view = req.files['image_back_view'].map(file => file.path);
      }

      await Customer.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
      await logAction(req.auth._id, 'Khách hàng', 'Cập nhật', `/trang-chu/khach-hang/cap-nhat-khach-hang/${req.params.id}`);
      return res.status(200).json("Cập nhật thành công!");
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getGuestsCustomer: async(req, res) => {
    try {
      var guests_customer = await Customer.find(
        {
          type_customer: false
        }
      ).sort({"createdAt": -1});
      return res.status(200).json(guests_customer);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },

  getCompanyCustomer: async(req, res) => {
    try {
      var company_customer = await Customer.find(
        {
          type_customer: true
        }
      ).sort({"createdAt": -1});
      return res.status(200).json(company_customer);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },
}

module.exports = customerController;