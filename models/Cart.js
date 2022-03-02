const mongoose=require("mongoose")
const cartSchema=new mongoose.Schema({
  userName:{type:String},
  property:{type:Array,required:[true,"property is required"]}
},{collection:"cartCollection"})

const cartModel=mongoose.model("cart",cartSchema)
module.exports=cartModel
