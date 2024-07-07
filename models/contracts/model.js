const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  contract_code: {
    type: String,
    required: true,
    unique: true
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

      const code = await Contracts.createCode()
      const data_contract = await Contracts.findOneAndUpdate({
        customer_id:customer_id
      },{
        $setOnInsert:{
          customer_id:customer_id,
          contract_code: code
        },
        $set:{
          total_price:total_price,
          deposit_amount:deposit_amount,
          remaining_cost:remaining_cost,
        }
        
      }, {upsert:true})
  } catch (error) {
    
  }
} 

const format_date = (str_date, str_format = 'YYYY-MM-dd') => {
	const date = new Date(str_date);
	if (!str_date || date == 'Invalid Date') return str_date

	const year = date.getFullYear();
	const month = addZero(date.getMonth() + 1);
	const day = addZero(date.getDate());

	const hour = addZero(date.getHours());
	const minutes = addZero(date.getMinutes());
	const seconds = addZero(date.getSeconds());

	str_format = str_format
    .replace('YYYY', year)
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('hh', hour)
    .replace('mm', minutes)
    .replace('ss', seconds)
    .replace('YY', year.toString().substring(1,3))
    .replace('yy', year.toString().substring(1,3))
	return str_format;
}

Contracts.createCode = async () =>{
  try {
    const count = await Contracts.estimatedDocumentCount();
    const str_code = `HD_${format_date(new Date(), "DDMMYYHHmmss")}${count}`;
    const check = await Contracts.countDocuments({contract_code: str_code});
    if(check > 0) return await Contracts.createCode()
    return str_code;
  } catch (error) {
    return null;
  }
}