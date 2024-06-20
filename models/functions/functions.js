const mongoose = require("mongoose");
const sha512  = require("js-sha512");

const ObjectId = mongoose.Types.ObjectId

const userchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    fuction_parent_id:{
        type: ObjectId,
        default: null
    }
});

const Functions = mongoose.model("Functions", userchema);
module.exports = Functions;

const init = async () =>{
  const count = await Functions.estimatedDocumentCount()
  if(count == 0){
    const array = [
        {
            _id: new ObjectId("66714266fda2502f9d9b4c7f"),
            name: "Gói dịch vụ",
        },
        {
            _id: new ObjectId("66714309285e17cd42562bcd"),
            fuction_parent_id: new ObjectId("66714266fda2502f9d9b4c7f"),
            name: "Thêm gói dịch vụ",

        },
        {
            _id: new ObjectId("66714309285e17cd42562bce"),
            fuction_parent_id: new ObjectId("66714266fda2502f9d9b4c7f"),
            name: "Sửa gói dịch vụ",
        },
        {
            _id: new ObjectId("66714309285e17cd42562bcf"),
            fuction_parent_id: new ObjectId("66714266fda2502f9d9b4c7f"),
            name: "Xóa gói dịch vụ",
        },
        {
            _id: new ObjectId("66714266fda2502f9d9b4c80"),
            name: "Nhà cung cấp"
        },
        {
            _id: new ObjectId("66714309285e17cd42562bd1"),
            fuction_parent_id: new ObjectId("66714266fda2502f9d9b4c80"),
            name: "Thêm nhà cung cấp",
        },
        {
            _id: new ObjectId("66714309285e17cd42562bd2"),
            fuction_parent_id: new ObjectId("66714266fda2502f9d9b4c80"),
            name: "Sửa nhà cung cấp",
        },
        {
            _id: new ObjectId("66714309285e17cd42562bd3"),
            fuction_parent_id: new ObjectId("66714266fda2502f9d9b4c80"),
            name: "Xóa nhà cung cấp",
        },
        {
            _id: new ObjectId("66714266fda2502f9d9b4c81"),
            name: "Dịch vụ"
        },
        {
            _id: new ObjectId("66714309285e17cd42562bd5"),
            fuction_parent_id: new ObjectId("66714266fda2502f9d9b4c81"),
            name: "Thêm dịch vụ",
        },
        {
            _id: new ObjectId("66714309285e17cd42562bd6"),
            fuction_parent_id: new ObjectId("66714266fda2502f9d9b4c81"),
            name: "Sửa dịch vụ",
        },
        {
            _id: new ObjectId("66714309285e17cd42562bd7"),
            fuction_parent_id: new ObjectId("66714266fda2502f9d9b4c81"),
            name: "Xóa dịch vụ",
        },
        {
            _id: new ObjectId("66714266fda2502f9d9b4c82"),
            name: "Khách hàng"
        },
        {
            _id: new ObjectId("66714309285e17cd42562bd9"),
            fuction_parent_id: new ObjectId("66714266fda2502f9d9b4c82"),
            name: "Thêm khách hàng",
        },
        {
            _id: new ObjectId("66714309285e17cd42562bda"),
            fuction_parent_id: new ObjectId("66714266fda2502f9d9b4c82"),
            name: "Sửa khách hàng",
        },
        {
            _id: new ObjectId("66714309285e17cd42562bdb"),
            fuction_parent_id: new ObjectId("66714266fda2502f9d9b4c82"),
            name: "Xóa khách hàng",
        },
        {
            _id: new ObjectId("66714266fda2502f9d9b4c83"),
            name: "Tài khoản Admin"
        },
        {
            _id: new ObjectId("66714309285e17cd42562bdc"),
            fuction_parent_id: new ObjectId("66714266fda2502f9d9b4c83"),
            name: "Xem danh sách",
        },
    ]
    await Functions.insertMany(array)
  }
}
init()