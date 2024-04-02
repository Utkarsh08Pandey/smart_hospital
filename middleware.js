const jwt = require('jsonwebtoken')

let MW=(req,res,next)=>{
    let token=req.headers.authorization.split(" ")[1]
    if(token!=null){
        jwt.verify(token,'abc',function(err, decoded){
            if(err){
                res.send({err:"invalid token"})
            }
            else{
                next()
            }
        })
    }        
    else{
        res.send({message:"Token Not Available."})
    }
}

module.exports = MW