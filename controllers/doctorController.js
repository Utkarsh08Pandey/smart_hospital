const {doctor,JoiSchema} = require('../models/doctorModel.js')
const jsonwebtoken  = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const create = async(req,res)=>{
    const {error,value} = JoiSchema.validate(req.body)
    const hashPassword = bcryptjs.hashSync(req.body.password,10);
    if(error){
        res.send({error})
      }
      else{
        const exist = await doctor.findOne({email:req.body.email})
        if(exist){
          res.send({data:'email already exist'})
        }
        else{
          value.password= hashPassword
            const Doctor = new doctor(value);
            Doctor.save()  
            .then(res.send({ data: "doctor data created" }))
            .catch((e) =>{
              res.json(e);
              console.log(e);
            });
          }
        }
}

const read = (req,res)=>{
    doctor.find({isDeleted:false})
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
    doctor.updateOne({name:req.query.name},req.body)
        .then((data)=>{
           res.send({data:'updated successfully'})
        })
        .catch((e)=>console.log(e))
}
const deleteDoctor = async(req,res)=>{   
    doctor.findOne({name:req.query.name})
          .then((resp)=>{
                if(!resp){
                    res.send({data:"sorry no username exist"})
                }
                else{
                     doctor.deleteOne({name:req.query.name})
                       .then((data)=>{
                           if(!req.query.name){
                               res.send({data:'sorry no document found'})
                            }
                            else{
                                res.send({data:'deleted successfully!'})
                            }
                        })
                       .catch((e)=>console.log(e))
                }
          })
}

const login = (req, res) => {
    const password = req.body.password;
    doctor
      .findOne({ email: req.body.email })
      .then((resp) => {
        let v_password = bcryptjs.compareSync(password, resp.password);
        let token1 = jsonwebtoken.sign({email:resp.email,password:resp.password},'abc')
        if (v_password) {
          res.send({ data: "verified successfully",token1 });
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
  doctor.find().populate('appointment')
         .then((data)=>res.send({data}))
         .catch((e)=>console.log(e,'error in fetching patient'));
}





module.exports = {create,read,update,deleteDoctor,login,dashboard}