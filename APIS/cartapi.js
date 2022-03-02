const exp=require("express")
const cartapp=exp.Router()
cartapp.use(exp.json())
const Data=require("../models/Data")
const User=require("../models/User")
const Cart=require("../models/Cart")
const verifyToken=require("../middlewears/verifyToken")
const expressAsyncHandler=require("express-async-handler")
cartapp.post("/:username/addcart",expressAsyncHandler(async(req,res)=>{
  // let data=await User.findOne({username:req.params.username}).exec()
  // if(data==null){
  //   res.send({message:"user not existed.. signup-to add to the card"})
  // }
  // else{
    if(req.params.username=="nouser"){
      res.send({message:"user not existed.. signup to post"})
    }
    else{
      let username=req.params.username
      // console.log("req.body",req.body)
      let cartadd=req.body
      let existedpost=await Cart.findOne({userName:req.params.username}).exec()
      if(existedpost==null){
        cartObj=new Cart({...cartadd})
        // cartObj.username=username  
        // cartObj.property.push(cartadd)
        await cartObj.save()
        res.send({message:"add added to cart"})
      }
      else{
        let v = req.body.property
        let required = existedpost.property
       
       
       let arr = []
       for(let x of required){
           if(JSON.stringify(x)==JSON.stringify(v)){
                arr.push(x)
           }
       }
  
       if(arr.length>0){
           res.send({message:"add already existed in cart"})
       }
       else{
            required.push(v)
            await Cart.updateOne({userName:username},{$set:{property:required}})
            res.send({message:"next add is added to cart",payload:existedpost})
       }
      }
    }
    
  // }

  // else if(req.params.ownername==req.params.username){
  //   res.send({message:"your the owner of this add"})
  // }
  // else{
  //   let data=await Data.findOne({OwnerName:req.params.ownername}).exec()
  //   let cartadd=data.property[req.params.id]
  //   let username=req.params.username
  //   let existedpost=await Cart.findOne({userName:req.params.username}).exec()
  //   if(existedpost==null){
  //     cartObj=new Cart({...cartadd})
  //     cartObj.userName=username  
  //     // cartObj.property.push(cartadd)
  //     await cartObj.save()
  //     res.send({message:"add added to cart"})
  //   }
  //   else{
  //     cartObj.property.push(cartadd)
  //     await cartObj.save()
  //     res.send({message:"add added to cart"})
  //   }
  // }
}))
cartapp.get("/:username/getcart",expressAsyncHandler(async(req,res)=>{
  let data=await Cart.findOne({username:req.params.username}).exec()
  res.send({message:"my card",payload:data})
}))
cartapp.delete("/:username/:id/deleteadd",expressAsyncHandler(async(req,res)=>{
  let data=await Cart.findOne({userName:req.params.username}).exec()
  if(data==null){
    res.send({message:"add not found"})
  }
  else{
    data.property.splice(req.params.id,1)
    await Cart.findOneAndUpdate({userName:req.params.username},{$set:{property:data.property}}).exec()
    res.send({message:"add removed from cart"})
  }
}))
cartapp.use((req,res,next)=>{
  res.send({message:"path not found",payload:`${req.url} not found`})
})
cartapp.use((err,req,res,next)=>{
  res.send({message:"error",payload:err.message})
})
module.exports=cartapp