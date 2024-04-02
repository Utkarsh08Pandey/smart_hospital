const { hospital } = require('../models/hospitalModel.js');
const {lab,JoiSchema} = require('../models/labModel.js')
const create = (req,res)=>{
    const {error,value} = JoiSchema.validate(req.body)
    if(error){
        res.send({error})
    }
    else{
        const Lab = new lab(value);
          Lab.save()
            .then(res.send({ data: "lab test created" }))
            .catch((e) => console.log(e));
    }
}
const read = (req,res)=>{
    lab.find({isDeleted:false})
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
    console.log(req.query)
    lab.updateOne({name:req.query.name},req.body)
        .then((data)=>res.send({data}))
        .catch((e)=>console.log(e))
}
const deleteTest = (req,res)=>{
    lab.findOne({name:req.query.name})
    .then((resp)=>{
            if(!resp){
                res.send({data:"sorry no lab data exist"})
            }
            else{
                lab.deleteOne({name:req.query.name})
                .then((data)=>res.send({data:'deleted successfully'}))
                .catch((e)=>console.log(e))
            }
    })
}

module.exports = {create,read,update,deleteTest}