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

const init = async () => {
  const count = await Functions.estimatedDocumentCount()
  if (count == 0) {
    const array = [
        // tài khoản
        {
            _id: new ObjectId("667460e3d19aa9fcecc69fa6"),
            name: "Tài khoản",
        },
        {
            _id: new ObjectId("66746193cb45907845239f36"),
            fuction_parent_id: new ObjectId("667460e3d19aa9fcecc69fa6"),
            name: "Tạo tài khoản mới",
        },
        {
            _id: new ObjectId("66746193cb45907845239f37"),
            fuction_parent_id: new ObjectId("667460e3d19aa9fcecc69fa6"),
            name: "Reset mật khẩu",
        },
        {
            _id: new ObjectId("66746193cb45907845239f38"),
            fuction_parent_id: new ObjectId("667460e3d19aa9fcecc69fa6"),
            name: "Sửa tài khoản",
        },
        {
            _id: new ObjectId("66746193cb45907845239f50"),
            fuction_parent_id: new ObjectId("667460e3d19aa9fcecc69fa6"),
            name: "Xóa tài khoản",
        },
        {
            _id: new ObjectId("66746193cb45907845239f39"),
            fuction_parent_id: new ObjectId("667460e3d19aa9fcecc69fa6"),
            name: "Tạo nhóm người dùng",
        },
        {
            _id: new ObjectId("66746193cb45907845239f3a"),
            fuction_parent_id: new ObjectId("667460e3d19aa9fcecc69fa6"),
            name: "Sửa nhóm người dùng",
        },
        {
            _id: new ObjectId("66746193cb45907845239f4a"),
            fuction_parent_id: new ObjectId("667460e3d19aa9fcecc69fa6"),
            name: "Xóa nhóm người dùng",
        },

        // nhà cung cấp
        {
            _id: new ObjectId("667463d04bede188dfb46d75"),
            name: "Nhà cung cấp",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46d76"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d75"),
            name: "Tạo nhà cung cấp",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46d77"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d75"),
            name: "Sửa nhà cung cấp",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46d78"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d75"),
            name: "Xóa nhà cung cấp",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46d79"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d75"),
            name: "Tạo nhà mạng",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46d80"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d75"),
            name: "Sửa nhà mạng",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46d81"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d75"),
            name: "Xóa nhà mạng",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46a81"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d75"),
            name: "Tạo server",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46e81"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d75"),
            name: "Sửa server",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46f81"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d75"),
            name: "Xóa server",
        },

        // hợp đồng
        {
            _id: new ObjectId("667463d04bede188dfb46d7a"),
            name: "Hợp đồng",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46d7b"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d7a"),
            name: "Tạo hợp đồng",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46d7c"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d7a"),
            name: "Sửa hợp đồng",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46c7c"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d7a"),
            name: "Xóa hợp đồng",
        },

        // khách hàng
        {
            _id: new ObjectId("667463d04bede188dfb46d7d"),
            name: "Khách hàng",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46d7e"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d7d"),
            name: "Tạo khách hàng",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46d7f"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d7d"),
            name: "Sửa khách hàng",
        },
        {
            _id: new ObjectId("667463d04bede188dfb46b7f"),
            fuction_parent_id: new ObjectId("667463d04bede188dfb46d7d"),
            name: "Xóa khách hàng",
        },

        //gói dịch vụ
        {
            _id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Gói dịch vụ",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b05f"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Tạo gói tên miền",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b060"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Sửa gói tên miền",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b061"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Xóa gói tên miền",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b062"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Tạo gói hosting",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b063"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Sửa gói hosting",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b064"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Xóa gói hosting",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b065"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Tạo gói email",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b066"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Sửa gói email",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b067"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Xóa gói email",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b068"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Tạo gói ssl",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b069"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Sửa gói ssl",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b06a"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Xóa gói ssl",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b06b"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Tạo gói viết bài content & PR",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b06c"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Sửa gói viết bài content & PR",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b06d"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Xóa gói viết bài content & PR",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b06e"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Tạo gói bảo trì",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b06f"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Sửa gói bảo trì",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b070"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Xóa gói bảo trì",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b071"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Tạo gói sim 4G",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b072"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Sửa gói sim 4G",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b073"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Xóa gói sim 4G",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b074"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Tạo server",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b075"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Sửa server",
        },
        {
            _id: new ObjectId("66746678f7f723b779b1b076"),
            fuction_parent_id: new ObjectId("667464b5500bf3ad04c24f47"),
            name: "Xóa server",
        },

        //dịch vụ
        {
            _id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Dịch vụ",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d2e"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Tạo dịch vụ tên miền",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d2f"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Sửa dịch vụ tên miền",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d30"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Xóa dịch vụ tên miền",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d31"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Tạo dịch vụ hosting",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d32"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Sửa dịch vụ hosting",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d33"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Xóa dịch vụ hosting",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d34"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Tạo dịch vụ email",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d35"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Sửa dịch vụ email",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d36"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Xóa dịch vụ email",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d37"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Tạo dịch vụ ssl",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d38"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Sửa dịch vụ ssl",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d39"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Xóa dịch vụ ssl",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d3a"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Tạo dịch vụ viết bài content & PR",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d3b"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Sửa dịch vụ viết bài content & PR",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d3c"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Xóa dịch vụ viết bài content & PR",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d3d"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Tạo dịch vụ bảo trì",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d3e"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Sửa dịch vụ bảo trì",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d3f"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Xóa dịch vụ bảo trì",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d40"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Tạo dịch vụ sim 4G",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d41"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Sửa dịch vụ sim 4G",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d42"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Xóa dịch vụ sim 4G",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d43"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Tạo dịch vụ toplist",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d44"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Sửa dịch vụ toplist",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d45"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Xóa dịch vụ toplist",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d46"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Tạo dịch vụ website",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d47"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Sửa dịch vụ website",
        },
        {
            _id: new ObjectId("667467eb263fb998b9925d48"),
            fuction_parent_id: new ObjectId("667467eb263fb998b9925d2d"),
            name: "Xóa dịch vụ website",
        },
        //backups
        {
            _id: new ObjectId("666523d04bede188dfb46d75"),
            name: "Sao lưu dữ liệu",
        },
        {
            _id: new ObjectId("643263d04bede188dfb46d76"),
            fuction_parent_id: new ObjectId("666523d04bede188dfb46d75"),
            name: "Tạo sao lưu dữ liệu",
        },
    ]
    await Functions.insertMany(array)
  }
}
init()