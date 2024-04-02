const mongoose = require('mongoose');
const labTestAssignSchema = new mongoose.Schema(
    {
        doctorId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'doctor',
        },
        patientId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'patient',
        },
        labTestId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'lab',
        },
        isDeleted:{
            type:Boolean,
            default:false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = new mongoose.model('assign',labTestAssignSchema);