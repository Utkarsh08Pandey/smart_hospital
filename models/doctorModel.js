const mongoose = require('mongoose')
const joi = require('joi')
const doctorSchema = new mongoose.Schema(
    {
        name:String,
        speciality:String,
        isDeleted:Boolean,
        availability:String,
        contact:Number,
        email:String,
        password:String,
        appointment:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'appointment'
        }
    }
)

const JoiSchema = joi.object({
    name:joi.string().required(),
    speciality:joi.string().required(),
    isDeleted:joi.boolean().default(false),
    availability:joi.string().required(),
    contact:joi.number().required(),
    email:joi.string().required(),
    password:joi.string().required(),
    appointment:joi.string().required()
})  

const doctor = mongoose.model('doctor',doctorSchema)

module.exports ={doctor,JoiSchema}