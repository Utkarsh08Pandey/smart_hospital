const mongoose =require('mongoose')
const joi = require('joi')
const hospitalSchema =new  mongoose.Schema({
    name:String,
    address: String,
    city: String,
    phoneNumber: Number,
    email:String,
    password:String
})

const JoiSchema = joi.object({
  name:joi.string().required(),
  address:joi.string().required(),
  city:joi.string().required(),
  phoneNumber:joi.number().required().min(1000000000).max(9999999999),
  email:joi.string().required(),
  password:joi.string().required()
})  


const hospital  = mongoose.model('hospital',hospitalSchema)

module.exports = {hospital,JoiSchema}