const mongoose=require("mongoose")
const buildingSchema=new mongoose.Schema({
  // buildingPic:{required:[true,"images are required"]},
  // id:{type:Number},
  OwnerName:{type:String,required:[true,"OwnerName is required"]},
  email:{type:String,required:[true,"email is required"]},
  phoneNo:{type:Number,required:[true,"phoneNo is required"],minlength:[10,"10 number required"]},
  property:{type:Array,required:[true,"property is required"]}
},{collection:"buldingCollection"})

const buildingModel=mongoose.model("houses",buildingSchema)
module.exports=buildingModel
