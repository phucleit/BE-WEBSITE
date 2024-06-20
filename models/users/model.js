const mongoose = require("mongoose");
const sha512  = require("js-sha512");

const userchema = new mongoose.Schema({
  display_name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {timestamps: true});

const Users = mongoose.model("Users", userchema);
module.exports = Users;

const init = async () =>{
  const count = await Users.estimatedDocumentCount()
  if(count == 0){
    await new Users({
      display_name: "IT Vũng Tàu",
      username: "itvt",
      password: sha512('1'),
      email: "cuongthinhitv@gmail.com"
    }).save()
  }
}
init()