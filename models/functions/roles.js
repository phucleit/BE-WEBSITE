const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const userchema = new mongoose.Schema({
  function_id: {
    type: ObjectId,
    required: true,
    index: true
  },
  group_user_id:{
    type: ObjectId,
    required: true,
    index: true
  }
});

const Roles = mongoose.model("Roles", userchema);
module.exports = Roles;

// const init = async () => {
//   const count = await Roles.estimatedDocumentCount();
//   if (count == 0) {
//     const array = [
//       {
//         _id: new ObjectId("66841965e55c5173ec4184d2"),
//         group_user_id: new ObjectId("6684196550a34692df218d8d"),
//         function_id: new ObjectId("66746193cb45907845239f36"),
//       },
      
//     ];
//     await Roles.insertMany(array);
//   }
// }

// init()