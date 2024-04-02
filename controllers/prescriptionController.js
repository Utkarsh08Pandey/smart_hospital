const prescription =  require('../models/prescriptionModel.js');

const create = (req,res)=>{
   const Prescription  = new prescription({
    doctorId:req.body.doctorId,
    patientId:req.body.patientId,
    prescription:req.body.prescription,
   })
   Prescription.save()
               .then((data)=>res.send({data:'prescription created successfully'}))
               .catch((err)=>console.error(err))
}
const read = (req,res)=>{
    prescription.find({isDeleted:false}).populate('doctorId').populate('patientId')
       .then((data)=>{
            if(!data){
                res.send({data:'no data'})
            }
            else{
                res.send({data})
            }
       })
       .catch((e)=>console.log('cannot read the prescription test data'))
}

const update = (req,res)=>{
    prescription.updateOne({_id:req.query._id},req.body)
        .then((data)=>res.send({data}))
        .catch((e)=>console.log(e))
}

const Delete = (req,res)=>{
    prescription.findOne({_id:req.query._id})
    .then((resp)=>{
            if(!resp){
                res.send({data:"sorry no lab data exist"})
            }
            else{
                prescription.deleteOne({name:req.query.name})
                .then((data)=>res.send({data:'deleted successfully'}))
                .catch((e)=>console.log(e))
            }
    })
}

module.exports = {create,read,update,Delete}