const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
  username:{type:String,required:[true,"username is required"],minlength:[4,"min length is 4"]},
  password:{type:String,required:[true,"password is required"]},
  email:{type:String,required:[true,"email is required"]},
  phoneNo:{type:Number,required:[true,"phoneNo is required"],minlength:[10,"10 number required"]},
  profilePic:{type:String},
  status:{type:Boolean,default:true}
},{collection:"projectCollection"})

const userModel=mongoose.model("user",userSchema)
module.exports=userModel
