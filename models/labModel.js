const mongoose =require('mongoose')
const joi = require('joi')
const labSchema =new  mongoose.Schema({
    name:String,
    cost:Number,
    description:String,
    isDeleted:Boolean,
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'patient',
    }
})

const JoiSchema = joi.object({
    name:joi.string().required(),
    cost:joi.number().required(),
    description:joi.string().required(),
    isDeleted:joi.boolean().default(false),
    patientId:joi.string().required()
})  

const lab =  mongoose.model('lab',labSchema)

module.exports  ={lab,JoiSchema}