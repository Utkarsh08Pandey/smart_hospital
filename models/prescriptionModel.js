const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'patient',
    },
    prescription:{
        type:String,
        required:true,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
});

module.exports = mongoose.model('prescription',prescriptionSchema);