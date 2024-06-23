const Functions = require('../../models/functions/functions');
const GroupUsers = require('../../models/group-user/model');
const Roles = require('../../models/functions/roles');
const {ObjectId} = require('mongoose').Types

const functionController = {
  getFunction: async(req, res) => {
    try {
      const functions = await Functions.find();
      return res.status(200).json(functions);
    } catch(err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  },
  addRole: async(req, res) => {
    try {
      const {name, description, group} = req.body

      if (!name) throw new Error(`Vui lòng nhập tên nhóm!`)     
      if (!description) throw new Error(`Mô tả không được trống!`)

      const existingName = await GroupUsers.findOne({name: name})
      if (existingName) throw new Error(`Tên nhóm đã tồn tại, vui lòng chọn tên khác!`);

      const data_group = await new GroupUsers({
        name: name,
        description: description
      }).save()

      for (let i =0; i<group.length; i++) {
        await Roles.findOneAndUpdate({
          $and:[
            {function_id: new ObjectId(group[i])},
            {group_user_id: data_group._id}
          ]
        },{
          function_id: new ObjectId(group[i]),
          group_user_id: data_group._id
        }, {upsert:true})
      }

      return res.json("Thêm thành công!");
    } catch(err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  },
}

module.exports = functionController;