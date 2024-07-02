const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  contract_code: {
    type: String,
    required: true
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers"
  },
  total_price: {
    type: Number,
    default: 0

  },
  deposit_amount: {
    type: Number,
    default: 0
  },
  remaining_cost: {
    type: Number,
    default: 0
  },
  status: {
    type: Number,
    default: 1
  },
  note: {
    type: String,
    default:null
  }
}, {timestamps: true});

let Contracts = mongoose.model("Contracts", contractSchema);
module.exports = Contracts;


Contracts.create_or_update_contract = async (customer_id) =>{
  try {
      const ModelDomain = require('../../models/services/domain/model')
      const data_domain = await ModelDomain.find({customer_id:customer_id})

      let total_price = 0
      let deposit_amount = 0
      let remaining_cost = 0
      //
      const data_contract = await Contracts.findOneAndUpdate({
        customer_id:customer_id
      },{
        $setOnInsert:{
          customer_id:customer_id,
          contract_code:'111111'
        },
        $set:{
          total_price:total_price,
          deposit_amount:deposit_amount,
          remaining_cost:remaining_cost,
        }
        
      },{upsert:true})
  } catch (error) {
    
  }
} 