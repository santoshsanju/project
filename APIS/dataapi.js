const exp=require("express")
const dataapp=exp.Router()
dataapp.use(exp.json())
const Data=require("../models/Data")
const User=require("../models/User")
const expressAsyncHandler=require("express-async-handler")
dataapp.get("/getadds",expressAsyncHandler(async(req,res)=>{
  let data=await Data.find().exec()
  res.send({message:"adds data",payload:data})
}))
// dataapp.post("/:username/postadd",expressAsyncHandler(async(req,res)=>{
//   let data=await User.findOne({username:req.params.username}).exec()
//   if(data==null){
//     res.send({message:"user not existed.. signup to post"})
//   }
//   else{
//     let existedpost=await Data.findOne({OwnerName:req.params.username}).exec()
//     if(existedpost==null){
//       let userObjFormClient=req.body
//       apartmentObj=new Data({...userObjFormClient})
      // apartmentObj.property.push(userObjFormClient.property)
//       await apartmentObj.save()
//       res.send({message:"add created"})
//     }
//     else{
//       let userObjFormClient=req.body
//       let newpropertydetails=userObjFormClient.property
//       let existedpost=await Data.findOne({OwnerName:req.params.username}).exec()
//       let propertydetails=existedpost.property
//       // console.log(propertydetails)
//       propertydetails.push(newpropertydetails)
//       await Data.updateOne({OwnerName:req.params.username},{$set:{property:propertydetails}})
//       res.send({message:"next add created"})
//     }
//   }
// }))

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
          folder:"buildingPic",
          public_id:file.filename+'-'+Date.now()
      }
  }  
})
//configure multer ,multer is a middle ware  (we are informing multer to store the data in given path/storage)
const upload = multer({storage:cloudinaryStorage})


//post apartments
// dataapp.post("/:username/postadd",upload.single('photo'),expressAsyncHandler(async(req,res)=>{

//      //img url returned from cloudinary
//      let imgCdn = req.file.path;
 
//      //get userObj from client
//      let userObjFromClient = JSON.parse(req.body.userObj)

//   // //get object
//   // let userObjFromClient = req.body
//   //console.log(req.body)
//   let username=req.params.username
//   let userObjFromDb = await Data.findOne({OwnerName:username})
//   if(username=="nouser"){
//     res.send({message:"user not existed.. signup to post"})
//   }
//   //console.log(userObjFromDb)
//   else{
//     if(userObjFromDb==null){
//       userObjFromClient.property.buildingPic=imgCdn
//       apartmentObj = new Data({...userObjFromClient})
//       // console.log(apartmentObj)
//       // apartmentObj.property.push(userObjFromClient.property)
//        await apartmentObj.save()
//       //  console.log(apartmentObj)
//       res.send({message:"apartment added"})
//   }
//   //if user existed
//   else if(userObjFromDb!==null){ 
//      let v = userObjFromClient.property
//      let required = userObjFromDb.property
     
     
//      let arr = []
//      for(let x of required){
//          if(JSON.stringify(x)==JSON.stringify(v)){
//               arr.push(x)
//          }
//      }

//      if(arr.length>0){
//          res.send({message:"apartment already added"})
//      }
//      else{
//         v.buildingPic=imgCdn
//           required.push(v)
//           await Data.updateOne({OwnerName:username},{$set:{property:required}})
          
//           res.send({message:"new appartment added to list",payload:userObjFromDb})
//      }

//    }
//   }
// }))
dataapp.post("/:username/postadd",upload.single('photo'),expressAsyncHandler(async(req,res)=>{

  //img url returned from cloudinary
  let imgCdn = req.file.path;

  //get userObj from client
  let userObjFromClient = JSON.parse(req.body.userObj)

// //get object
// let userObjFromClient = req.body
//console.log(req.body)
let username=req.params.username
let userObjFromDb = await Data.findOne({OwnerName:username})
if(username=="nouser"){
 res.send({message:"user not existed.. signup to post"})
}
//console.log(userObjFromDb)
else{
 if(userObjFromDb==null){
   userObjFromClient.property.buildingPic=imgCdn
   apartmentObj = new Data({...userObjFromClient})
   // console.log(apartmentObj)
   // apartmentObj.property.push(userObjFromClient.property)
    await apartmentObj.save()
   //  console.log(apartmentObj)
   res.send({message:"apartment added"})
}
//if user existed
else if(userObjFromDb!==null){ 
  let v = userObjFromClient.property
  let required = userObjFromDb.property
  
  
  let arr = []
  for(let x of required){
      if(JSON.stringify(x)==JSON.stringify(v)){
           arr.push(x)
      }
  }

  if(arr.length>0){
      res.send({message:"apartment already added"})
  }
  else{
     v.buildingPic=imgCdn
       required.push(v)
       await Data.updateOne({OwnerName:username},{$set:{property:required}})
       
       res.send({message:"new appartment added to list",payload:userObjFromDb})
  }

}
}
}))
dataapp.get("/:username/myadds",expressAsyncHandler(async(req,res)=>{
  let data=await Data.findOne({OwnerName:req.params.username}).exec()
    res.send({message:"adds data",payload:data})
}))
dataapp.put("/:username/:id/updateadd",expressAsyncHandler(async(req,res)=>{
  let data=await Data.findOne({OwnerName:req.params.username}).exec()
  if(data==null){
    res.send({message:"no add exists"})
  }
  else{
    let newdata=req.body
    data.property.splice(req.params.id,1,newdata)
    await Data.findOneAndUpdate({OwnerName:req.params.username},{$set:{property:data.property}}).exec()
    res.send({message:"add updated"})
  }
}))
dataapp.delete("/:username/:id/deleteadd",expressAsyncHandler(async(req,res)=>{
  let data=await Data.findOne({OwnerName:req.params.username}).exec()
  if(data==null){
    res.send({message:"user not found"})
  }
  else{
    data.property.splice(req.params.id,1)
    await Data.findOneAndUpdate({OwnerName:req.params.username},{$set:{property:data.property}}).exec()
    res.send({message:"add deleted"})
  }
}))
dataapp.use((req,res,next)=>{
  res.send({message:"path not found",payload:`${req.url} not found`})
})
dataapp.use((err,req,res,next)=>{
  res.send({message:"error",payload:err.message})
})
module.exports=dataapp