const exp=require("express")
const userapp=exp.Router()
userapp.use(exp.json())
const User=require("../models/User")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const expressAsyncHandler=require("express-async-handler")
const verifyToken=require("../middlewears/verifyToken")
userapp.get("/getuser",expressAsyncHandler(async(req,res)=>{
  let data=await User.find().exec()
  res.send({message:"user data",payload:data})
}))

//cloudinary
var cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const multer = require('multer')
 
//configure cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
 
//configure cloudinary storage multer
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary:cloudinary,
  params:async(req,file)=>{
      return{
          //with this folder name new folder name is created in media storage
          folder:"profilepic",
          public_id:file.filename+'-'+Date.now()
      }
  }  
})
//configure multer ,multer is a middle ware  (we are informing multer to store the data in given path/storage)
const upload = multer({storage:cloudinaryStorage})


userapp.post("/createuser",upload.single('photo'),expressAsyncHandler(async(req,res)=>{
   //img url returned from cloudinary
   let imgCdn = req.file.path;
 
   //get userObj from client
   let userObjFromClient = JSON.parse(req.body.userObj)

  let data=await User.findOne({username:userObjFromClient.username}).exec()
  let emaildata=await User.findOne({email:userObjFromClient.email}).exec()
  if(data==null){
    if(emaildata==null){
      userObjFromClient.profilePic=imgCdn
      console.log(userObjFromClient)
      let hashed=await bcryptjs.hash(userObjFromClient.password,5)
      userObjFromClient.password=hashed
      let doc=await User.create(userObjFromClient)
      await doc.save()
      res.send({message:"user created"})
    }
    else{
      res.send({message:"email already existed..plz try with different email"})
    }
  }
  else{
    res.send({message:"username is already existed"})
  }
}))


