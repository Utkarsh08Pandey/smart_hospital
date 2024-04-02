const mongoose = require('mongoose')
const joi = require('joi')
const appointmentSchema = new mongoose.Schema(
    {   
        patientId:{
            type:mongoose.Schema.Types.ObjectId, 
            ref: 'patient',
        },
        time:String,
        doctorId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'doctor',
        },
        isDeleted:Boolean,
    }
)

const JoiSchema = joi.object({
    patientId:joi.string().required(),
    time:joi.string().required(),
    doctorId:joi.string().required(),
    isDeleted:joi.boolean().default(false),
})  


const appointment = mongoose.model('appointment',appointmentSchema)

module.exports = {appointment,JoiSchema}