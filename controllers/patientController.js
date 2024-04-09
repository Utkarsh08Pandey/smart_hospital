const {patient,JoiSchema} = require("../models/patientModel.js");
const {lab} = require('../models/labModel.js')
const {appointment} = require('../models/appointmentModel.js')
const prescription  = require('../models/prescriptionModel.js')
const jsonwebtoken = require('jsonwebtoken')
const bcryptjs = require("bcryptjs");
const register = (req, res) => {
  const {error,value} = JoiSchema.validate(req.body)
  const hashPassword = bcryptjs.hashSync(req.body.password,10);
  if(error){
    res.send({error})
  }
  else{
    value.password = hashPassword;
    const Patient = new patient(value);
    Patient.save()
      .then(res.send({ data: "patient created" }))
      .catch((e) =>{ 
        console.log(e);
      });
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

module.exports = { register, login, dashboard }

