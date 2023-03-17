const ContactSchema = require("../Models/Contact");
var jwt = require("jsonwebtoken");


exports.isAuth=async(req,res,next)=>{
  try{

      const token = req.header('Authorization')


      var decoded = jwt.verify(token,process.env.privateKey)

if(!decoded){return res.json({errors})}

const user = await ContactSchema.findById(decoded.id)

req.user = user
next()
  }catch(err){
      console.log(err)
  }
}
