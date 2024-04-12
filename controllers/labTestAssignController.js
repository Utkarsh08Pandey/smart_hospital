const labTestAssign =  require('../models/labTestAssignModel');

const create = (req,res)=>{
    const LabTestAssign = new labTestAssign({
        doctorId:req.body.doctorId,
        patientId:req.body.patientId,
        labTestId:req.body.labTestId,
    })
    LabTestAssign.save()
                 .then((result)=>res.send({data:'created'}))
                 .catch((err)=>console.error(err))
}
const read = (req,res)=>{
    labTestAssign.find({isDeleted:false}).populate('doctorId').populate('patientId').populate('labTestId')
       .then((data)=>{
            if(!data){
                res.send({data:'no data'})
            }
            else{
                res.send({data})
            }
       })
       .catch((e)=>console.log('cannot read the lab test'))
}

const update = (req,res)=>{
    labTestAssign.updateOne({_id:req.query._id},req.body)
        .then((data)=>res.send({data}))
        .catch((e)=>console.log(e))
}
const Delete = (req,res)=>{
    const _id = req.params.id;
    labTestAssign.findById(_id)
    .then((resp)=>{
            if(!resp){
                res.send({data:"sorry no lab data exist"})
            }
            else{
                labTestAssign.findByIdAndDelete(_id)
                .then((data)=>res.send({data:'deleted successfully'}))
                .catch((e)=>console.log(e))
            }
    })
}

module.exports = {create,read,update,Delete}