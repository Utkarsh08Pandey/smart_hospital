const {hospital,JoiSchema} = require("../models/hospitalModel.js");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require('jsonwebtoken')
const register = async(req, res) => {
  const {error,value} = JoiSchema.validate(req.body)
  const hashPassword = bcryptjs.hashSync(req.body.password,10);
  if(error){
    res.send({error})
  }
  else{
    const exist = await hospital.findOne({email:req.body.email})
    if(exist){
      res.send({data:'email already exist'})
    }
    else{
      value.password= hashPassword
      const Hospital = new hospital(value);
      Hospital.save()
        .then(res.send({ data: "hospital created" }))
        .catch((e) => console.log(e));
    }
    }
};

const login = (req, res) => {
  const password = req.body.password;
  hospital
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

module.exports = { register, login };
