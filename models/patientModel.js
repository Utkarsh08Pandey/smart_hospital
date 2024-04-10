const mongoose = require('mongoose')
const joi = require('joi')

const patientSchema = new mongoose.Schema(
    {
        name:String,
        gender:String,
        dob:String,
        password:String,
        age:Number,
        contact:Number,
        email:String,
        height:Number,
        weight:Number,
        isDeleted:Boolean,
    }
)

const JoiSchema = joi.object({
    name:joi.string().required(),
    gender:joi.string().required(),
    dob:joi.string().required(),
    age:joi.number().required(),
    contact:joi.number().required(),
    email:joi.string().email().required(),
    height:joi.number().required(),
    weight:joi.number().required(),
    password:joi.string().required(),
    isDeleted:joi.boolean().default(false),
})  

const patient = mongoose.model('patient',patientSchema)

module.exports = {patient,JoiSchema}