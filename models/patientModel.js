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
        disease:String,
        prescription:String
        // lab:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'lab',
        // },
        // prescription:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'prescription',
        // },
        // appointment:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'appointment',
        // },
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
    disease:joi.string().required(),
    prescription:joi.string().required(),
    password:joi.string().required(),
    // lab:joi.string().required(),
    // lab:joi.string().required(),
    // prescription:joi.string().required(),
    // appointment:joi.string().required(),
})  

const patient = mongoose.model('patient',patientSchema)

module.exports = {patient,JoiSchema}