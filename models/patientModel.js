const mongoose = require('mongoose')
const joi = require('joi')

const patientSchema = new mongoose.Schema(
    {
        name:String,
        email:String,
        password:String,
        phoneNumber:Number,
        lab:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'lab',
        },
        prescription:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'prescription',
        },
        appointment:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'appointment',
        },
    }
)

const JoiSchema = joi.object({
    name:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().min(8).required(),
    phoneNumber:joi.number().max(9999999999).required(),
    lab:joi.string().required(),
    prescription:joi.string().required(),
    appointment:joi.string().required(),
})  

const patient = mongoose.model('patient',patientSchema)

module.exports = {patient,JoiSchema}