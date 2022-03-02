const jwt=require("jsonwebtoken")
const verifyToken=(req,res,next)=>{
  let bearerToken=req.headers.authorization
  if(bearerToken==null){
    res.send({message:"un-authorized section"})
  }
  else{
    try{
      let token=bearerToken.split(" ")[1]
      jwt.verify(token,process.env.SECRET_KEY)
      next()
    }
    catch{
      next(new Error("Session is expired..Relogin again for continue"))
    }
    
  }
}
module.exports=verifyToken