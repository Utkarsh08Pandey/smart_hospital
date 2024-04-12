const {patient,JoiSchema} = require("../models/patientModel.js");
const {lab} = require('../models/labModel.js')
const {appointment} = require('../models/appointmentModel.js')
const prescription  = require('../models/prescriptionModel.js')
const jsonwebtoken = require('jsonwebtoken')
const bcryptjs = require("bcryptjs");
const register = async(req, res) => {
  const {error,value} = JoiSchema.validate(req.body)
  const hashPassword = bcryptjs.hashSync(req.body.password,10);
  if(error){
    res.send({error})
  }
  else{
    const exist = await patient.findOne({email:req.body.email})
    if(exist){
      res.send({data:'email already exist'})
    }
    else{
      value.password = hashPassword;
      value.isDeleted = false;
      const Patient = new patient(value);
      Patient.save()
        .then(res.send({ data: "patient created" }))
        .catch((e) =>{ 
          console.log(e);
        });
    }
    }
};

const login = (req, res) => {
  const password = req.body.password;
  patient
    .findOne({ email: req.body.email })
    .then((resp) => {
      let v_password = bcryptjs.compareSync(password, resp.password);
      let token1 = jsonwebtoken.sign({email:resp.email,password:resp.password},'abc')
      if (v_password) {
        res.send({ data: "verified successfully" ,token1});
        return;
      } else {
        res.send({ data: "incorrect password" });
      }
    })
    .catch((err)=>{
        console.log("err--", err)
        res.send({ data: "incorrect email" })});
};

const read = (req,res)=>{
  patient.find({isDeleted:false})
     .then((data)=>{
          if(!data){
              res.send({data:'no data'})
          }
          else{
              res.send({data})
          }
     })
     .catch((e)=>console.log('cannot read the patient data list '))
}

const dashboard = (req,res) =>{
  const _id = req.params.id;
  patient.findById({_id})
         .then(async(data)=>{
            const Appointment = await appointment.find({patientId:_id})
            const Prescription = await prescription.find({patientId:_id})
            const LabTestAssign = await lab.find({patientId:_id})
            const dashboardData = {Appointment,Prescription,LabTestAssign}
            res.send({dashboardData})

         })
         .catch((e)=>{
            res.send({error:e})
         });
}

const update = async(req,res)=>{
  const exist = await patient.findOne({name:req.query.name})
  if(!exist){
    res.send({error:'sorry no data found'})
  }
  else{
    if(req.body.password){
      const hashPassword = bcryptjs.hashSync(req.body.password,10);
      req.body.password = hashPassword
    }
    patient.updateOne({name:req.query.name},req.body)
        .then((data)=>{

           res.send({data:'updated successfully'})
        })
        .catch((e)=>{
          console.log(e)
          res.send({error:e})
        })
  }
}
const deletePatient = (req,res)=>{
     patient.findOne({name:req.query.name})
     .then((resp)=>{
           if(!resp){
               res.send({data:"sorry no patient exist"})
           }
           else{
            patient.deleteOne({name:req.query.name})
            .then((data)=>res.send({data:'deleted successfully'}))
            .catch((e)=>console.log(e))       
           }
     })
}

module.exports = { register, login,read,  dashboard, update, deletePatient  }

