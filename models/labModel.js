const mongoose =require('mongoose')
const joi = require('joi')
const labSchema =new  mongoose.Schema({
    name:String,
    cost:Number,
    description:String,
    isDeleted:Boolean,
})

const JoiSchema = joi.object({
    name:joi.string().required(),
    cost:joi.number().required(),
    description:joi.string().required(),
    isDeleted:joi.boolean().default(false),
})  

const lab =  mongoose.model('lab',labSchema)

module.exports  ={lab,JoiSchema}