userapp.put("/:username/changepassword",expressAsyncHandler(async(req,res)=>{
  let data=await User.findOne({username:req.params.username}).exec()
  if(data==null){
    res.send({message:"user not found login to changepassword"})
  }
  else if(req.params.username=="nouser"){
    res.send({message:"user not existed.. signup to post"})
  }
  else if(req.body.username==req.params.username){
    let result=await bcryptjs.compare(req.body.oldpassword,data.password)
    if(result==true){
      if(req.body.oldpassword==req.body.newpassword){
        res.send({message:"password is same"})
      }
      else{
        if(req.body.newpassword==req.body.newpasswordmatch){
          let hashed=await bcryptjs.hash(req.body.newpassword,5)
          req.body.password=hashed
           await User.updateOne({username:req.params.username},{$set:{password:req.body.password}}).exec()
          res.send({message:"password updated"})
        }
        else{
          res.send({message:"new password not matched"})
        }
      }
    }
    else{
      res.send({message:"oldpassword is invalid"})
    }
  }
  else{
    res.send({message:"username is invalid"})
  }
}))
userapp.put("/forgotpassword",expressAsyncHandler(async(req,res)=>{
  let data=await User.findOne({email:req.body.email}).exec()
  if(data==null){
    res.send({message:"user not found"})
  }
  else{
    if((req.body.email==data.email)&&(req.body.phoneNo==data.phoneNo)){
      if(req.body.newpassword==req.body.newpasswordmatch){
        let result=await bcryptjs.compare(req.body.newpassword,data.password)
        if(result==true){
          res.send({message:"password is same try to login with same password"})
        }
        else{
          let hashed=await bcryptjs.hash(req.body.newpassword,5)
          data.password=hashed
          await User.updateOne({email:req.body.email},{$set:{password:data.password}})
          res.send({message:"password updated"})
        }
      }
      else{
        res.send({message:"password not matched"})
      }
    }
    else{
      res.send({message:"data not matched"})
    }
  }
}))
userapp.put("/:username/updateuserdetails",expressAsyncHandler(async(req,res)=>{
  let data=await User.findOne({username:req.params.username}).exec()
  if(data==null){
    res.send({message:"user not found signup to update user deatils"})
  }
  else if(req.params.username=="nouser"){
    res.send({message:"user not existed.. signup to update user deatils"})
  }
  else{
    let reverification=await bcryptjs.compare(req.body.password,data.password)
    if((req.body.email==data.email)&&(reverification==true)){
      if((req.body.username==data.username)&&(req.body.phoneNo==data.phoneNo)){
        res.send({message:"data is same"})
      }
      else{
        data.username=req.body.username
        data.phoneNo=req.body.phoneNo
        await User.updateMany({email:req.body.email},{$set:{username:data.username,phoneNo:data.phoneNo}})
        res.send({message:"user details updated"})
      }
    }
    else{
      res.send({message:"data not matched"})
    }
  }
}))
userapp.put("/:username/deleteuser",expressAsyncHandler(async(req,res)=>{
  let data=await User.findOne({username:req.params.username}).exec()
  if(data==null){
    res.send({message:"user not found"})
  }
  else if(req.params.username=="nouser"){
    res.send({message:"user not existed.. signup to update user deatils"})
  }
  else if(data.status==false){
    res.send({message:"user already deleted"})
  }
  else{
    let result=await bcryptjs.compare(req.body.password,data.password)
    if(result==true){
      await User.updateOne({username:req.params.username},{$set:{status:false}}).exec()
      res.send({message:"user deleted"})
    }
    else{
      res.send({message:"password is invalid"})
    }
  }
}))
userapp.put("/restoreuser",expressAsyncHandler(async(req,res)=>{
  let data=await User.findOne({$or:[{username:req.body.usernameoremail},{email:req.body.usernameoremail}]}).exec()
  if(data==null){
      res.send({message:"username or email invalid"})
    }
  else{
    if(data.status==false){
      let result = await bcryptjs.compare(req.body.password,data.password)
      if(result==false){
        res.send({message:"password is invalid"})
      }
      else{
        await User.updateOne({username:data.username},{$set:{status:true}}).exec()
        let signedToken=jwt.sign({username:data.username},process.env.SECRET_KEY,{expiresIn:60000})
        res.send({message:"user get back in and login success",token:signedToken,user:data})
      }
    }
    else{
      res.send({message:"user can access their account"})
    }
  }
}))
// userapp.delete("/:username/permanentdeleteuser",expressAsyncHandler(async(req,res)=>{
//   let data=await User.findOne({username:req.params.username}).exec()
//   if(data==null){
//     res.send({message:"user not found"})
//   }
//   else if(data.status==false){
//     await User.deleteOne({username:req.params.username}).exec()
//     res.send({message:"user permanently deleted"})
//   }
//   else{
//     await User.updateOne({username:req.params.username},{$set:{status:false}}).exec()
//     res.send({message:"user temporary deleted"})
//   }
// }))
userapp.post("/userLogin",expressAsyncHandler(async(req,res)=>{
  let data=await User.findOne({$or:[{username:req.body.usernameoremail},{email:req.body.usernameoremail}]}).exec()
  if(data==null){
      res.send({message:"username or email invalid"})
    }
  else{
    if(data.status==true){
      let result = await bcryptjs.compare(req.body.password,data.password)
      if(result==false){
        res.send({message:"password is invalid"})
      }
      else{
        let signedToken=jwt.sign({username:data.username},process.env.SECRET_KEY,{expiresIn:60000})
        res.send({message:"login success",token:signedToken,user:data})
      }
    }
    else{
      res.send({message:"username temporarily in deleted status"})
    }
  }
}))
userapp.get("/check",verifyToken,expressAsyncHandler(async(req,res)=>{
  res.send({message:"private routes"})
}))
userapp.use((req,res,next)=>{
  res.send({message:"path not found",payload:`${req.url} not found`})
})
userapp.use((err,req,res,next)=>{
  res.send({message:"error",payload:err.message})
})
module.exports=userapp