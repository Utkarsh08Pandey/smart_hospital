const {appointment,JoiSchema} = require('../models/appointmentModel.js')
const create = async(req,res)=>{
  try{
    const {error,value} = JoiSchema.validate(req.body)
    if(error){
        res.send({error})
      }
      else{
          const Apppointment = new appointment(value);
          Apppointment.save()
          .then(res.send({ data: "appointment data created" }))
          .catch((e) => console.log(e));
      }
  }
    catch(e){
      console.log(e,"error in appointment creation  function")
    }

}
const read = (req,res)=>{
    appointment.find({isDeleted:'false'}).populate('patientId').populate('doctorId')
       .then((data)=>{
          if(!data){
            res.send({data:"no data"})
          }
          else{
            res.send({data})
          }
       })
       .catch((e)=>console.log('cannot read the lab test'))
}
const update = (req,res)=>{
    appointment.updateOne({doctorId:req.query.doctorId},req.body)
        .then((data)=>{
           res.send({data:'updated successfully'})
        })
        .catch((e)=>console.log(e))
}
const deleteAppointment = (req,res)=>{
       appointment.findOne({doctorId:req.query.doctorId})
       .then((resp)=>{
             if(!resp){
                 res.send({data:"sorry no appointment exist"})
             }
             else{
              appointment.deleteOne({doctorId:req.query.doctorId})
              .then((data)=>res.send({data:'deleted successfully'}))
              .catch((e)=>console.log(e))       
             }
       })
}

module.exports = {create,read,update,deleteAppointment}